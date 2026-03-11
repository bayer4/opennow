'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MapPin, Sun, Moon, User } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

export function TripHeader() {
  const { activeTrip, theme, toggleTheme, currentTime } = useAppStore();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = mounted ? dayNames[currentTime.getDay()] : '';
  const time = mounted
    ? currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : '';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-white/[0.06]">
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">
            {activeTrip?.name ?? 'OpenNow'}
          </h1>
          <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{activeTrip?.city ?? 'No trip selected'}</span>
            <span className="mx-1">&middot;</span>
            <span>{day}</span>
            <span className="mx-1">&middot;</span>
            <span className="font-mono">{time}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[var(--text-secondary)]" />
            ) : (
              <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
            )}
          </button>
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt=""
              className="w-8 h-8 rounded-full ring-2 ring-[var(--accent)]/30"
              referrerPolicy="no-referrer"
            />
          ) : session?.user ? (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-[var(--accent)]/30"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
