'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { CityHeader } from '@/components/CityHeader';
import { BottomNav } from '@/components/BottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useAppStore } from '@/store/app-store';
import { chicagoCity } from '@/lib/seed-data';
import { City } from '@/types';
import {
  getCurrentPosition,
  reverseGeocode,
  loadLastCity,
  saveLastCity,
  isAwayFromCity,
} from '@/lib/geo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const setActiveCity = useAppStore((s) => s.setActiveCity);
  const setDetectedCityName = useAppStore((s) => s.setDetectedCityName);
  const setLoading = useAppStore((s) => s.setLoading);
  const setGuest = useAppStore((s) => s.setGuest);
  const restockAllStashed = useAppStore((s) => s.restockAllStashed);
  const tick = useAppStore((s) => s.tick);
  const didInit = useRef(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (didInit.current) return;
    didInit.current = true;

    const isGuestUser = !session?.user;
    setGuest(isGuestUser);

    async function init() {
      setLoading(true);

      let detectedCity: string | null = null;
      let userLat: number | undefined;
      let userLng: number | undefined;
      let shouldRestock = false;

      try {
        const pos = await getCurrentPosition();
        userLat = pos.latitude;
        userLng = pos.longitude;
        detectedCity = await reverseGeocode(pos);
        setDetectedCityName(detectedCity);

        const lastCity = loadLastCity();
        if (lastCity && isAwayFromCity(pos, lastCity)) {
          shouldRestock = true;
        }

        if (detectedCity && detectedCity !== 'Unknown') {
          saveLastCity({
            city: detectedCity,
            latitude: pos.latitude,
            longitude: pos.longitude,
          });
        }
      } catch {
        const lastCity = loadLastCity();
        if (lastCity) {
          detectedCity = lastCity.city;
          userLat = lastCity.latitude;
          userLng = lastCity.longitude;
          setDetectedCityName(detectedCity);
        }
      }

      if (isGuestUser) {
        const existing = useAppStore.getState().activeCity;
        if (!existing) {
          if (shouldRestock) {
            const restocked = chicagoCity.places.map((p) => ({
              ...p,
              isStashed: false,
              stashedAt: undefined,
            }));
            setActiveCity({ ...chicagoCity, places: restocked });
          } else {
            setActiveCity(chicagoCity);
          }
        } else {
          if (shouldRestock) restockAllStashed();
          setLoading(false);
        }
        return;
      }

      // Authenticated user: load city from Supabase
      try {
        const cityName = detectedCity && detectedCity !== 'Unknown'
          ? detectedCity
          : null;

        const params = new URLSearchParams();
        if (cityName) params.set('name', cityName);
        if (userLat !== undefined) params.set('lat', String(userLat));
        if (userLng !== undefined) params.set('lng', String(userLng));
        if (shouldRestock) params.set('restock', '1');

        const res = await fetch(`/api/cities?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.city) {
            const city: City = data.city;
            setActiveCity(city);
            return;
          }
        }
      } catch {
        // API failed, fall through to fallback
      }

      // Fallback: create a local city from seed data
      const existing = useAppStore.getState().activeCity;
      if (!existing) {
        setActiveCity({
          ...chicagoCity,
          userId: (session!.user as Record<string, unknown>).id as string,
          name: detectedCity && detectedCity !== 'Unknown' ? detectedCity : 'Chicago',
          latitude: userLat ?? chicagoCity.latitude,
          longitude: userLng ?? chicagoCity.longitude,
        });
      } else {
        setLoading(false);
      }
    }

    init();
  }, [session, status, setActiveCity, setDetectedCityName, setLoading, setGuest, restockAllStashed]);

  useEffect(() => {
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <ThemeProvider>
      <div className="min-h-dvh flex flex-col bg-[var(--bg-primary)]">
        <CityHeader />
        <main className="flex-1 pb-16 page-transition">{children}</main>
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}
