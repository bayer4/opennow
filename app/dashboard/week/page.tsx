'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
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
      <div className="px-4 mt-4">
        <Link
          href={`/trip/${activeTrip.id}/add`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
          style={{
            border: '1px dashed var(--border-color)',
            color: 'var(--accent)',
          }}
        >
          <Plus className="w-4 h-4" />
          Add
        </Link>
      </div>
    </div>
  );
}
