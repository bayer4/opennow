'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { MapPin } from 'lucide-react';
import { CityHeader } from '@/components/CityHeader';
import { BottomNav } from '@/components/BottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  CitySearchModal,
  CityResult,
} from '@/components/CitySearchModal';
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
  const [needsCityPick, setNeedsCityPick] = useState(false);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);

  const handleCitySetup = useCallback(
    async (cityName: string, lat: number, lng: number) => {
      setNeedsCityPick(false);
      setLoading(true);

      saveLastCity({ city: cityName, latitude: lat, longitude: lng });
      setDetectedCityName(cityName);

      const currentHomeBase = loadHomeBase();
      if (!currentHomeBase) {
        saveHomeBase(cityName);
        setHomeBase(cityName);
      }

      const isGuestUser = !session?.user;

      if (isGuestUser) {
        const cityId = cityName.toLowerCase().replace(/\s+/g, '-');
        const saved = loadGuestCity(cityId);
        if (saved && saved.places.length > 0) {
          setActiveCity(saved);
        } else {
          setActiveCity(makeEmptyCity(cityName, lat, lng));
        }
        return;
      }

      if (!currentHomeBase) {
        try {
          const hbRes = await fetch('/api/user/home-base');
          if (hbRes.ok) {
            const hbData = await hbRes.json();
            if (hbData.homeBase) {
              saveHomeBase(hbData.homeBase);
              setHomeBase(hbData.homeBase);
            }
          }
        } catch {}
      }

      try {
        const params = new URLSearchParams({
          name: cityName,
          lat: String(lat),
          lng: String(lng),
        });
        const res = await fetch(`/api/cities?${params}`);
        if (res.ok) {
          const data = await res.json();
          if (data.city) {
            setActiveCity(data.city);
            return;
          }
        }
      } catch {}

      const userId = (session!.user as Record<string, unknown>).id as string;
      setActiveCity(makeEmptyCity(cityName, lat, lng, userId));
    },
    [session, setActiveCity, setDetectedCityName, setLoading, setHomeBase],
  );

  const handleCityPickerSelect = useCallback(
    async (city: CityResult) => {
      setCityPickerOpen(false);
      await handleCitySetup(city.name, city.latitude, city.longitude);
    },
    [handleCitySetup],
  );

  const handleRetryLocation = useCallback(async () => {
    setNeedsCityPick(false);
    setLoading(true);
    try {
      const pos = await getCurrentPosition();
      const city = await reverseGeocode(pos);
      if (city && city !== 'Unknown') {
        await handleCitySetup(city, pos.latitude, pos.longitude);
      } else {
        setNeedsCityPick(true);
        setLoading(false);
      }
    } catch {
      setNeedsCityPick(true);
      setLoading(false);
    }
  }, [handleCitySetup, setLoading]);

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

      // If we couldn't determine the city, ask the user to pick one
      const cityName =
        detectedCity && detectedCity !== 'Unknown' ? detectedCity : null;

      if (!cityName) {
        setNeedsCityPick(true);
        setLoading(false);
        return;
      }

      // Initialize home base on first visit if not already set
      const currentHomeBase = loadHomeBase();

      if (!currentHomeBase) {
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
            } else {
              setHomeBase(cityName);
            }
          }
        } catch {}
      }

      try {
        const params = new URLSearchParams();
        params.set('name', cityName);
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

  if (needsCityPick) {
    return (
      <ThemeProvider>
        <div className="min-h-dvh flex flex-col items-center justify-center bg-[var(--bg-primary)] px-8">
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.12 }}
            />
            <MapPin className="w-7 h-7 relative" style={{ color: 'var(--accent)' }} />
          </div>
          <h1
            className="text-[22px] font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Where are you?
          </h1>
          <p
            className="text-[14px] text-center mb-8 max-w-[280px] leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            OpenNow needs your city to show which places are open near you.
          </p>
          <button
            onClick={() => setCityPickerOpen(true)}
            className="w-full max-w-[260px] py-3 rounded-xl text-[15px] font-semibold transition-opacity active:opacity-80"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Pick your city
          </button>
          <button
            onClick={handleRetryLocation}
            className="mt-3 text-[13px] font-medium py-2 transition-opacity active:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            Retry location access
          </button>
          <p
            className="mt-6 text-[11px] text-center max-w-[240px] leading-relaxed"
            style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
          >
            To use automatic detection, enable location in your browser
            settings (Settings &rarr; Safari &rarr; Location Services).
          </p>
          <CitySearchModal
            open={cityPickerOpen}
            title="Pick Your City"
            onSelect={handleCityPickerSelect}
            onClose={() => setCityPickerOpen(false)}
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
