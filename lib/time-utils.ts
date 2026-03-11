/**
 * Parse "HH:MM" to minutes since midnight.
 */
export function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Get current time as minutes since midnight.
 */
export function nowMinutes(now?: Date): number {
  const d = now ?? new Date();
  return d.getHours() * 60 + d.getMinutes();
}

/**
 * Format minutes into a human-readable duration string.
 * e.g., 151 → "2h 31m", 45 → "45m", 0 → "< 1m"
 */
export function formatDuration(totalMinutes: number): string {
  if (totalMinutes <= 0) return '< 1m';
  const h = Math.floor(totalMinutes);
  const hours = Math.floor(h / 60);
  const mins = h % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Format "HH:MM" (24h) to "h:MM AM/PM".
 */
export function formatTime12h(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

/**
 * Get the day-of-week index for a Date (0=Sunday).
 */
export function getDayOfWeek(date?: Date): number {
  return (date ?? new Date()).getDay();
}

/**
 * Compact time: "9 AM", "7:30 PM" — drops minutes when :00.
 */
export function formatTimeCompact(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  if (m === 0) return `${hour12} ${period}`;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

/**
 * Compact range: "9 AM–8 PM", "7:30 AM–2 PM"
 */
export function formatHoursRange(openTime: string, closeTime: string): string {
  return `${formatTimeCompact(openTime)}–${formatTimeCompact(closeTime)}`;
}

/**
 * Clock-style duration: "0:15", "2:31" — matches the spreadsheet feel.
 */
export function formatDurationClock(totalMinutes: number): string {
  if (totalMinutes <= 0) return '0:00';
  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  return `${h}:${m.toString().padStart(2, '0')}`;
}
