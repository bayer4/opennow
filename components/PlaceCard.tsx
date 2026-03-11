'use client';

import { memo, useRef, useState, useCallback } from 'react';
import { MapPin, ChevronRight, Archive, RotateCcw, Star } from 'lucide-react';
import { PlaceWithStatus } from '@/types';
import { StatusBadge } from './StatusBadge';
import { TimeLeft } from './TimeLeft';
import { formatTime12h } from '@/lib/time-utils';
import { useAppStore } from '@/store/app-store';

interface PlaceCardProps {
  place: PlaceWithStatus;
  isStashedView?: boolean;
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

const SWIPE_THRESHOLD = 80;

export const PlaceCard = memo(function PlaceCard({
  place,
  isStashedView = false,
}: PlaceCardProps) {
  const stashPlace = useAppStore((s) => s.stashPlace);
  const unstashPlace = useAppStore((s) => s.unstashPlace);
  const isUrgent = place.statusInfo.status === 'closing_soon';

  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const [swipeX, setSwipeX] = useState(0);
  const [showStashBtn, setShowStashBtn] = useState(false);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isStashedView) return;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = 0;
    isDragging.current = false;
  }, [isStashedView]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isStashedView) return;
    const dx = e.touches[0].clientX - startXRef.current;
    if (dx > 10) return; // ignore right swipe
    const clamped = Math.max(dx, -140);
    currentXRef.current = clamped;
    if (Math.abs(clamped) > 10) isDragging.current = true;
    setSwipeX(clamped);
  }, [isStashedView]);

  const handleTouchEnd = useCallback(() => {
    if (isStashedView) return;
    if (currentXRef.current < -SWIPE_THRESHOLD) {
      setShowStashBtn(true);
      setSwipeX(-100);
    } else {
      setShowStashBtn(false);
      setSwipeX(0);
    }
    isDragging.current = false;
  }, [isStashedView]);

  const handleStash = useCallback(() => {
    stashPlace(place.id);
    setSwipeX(0);
    setShowStashBtn(false);
  }, [place.id, stashPlace]);

  const handleUnstash = useCallback(() => {
    unstashPlace(place.id);
  }, [place.id, unstashPlace]);

  const resetSwipe = useCallback(() => {
    setSwipeX(0);
    setShowStashBtn(false);
  }, []);

  return (
    <div className="place-card relative overflow-hidden rounded-2xl">
      {/* Stash action behind the card */}
      {!isStashedView && (
        <div
          className="absolute inset-0 flex items-center justify-end rounded-2xl"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {showStashBtn ? (
            <button
              onClick={handleStash}
              className="flex items-center gap-2 px-5 h-full text-white text-sm font-semibold"
            >
              <Archive className="w-4 h-4" />
              Stash
            </button>
          ) : (
            <div className="px-5 flex items-center gap-2 text-white/60 text-sm">
              <Archive className="w-4 h-4" />
            </div>
          )}
        </div>
      )}

      {/* Main card content */}
      <div
        ref={cardRef}
        className="relative p-4 transition-transform ease-out"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--divider)',
          borderRadius: '1rem',
          transform: `translateX(${swipeX}px)`,
          transitionDuration: isDragging.current ? '0ms' : '200ms',
          ...(isUrgent && !isStashedView
            ? { boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--status-closing) 25%, transparent)' }
            : {}),
          ...(isStashedView ? { opacity: 0.65 } : {}),
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={showStashBtn ? resetSwipe : undefined}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {place.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={place.statusInfo.status} />
              {place.cuisine && (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-xs"
                  style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-card-hover)' }}
                >
                  {place.cuisine}
                </span>
              )}
              {place.priceLevel && (
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {priceLabels[place.priceLevel]}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>{formatTodayHours(place)}</span>
              {place.rating && (
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {place.rating}
                </span>
              )}
            </div>

            {place.address && (
              <div className="flex items-center gap-1 mt-1.5 text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{place.address}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            {isStashedView ? (
              <button
                onClick={handleUnstash}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-100"
                style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--accent)' }}
              >
                <RotateCcw className="w-3 h-3" />
                Unstash
              </button>
            ) : (
              <>
                <TimeLeft statusInfo={place.statusInfo} />
                <ChevronRight className="w-4 h-4 opacity-40" style={{ color: 'var(--text-secondary)' }} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.place.id === next.place.id &&
    prev.place.isStashed === next.place.isStashed &&
    prev.place.statusInfo.status === next.place.statusInfo.status &&
    prev.place.statusInfo.timeLeft === next.place.statusInfo.timeLeft &&
    prev.place.statusInfo.opensIn === next.place.statusInfo.opensIn &&
    prev.isStashedView === next.isStashedView
  );
});
