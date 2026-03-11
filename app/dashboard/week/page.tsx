'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/store/app-store';
import { WeeklyGrid } from '@/components/WeeklyGrid';

export default function WeekPage() {
  const activeCity = useAppStore((s) => s.activeCity);
  const currentTime = useAppStore((s) => s.currentTime);

  const activePlaces = useMemo(
    () => activeCity?.places.filter((p) => !p.isStashed) ?? [],
    [activeCity],
  );

  if (!activeCity) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p style={{ color: 'var(--text-secondary)' }}>Detecting your city...</p>
      </div>
    );
  }

  return (
    <div className="py-5">
      <WeeklyGrid places={activePlaces} currentTime={currentTime} />
    </div>
  );
}
