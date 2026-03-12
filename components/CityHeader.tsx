'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MapPin, Compass, Sun, Moon, User, X } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

export function CityHeader() {
  const activeCity = useAppStore((s) => s.activeCity);
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const currentTime = useAppStore((s) => s.currentTime);
  const isPlanningMode = useAppStore((s) => s.isPlanningMode);
  const detectedCityName = useAppStore((s) => s.detectedCityName);
  const exitPlanningMode = useAppStore((s) => s.exitPlanningMode);
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

  const handleExitPlanning = () => {
    exitPlanningMode();
    router.push('/dashboard');
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 82%, transparent)',
        borderBottom: '1px solid var(--divider)',
      }}
    >
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="min-w-0">
          <h1
            className="text-[17px] font-bold truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {activeCity?.name ?? 'OpenNow'}
          </h1>
          <div
            className="flex items-center gap-1.5 text-[13px]"
            style={{ color: isPlanningMode ? 'var(--accent)' : 'var(--text-secondary)' }}
          >
            {isPlanningMode ? (
              <Compass className="w-3.5 h-3.5 shrink-0" />
            ) : (
              activeCity && <MapPin className="w-3.5 h-3.5 shrink-0" />
            )}
            {isPlanningMode ? (
              <button onClick={handleExitPlanning} className="flex items-center gap-1.5">
                <span>Browsing</span>
                <span className="mx-0.5 opacity-40">&middot;</span>
                <span className="underline underline-offset-2">
                  Back to {detectedCityName ?? 'my city'}
                </span>
              </button>
            ) : (
              <>
                <span>{day}</span>
                <span className="mx-0.5 opacity-40">&middot;</span>
                <span className="font-mono tabular-nums">{time}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isPlanningMode && (
            <button
              onClick={handleExitPlanning}
              className="p-2 rounded-xl transition-colors duration-150"
              style={{ backgroundColor: 'var(--bg-card)' }}
              aria-label="Exit planning mode"
            >
              <X className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-colors duration-150"
            style={{ backgroundColor: 'var(--bg-card)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            )}
          </button>
          {session?.user?.image ? (
            <button onClick={() => router.push('/dashboard/settings')}>
              <img
                src={session.user.image}
                alt=""
                className="w-8 h-8 rounded-full"
                style={{ boxShadow: '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)' }}
                referrerPolicy="no-referrer"
              />
            </button>
          ) : session?.user ? (
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)',
              }}
            >
              <User className="w-4 h-4 text-white" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
