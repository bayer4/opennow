'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/store/app-store';
import { enrichPlaceWithStatus } from '@/lib/status-engine';
import { MapView } from '@/components/MapView';

export default function MapPage() {
  const activeCity = useAppStore((s) => s.activeCity);
  const currentTime = useAppStore((s) => s.currentTime);
  const theme = useAppStore((s) => s.theme);

  const enrichedPlaces = useMemo(() => {
    if (!activeCity) return [];
    return activeCity.places
      .filter((p) => !p.isStashed)
      .map((p) => enrichPlaceWithStatus(p, currentTime));
  }, [activeCity, currentTime]);

  const center = useMemo(
    () => ({
      lat: activeCity?.latitude ?? 41.8781,
      lng: activeCity?.longitude ?? -87.6298,
    }),
    [activeCity?.latitude, activeCity?.longitude],
  );

  if (!activeCity) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p style={{ color: 'var(--text-secondary)' }}>Detecting your city…</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-9rem)]">
      <MapView places={enrichedPlaces} center={center} isDark={theme === 'dark'} />
    </div>
  );
}
