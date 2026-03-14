'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { Plus, ChevronDown, ChevronUp, Archive } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { WeeklyGrid } from '@/components/WeeklyGrid';
import { Place } from '@/types';
import {
  getHoursPeriodsForDay,
  getMinutesRemaining,
} from '@/lib/status-engine';
import { getDayOfWeek, formatDurationClock, dateInTimezone } from '@/lib/time-utils';

const DAY_COLUMNS = [1, 2, 3, 4, 5, 6, 0] as const;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function StashedGrid({ places, currentTime, timezone }: { places: Place[]; currentTime: Date; timezone?: string }) {
  const effectiveTime = dateInTimezone(currentTime, timezone);
  const today = getDayOfWeek(effectiveTime);

  const rows = places.map((place) => {
    const minutesLeft = getMinutesRemaining(place.hours, effectiveTime);
    const dayCells = DAY_COLUMNS.map((dayOfWeek) => ({
      dayOfWeek,
      periods: getHoursPeriodsForDay(place.hours, dayOfWeek),
      isToday: dayOfWeek === today,
    }));
    return { place, minutesLeft, dayCells };
  });

  return (
    <table
      className="w-full border-collapse"
      style={{ minWidth: 920, tableLayout: 'fixed', opacity: 0.45 }}
    >
      <colgroup>
        <col style={{ width: 136, minWidth: 136 }} />
        {DAY_LABELS.map((_, i) => (
          <col key={i} style={{ minWidth: 100 }} />
        ))}
        <col style={{ width: 52, minWidth: 52 }} />
      </colgroup>
      <tbody>
        {rows.map(({ place, minutesLeft, dayCells }, rowIdx) => (
          <tr
            key={place.id}
            style={{
              borderBottom: '1px solid var(--border-color-subtle)',
              backgroundColor: rowIdx % 2 === 1 ? 'var(--bg-row-alt)' : undefined,
            }}
          >
            <td
              className="sticky left-0 z-10 py-[7px] pl-4 pr-2"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <span
                className="text-[13px] font-medium truncate block"
                style={{ color: 'var(--text-primary)' }}
              >
                {place.name}
              </span>
            </td>

            {dayCells.map(({ dayOfWeek, periods, isToday }) => {
              const isClosed = periods.length === 1 && periods[0] === 'Closed';
              return (
                <td
                  key={dayOfWeek}
                  className="py-[7px] px-1 text-center text-[11px] leading-tight"
                  style={isToday ? { backgroundColor: 'var(--accent-dim)' } : undefined}
                >
                  {isClosed ? (
                    <span style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>
                      Closed
                    </span>
                  ) : (
                    <div
                      className="flex flex-col gap-0.5"
                      style={{
                        color: 'var(--text-secondary)',
                        opacity: 0.7,
                        fontWeight: isToday ? 600 : undefined,
                      }}
                    >
                      {periods.map((p, i) => (
                        <span key={i} className="whitespace-nowrap">{p}</span>
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
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {formatDurationClock(minutesLeft)}
                </span>
              ) : (
                <span style={{ color: 'var(--text-secondary)', opacity: 0.3, fontSize: 11 }}>
                  –
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function WeekPage() {
  const activeCity = useAppStore((s) => s.activeCity);
  const currentTime = useAppStore((s) => s.currentTime);
  const showStashedPlaces = useAppStore((s) => s.showStashedPlaces);
  const toggleStashedPlaces = useAppStore((s) => s.toggleStashedPlaces);

  const activePlaces: Place[] = [];
  const stashedPlaces: Place[] = [];
  if (activeCity) {
    for (const p of activeCity.places) {
      if (p.isStashed) stashedPlaces.push(p);
      else activePlaces.push(p);
    }
    stashedPlaces.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleToggleStashed = useCallback(() => {
    toggleStashedPlaces();
  }, [toggleStashedPlaces]);

  if (!activeCity) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p style={{ color: 'var(--text-secondary)' }}>Detecting your city...</p>
      </div>
    );
  }

  return (
    <div className="py-5">
      <WeeklyGrid places={activePlaces} currentTime={currentTime} timezone={activeCity?.timezone} />
      <div className="px-4 mt-4">
        <Link
          href={`/trip/${activeCity.id}/add`}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
          style={{
            border: '1px dashed var(--border-color)',
            color: 'var(--accent)',
          }}
        >
          <Plus className="w-4 h-4" />
          Add
        </Link>
      </div>

      {stashedPlaces.length > 0 && (
        <div className="px-4 mt-4">
          <button
            onClick={handleToggleStashed}
            className="flex items-center gap-2 w-full py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {showStashedPlaces ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <Archive className="w-3.5 h-3.5" />
            <span>Stashed ({stashedPlaces.length})</span>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: showStashedPlaces ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden -mx-4">
              <StashedGrid places={stashedPlaces} currentTime={currentTime} timezone={activeCity?.timezone} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
