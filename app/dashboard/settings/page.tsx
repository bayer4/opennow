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
  ChevronRight,
  X,
} from 'lucide-react';
import { useAppStore, loadGuestCityByName } from '@/store/app-store';
import { CitySearchModal, CityResult } from '@/components/CitySearchModal';
import { City } from '@/types';

function SettingsRow({
  icon: Icon,
  label,
  value,
  iconColor,
  labelColor,
  onClick,
  trailing,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  iconColor?: string;
  labelColor?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
  disabled?: boolean;
}) {
  const Tag = disabled ? 'div' : 'button';
  return (
    <Tag
      onClick={disabled ? undefined : onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors duration-100 ${disabled ? 'cursor-default' : ''}`}
      style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
      {...(!disabled && {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
          (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'),
        onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
          (e.currentTarget.style.backgroundColor = 'transparent'),
      })}
    >
      <Icon
        className="w-5 h-5 shrink-0"
        style={{ color: iconColor ?? (disabled ? 'var(--text-secondary)' : 'var(--accent)') }}
      />
      <span
        className="flex-1 text-left text-[14px]"
        style={{ color: labelColor ?? (disabled ? 'var(--text-secondary)' : 'var(--text-primary)') }}
      >
        {label}
      </span>
      {value && (
        <span
          className="text-[13px]"
          style={{ color: 'var(--text-secondary)', opacity: disabled ? 0.6 : 1 }}
        >
          {value}
        </span>
      )}
      {trailing}
      {!disabled && onClick && (
        <ChevronRight
          className="w-4 h-4 shrink-0"
          style={{ color: 'var(--text-secondary)', opacity: 0.4 }}
        />
      )}
    </Tag>
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

  const [homeModalOpen, setHomeModalOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);

  const handleHomeSelect = useCallback(
    (city: CityResult) => {
      setHomeBase(city.name);
      setHomeModalOpen(false);
    },
    [setHomeBase],
  );

  const handleCitySelect = useCallback(
    async (city: CityResult) => {
      setCityModalOpen(false);

      // If the selected city matches the current active city, do nothing
      if (activeCity && activeCity.name.toLowerCase() === city.name.toLowerCase()) {
        return;
      }

      if (!isGuestUser) {
        try {
          const params = new URLSearchParams({ name: city.name });
          if (city.latitude) params.set('lat', String(city.latitude));
          if (city.longitude) params.set('lng', String(city.longitude));
          const res = await fetch(`/api/cities?${params}`);
          if (res.ok) {
            const data = await res.json();
            if (data.city) {
              browseCity(data.city);
              router.push('/dashboard');
              return;
            }
          }
        } catch {}
        const userId = (session!.user as Record<string, unknown>).id as string;
        browseCity(
          makeEmptyCity(city.name, city.latitude, city.longitude, userId),
        );
      } else {
        const existing = loadGuestCityByName(city.name);
        if (existing) {
          browseCity(existing);
        } else {
          browseCity(
            makeEmptyCity(city.name, city.latitude, city.longitude),
          );
        }
      }

      router.push('/dashboard');
    },
    [activeCity, isGuestUser, session, browseCity, router],
  );

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
          label="Current city"
          value={activeCity?.name ?? 'Not detected'}
          onClick={() => setCityModalOpen(true)}
        />
        <SettingsRow
          icon={Home}
          label="Home base"
          value={homeBase ?? 'Not set'}
          onClick={() => setHomeModalOpen(true)}
        />
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

      {/* City search modals */}
      <CitySearchModal
        open={cityModalOpen}
        title="Switch City"
        onSelect={handleCitySelect}
        onClose={() => setCityModalOpen(false)}
      />
      <CitySearchModal
        open={homeModalOpen}
        title="Set Home Base"
        onSelect={handleHomeSelect}
        onClose={() => setHomeModalOpen(false)}
      />
    </div>
  );
}
