import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { LandingActions } from '@/components/LandingActions';

export default function LandingPage() {
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
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-12 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>

        <LandingActions />
      </div>
    </div>
  );
}
