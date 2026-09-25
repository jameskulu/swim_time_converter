/** Swimming time parsing and formatting helpers (pure functions, no DOM). */

/** Parse "52.43", "1:52.37", "4:32.15" (and plain seconds) into a time in seconds.
 *  Returns null for invalid or unreasonable input. */
export function parseSwimTime(input: string): number | null {
  const value = input.trim().replace(/,/g, '.');
  if (!value) return null;

  // MM:SS.ss  |  M:SS.ss
  const colonMatch = /^(\d{1,4}):(\d{1,2})(?:\.(\d{1,2}))?$/.exec(value);
  if (colonMatch) {
    const minutes = Number(colonMatch[1]);
    const seconds = Number(colonMatch[2]);
    const hundredths = Number(colonMatch[3] ?? '0');
    if (seconds >= 60) return null;
    const total = minutes * 60 + seconds + hundredths / 100;
    return isValidTotal(total) ? total : null;
  }

  // SS.ss  |  SS
  const flatMatch = /^(\d{1,3})(?:\.(\d{1,2}))?$/.exec(value);
  if (flatMatch) {
    const seconds = Number(flatMatch[1]);
    const hundredths = Number(flatMatch[2] ?? '0');
    const total = seconds + hundredths / 100;
    return isValidTotal(total) ? total : null;
  }

  return null;
}

function isValidTotal(total: number): boolean {
  // Reject missing/zero/negative and absurd values (longer than 4 hours).
  return Number.isFinite(total) && total > 0 && total <= 4 * 3600;
}

/** A coarse "impossible to be this fast" floor in seconds per meter of racing,
 *  roughly the fastest known world-class speed in any stroke. */
const MIN_SECONDS_PER_METER = 0.35;

/** True when a time for this event at this course is below any plausible record. */
export function isPlausibleTime(seconds: number, distanceMeters: number): boolean {
  return seconds / distanceMeters >= MIN_SECONDS_PER_METER;
}

/** Format seconds as "1:52.37" or "52.43" (minutes omitted under one minute). */
export function formatSwimTime(seconds: number): string {
  const cs = Math.round(seconds * 100);
  const totalSeconds = Math.floor(cs / 100);
  const hundredths = cs % 100;
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  const hh = String(hundredths).padStart(2, '0');
  if (minutes > 0) {
    return `${minutes}:${String(secs).padStart(2, '0')}.${hh}`;
  }
  return `${secs}.${hh}`;
}

/** Format seconds always including a hundredths value, e.g. "59.82", "112.37". */
export function formatSeconds(seconds: number): string {
  return (Math.round(seconds * 100) / 100).toFixed(2);
}

/** Format a time as "MM:SS.hh" always including minutes ("0:52.43"). */
export function formatSwimTimeFull(seconds: number): string {
  const cs = Math.round(seconds * 100);
  const totalSeconds = Math.floor(cs / 100);
  const hundredths = cs % 100;
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
}

/** Pace in seconds per the requested distance unit, e.g. time/100m. */
export function paceForDistance(timeSeconds: number, distanceUnits: number, phaseUnits = 100): number {
  if (distanceUnits <= 0) return 0;
  return (timeSeconds / distanceUnits) * phaseUnits;
}