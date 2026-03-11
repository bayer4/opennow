'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { TripHeader } from '@/components/TripHeader';
import { BottomNav } from '@/components/BottomNav';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useAppStore } from '@/store/app-store';
import { chicagoTrip } from '@/lib/seed-data';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const setActiveTrip = useAppStore((s) => s.setActiveTrip);
  const setTrips = useAppStore((s) => s.setTrips);
  const setLoading = useAppStore((s) => s.setLoading);
  const setGuest = useAppStore((s) => s.setGuest);
  const tick = useAppStore((s) => s.tick);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      setGuest(true);
      setActiveTrip(chicagoTrip);
      setTrips([chicagoTrip]);
      return;
    }

    setGuest(false);
    const userId = (session.user as Record<string, unknown>).id as string;

    async function loadTrips() {
      setLoading(true);
      try {
        const res = await fetch('/api/trips');
        if (res.ok) {
          const trips = await res.json();
          setTrips(trips);

          const active = trips.find((t: { isActive: boolean }) => t.isActive);
          if (active) {
            const tripRes = await fetch(`/api/trips/${active.id}`);
            if (tripRes.ok) {
              const trip = await tripRes.json();
              setActiveTrip(trip);
              return;
            }
          }
        }
      } catch {
        // DB not ready
      }
      setActiveTrip({ ...chicagoTrip, userId });
      setTrips([{ ...chicagoTrip, userId }]);
    }

    loadTrips();
  }, [session, status, setActiveTrip, setTrips, setLoading, setGuest]);

  useEffect(() => {
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <ThemeProvider>
      <div className="min-h-dvh flex flex-col bg-[var(--bg-primary)]">
        <TripHeader />
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}
