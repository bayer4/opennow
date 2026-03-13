'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { MapPin, Navigation } from 'lucide-react';
import { CityHeader } from '@/components/CityHeader';
import { BottomNav } from '@/components/BottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import {
  CitySearchModal,
  CityResult,
} from '@/components/CitySearchModal';
import {
  useAppStore,
  loadGuestCity,
  loadAllGuestCities,
} from '@/store/app-store';
import { City } from '@/types';
import {
  getCurrentPosition,
  reverseGeocode,
  fetchTimezone,
  loadLastCity,
  saveLastCity,
  isAwayFromCity,
  loadHomeBase,
  saveHomeBase,
  distanceMiles,
  getLocationMapping,
  saveLocationMapping,
  loadLocationMappings,
} from '@/lib/geo';

function makeEmptyCity(
  name: string,
  lat: number,
  lng: number,
  userId = 'guest',
  timezone?: string,
): City {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    userId,
    name,
    latitude: lat,
    longitude: lng,
    timezone,
    places: [],
  };
}

interface MergePromptData {
  detectedName: string;
  detectedLat: number;
  detectedLng: number;
  detectedTimezone: string | null;
  existingCityName: string;
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
  const [mergePrompt, setMergePrompt] = useState<MergePromptData | null>(null);

  // ─── City setup (shared by normal flow, picker, retry, and merge) ───

  const handleCitySetup = useCallback(
    async (cityName: string, lat: number, lng: number, timezone?: string) => {
      setNeedsCityPick(false);
      setMergePrompt(null);
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
          if (timezone && !saved.timezone) saved.timezone = timezone;
          setActiveCity(saved);
        } else {
          setActiveCity(makeEmptyCity(cityName, lat, lng, 'guest', timezone ?? undefined));
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
        if (timezone) params.set('tz', timezone);
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
      setActiveCity(makeEmptyCity(cityName, lat, lng, userId, timezone ?? undefined));
    },
    [session, setActiveCity, setDetectedCityName, setLoading, setHomeBase],
  );

  const handleCityPickerSelect = useCallback(
    async (city: CityResult) => {
      setCityPickerOpen(false);
      const tz = await fetchTimezone(city.latitude, city.longitude);
      await handleCitySetup(city.name, city.latitude, city.longitude, tz ?? undefined);
    },
    [handleCitySetup],
  );

  const handleRetryLocation = useCallback(async () => {
    setNeedsCityPick(false);
    setLoading(true);
    try {
      const pos = await getCurrentPosition();
      const result = await reverseGeocode(pos);
      if (result.city && result.city !== 'Unknown') {
        await handleCitySetup(
          result.city,
          pos.latitude,
          pos.longitude,
          result.timezone ?? undefined,
        );
      } else {
        setNeedsCityPick(true);
        setLoading(false);
      }
    } catch {
      setNeedsCityPick(true);
      setLoading(false);
    }
  }, [handleCitySetup, setLoading]);

  // ─── Merge prompt handlers ───

