'use client';

import { useEffect } from 'react';
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
  const setActiveTrip = useAppStore((s) => s.setActiveTrip);
  const tick = useAppStore((s) => s.tick);

  useEffect(() => {
    setActiveTrip(chicagoTrip);
  }, [setActiveTrip]);

  // Tick every 60 seconds to keep times fresh
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
