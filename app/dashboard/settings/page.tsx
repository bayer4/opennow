'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  User,
  LogOut,
  Moon,
  Sun,
  Trash2,
  MapPin,
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';

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
        <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
          {value}
        </span>
      )}
      {trailing}
    </button>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, toggleTheme, activeCity } = useAppStore();
  const router = useRouter();

  const isGuest = !session?.user;

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
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

      {/* City */}
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
        {!isGuest ? (
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
