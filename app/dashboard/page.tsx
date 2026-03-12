'use client';

import { useMemo, useCallback, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ChevronDown, ChevronUp, Plus, Archive, Check } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { enrichPlaceWithStatus, sortPlacesForToday } from '@/lib/status-engine';
import { PlaceCard } from '@/components/PlaceCard';
import { PlaceSearch } from '@/components/PlaceSearch';
import { PlaceWithStatus, PlaceSearchResult, PlaceDetails, Place } from '@/types';

export default function TodayPage() {
  const { data: session } = useSession();
  const activeCity = useAppStore((s) => s.activeCity);
  const currentTime = useAppStore((s) => s.currentTime);
  const addPlace = useAppStore((s) => s.addPlace);
  const isGuest = useAppStore((s) => s.isGuest);
  const showClosedPlaces = useAppStore((s) => s.showClosedPlaces);
  const showStashedPlaces = useAppStore((s) => s.showStashedPlaces);
  const toggleClosedPlaces = useAppStore((s) => s.toggleClosedPlaces);
  const toggleStashedPlaces = useAppStore((s) => s.toggleStashedPlaces);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [sessionAddedIds, setSessionAddedIds] = useState<Set<string>>(new Set());

  const existingPlaceIds = useMemo(() => {
    const ids = new Set<string>();
    activeCity?.places.forEach((p) => {
      if (p.googlePlaceId) ids.add(p.googlePlaceId);
      ids.add(p.id);
    });
    return ids;
  }, [activeCity?.places]);

  const addedIds = useMemo(
    () => new Set([...existingPlaceIds, ...sessionAddedIds]),
    [existingPlaceIds, sessionAddedIds],
  );

  const handleInlineAdd = useCallback(
    async (result: PlaceSearchResult) => {
      if (!activeCity || addedIds.has(result.placeId)) return;
      setAddingId(result.placeId);
      try {
        const res = await fetch(
          `/api/places/details?placeId=${encodeURIComponent(result.placeId)}`,
        );
        let place: Place;
        if (res.ok) {
          const details: PlaceDetails = await res.json();
          place = {
            id: details.placeId,
            cityId: activeCity.id,
            googlePlaceId: details.placeId,
            name: details.name,
            address: details.address,
            latitude: details.latitude,
            longitude: details.longitude,
            category: details.category,
            cuisine: details.cuisine,
            rating: details.rating ?? undefined,
            priceLevel: details.priceLevel ?? undefined,
            photoReference: details.photoReference ?? undefined,
            isStashed: false,
            isVisited: false,
            sortOrder: activeCity.places.length,
            hours: details.hours,
          };
        } else {
          place = {
            id: result.placeId,
            cityId: activeCity.id,
            googlePlaceId: result.placeId,
            name: result.name,
            address: result.address,
            isStashed: false,
            isVisited: false,
            sortOrder: activeCity.places.length,
            hours: [],
          };
        }
        if (session?.user && !isGuest) {
          try {
            const dbRes = await fetch(`/api/trips/${activeCity.id}/places`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(place),
            });
            if (dbRes.ok) {
              const saved = await dbRes.json();
              place = { ...place, id: saved.id };
            }
          } catch {}
        }
        addPlace(place);
        setSessionAddedIds((prev) => new Set(prev).add(result.placeId));
      } finally {
        setAddingId(null);
      }
    },
    [activeCity, addPlace, addedIds, session, isGuest],
  );

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

  const locationBias =
    activeCity.latitude && activeCity.longitude
      ? { lat: activeCity.latitude, lng: activeCity.longitude }
      : undefined;

  if (allNonStashed === 0 && stashedPlaces.length === 0) {
    return (
      <div className="px-4 py-5 max-w-[480px] mx-auto">
        <p
          className="text-sm mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          Search for places to track in {activeCity.name}
        </p>
        <PlaceSearch
          locationBias={locationBias}
          cityName={activeCity.name}
          addedIds={addedIds}
          existingIds={existingPlaceIds}
          addingId={addingId}
          onAdd={handleInlineAdd}
          placeholder="Search restaurants, cafes, bars..."
          autoFocus
        />
        {sessionAddedIds.size > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--status-open-bg)' }}
            >
              <Check className="w-3 h-3" style={{ color: 'var(--status-open)' }} />
            </div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Added {sessionAddedIds.size} place{sessionAddedIds.size !== 1 ? 's' : ''}
            </span>
          </div>
        )}
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
