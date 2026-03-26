import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { LandingActions } from '@/components/LandingActions';
import { getPublicCitySlugs } from '@/lib/db';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OpenNow',
  url: 'https://getopennow.com',
  description:
    'A pocket-sized shortlist for food travelers. Save the spots you want to try, see live hours at a glance, and always know where to go next.',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  screenshot: 'https://getopennow.com/hero-screenshot.png',
  featureList: [
    'Save restaurants and cafes to a personal shortlist',
    'See live opening hours at a glance',
    'Know what is open right now in any city',
    'Works on mobile and desktop',
  ],
};

export default async function LandingPage() {
  const popularCities = (await getPublicCitySlugs().catch(() => []))
    .sort((a, b) => b.placeCount - a.placeCount)
    .slice(0, 6);

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

        {popularCities.length > 0 && (
          <section className="w-full max-w-[420px] mt-8">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Popular cities
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city) => (
                <Link
                  key={city.citySlug}
                  href={`/open-now/${city.citySlug}`}
                  className="text-[12px] px-2.5 py-1.5 rounded-lg"
                  style={{
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color-subtle)',
                  }}
                >
                  {city.cityName}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
