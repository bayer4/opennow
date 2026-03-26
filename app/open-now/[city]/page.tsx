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

const DAY_COLUMNS = [1, 2, 3, 4, 5, 6, 0] as const;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
  const todayIdx = DAY_COLUMNS.indexOf(today as (typeof DAY_COLUMNS)[number]);

  const rows = cityData.places
    .map((place) => {
      const status = getPlaceStatus(place.hours, effectiveNow);
      const minutesLeft = getMinutesRemaining(place.hours, effectiveNow);
      const dayCells = DAY_COLUMNS.map((dayOfWeek) => ({
        dayOfWeek,
        periods: getHoursPeriodsForDay(place.hours, dayOfWeek),
        isToday: dayOfWeek === today,
      }));
      const destinationName = encodeURIComponent(place.name);
      const fullQuery = encodeURIComponent(
        place.address ? `${place.name}, ${place.address}` : place.name,
      );
      const mapsUrl = place.googlePlaceId
        ? `https://www.google.com/maps/dir/?api=1&destination=${destinationName}&destination_place_id=${encodeURIComponent(place.googlePlaceId)}`
        : `https://www.google.com/maps/search/?api=1&query=${fullQuery}`;
      return { place, status, minutesLeft, dayCells, mapsUrl };
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
          .filter((h) => !h.isClosed && h.openTime && h.closeTime)
          .map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: SCHEMA_DAY_NAMES[h.dayOfWeek],
            opens: h.openTime ?? undefined,
            closes: h.closeTime ?? undefined,
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

      <div className="px-4 max-w-4xl mx-auto mb-6">
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
          Open Now in {cityData.cityName}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {rows.length} places &middot; live hours
        </p>
      </div>

      {/* Weekly hours grid */}
      <div id="hours-scroll" className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          style={{ minWidth: 920, tableLayout: 'fixed' }}
        >
          <colgroup>
            <col style={{ width: 160, minWidth: 160 }} />
            {DAY_LABELS.map((_, i) => (
              <col key={i} style={{ minWidth: 100 }} />
            ))}
            <col style={{ width: 56, minWidth: 56 }} />
          </colgroup>

          <thead>
            <tr>
              <th
                className="sticky left-0 z-20 text-left py-2 pl-4 pr-2 text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                Place
              </th>
              {DAY_LABELS.map((label, i) => {
                const isToday = i === todayIdx;
                return (
                  <th
                    key={label}
                    {...(isToday ? { 'data-today': '' } : {})}
                    className="py-2 px-1 text-center text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      color: isToday ? 'var(--accent)' : 'var(--text-secondary)',
                      borderBottom: isToday
                        ? '2px solid var(--accent)'
                        : '1px solid var(--border-color)',
                      backgroundColor: isToday
                        ? 'var(--accent-dim)'
                        : undefined,
                    }}
                  >
                    {label}
                  </th>
                );
              })}
              <th
                className="py-2 px-1 text-center text-[10px] font-semibold uppercase tracking-widest"
                style={{
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                Left
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map(({ place, status, minutesLeft, dayCells, mapsUrl }, rowIdx) => {
              const { bg, color } = statusColors[status.status];
              return (
                <tr
                  key={place.id}
                  style={{
                    borderBottom: '1px solid var(--border-color-subtle)',
                    backgroundColor:
                      rowIdx % 2 === 1 ? 'var(--bg-row-alt)' : undefined,
                  }}
                >
                  <td
                    className="sticky left-0 z-10 py-[7px] pl-4 pr-2"
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                  >
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-medium truncate block hover:underline"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {place.name}
                    </a>
                    {place.cuisine && (
                      <span
                        className="text-[10px] block truncate"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {place.cuisine}
                      </span>
                    )}
                  </td>

                  {dayCells.map(({ dayOfWeek, periods, isToday }) => {
                    const isClosed =
                      periods.length === 1 && periods[0] === 'Closed';
                    return (
                      <td
                        key={dayOfWeek}
                        className="py-[7px] px-1 text-center text-[11px] leading-tight"
                        style={
                          isToday ? { backgroundColor: bg, color } : undefined
                        }
                      >
                        {isClosed ? (
                          <span
                            style={
                              isToday
                                ? undefined
                                : {
                                    color: 'var(--text-secondary)',
                                    opacity: 0.3,
                                  }
                            }
                          >
                            Closed
                          </span>
                        ) : (
                          <div
                            className="flex flex-col gap-0.5"
                            style={
                              isToday
                                ? { fontWeight: 600 }
                                : {
                                    color: 'var(--text-secondary)',
                                    opacity: 0.7,
                                  }
                            }
                          >
                            {periods.map((p, i) => (
                              <span key={i} className="whitespace-nowrap">
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}

                  <td className="py-[7px] px-1 text-center whitespace-nowrap">
                    {minutesLeft !== null ? (
                      <span
                        className="font-mono font-bold text-[11px]"
                        style={{
                          color:
                            status.status === 'closing_soon'
                              ? 'var(--status-closing)'
                              : 'var(--status-open)',
                        }}
                      >
                        {formatDurationClock(minutesLeft)}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: 'var(--text-secondary)',
                          opacity: 0.3,
                          fontSize: 11,
                        }}
                      >
                        –
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var c=document.getElementById("hours-scroll");var t=c&&c.querySelector("[data-today]");if(c&&t){c.scrollLeft=Math.max(0,t.offsetLeft-172)}})()`,
        }}
      />

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