  const handleMergeUseExisting = useCallback(
    async (prompt: MergePromptData) => {
      saveLocationMapping(prompt.detectedName, prompt.existingCityName);

      const isGuestUser = !session?.user;
      if (!isGuestUser) {
        const mappings = loadLocationMappings();
        fetch('/api/user/location-mappings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mappings }),
        }).catch(() => {});
      }

      // Find the existing city's coordinates
      let lat = prompt.detectedLat;
      let lng = prompt.detectedLng;
      let tz = prompt.detectedTimezone ?? undefined;

      if (isGuestUser) {
        const existing = loadAllGuestCities().find(
          (c) => c.name.toLowerCase() === prompt.existingCityName.toLowerCase(),
        );
        if (existing) {
          lat = existing.latitude;
          lng = existing.longitude;
          tz = existing.timezone ?? tz;
        }
      }

      await handleCitySetup(prompt.existingCityName, lat, lng, tz);
    },
    [session, handleCitySetup],
  );

  const handleMergeStartNew = useCallback(
    async (prompt: MergePromptData) => {
      saveLocationMapping(prompt.detectedName, prompt.detectedName);

      const isGuestUser = !session?.user;
      if (!isGuestUser) {
        const mappings = loadLocationMappings();
        fetch('/api/user/location-mappings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mappings }),
        }).catch(() => {});
      }

      await handleCitySetup(
        prompt.detectedName,
        prompt.detectedLat,
        prompt.detectedLng,
        prompt.detectedTimezone ?? undefined,
      );
    },
    [session, handleCitySetup],
  );

  // ─── Init effect ───

  useEffect(() => {
    if (status === 'loading') return;
    if (didInit.current) return;
    didInit.current = true;

    const isGuestUser = !session?.user;
    setGuest(isGuestUser);

    async function init() {
      if (useAppStore.getState().activeCity) {
        setLoading(false);
        try {
          const pos = await getCurrentPosition();
          const result = await reverseGeocode(pos);
          if (result.city && result.city !== 'Unknown')
            setDetectedCityName(result.city);
        } catch {}
        return;
      }

      setLoading(true);

      let detectedCity: string | null = null;
      let detectedTimezone: string | null = null;
      let userLat: number | undefined;
      let userLng: number | undefined;
      let shouldRestock = false;

      try {
        const pos = await getCurrentPosition();
        userLat = pos.latitude;
        userLng = pos.longitude;
        const result = await reverseGeocode(pos);
        detectedCity = result.city;
        detectedTimezone = result.timezone;

        const lastCity = loadLastCity();
        if (lastCity && isAwayFromCity(pos, lastCity)) {
          shouldRestock = true;
        }

        if (detectedCity && detectedCity !== 'Unknown') {
          setDetectedCityName(detectedCity);
          saveLastCity({
            city: detectedCity,
            latitude: pos.latitude,
            longitude: pos.longitude,
          });
        } else if (lastCity) {
          detectedCity = lastCity.city;
          userLat = lastCity.latitude;
          userLng = lastCity.longitude;
          setDetectedCityName(detectedCity);
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

      const rawCityName =
        detectedCity && detectedCity !== 'Unknown' ? detectedCity : null;

      if (!rawCityName) {
        setNeedsCityPick(true);
        setLoading(false);
        return;
      }

      // ─── Check location mappings ───
      let cityName = rawCityName;
      const mapping = getLocationMapping(rawCityName);

      if (mapping) {
        cityName = mapping;
      } else if (userLat !== undefined && userLng !== undefined) {
        // Check for nearby existing cities to offer a merge
        let existingCities: Array<{
          name: string;
          latitude: number;
          longitude: number;
          placeCount: number;
        }> = [];

        if (isGuestUser) {
          existingCities = loadAllGuestCities()
            .filter((c) => c.places.length > 0)
            .map((c) => ({
              name: c.name,
              latitude: c.latitude,
              longitude: c.longitude,
              placeCount: c.places.length,
            }));
        } else {
          try {
            const res = await fetch('/api/cities/all');
            if (res.ok) {
              const data = await res.json();
              if (data.cities) existingCities = data.cities;
            }
          } catch {}
        }

        const nearbyCities = existingCities
          .filter((c) => {
            if (c.name.toLowerCase() === rawCityName.toLowerCase()) return false;
            if (c.placeCount === 0) return false;
            const dist = distanceMiles(
              { latitude: userLat!, longitude: userLng! },
              { latitude: c.latitude, longitude: c.longitude },
            );
            return dist <= 30;
          })
          .sort((a, b) => {
            const distA = distanceMiles(
              { latitude: userLat!, longitude: userLng! },
              { latitude: a.latitude, longitude: a.longitude },
            );
            const distB = distanceMiles(
              { latitude: userLat!, longitude: userLng! },
              { latitude: b.latitude, longitude: b.longitude },
            );
            return distA - distB;
          });

        if (nearbyCities.length > 0) {
          setMergePrompt({
            detectedName: rawCityName,
            detectedLat: userLat,
            detectedLng: userLng,
            detectedTimezone: detectedTimezone,
            existingCityName: nearbyCities[0].name,
          });
          setLoading(false);
          return;
        }
      }

      // ─── Normal flow ───

      const currentHomeBase = loadHomeBase();

      if (!currentHomeBase) {
        saveHomeBase(cityName);
        setHomeBase(cityName);
      }

      const homeBase = currentHomeBase ?? cityName;
      const isHome = cityName && homeBase
        ? cityName.toLowerCase() === homeBase.toLowerCase()
        : false;
      if (isHome) shouldRestock = false;

      // ─── Guest users ───
      if (isGuestUser) {
        const existing = useAppStore.getState().activeCity;
        if (!existing) {
          const cityId = cityName.toLowerCase().replace(/\s+/g, '-');
          const saved = loadGuestCity(cityId);

          if (saved && saved.places.length > 0) {
            const city = { ...saved };
            if (detectedTimezone && !city.timezone)
              city.timezone = detectedTimezone;
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
              makeEmptyCity(
                cityName,
                userLat ?? 0,
                userLng ?? 0,
                'guest',
                detectedTimezone ?? undefined,
              ),
            );
          }
        } else {
          if (shouldRestock) restockAllStashed();
          setLoading(false);
        }
        return;
      }

      // ─── Authenticated user ───

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

      // Load location mappings from server for auth users (merge with local)
      try {
        const mapRes = await fetch('/api/user/location-mappings');
        if (mapRes.ok) {
          const mapData = await mapRes.json();
          if (mapData.mappings) {
            const local = loadLocationMappings();
            const merged = { ...mapData.mappings, ...local };
            localStorage.setItem(
              'opennow-location-mappings',
              JSON.stringify(merged),
            );
          }
        }
      } catch {}

      try {
        const params = new URLSearchParams();
        params.set('name', cityName);
        if (userLat !== undefined) params.set('lat', String(userLat));
        if (userLng !== undefined) params.set('lng', String(userLng));
        if (detectedTimezone) params.set('tz', detectedTimezone);
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
      } catch {}

      const existing = useAppStore.getState().activeCity;
      if (!existing) {
        const userId = (session!.user as Record<string, unknown>)
          .id as string;
        setActiveCity(
          makeEmptyCity(
            cityName,
            userLat ?? 0,
            userLng ?? 0,
            userId,
            detectedTimezone ?? undefined,
          ),
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

  // ─── Loading state ───

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

  // ─── Merge prompt ───

  if (mergePrompt) {
    return (
      <ThemeProvider>
        <div className="min-h-dvh flex flex-col items-center justify-center bg-[var(--bg-primary)] px-8">
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.12 }}
            />
            <Navigation
              className="w-7 h-7 relative"
              style={{ color: 'var(--accent)' }}
            />
          </div>
          <h1
            className="text-[22px] font-bold tracking-tight mb-2 text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            You&rsquo;re near {mergePrompt.existingCityName}
          </h1>
          <p
            className="text-[14px] text-center mb-8 max-w-[300px] leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            We detected <strong style={{ color: 'var(--text-primary)' }}>{mergePrompt.detectedName}</strong> but
            you have places saved in{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{mergePrompt.existingCityName}</strong>.
          </p>
          <button
            onClick={() => handleMergeUseExisting(mergePrompt)}
            className="w-full max-w-[280px] py-3 rounded-xl text-[15px] font-semibold transition-opacity active:opacity-80"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Use my {mergePrompt.existingCityName} list
          </button>
          <button
            onClick={() => handleMergeStartNew(mergePrompt)}
            className="w-full max-w-[280px] mt-3 py-3 rounded-xl text-[15px] font-medium transition-opacity active:opacity-80"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          >
            Start new list for {mergePrompt.detectedName}
          </button>
        </div>
      </ThemeProvider>
    );
  }

  // ─── City picker (geo denied) ───

  if (needsCityPick) {
    return (
      <ThemeProvider>
        <div className="min-h-dvh flex flex-col items-center justify-center bg-[var(--bg-primary)] px-8">
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.12 }}
            />
            <MapPin
              className="w-7 h-7 relative"
              style={{ color: 'var(--accent)' }}
            />
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

  // ─── Normal dashboard ───

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
