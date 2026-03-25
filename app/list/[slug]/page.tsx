import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { getPublicCityBySlug } from '@/lib/db';
import {
  getPlaceStatus,
  getHoursPeriodsForDay,
  getMinutesRemaining,
} from '@/lib/status-engine';
import { dateInTimezone, getDayOfWeek, formatDurationClock } from '@/lib/time-utils';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = await getPublicCityBySlug(slug);
  if (!city) {
    return {
      title: 'List not found | OpenNow',
      robots: { index: false, follow: false },
    };
  }

  const title = `${city.name} Spots — OpenNow`;
  const description = `${city.places.length} places in ${city.name} with live opening hours. See what's open right now.`;
  const path = `/list/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PublicListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = await getPublicCityBySlug(slug);
  if (!city) notFound();

  const effectiveNow = dateInTimezone(new Date(), city.timezone);
  const today = getDayOfWeek(effectiveNow);
  const todayIdx = DAY_COLUMNS.indexOf(today as (typeof DAY_COLUMNS)[number]);

  const rows = city.places.map((place) => {
    const status = getPlaceStatus(place.hours, effectiveNow);
    const minutesLeft = getMinutesRemaining(place.hours, effectiveNow);
    const dayCells = DAY_COLUMNS.map((dayOfWeek) => ({
      dayOfWeek,
      periods: getHoursPeriodsForDay(place.hours, dayOfWeek),
      isToday: dayOfWeek === today,
    }));
    return { place, status, minutesLeft, dayCells };
  });

  return (
    <div
      className="min-h-dvh py-8"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="px-4 max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MapPin
            className="w-4 h-4"
            style={{ color: 'var(--accent)' }}
          />
          <p
            className="text-[12px] uppercase tracking-widest"
            style={{ color: 'var(--text-secondary)' }}
          >
            Shared on OpenNow
          </p>
        </div>
        <h1
          className="text-3xl font-bold mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {city.name} Spots
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {city.places.length} places &middot; live hours
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
            {rows.map(({ place, status, minutesLeft, dayCells }, rowIdx) => {
              const { bg, color } = statusColors[status.status];
              const destination = encodeURIComponent(
                place.address ? `${place.name}, ${place.address}` : place.name,
              );
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
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

      {/* CTA */}
      <div className="px-4 max-w-4xl mx-auto">
        <section
          className="rounded-2xl mt-8 p-5 text-center"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color-subtle)',
          }}
        >
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Make your own list
          </h3>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
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
