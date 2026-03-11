'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  ArrowLeft,
  Plus,
  MapPin,
  Trash2,
  Check,
  Loader2,
  Plane,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { Trip } from '@/types';
import { chicagoTrip } from '@/lib/seed-data';

export default function TripsPage() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const {
    trips,
    activeTrip,
    setTrips,
    setActiveTrip,
    addTrip,
    removeTripFromList,
  } = useAppStore();

  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [switching, setSwitching] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const didLoad = useRef(false);

  const loadTrips = useCallback(async () => {
    if (!session?.user) {
      // Guest mode — ensure active trip is set
      const guestTrip = activeTrip ?? chicagoTrip;
      if (!activeTrip) setActiveTrip(guestTrip);
      setTrips([guestTrip]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/trips');
      if (res.ok) {
        const data = await res.json();
        setTrips(data);

        // If no active trip loaded yet, set the first active one
        if (!activeTrip) {
          const active = data.find((t: { isActive: boolean }) => t.isActive);
          if (active) {
            const tripRes = await fetch(`/api/trips/${active.id}`);
            if (tripRes.ok) {
              setActiveTrip(await tripRes.json());
            }
          }
        }

        setLoading(false);
        return;
      }
    } catch {
      // DB not ready
    }
    const fallback = activeTrip ?? chicagoTrip;
    if (!activeTrip) setActiveTrip(fallback);
    setTrips([fallback]);
    setLoading(false);
  }, [session, activeTrip, setTrips, setActiveTrip]);

  useEffect(() => {
    if (sessionStatus === 'loading') return;
    if (didLoad.current) return;
    didLoad.current = true;
    loadTrips();
  }, [sessionStatus, loadTrips]);

  const handleCreate = async () => {
    if (!name.trim() || !city.trim()) return;
    setCreating(true);

    try {
      if (!session?.user) {
        const newTrip: Trip = {
          id: `trip-${Date.now()}`,
          userId: 'guest',
          name: name.trim(),
          city: city.trim(),
          isActive: true,
          places: [],
        };
        addTrip(newTrip);
        setActiveTrip(newTrip);
      } else {
        const res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), city: city.trim() }),
        });
        if (res.ok) {
          const trip = await res.json();
          addTrip({ ...trip, places: [] });
          setActiveTrip({ ...trip, places: [] });
        }
      }

      setName('');
      setCity('');
      setShowCreate(false);
      router.push('/dashboard');
    } finally {
      setCreating(false);
    }
  };

  const handleSwitch = async (trip: Trip) => {
    if (trip.id === activeTrip?.id) return;
    setSwitching(trip.id);

    try {
      if (!session?.user) {
        setActiveTrip(trip);
      } else {
        // Set the new trip as active
        const res = await fetch(`/api/trips/${trip.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive: true }),
        });
        if (res.ok) {
          // Reload the full trip with places
          const tripRes = await fetch(`/api/trips/${trip.id}`);
          if (tripRes.ok) {
            const fullTrip = await tripRes.json();
            setActiveTrip(fullTrip);
          }
        }
      }
      router.push('/dashboard');
    } finally {
      setSwitching(null);
    }
  };

  const handleDelete = async (tripId: string) => {
    setDeleting(tripId);
    try {
      if (session?.user) {
        await fetch(`/api/trips/${tripId}`, { method: 'DELETE' });
      }
      removeTripFromList(tripId);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div
      className="min-h-dvh"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <header
        className="sticky top-0 z-40 backdrop-blur-xl py-3 px-4 flex items-center justify-between"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)',
          borderBottom: '1px solid var(--border-color-subtle)',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-1.5 -ml-1.5 rounded-lg transition-colors duration-100"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1
            className="text-base font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            My Trips
          </h1>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-transform duration-100 active:scale-[0.97]"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          <Plus className="w-3.5 h-3.5" />
          New Trip
        </button>
      </header>

      {/* Create trip sheet */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: showCreate ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 py-4"
            style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
          >
            <p
              className="text-[11px] font-medium uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              New Trip
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Trip name (e.g. Tokyo June 2026)"
                className="w-full rounded-xl px-4 py-3 text-[14px] bg-transparent outline-none placeholder:opacity-40"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
                autoComplete="off"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Tokyo)"
                className="w-full rounded-xl px-4 py-3 text-[14px] bg-transparent outline-none placeholder:opacity-40"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
                autoComplete="off"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setName('');
                    setCity('');
                  }}
                  className="flex-1 rounded-xl px-4 py-3 text-[14px] font-medium transition-transform duration-100 active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!name.trim() || !city.trim() || creating}
                  className="flex-1 rounded-xl px-4 py-3 text-[14px] font-medium transition-transform duration-100 active:scale-[0.98] disabled:opacity-40"
                  style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
                >
                  {creating ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    'Create'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trips list */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2
              className="w-6 h-6 animate-spin"
              style={{ color: 'var(--text-secondary)' }}
            />
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              <Plane className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              No trips yet
            </p>
            <p
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              Create your first trip to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {trips.map((trip) => {
              const isActive = trip.id === activeTrip?.id;
              const isDeleting = deleting === trip.id;
              const isSwitching = switching === trip.id;

              return (
                <div
                  key={trip.id}
                  className="rounded-2xl p-4 transition-transform duration-100 active:scale-[0.99]"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: isActive
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border-color-subtle)',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => handleSwitch(trip)}
                      disabled={isActive || isSwitching}
                      className="flex-1 text-left min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        <p
                          className="text-[15px] font-semibold truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {trip.name}
                        </p>
                        {isActive && (
                          <span
                            className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: 'var(--accent)',
                              color: '#fff',
                            }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin
                          className="w-3 h-3 shrink-0"
                          style={{ color: 'var(--text-secondary)' }}
                        />
                        <span
                          className="text-[12px]"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {trip.city}
                        </span>
                        <span
                          className="text-[12px]"
                          style={{
                            color: 'var(--text-secondary)',
                            opacity: 0.5,
                          }}
                        >
                          &middot; {trip.places?.length ?? 0} places
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {!isActive && (
                        <button
                          onClick={() => handleSwitch(trip)}
                          disabled={isSwitching}
                          className="p-2 rounded-lg transition-colors duration-100"
                          style={{ color: 'var(--accent)' }}
                          title="Switch to this trip"
                        >
                          {isSwitching ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(trip.id)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg transition-colors duration-100"
                        style={{ color: 'var(--status-closed)' }}
                        title="Delete trip"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
