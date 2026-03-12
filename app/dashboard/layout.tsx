'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { CityHeader } from '@/components/CityHeader';
import { BottomNav } from '@/components/BottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useAppStore, loadGuestCity } from '@/store/app-store';
import { City } from '@/types';
import {
  getCurrentPosition,
  reverseGeocode,
  loadLastCity,
  saveLastCity,
  isAwayFromCity,
  loadHomeBase,
  saveHomeBase,
} from '@/lib/geo';

function makeEmptyCity(
  name: string,
  lat: number,
  lng: number,
  userId = 'guest',
): City {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    userId,
    name,
    latitude: lat,
    longitude: lng,
    places: [],
  };
}

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
  const setHomeBase = useAppStore((s) => s.setHomeBase);
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
      // If we already have a city (e.g. returning from add-places page),
      // just refresh the detected city label without overwriting activeCity.
      if (useAppStore.getState().activeCity) {
        setLoading(false);
        try {
          const pos = await getCurrentPosition();
          const city = await reverseGeocode(pos);
          if (city && city !== 'Unknown') setDetectedCityName(city);
        } catch {}
        return;
      }

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

      // Initialize home base on first visit if not already set
      const currentHomeBase = loadHomeBase();
      const cityName =
        detectedCity && detectedCity !== 'Unknown' ? detectedCity : 'My City';

      if (!currentHomeBase && cityName !== 'My City') {
        saveHomeBase(cityName);
        setHomeBase(cityName);
      }

      // Home base city never restocks
      const homeBase = currentHomeBase ?? cityName;
      const isHome = cityName.toLowerCase() === homeBase.toLowerCase();
      if (isHome) shouldRestock = false;

      // ─── Guest users ───
      if (isGuestUser) {
        const existing = useAppStore.getState().activeCity;
        if (!existing) {
          const cityId = cityName.toLowerCase().replace(/\s+/g, '-');
          const saved = loadGuestCity(cityId);

          if (saved && saved.places.length > 0) {
            const city = { ...saved };
            if (shouldRestock) {
              city.places = city.places.map((p) =>
                p.isStashed
                  ? { ...p, isStashed: false, stashedAt: undefined }
                  : p,
              );
            }
            setActiveCity(city);
          } else {
            setActiveCity(
              makeEmptyCity(cityName, userLat ?? 0, userLng ?? 0),
            );
          }
        } else {
          if (shouldRestock) restockAllStashed();
          setLoading(false);
        }
        return;
      }

      // ─── Authenticated user: load city from Supabase ───

      // Try loading home base from server for auth users
      if (!currentHomeBase) {
        try {
          const hbRes = await fetch('/api/user/home-base');
          if (hbRes.ok) {
            const hbData = await hbRes.json();
            if (hbData.homeBase) {
              saveHomeBase(hbData.homeBase);
              setHomeBase(hbData.homeBase);
            } else if (cityName !== 'My City') {
              setHomeBase(cityName);
            }
          }
        } catch {}
      }

      try {
        const params = new URLSearchParams();
        if (cityName !== 'My City') params.set('name', cityName);
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

      // Fallback: empty city from geolocation
      const existing = useAppStore.getState().activeCity;
      if (!existing) {
        const userId = (session!.user as Record<string, unknown>)
          .id as string;
        setActiveCity(
          makeEmptyCity(cityName, userLat ?? 0, userLng ?? 0, userId),
        );
      } else {
        setLoading(false);
      }
    }

    init();
  }, [
    session,
    status,
    setActiveCity,
    setDetectedCityName,
    setLoading,
    setGuest,
    setHomeBase,
    restockAllStashed,
  ]);

  useEffect(() => {
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, [tick]);

  const isLoading = useAppStore((s) => s.isLoading);

  if (status === 'loading' || isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-dvh flex flex-col items-center justify-center bg-[var(--bg-primary)]">
          <p
            className="text-[22px] font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            OpenNow
          </p>
          <div
            className="mt-3 w-5 h-5 border-2 rounded-full animate-spin"
            style={{
              borderColor: 'var(--border-color-subtle)',
              borderTopColor: 'var(--accent)',
            }}
          />
        </div>
      </ThemeProvider>
    );
  }

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
