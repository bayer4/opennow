'use client';

import { memo, useCallback } from 'react';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import { PlaceWithStatus } from '@/types';
import { StatusBadge } from './StatusBadge';
import { TimeLeft } from './TimeLeft';
import { formatTime12h } from '@/lib/time-utils';
import { useAppStore } from '@/store/app-store';

interface PlaceCardProps {
  place: PlaceWithStatus;
}

function formatTodayHours(place: PlaceWithStatus): string {
  const h = place.todayHours;
  if (!h || h.isClosed || !h.openTime || !h.closeTime) return 'Closed';
  return `${formatTime12h(h.openTime)} – ${formatTime12h(h.closeTime)}`;
}

const priceLabels: Record<number, string> = {
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$',
};

export const PlaceCard = memo(function PlaceCard({ place }: PlaceCardProps) {
  const updatePlace = useAppStore((s) => s.updatePlace);
  const isGuest = useAppStore((s) => s.isGuest);
  const isUrgent = place.statusInfo.status === 'closing_soon';

  const handleTogglePriority = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const newPriority = !place.isPriority;
    updatePlace(place.id, { isPriority: newPriority });

    if (!isGuest) {
      fetch(`/api/places/${place.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPriority: newPriority }),
      }).catch(() => {});
    }
  }, [place.id, place.isPriority, updatePlace, isGuest]);

  return (
    <div
      className={`
        place-card relative rounded-2xl p-4
        transition-transform transition-colors duration-150 ease-out
        active:scale-[0.98]
      `}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: `1px solid var(--divider)`,
        ...(isUrgent
          ? { boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(--status-closing) 25%, transparent)` }
          : {}),
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">
              {place.name}
            </h3>
            <button
              onClick={handleTogglePriority}
              className="p-1 -m-1 shrink-0 transition-opacity duration-100"
              aria-label={place.isPriority ? 'Remove priority' : 'Mark as priority'}
            >
              <Star
                className="w-4 h-4"
                style={
                  place.isPriority
                    ? { color: 'var(--accent)', fill: 'var(--accent)' }
                    : { color: 'var(--text-secondary)', opacity: 0.3 }
                }
              />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={place.statusInfo.status} />
            {place.cuisine && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-card-hover)]">
                {place.cuisine}
              </span>
            )}
            {place.priceLevel && (
              <span className="text-xs text-[var(--text-secondary)]">
                {priceLabels[place.priceLevel]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
            <span>{formatTodayHours(place)}</span>
            {place.rating && (
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {place.rating}
              </span>
            )}
          </div>

          {place.address && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-[var(--text-secondary)] opacity-60">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{place.address}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <TimeLeft statusInfo={place.statusInfo} />
          <ChevronRight className="w-4 h-4 text-[var(--text-secondary)] opacity-40" />
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.place.id === next.place.id &&
    prev.place.isPriority === next.place.isPriority &&
    prev.place.statusInfo.status === next.place.statusInfo.status &&
    prev.place.statusInfo.timeLeft === next.place.statusInfo.timeLeft &&
    prev.place.statusInfo.opensIn === next.place.statusInfo.opensIn
  );
});
