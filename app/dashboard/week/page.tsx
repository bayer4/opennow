'use client';

import { useAppStore } from '@/store/app-store';
import { WeeklyGrid } from '@/components/WeeklyGrid';

export default function WeekPage() {
  const activeTrip = useAppStore((s) => s.activeTrip);
  const currentTime = useAppStore((s) => s.currentTime);

  if (!activeTrip) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[var(--text-secondary)]">Loading trip...</p>
      </div>
    );
  }

  return (
    <div className="py-5">
      <WeeklyGrid places={activeTrip.places} currentTime={currentTime} />
    </div>
  );
}
