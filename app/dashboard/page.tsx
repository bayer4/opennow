'use client';

import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Plus, Archive, MapPin } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { enrichPlaceWithStatus, sortPlacesForToday } from '@/lib/status-engine';
import { PlaceCard } from '@/components/PlaceCard';
import { PlaceWithStatus } from '@/types';

export default function TodayPage() {
  const activeCity = useAppStore((s) => s.activeCity);
  const currentTime = useAppStore((s) => s.currentTime);
  const showClosedPlaces = useAppStore((s) => s.showClosedPlaces);
  const showStashedPlaces = useAppStore((s) => s.showStashedPlaces);
  const toggleClosedPlaces = useAppStore((s) => s.toggleClosedPlaces);
  const toggleStashedPlaces = useAppStore((s) => s.toggleStashedPlaces);

  const { activePlaces, closedPlaces, stashedPlaces } = useMemo(() => {
    if (!activeCity) return { activePlaces: [], closedPlaces: [], stashedPlaces: [] };

    const stashed: PlaceWithStatus[] = [];
    const nonStashed = activeCity.places.filter((p) => {
      if (p.isStashed) {
        stashed.push(enrichPlaceWithStatus(p, currentTime));
        return false;
      }
      return true;
    });

    const enriched = nonStashed.map((p) => enrichPlaceWithStatus(p, currentTime));
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

    return { activePlaces: active, closedPlaces: closed, stashedPlaces: stashed };
  }, [activeCity, currentTime]);

  const handleToggleClosed = useCallback(() => {
    toggleClosedPlaces();
  }, [toggleClosedPlaces]);

  const handleToggleStashed = useCallback(() => {
    toggleStashedPlaces();
  }, [toggleStashedPlaces]);

  if (!activeCity) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p style={{ color: 'var(--text-secondary)' }}>Detecting your city...</p>
      </div>
    );
  }

  const allNonStashed = activePlaces.length + closedPlaces.length;

  if (allNonStashed === 0 && stashedPlaces.length === 0) {
    return (
      <div className="px-4 py-5 max-w-[480px] mx-auto">
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <MapPin className="w-8 h-8" style={{ color: 'var(--accent)' }} />
          </div>
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            No places in {activeCity.name} yet
          </h2>
          <p
            className="text-sm leading-relaxed mb-6 max-w-[260px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Add your first restaurant, cafe, or bar to start tracking what&apos;s open.
          </p>
          <Link
            href={`/trip/${activeCity.id}/add`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-transform duration-100 active:scale-[0.97]"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <Plus className="w-4 h-4" />
            Add Places
          </Link>
        </div>
      </div>
    );
  }

  const openCount = activePlaces.filter(
    (p) =>
      p.statusInfo.status === 'open' || p.statusInfo.status === 'closing_soon'
  ).length;

  return (
    <div className="px-4 py-5 max-w-[480px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {openCount}
          </span>
          <span className="text-sm ml-1.5" style={{ color: 'var(--text-secondary)' }}>
            place{openCount !== 1 ? 's' : ''} open now
          </span>
        </div>
        <Link
          href={`/trip/${activeCity.id}/add`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
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
            className="flex items-center gap-2 w-full py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {showClosedPlaces ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span>Closed today ({closedPlaces.length})</span>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: showClosedPlaces ? '1fr' : '0fr' }}
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

      {stashedPlaces.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleToggleStashed}
            className="flex items-center gap-2 w-full py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {showStashedPlaces ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <Archive className="w-3.5 h-3.5" />
            <span>Stashed ({stashedPlaces.length})</span>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: showStashedPlaces ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 pt-2">
                {stashedPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} isStashedView />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
