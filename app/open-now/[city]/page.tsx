import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock3, MapPin } from 'lucide-react';
import {
  getPublicCitySlugs,
  getPublicPlacesForCity,
  getPublicSharedListsForCity,
} from '@/lib/db';
import { getHoursPeriodsForDay, getMinutesRemaining, getPlaceStatus } from '@/lib/status-engine';
import { dateInTimezone, formatDurationClock, getDayOfWeek } from '@/lib/time-utils';
import type { PlaceStatus } from '@/types';

export const dynamic = 'force-dynamic';

const statusColors: Record<PlaceStatus, { bg: string; color: string }> = {
  open: { bg: 'var(--status-open-grid)', color: 'var(--status-open)' },
  closing_soon: { bg: 'var(--status-closing-grid)', color: 'var(--status-closing)' },
  opening_soon: { bg: 'var(--status-opening-grid)', color: 'var(--status-opening)' },
  closed: { bg: 'var(--status-closed-grid)', color: 'var(--status-closed)' },
  closed_today: { bg: 'var(--status-closed-grid)', color: 'var(--status-closed)' },
};

const STATUS_ORDER: Record<PlaceStatus, number> = {
  open: 0,
  closing_soon: 1,
  opening_soon: 2,
  closed: 3,
  closed_today: 3,
};

const SCHEMA_DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

async function resolvePublicCityBySlug(citySlug: string) {
  const cities = await getPublicCitySlugs().catch(() => []);
  return cities.find((city) => city.citySlug === citySlug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityEntry = await resolvePublicCityBySlug(city);
  if (!cityEntry) {
    return {
      title: 'City not found | OpenNow',
      robots: { index: false, follow: false },
    };
  }

  const cityData = await getPublicPlacesForCity(cityEntry.cityName);
  if (!cityData || cityData.places.length < 3) {
    return {
      title: 'City not found | OpenNow',
      robots: { index: false, follow: false },
    };
  }

  const title = `Restaurants Open Now in ${cityData.cityName} | OpenNow`;
  const description = `See what's open right now in ${cityData.cityName}. Live hours for ${cityData.places.length} places - updated every visit.`;
  const canonicalPath = `/open-now/${city}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function OpenNowCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityEntry = await resolvePublicCityBySlug(city);
  if (!cityEntry) notFound();

  const cityData = await getPublicPlacesForCity(cityEntry.cityName);
  if (!cityData || cityData.places.length < 3) notFound();

  const effectiveNow = dateInTimezone(new Date(), cityData.timezone);
  const today = getDayOfWeek(effectiveNow);

  const rows = cityData.places
    .map((place) => {
      const status = getPlaceStatus(place.hours, effectiveNow);
      const minutesLeft = getMinutesRemaining(place.hours, effectiveNow);
      const todayPeriods = getHoursPeriodsForDay(place.hours, today);
      const destinationName = encodeURIComponent(place.name);
      const fullQuery = encodeURIComponent(
        place.address ? `${place.name}, ${place.address}` : place.name,
      );
      const mapsUrl = place.googlePlaceId
        ? `https://www.google.com/maps/dir/?api=1&destination=${destinationName}&destination_place_id=${encodeURIComponent(place.googlePlaceId)}`
        : `https://www.google.com/maps/search/?api=1&query=${fullQuery}`;
      return { place, status, minutesLeft, todayPeriods, mapsUrl };
    })
    .sort((a, b) => {
      const orderDelta = STATUS_ORDER[a.status.status] - STATUS_ORDER[b.status.status];
      if (orderDelta !== 0) return orderDelta;
      return b.status.urgency - a.status.urgency;
    });

  const sharedLists = await getPublicSharedListsForCity(cityData.cityName).catch(() => []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Restaurants Open Now in ${cityData.cityName}`,
    numberOfItems: rows.length,
    itemListElement: rows.map(({ place }, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Restaurant',
        name: place.name,
        address: place.address ?? undefined,
        openingHoursSpecification: place.hours
          .filter((hours) => !hours.isClosed && hours.openTime && hours.closeTime)
          .map((hours) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: SCHEMA_DAY_NAMES[hours.dayOfWeek],
            opens: hours.openTime ?? undefined,
            closes: hours.closeTime ?? undefined,
          })),
        geo:
          place.latitude != null && place.longitude != null
            ? {
                '@type': 'GeoCoordinates',
                latitude: place.latitude,
                longitude: place.longitude,
              }
            : undefined,
      },
    })),
  };

  return (
    <div className="min-h-dvh py-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-4 max-w-4xl mx-auto mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Clock3 className="w-4 h-4" style={{ color: 'var(--accent)' }} />
          <p
            className="text-[12px] uppercase tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            Live city feed
          </p>
        </div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Restaurants Open Now in {cityData.cityName}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {rows.length} places &middot; updated every visit
        </p>
      </div>

      <div className="px-4 max-w-4xl mx-auto">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: '1px solid var(--border-color-subtle)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          {rows.map(({ place, status, minutesLeft, todayPeriods, mapsUrl }, idx) => {
            const { bg, color } = statusColors[status.status];
            const isClosed = todayPeriods.length === 1 && todayPeriods[0] === 'Closed';
            return (
              <div
                key={place.id}
                className="px-4 py-3"
                style={{
                  borderBottom:
                    idx === rows.length - 1 ? 'none' : '1px solid var(--border-color-subtle)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-semibold truncate block hover:underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {place.name}
                    </a>
                    <p
                      className="text-[12px] truncate"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {place.cuisine ?? place.address ?? 'No category'}
                    </p>
                  </div>
                  <span
                    className="text-[11px] px-2 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: bg, color, fontWeight: 700 }}
                  >
                    {status.status === 'opening_soon'
                      ? 'Opening soon'
                      : status.status === 'closed' || status.status === 'closed_today'
                        ? 'Closed'
                        : status.status === 'closing_soon'
                          ? 'Closing soon'
                          : 'Open'}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 text-[12px]">
                  <div style={{ color: isClosed ? 'var(--status-closed)' : 'var(--text-secondary)' }}>
                    Today: {todayPeriods.join(', ')}
                  </div>
                  <div className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                    {minutesLeft != null ? formatDurationClock(minutesLeft) : '-'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {sharedLists.length > 0 && (
        <div className="px-4 max-w-4xl mx-auto mt-7">
          <h2
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            Shared lists in {cityData.cityName}
          </h2>
          <div className="flex flex-wrap gap-2">
            {sharedLists.slice(0, 10).map((list) => (
              <Link
                key={list.shareSlug}
                href={`/list/${list.shareSlug}`}
                className="text-xs px-2.5 py-1.5 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                /list/{list.shareSlug}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 max-w-4xl mx-auto mt-8">
        <section
          className="rounded-2xl p-5 text-center"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color-subtle)',
          }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <MapPin className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Make your own list
            </h3>
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Save your spots and always know what&apos;s open right now.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Get OpenNow
          </Link>
        </section>
      </div>
    </div>
  );
}
