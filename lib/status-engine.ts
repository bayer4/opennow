import { OperatingHours, PlaceStatus, StatusInfo, Place, PlaceWithStatus } from '@/types';
import { parseTime, nowMinutes, formatDuration, formatTime12h, getDayOfWeek, formatHoursRange, formatHoursRangeTiny } from './time-utils';

const CLOSING_SOON_THRESHOLD = 60; // minutes
const OPENING_SOON_THRESHOLD = 60; // minutes

/**
 * Core status engine — determines whether a place is open, closed,
 * closing soon, or opening soon based on its operating hours and the
 * current time.
 *
 * Handles edge cases:
 * - Overnight hours (e.g., 6 PM – 2 AM)
 * - Split hours (lunch + dinner represented as separate entries)
 * - Missing hours data
 */
export function getPlaceStatus(
  hours: OperatingHours[],
  now?: Date
): StatusInfo {
  const currentDate = now ?? new Date();
  const currentDay = getDayOfWeek(currentDate);
  const currentMinutes = nowMinutes(currentDate);
  const previousDay = currentDay === 0 ? 6 : currentDay - 1;

  const todayEntries = hours.filter(h => h.dayOfWeek === currentDay);
  const yesterdayEntries = hours.filter(h => h.dayOfWeek === previousDay);

  // No hours data at all — treat as unknown/closed
  if (hours.length === 0) {
    return {
      status: 'closed_today',
      urgency: 0,
    };
  }

  // Check if explicitly closed today (all today entries are isClosed or no today entries)
  const todayClosed = todayEntries.length === 0 ||
    todayEntries.every(e => e.isClosed || (!e.openTime && !e.closeTime));

  // Check if we're in an overnight window from yesterday
  const overnightStatus = getOvernightStatus(yesterdayEntries, currentMinutes);
  if (overnightStatus) return overnightStatus;

  if (todayClosed) {
    // Even though today is "closed", check if there's a next opening on a future day
    return {
      status: 'closed_today',
      urgency: 0,
    };
  }

  // Check each of today's hour windows (handles split hours)
  const activeEntries = todayEntries.filter(
    e => !e.isClosed && e.openTime && e.closeTime
  );

  for (const entry of activeEntries) {
    const open = parseTime(entry.openTime!);
    const close = parseTime(entry.closeTime!);

    if (entry.isOvernight) {
      // Opens today, closes after midnight tomorrow
      // If we're past the open time, we're in the window
      if (currentMinutes >= open) {
        // It closes after midnight, so it won't close "today" in clock terms
        // We're open with a long time left (wraps past midnight)
        const minutesUntilClose = (24 * 60 - currentMinutes) + close;
        if (minutesUntilClose <= CLOSING_SOON_THRESHOLD) {
          return {
            status: 'closing_soon',
            timeLeft: formatDuration(minutesUntilClose),
            closesAt: formatTime12h(entry.closeTime!),
            urgency: 100 - minutesUntilClose,
          };
        }
        return {
          status: 'open',
          timeLeft: formatDuration(minutesUntilClose),
          closesAt: formatTime12h(entry.closeTime!),
          urgency: Math.max(0, 50 - minutesUntilClose),
        };
      }

      // Before the open time — check if opening soon
      const minutesUntilOpen = open - currentMinutes;
      if (minutesUntilOpen > 0 && minutesUntilOpen <= OPENING_SOON_THRESHOLD) {
        return {
          status: 'opening_soon',
          opensIn: formatDuration(minutesUntilOpen),
          opensAt: formatTime12h(entry.openTime!),
          urgency: 60 - minutesUntilOpen,
        };
      }
      continue;
    }

    // Normal same-day hours
    if (currentMinutes >= open && currentMinutes < close) {
      const minutesLeft = close - currentMinutes;
      if (minutesLeft <= CLOSING_SOON_THRESHOLD) {
        return {
          status: 'closing_soon',
          timeLeft: formatDuration(minutesLeft),
          closesAt: formatTime12h(entry.closeTime!),
          urgency: 100 - minutesLeft,
        };
      }
      return {
        status: 'open',
        timeLeft: formatDuration(minutesLeft),
        closesAt: formatTime12h(entry.closeTime!),
        urgency: Math.max(0, 50 - minutesLeft),
      };
    }
  }

  // Not currently open — find the next opening today
  const nextOpening = activeEntries
    .filter(e => !e.isOvernight && parseTime(e.openTime!) > currentMinutes)
    .sort((a, b) => parseTime(a.openTime!) - parseTime(b.openTime!))[0];

  // Also consider overnight entries that haven't opened yet
  const nextOvernightOpening = activeEntries
    .filter(e => e.isOvernight && parseTime(e.openTime!) > currentMinutes)
    .sort((a, b) => parseTime(a.openTime!) - parseTime(b.openTime!))[0];

  const next = nextOpening ?? nextOvernightOpening;

  if (next) {
    const minutesUntilOpen = parseTime(next.openTime!) - currentMinutes;
    if (minutesUntilOpen <= OPENING_SOON_THRESHOLD) {
      return {
        status: 'opening_soon',
        opensIn: formatDuration(minutesUntilOpen),
        opensAt: formatTime12h(next.openTime!),
        urgency: 60 - minutesUntilOpen,
      };
    }
    return {
      status: 'closed',
      opensAt: formatTime12h(next.openTime!),
      opensIn: formatDuration(minutesUntilOpen),
      urgency: 0,
    };
  }

  // All windows have passed for today
  return {
    status: 'closed',
    urgency: 0,
  };
}

