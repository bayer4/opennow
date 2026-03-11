'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/store/app-store';
import { enrichPlaceWithStatus } from '@/lib/status-engine';
import { MapView } from '@/components/MapView';

export default function MapPage() {
  const activeTrip = useAppStore((s) => s.activeTrip);
  const currentTime = useAppStore((s) => s.currentTime);
  const theme = useAppStore((s) => s.theme);

  const enrichedPlaces = useMemo(() => {
    if (!activeTrip) return [];
    return activeTrip.places.map((p) => enrichPlaceWithStatus(p, currentTime));
  }, [activeTrip, currentTime]);

  const center = useMemo(
    () => ({
      lat: activeTrip?.latitude ?? 41.8781,
      lng: activeTrip?.longitude ?? -87.6298,
    }),
    [activeTrip?.latitude, activeTrip?.longitude],
  );

  if (!activeTrip) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[var(--text-secondary)]">Loading trip…</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-9rem)]">
      <MapView places={enrichedPlaces} center={center} isDark={theme === 'dark'} />
    </div>
  );
}
