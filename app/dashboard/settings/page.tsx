'use client';

import { useState, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  User,
  LogOut,
  Moon,
  Sun,
  Trash2,
  MapPin,
  Home,
  Compass,
  Loader2,
  Check,
  X,
} from 'lucide-react';
import { useAppStore, loadGuestCityByName } from '@/store/app-store';
import { City } from '@/types';
import { forwardGeocode } from '@/lib/geo';

function SettingsRow({
  icon: Icon,
  label,
  value,
  iconColor,
  labelColor,
  onClick,
  trailing,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  iconColor?: string;
  labelColor?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors duration-100"
      style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = 'transparent')
      }
    >
      <Icon
        className="w-5 h-5 shrink-0"
        style={{ color: iconColor ?? 'var(--accent)' }}
      />
      <span
        className="flex-1 text-left text-[14px]"
        style={{ color: labelColor ?? 'var(--text-primary)' }}
      >
        {label}
      </span>
      {value && (
        <span
          className="text-[13px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {value}
        </span>
      )}
      {trailing}
    </button>
  );
}

function makeEmptyCity(
  name: string,
  lat: number,
  lng: number,
  userId = 'guest',
): City {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    userId,
    name,
    latitude: lat,
    longitude: lng,
    places: [],
  };
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const {
    theme,
    toggleTheme,
    activeCity,
    homeBase,
    setHomeBase,
    isPlanningMode,
    isGuest,
    browseCity,
    exitPlanningMode,
    detectedCityName,
  } = useAppStore();
  const router = useRouter();

  const isGuestUser = !session?.user;

  // Home base editing
  const [editingHome, setEditingHome] = useState(false);
  const [homeInput, setHomeInput] = useState(homeBase ?? '');

  const saveHome = useCallback(() => {
    const trimmed = homeInput.trim();
    if (trimmed) {
      setHomeBase(trimmed);
    }
    setEditingHome(false);
  }, [homeInput, setHomeBase]);

  // Browse other cities
  const [browseOpen, setBrowseOpen] = useState(false);
  const [browseInput, setBrowseInput] = useState('');
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browseError, setBrowseError] = useState('');

  const handleBrowse = useCallback(async () => {
    const cityName = browseInput.trim();
    if (!cityName) return;

    setBrowseLoading(true);
    setBrowseError('');

    try {
      if (!isGuestUser) {
        const pos = await forwardGeocode(cityName);
        const params = new URLSearchParams({ name: cityName });
        if (pos) {
          params.set('lat', String(pos.latitude));
          params.set('lng', String(pos.longitude));
        }
        const res = await fetch(`/api/cities?${params}`);
        if (res.ok) {
          const data = await res.json();
          if (data.city) {
            browseCity(data.city);
            router.push('/dashboard');
            return;
          }
        }
        // API didn't return a city — create locally as fallback
        const lat = pos?.latitude ?? 0;
        const lng = pos?.longitude ?? 0;
        const userId = (session!.user as Record<string, unknown>).id as string;
        browseCity(makeEmptyCity(cityName, lat, lng, userId));
        router.push('/dashboard');
      } else {
        // Guest: check localStorage or create new
        const existing = loadGuestCityByName(cityName);
        if (existing) {
          browseCity(existing);
          router.push('/dashboard');
          return;
        }
        const pos = await forwardGeocode(cityName);
        browseCity(
          makeEmptyCity(cityName, pos?.latitude ?? 0, pos?.longitude ?? 0),
        );
        router.push('/dashboard');
      }
    } catch {
      setBrowseError('Could not find that city. Try again.');
    } finally {
      setBrowseLoading(false);
    }
  }, [browseInput, isGuestUser, session, browseCity, router]);

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Planning mode banner */}
      {isPlanningMode && (
        <button
          onClick={() => {
            exitPlanningMode();
            router.push('/dashboard');
          }}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl mb-4 transition-colors"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#fff',
          }}
        >
          <Compass className="w-4 h-4" />
          <span className="flex-1 text-left text-[13px] font-medium">
            Browsing {activeCity?.name} &mdash; tap to return
            {detectedCityName ? ` to ${detectedCityName}` : ''}
          </span>
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Profile */}
      <section
        className="rounded-2xl p-4 mb-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color-subtle)',
        }}
      >
        <div className="flex items-center gap-3">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt=""
              className="w-11 h-11 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.8 }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p
              className="text-[15px] font-semibold truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {session?.user?.name ?? 'Guest User'}
            </p>
            <p
              className="text-[12px] truncate"
              style={{ color: 'var(--text-secondary)' }}
            >
              {session?.user?.email ?? 'Data stored locally on device'}
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <p
        className="text-[11px] font-medium uppercase tracking-widest mb-2 px-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        Location
      </p>
      <section
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color-subtle)',
        }}
      >
        <SettingsRow
          icon={MapPin}
          label="Current City"
          value={activeCity?.name ?? 'Not detected'}
        />

        {/* Home base */}
        {editingHome ? (
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
          >
            <Home
              className="w-5 h-5 shrink-0"
              style={{ color: 'var(--accent)' }}
            />
            <input
              autoFocus
              value={homeInput}
              onChange={(e) => setHomeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveHome();
                if (e.key === 'Escape') setEditingHome(false);
              }}
              className="flex-1 bg-transparent outline-none text-[14px]"
              style={{
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--accent)',
                paddingBottom: 2,
              }}
              placeholder="City name"
            />
            <button
              onClick={saveHome}
              className="p-1 rounded"
              style={{ color: 'var(--status-open)' }}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setEditingHome(false)}
              className="p-1 rounded"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <SettingsRow
            icon={Home}
            label="Home base"
            value={homeBase ?? 'Not set'}
            onClick={() => {
              setHomeInput(homeBase ?? activeCity?.name ?? '');
              setEditingHome(true);
            }}
          />
        )}

        {/* Browse other cities */}
        {browseOpen ? (
          <div
            className="px-4 py-3"
            style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
          >
            <div className="flex items-center gap-2">
              <Compass
                className="w-5 h-5 shrink-0"
                style={{ color: 'var(--accent)' }}
              />
              <input
                autoFocus
                value={browseInput}
                onChange={(e) => {
                  setBrowseInput(e.target.value);
                  setBrowseError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleBrowse();
                  if (e.key === 'Escape') setBrowseOpen(false);
                }}
                className="flex-1 bg-transparent outline-none text-[14px]"
                style={{
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--accent)',
                  paddingBottom: 2,
                }}
                placeholder="Type a city name..."
              />
              {browseLoading ? (
                <Loader2
                  className="w-4 h-4 animate-spin shrink-0"
                  style={{ color: 'var(--accent)' }}
                />
              ) : (
                <>
                  <button
                    onClick={handleBrowse}
                    disabled={!browseInput.trim()}
                    className="px-3 py-1 rounded-full text-xs font-medium shrink-0"
                    style={{
                      backgroundColor: browseInput.trim()
                        ? 'var(--accent)'
                        : 'var(--bg-secondary, var(--bg-card))',
                      color: browseInput.trim()
                        ? '#fff'
                        : 'var(--text-secondary)',
                    }}
                  >
                    Go
                  </button>
                  <button
                    onClick={() => setBrowseOpen(false)}
                    className="p-1 shrink-0"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {browseError && (
              <p className="text-[12px] mt-1.5 ml-7" style={{ color: 'var(--status-closing)' }}>
                {browseError}
              </p>
            )}
          </div>
        ) : (
          <SettingsRow
            icon={Compass}
            label="Browse other cities"
            onClick={() => setBrowseOpen(true)}
          />
        )}
      </section>

      {/* Preferences */}
      <p
        className="text-[11px] font-medium uppercase tracking-widest mb-2 px-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        Preferences
      </p>
      <section
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color-subtle)',
        }}
      >
        <SettingsRow
          icon={theme === 'dark' ? Moon : Sun}
          label="Appearance"
          value={theme === 'dark' ? 'Dark' : 'Light'}
          onClick={toggleTheme}
        />
      </section>

      {/* Account */}
      <p
        className="text-[11px] font-medium uppercase tracking-widest mb-2 px-1"
        style={{ color: 'var(--text-secondary)' }}
      >
        Account
      </p>
      <section
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color-subtle)',
        }}
      >
        {!isGuestUser ? (
          <SettingsRow
            icon={LogOut}
            label="Sign Out"
            iconColor="var(--status-closing)"
            labelColor="var(--status-closing)"
            onClick={() => signOut({ callbackUrl: '/' })}
          />
        ) : (
          <SettingsRow
            icon={User}
            label="Sign in with Google"
            onClick={() => router.push('/')}
          />
        )}
        <SettingsRow
          icon={Trash2}
          label="Clear All Data"
          iconColor="var(--status-closed)"
          labelColor="var(--status-closed)"
        />
      </section>

      <p
        className="text-[11px] text-center mt-8"
        style={{ color: 'var(--text-secondary)', opacity: 0.4 }}
      >
        OpenNow v0.2.0
      </p>
    </div>
  );
}