/**
 * Check if we're currently in an overnight window that started yesterday.
 */
function getOvernightStatus(
  yesterdayEntries: OperatingHours[],
  currentMinutes: number
): StatusInfo | null {
  const overnightEntry = yesterdayEntries.find(
    e => e.isOvernight && !e.isClosed && e.closeTime
  );

  if (!overnightEntry) return null;

  const close = parseTime(overnightEntry.closeTime!);
  if (currentMinutes < close) {
    const minutesLeft = close - currentMinutes;
    if (minutesLeft <= CLOSING_SOON_THRESHOLD) {
      return {
        status: 'closing_soon',
        timeLeft: formatDuration(minutesLeft),
        closesAt: formatTime12h(overnightEntry.closeTime!),
        urgency: 100 - minutesLeft,
      };
    }
    return {
      status: 'open',
      timeLeft: formatDuration(minutesLeft),
      closesAt: formatTime12h(overnightEntry.closeTime!),
      urgency: Math.max(0, 50 - minutesLeft),
    };
  }

  return null;
}

/**
 * Get today's most relevant operating hours entry for a place.
 * Returns the currently-active period, or the next upcoming one, or the
 * last one that already passed — in that priority order. Handles split
 * hours (e.g. lunch + dinner) correctly.
 */
export function getTodayHours(hours: OperatingHours[], now?: Date): OperatingHours | null {
  const currentDate = now ?? new Date();
  const currentDay = getDayOfWeek(currentDate);
  const currentMinutes = nowMinutes(currentDate);
  const todayEntries = hours.filter(h => h.dayOfWeek === currentDay && !h.isClosed && h.openTime && h.closeTime);

  if (todayEntries.length === 0) {
    const closedEntry = hours.find(h => h.dayOfWeek === currentDay);
    return closedEntry ?? null;
  }

  // Currently active period
  for (const entry of todayEntries) {
    const open = parseTime(entry.openTime!);
    const close = parseTime(entry.closeTime!);
    if (entry.isOvernight) {
      if (currentMinutes >= open) return entry;
    } else if (currentMinutes >= open && currentMinutes < close) {
      return entry;
    }
  }

  // Next upcoming period
  const upcoming = todayEntries
    .filter(e => parseTime(e.openTime!) > currentMinutes)
    .sort((a, b) => parseTime(a.openTime!) - parseTime(b.openTime!));
  if (upcoming.length > 0) return upcoming[0];

  // All periods passed — return the last one
  return todayEntries[todayEntries.length - 1];
}

/**
 * Enrich a place with its current status info.
 */
