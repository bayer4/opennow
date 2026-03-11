'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, LogOut, Moon, Sun, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useAppStore();
  const router = useRouter();

  const isGuest = !session?.user;

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Profile section */}
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
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors duration-100"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'transparent')
          }
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          ) : (
            <Sun className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          )}
          <span
            className="flex-1 text-left text-[14px]"
            style={{ color: 'var(--text-primary)' }}
          >
            Appearance
          </span>
          <span
            className="text-[13px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>
      </section>

      {/* Account actions */}
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
        {!isGuest && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors duration-100"
            style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <LogOut className="w-5 h-5" style={{ color: 'var(--status-closing)' }} />
            <span
              className="flex-1 text-left text-[14px]"
              style={{ color: 'var(--status-closing)' }}
            >
              Sign Out
            </span>
          </button>
        )}

        {isGuest && (
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors duration-100"
            style={{ borderBottom: '1px solid var(--border-color-subtle)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <User className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <span
              className="flex-1 text-left text-[14px]"
              style={{ color: 'var(--text-primary)' }}
            >
              Sign in with Google
            </span>
          </button>
        )}

        <button
          className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors duration-100"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'transparent')
          }
        >
          <Trash2
            className="w-5 h-5"
            style={{ color: 'var(--status-closed)' }}
          />
          <span
            className="flex-1 text-left text-[14px]"
            style={{ color: 'var(--status-closed)' }}
          >
            Clear All Data
          </span>
        </button>
      </section>

      <p
        className="text-[11px] text-center mt-8"
        style={{ color: 'var(--text-secondary)', opacity: 0.4 }}
      >
        OpenNow v0.1.0
      </p>
    </div>
  );
}
