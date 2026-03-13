'use client';

import { memo, useRef, useState, useCallback } from 'react';
import { MapPin, ChevronRight, Archive, RotateCcw, Star, Trash2 } from 'lucide-react';
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

const STASH_THRESHOLD = 60;
const DELETE_THRESHOLD = 130;
const STASH_SNAP = -88;
const DELETE_SNAP = -176;
const MAX_SWIPE = -200;

export const PlaceCard = memo(function PlaceCard({
  place,
  isStashedView = false,
}: PlaceCardProps) {
  const stashPlace = useAppStore((s) => s.stashPlace);
  const unstashPlace = useAppStore((s) => s.unstashPlace);
  const removePlace = useAppStore((s) => s.removePlace);
  const isUrgent = place.statusInfo.status === 'closing_soon';

  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const [swipeX, setSwipeX] = useState(0);
  const [revealLevel, setRevealLevel] = useState<'none' | 'stash' | 'delete'>('none');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (confirmingDelete) return;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = 0;
    isDragging.current = false;
  }, [confirmingDelete]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (confirmingDelete) return;
    const dx = e.touches[0].clientX - startXRef.current;
    if (dx > 10) return;
    const clamped = Math.max(dx, MAX_SWIPE);
    currentXRef.current = clamped;
    if (Math.abs(clamped) > 10) isDragging.current = true;
    setSwipeX(clamped);
  }, [confirmingDelete]);

  const handleTouchEnd = useCallback(() => {
    if (confirmingDelete) return;
    const x = currentXRef.current;

    if (x < -DELETE_THRESHOLD) {
      setRevealLevel('delete');
      setSwipeX(DELETE_SNAP);
    } else if (x < -STASH_THRESHOLD) {
      setRevealLevel('stash');
      setSwipeX(STASH_SNAP);
    } else {
      setRevealLevel('none');
      setSwipeX(0);
    }
    isDragging.current = false;
  }, [confirmingDelete]);

  const handleStash = useCallback(() => {
    stashPlace(place.id);
    setSwipeX(0);
    setRevealLevel('none');
  }, [place.id, stashPlace]);

  const handleUnstash = useCallback(() => {
    unstashPlace(place.id);
  }, [place.id, unstashPlace]);

  const handleDeleteTap = useCallback(() => {
    setConfirmingDelete(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    removePlace(place.id);
  }, [place.id, removePlace]);

  const handleDeleteCancel = useCallback(() => {
    setConfirmingDelete(false);
  }, []);

  const resetSwipe = useCallback(() => {
    setSwipeX(0);
    setRevealLevel('none');
    setConfirmingDelete(false);
  }, []);

  const showingActions = revealLevel !== 'none';

  return (
    <div className="place-card relative overflow-hidden rounded-2xl">
      {/* Action buttons — pinned to right, revealed as card slides */}
      <div className="absolute top-0 right-0 bottom-0 flex items-stretch">
        <button
          onClick={handleDeleteTap}
          className="flex items-center justify-center gap-1.5 text-white text-[13px] font-semibold"
          style={{ backgroundColor: '#ef4444', width: 88 }}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={isStashedView ? handleUnstash : handleStash}
          className="flex items-center justify-center gap-1.5 text-white text-[13px] font-semibold"
          style={{ backgroundColor: isStashedView ? '#22c55e' : 'var(--accent)', width: 88 }}
        >
          {isStashedView ? (
            <><RotateCcw className="w-4 h-4" /> Unstash</>
          ) : (
            <><Archive className="w-4 h-4" /> Stash</>
          )}
        </button>
      </div>

      {/* Delete confirmation overlay */}
      {confirmingDelete && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center gap-3 rounded-2xl"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--divider)' }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Remove this place?
          </span>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: '#ef4444' }}
          >
            Remove
          </button>
          <button
            onClick={handleDeleteCancel}
            className="px-4 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-secondary)' }}
          >
            Cancel
          </button>
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
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={showingActions && !confirmingDelete ? resetSwipe : undefined}
      >
        <div className="flex items-start justify-between gap-3" style={isStashedView ? { opacity: 0.55 } : undefined}>
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
            <TimeLeft statusInfo={place.statusInfo} />
            <ChevronRight className="w-4 h-4 opacity-40" style={{ color: 'var(--text-secondary)' }} />
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
