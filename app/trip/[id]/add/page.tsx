'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Check, MapPin, Loader2 } from 'lucide-react';
import { PlaceSearch } from '@/components/PlaceSearch';
import { useAppStore } from '@/store/app-store';
import { PlaceSearchResult, PlaceDetails, Place } from '@/types';

export default function AddPlacePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const activeTrip = useAppStore((s) => s.activeTrip);
  const addPlace = useAppStore((s) => s.addPlace);
  const isGuest = useAppStore((s) => s.isGuest);
  const [adding, setAdding] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleSelect = useCallback(
    async (result: PlaceSearchResult) => {
      if (!activeTrip || added.has(result.placeId)) return;
      setAdding(result.placeId);

      try {
        const res = await fetch(
          `/api/places/details?placeId=${encodeURIComponent(result.placeId)}`
        );

        let place: Place;
        if (res.ok) {
          const details: PlaceDetails = await res.json();
          place = {
            id: details.placeId,
            tripId: activeTrip.id,
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
            isPriority: false,
            isVisited: false,
            sortOrder: activeTrip.places.length,
            hours: details.hours,
          };
        } else {
          place = {
            id: result.placeId,
            tripId: activeTrip.id,
            googlePlaceId: result.placeId,
            name: result.name,
            address: result.address,
            isPriority: false,
            isVisited: false,
            sortOrder: activeTrip.places.length,
            hours: [],
          };
        }

        // Persist to DB if authenticated
        if (session?.user && !isGuest) {
          try {
            const dbRes = await fetch(`/api/trips/${activeTrip.id}/places`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(place),
            });
            if (dbRes.ok) {
              const saved = await dbRes.json();
              place = { ...place, id: saved.id };
            }
          } catch {
            // DB save failed — place is still added to local state
          }
        }

        addPlace(place);
        setAdded((prev) => new Set(prev).add(result.placeId));
      } finally {
        setAdding(null);
      }
    },
    [activeTrip, addPlace, added, session, isGuest]
  );

  const locationBias =
    activeTrip?.latitude && activeTrip?.longitude
      ? { lat: activeTrip.latitude, lng: activeTrip.longitude }
      : undefined;

  return (
    <div
      className="min-h-dvh"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <header
        className="sticky top-0 z-40 backdrop-blur-xl py-3 px-4 flex items-center gap-3"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)',
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
        <div>
          <h1
            className="text-[17px] font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Add Places
          </h1>
          {activeTrip && (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {activeTrip.name}
            </p>
          )}
        </div>
      </header>

      <div className="px-4 py-5">
        <PlaceSearch locationBias={locationBias} onSelect={handleSelect} />

        {added.size > 0 && (
          <div className="mt-4">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Added this session
            </p>
            <div className="flex flex-col gap-2">
              {activeTrip?.places
                .filter(
                  (p) => p.googlePlaceId && added.has(p.googlePlaceId)
                )
                .map((place) => (
                  <div
                    key={place.id}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color-subtle)',
                    }}
                  >
                    <Check
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--status-open)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-medium truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {place.name}
                      </p>
                      {place.address && (
                        <p
                          className="text-[11px] truncate"
                          style={{
                            color: 'var(--text-secondary)',
                            opacity: 0.6,
                          }}
                        >
                          {place.address}
                        </p>
                      )}
                    </div>
                    {place.hours.length > 0 ? (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--status-open-bg)',
                          color: 'var(--status-open)',
                        }}
                      >
                        Hours loaded
                      </span>
                    ) : (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'var(--status-closing-bg)',
                          color: 'var(--status-closing)',
                        }}
                      >
                        No hours
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {added.size === 0 && (
          <div className="mt-12 text-center px-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <MapPin className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Search for places to add
            </p>
            <p
              className="text-xs leading-relaxed max-w-[260px] mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Type a restaurant, cafe, or bar name. Hours are auto-fetched from Google Places.
            </p>
            {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
              <p
                className="text-[11px] mt-4 px-3 py-2 rounded-lg inline-block"
                style={{
                  backgroundColor: 'var(--status-closing-bg)',
                  color: 'var(--status-closing)',
                }}
              >
                Set GOOGLE_PLACES_API_KEY in .env.local to enable search
              </p>
            )}
          </div>
        )}
      </div>

      {adding && (
        <div
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Loader2
            className="w-4 h-4 animate-spin"
            style={{ color: 'var(--accent)' }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Fetching details...
          </span>
        </div>
      )}
    </div>
  );
}
