'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Check } from 'lucide-react';
import { PlaceSearch } from '@/components/PlaceSearch';
import { useAppStore } from '@/store/app-store';
import { PlaceSearchResult, PlaceDetails, Place } from '@/types';

export default function AddPlacePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const activeCity = useAppStore((s) => s.activeCity);
  const addPlace = useAppStore((s) => s.addPlace);
  const isGuest = useAppStore((s) => s.isGuest);
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

  const handleAdd = useCallback(
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

  const locationBias =
    activeCity?.latitude && activeCity?.longitude
      ? { lat: activeCity.latitude, lng: activeCity.longitude }
      : undefined;

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <header
        className="sticky top-0 z-40 backdrop-blur-xl py-3 px-4 flex items-center gap-3"
        style={{
          backgroundColor:
            'color-mix(in srgb, var(--bg-primary) 80%, transparent)',
          borderBottom: '1px solid var(--divider)',
        }}
      >
        <button
          onClick={() => router.push('/dashboard')}
          className="p-1.5 -ml-1.5 rounded-lg transition-colors duration-100"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1
            className="text-[17px] font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Add Places
          </h1>
          {activeCity && (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {activeCity.name}
            </p>
          )}
        </div>
      </header>

      <div className="flex-1 px-4 py-4">
        <PlaceSearch
          locationBias={locationBias}
          cityName={activeCity?.name}
          addedIds={addedIds}
          existingIds={existingPlaceIds}
          addingId={addingId}
          onAdd={handleAdd}
          autoFocus
        />
      </div>

      {sessionAddedIds.size > 0 && (
        <div
          className="sticky bottom-0 z-40 px-4 py-3 flex items-center justify-between backdrop-blur-xl"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
            borderTop: '1px solid var(--divider)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--status-open-bg)' }}
            >
              <Check
                className="w-3.5 h-3.5"
                style={{ color: 'var(--status-open)' }}
              />
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Added {sessionAddedIds.size} place{sessionAddedIds.size !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-transform duration-100 active:scale-[0.97]"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
