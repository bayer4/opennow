'use client';

import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.replace('/dashboard');
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{
            borderColor: 'var(--border-color)',
            borderTopColor: 'var(--accent)',
          }}
        />
      </div>
    );
  }

  if (session) return null;

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-10">
        {/* Tagline */}
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            OpenNow
          </h1>
        </div>
        <p
          className="text-center text-[15px] leading-relaxed max-w-[280px] mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          All your places. One glance. Live hours.
        </p>

        {/* Phone mockup */}
        <div className="relative mb-10 flex-shrink-0">
          <div
            className="relative rounded-[2rem] shadow-2xl"
            style={{
              backgroundColor: '#1a1a1a',
              border: '3px solid #2a2a2a',
              width: 240,
              padding: 6,
            }}
          >
            <div className="relative rounded-[1.4rem] overflow-hidden">
              <Image
                src="/hero-screenshot.png"
                alt="OpenNow app showing live restaurant hours in Chicago"
                width={460}
                height={996}
                priority
                className="w-full h-auto block"
              />
            </div>
          </div>
          {/* Subtle glow beneath the phone */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-12 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>

        {/* Auth buttons */}
        <div className="w-full max-w-[300px] flex flex-col gap-3 mt-auto">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-transform duration-100 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#fff',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => {
              try { localStorage.setItem('opennow-guest-chosen', '1'); } catch {}
              router.push('/dashboard');
            }}
            className="w-full rounded-xl px-4 py-3.5 text-[15px] font-medium transition-transform duration-100 active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            Continue as Guest
          </button>

          <p
            className="text-[11px] text-center mt-1"
            style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
          >
            Guest data stays on this device only
          </p>
        </div>
      </div>
    </div>
  );
}
