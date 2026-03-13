'use client';

import { useRef, useEffect } from 'react';
import { Place, PlaceStatus } from '@/types';
import {
  getPlaceStatus,
  getHoursTextForDay,
  getMinutesRemaining,
} from '@/lib/status-engine';
import { getDayOfWeek, formatDurationClock, dateInTimezone } from '@/lib/time-utils';

interface WeeklyGridProps {
  places: Place[];
  currentTime: Date;
  timezone?: string;
}

const DAY_COLUMNS = [1, 2, 3, 4, 5, 6, 0] as const;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const gridStatusVars: Record<PlaceStatus, { bg: string; color: string }> = {
  open: { bg: 'var(--status-open-grid)', color: 'var(--status-open)' },
  closing_soon: { bg: 'var(--status-closing-grid)', color: 'var(--status-closing)' },
  opening_soon: { bg: 'var(--status-opening-grid)', color: 'var(--status-opening)' },
  closed: { bg: 'var(--status-closed-grid)', color: 'var(--status-closed)' },
  closed_today: { bg: 'var(--status-closed-grid)', color: 'var(--status-closed)' },
};

export function WeeklyGrid({ places, currentTime, timezone }: WeeklyGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayMarkerRef = useRef<HTMLTableCellElement>(null);
  const effectiveTime = dateInTimezone(currentTime, timezone);
  const today = getDayOfWeek(effectiveTime);
  const todayIdx = DAY_COLUMNS.indexOf(today as (typeof DAY_COLUMNS)[number]);

  useEffect(() => {
    const container = scrollRef.current;
    const marker = todayMarkerRef.current;
    if (!container || !marker) return;
    const targetScroll = Math.max(0, marker.offsetLeft - 140);
    container.scrollTo({ left: targetScroll, behavior: 'instant' });
  }, []);

  const rows = places.map((place) => {
    const status = getPlaceStatus(place.hours, effectiveTime);
    const minutesLeft = getMinutesRemaining(place.hours, effectiveTime);
    const dayCells = DAY_COLUMNS.map((dayOfWeek) => ({
      dayOfWeek,
      text: getHoursTextForDay(place.hours, dayOfWeek),
      isToday: dayOfWeek === today,
    }));
    return { place, status, minutesLeft, dayCells };
  });

  return (
    <div ref={scrollRef} className="overflow-x-auto">
      <table
        className="w-full border-collapse"
        style={{ minWidth: 920, tableLayout: 'fixed' }}
      >
        <colgroup>
          <col style={{ width: 136, minWidth: 136 }} />
          {DAY_LABELS.map((_, i) => (
            <col key={i} style={{ minWidth: 100 }} />
          ))}
          <col style={{ width: 52, minWidth: 52 }} />
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
                  ref={isToday ? todayMarkerRef : undefined}
                  className="py-2 px-1 text-center text-[10px] font-semibold uppercase tracking-widest"
                  style={{
                    color: isToday ? 'var(--accent)' : 'var(--text-secondary)',
                    borderBottom: isToday
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border-color)',
                    backgroundColor: isToday ? 'var(--accent-dim)' : undefined,
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
          {rows.map(({ place, status, minutesLeft, dayCells }, rowIdx) => (
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

              {dayCells.map(({ dayOfWeek, text, isToday }) => {
                const isClosed = text === 'Closed';
                const { bg, color } = gridStatusVars[status.status];

                return (
                  <td
                    key={dayOfWeek}
                    className="py-[7px] px-1.5 text-center text-[11px] leading-tight whitespace-nowrap"
                    style={isToday ? { backgroundColor: bg, color } : undefined}
                  >
                    {isClosed ? (
                      <span
                        style={
                          isToday
                            ? undefined
                            : { color: 'var(--text-secondary)', opacity: 0.3 }
                        }
                      >
                        Closed
                      </span>
                    ) : (
                      <span
                        style={
                          isToday
                            ? { fontWeight: 600 }
                            : { color: 'var(--text-secondary)', opacity: 0.7 }
                        }
                      >
                        {text}
                      </span>
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
                  <span style={{ color: 'var(--text-secondary)', opacity: 0.3, fontSize: 11 }}>
                    –
                  </span>
                )}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}
