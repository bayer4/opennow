import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock3 } from 'lucide-react';
import { getPublicCityBySlug } from '@/lib/db';
import { enrichPlaceWithStatus, getHoursTextForDay, sortPlacesForToday } from '@/lib/status-engine';
import { dateInTimezone, getDayOfWeek } from '@/lib/time-utils';

export const dynamic = 'force-dynamic';

function statusText(status: string): string {
  switch (status) {
    case 'open':
      return 'Open now';
    case 'closing_soon':
      return 'Closing soon';
    case 'opening_soon':
      return 'Opening soon';
    case 'closed_today':
      return 'Closed today';
    default:
      return 'Closed';
  }
}

function statusColor(status: string): string {
  switch (status) {
    case 'open':
      return 'var(--status-open)';
    case 'closing_soon':
      return 'var(--status-closing)';
    case 'opening_soon':
      return 'var(--accent)';
    default:
      return 'var(--text-secondary)';
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const city = await getPublicCityBySlug(slug);
  if (!city) {
    return {
      title: 'List not found | OpenNow',
      robots: { index: false, follow: false },
    };
  }

  const title = `${city.name} Spots — OpenNow`;
  const description = `See a curated list of places in ${city.name} with live open/closed status.`;
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

export default async function PublicListPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const city = await getPublicCityBySlug(slug);
  if (!city) notFound();

  const effectiveNow = dateInTimezone(new Date(), city.timezone);
  const today = getDayOfWeek(effectiveNow);
  const enriched = sortPlacesForToday(
    city.places.map((place) => enrichPlaceWithStatus(place, effectiveNow)),
  );

  return (
    <div className="min-h-dvh px-4 py-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <main className="max-w-2xl mx-auto">
        <p
          className="text-[12px] uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          Shared on OpenNow
        </p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {city.name} Spots
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {enriched.length} places with live status
        </p>

        <div className="flex flex-col gap-3">
          {enriched.map((place) => {
            const hoursText = getHoursTextForDay(place.hours, today);
            return (
              <article
                key={place.id}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color-subtle)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2
                      className="text-[16px] font-semibold leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {place.name}
                    </h2>
                    {place.cuisine && (
                      <p className="text-[12px] mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {place.cuisine}
                      </p>
                    )}
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2 py-1 rounded-full whitespace-nowrap"
                    style={{
                      color: statusColor(place.statusInfo.status),
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    {statusText(place.statusInfo.status)}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                  {place.address && (
                    <p className="flex items-start gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{place.address}</span>
                    </p>
                  )}
                  <p className="flex items-start gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                    <Clock3 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{hoursText}</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <section
          className="rounded-2xl mt-8 p-5 text-center"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color-subtle)',
          }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Make your own list
          </h3>
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
      </main>
    </div>
  );
}