export function enrichPlaceWithStatus(place: Place, now?: Date): PlaceWithStatus {
  return {
    ...place,
    statusInfo: getPlaceStatus(place.hours, now),
    todayHours: getTodayHours(place.hours, now),
  };
}

/**
 * Get the display text for a place's hours on a given day of the week.
 * Returns "Closed" or a compact range like "9 AM–8 PM".
 * For split hours shows "11 AM–2 PM, 5–10 PM".
 */
export function getHoursTextForDay(hours: OperatingHours[], dayOfWeek: number): string {
  const entries = hours.filter(h => h.dayOfWeek === dayOfWeek);
  if (entries.length === 0) return 'Closed';
  const active = entries
    .filter(e => !e.isClosed && e.openTime && e.closeTime)
    .sort((a, b) => parseTime(a.openTime!) - parseTime(b.openTime!));
  if (active.length === 0) return 'Closed';
  return active.map(e => formatHoursRange(e.openTime!, e.closeTime!)).join(', ');
}

/**
 * Get an array of compact hour-range strings for a given day.
 * Used by the weekly grid to stack split periods vertically.
 * Returns ["Closed"] or ["9a–8p"] or ["12–2p", "5–10p"].
 */
export function getHoursPeriodsForDay(hours: OperatingHours[], dayOfWeek: number): string[] {
  const active = hours
    .filter(h => h.dayOfWeek === dayOfWeek && !h.isClosed && h.openTime && h.closeTime)
    .sort((a, b) => parseTime(a.openTime!) - parseTime(b.openTime!));
  if (active.length === 0) return ['Closed'];
  return active.map(e => formatHoursRangeTiny(e.openTime!, e.closeTime!));
}

/**
 * Get raw minutes remaining for an open/closing_soon place.
 * Returns null if the place is not currently open.
 */
export function getMinutesRemaining(
  hours: OperatingHours[],
  now?: Date
): number | null {
  const status = getPlaceStatus(hours, now);
  if (status.status !== 'open' && status.status !== 'closing_soon') return null;

  const currentDate = now ?? new Date();
  const currentDay = getDayOfWeek(currentDate);
  const currentMinutes = nowMinutes(currentDate);
  const previousDay = currentDay === 0 ? 6 : currentDay - 1;

  // Check overnight from yesterday
  const yesterdayOvernight = hours.find(
    h => h.dayOfWeek === previousDay && h.isOvernight && !h.isClosed && h.closeTime
  );
  if (yesterdayOvernight) {
    const close = parseTime(yesterdayOvernight.closeTime!);
    if (currentMinutes < close) return close - currentMinutes;
  }

  // Check today's entries
  const todayEntries = hours.filter(
    h => h.dayOfWeek === currentDay && !h.isClosed && h.openTime && h.closeTime
  );
  for (const entry of todayEntries) {
    const open = parseTime(entry.openTime!);
    const close = parseTime(entry.closeTime!);
    if (entry.isOvernight && currentMinutes >= open) {
      return (24 * 60 - currentMinutes) + close;
    }
    if (!entry.isOvernight && currentMinutes >= open && currentMinutes < close) {
      return close - currentMinutes;
    }
  }
  return null;
}

/**
 * Sort places for the Today View according to the spec:
 *  1. Closing soon (urgency desc — most urgent at top)
 *  2. Open now (sorted by closing time — closing soonest first)
 *  3. Opening soon
 *  4. Closed but opens later today
 *  5. Closed all day (at bottom)
 */
export function sortPlacesForToday(places: PlaceWithStatus[]): PlaceWithStatus[] {
  const statusOrder: Record<PlaceStatus, number> = {
    closing_soon: 0,
    open: 1,
    opening_soon: 2,
    closed: 3,
    closed_today: 4,
  };

  return [...places].sort((a, b) => {
    const orderA = statusOrder[a.statusInfo.status];
    const orderB = statusOrder[b.statusInfo.status];
    if (orderA !== orderB) return orderA - orderB;
    // Within the same status group, sort by urgency descending
    return b.statusInfo.urgency - a.statusInfo.urgency;
  });
}
