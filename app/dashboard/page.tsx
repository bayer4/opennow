'use client';

import { useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { enrichPlaceWithStatus, sortPlacesForToday } from '@/lib/status-engine';
import { PlaceCard } from '@/components/PlaceCard';
import { PlaceWithStatus } from '@/types';

export default function TodayPage() {
  const activeTrip = useAppStore((s) => s.activeTrip);
  const currentTime = useAppStore((s) => s.currentTime);
  const showClosedPlaces = useAppStore((s) => s.showClosedPlaces);
  const toggleClosedPlaces = useAppStore((s) => s.toggleClosedPlaces);
  const closedRef = useRef<HTMLDivElement>(null);

  const { activePlaces, closedPlaces } = useMemo(() => {
    if (!activeTrip) return { activePlaces: [], closedPlaces: [] };

    const enriched = activeTrip.places.map((p) =>
      enrichPlaceWithStatus(p, currentTime)
    );
    const sorted = sortPlacesForToday(enriched);

    const active: PlaceWithStatus[] = [];
    const closed: PlaceWithStatus[] = [];

    for (const p of sorted) {
      if (p.statusInfo.status === 'closed_today') {
        closed.push(p);
      } else {
        active.push(p);
      }
    }

    return { activePlaces: active, closedPlaces: closed };
  }, [activeTrip, currentTime]);

  const handleToggleClosed = useCallback(() => {
    toggleClosedPlaces();
  }, [toggleClosedPlaces]);

  if (!activeTrip) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-[var(--text-secondary)]">Loading trip...</p>
      </div>
    );
  }

  const openCount = activePlaces.filter(
    (p) =>
      p.statusInfo.status === 'open' || p.statusInfo.status === 'closing_soon'
  ).length;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-[var(--text-primary)]">
            {openCount}
          </span>
          <span className="text-sm text-[var(--text-secondary)] ml-1.5">
            place{openCount !== 1 ? 's' : ''} open now
          </span>
        </div>
        <Link
          href={`/trip/${activeTrip.id}/add`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {activePlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {closedPlaces.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleToggleClosed}
            className="flex items-center gap-2 w-full py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {showClosedPlaces ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span>Closed today ({closedPlaces.length})</span>
          </button>
          <div
            ref={closedRef}
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{
              gridTemplateRows: showClosedPlaces ? '1fr' : '0fr',
            }}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 pt-2">
                {closedPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
