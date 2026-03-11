'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MapPin, Sun, Moon, User, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

export function TripHeader() {
  const { activeTrip, theme, toggleTheme, currentTime } = useAppStore();
  const { data: session } = useSession();
  const router = useRouter();
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
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 82%, transparent)',
        borderBottom: '1px solid var(--divider)',
      }}
    >
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.push('/trips')}
          className="text-left group min-w-0"
        >
          <div className="flex items-center gap-1.5">
            <h1
              className="text-[17px] font-bold truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {activeTrip?.name ?? 'OpenNow'}
            </h1>
            <ChevronDown
              className="w-4 h-4 shrink-0 transition-opacity duration-150"
              style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
            />
          </div>
          <div
            className="flex items-center gap-1.5 text-[13px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{activeTrip?.city ?? 'No trip selected'}</span>
            <span className="mx-0.5 opacity-40">&middot;</span>
            <span>{day}</span>
            <span className="mx-0.5 opacity-40">&middot;</span>
            <span className="font-mono tabular-nums">{time}</span>
          </div>
        </button>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-colors duration-150"
            style={{
              backgroundColor: 'var(--bg-card)',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            )}
          </button>
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt=""
              className="w-8 h-8 rounded-full"
              style={{ boxShadow: '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)' }}
              referrerPolicy="no-referrer"
            />
          ) : session?.user ? (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)',
              }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
