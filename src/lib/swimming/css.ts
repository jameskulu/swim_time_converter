/** Critical Swim Speed (CSS) helpers — the Wakayoshi 400 + 200 test model. */

export interface CssInput {
  /** Long test distance (units = the chosen course unit). */
  distanceLong: number;
  /** Long test time in seconds. */
  timeLong: number;
  /** Short test distance (units = the chosen course unit). */
  distanceShort: number;
  /** Short test time in seconds. */
  timeShort: number;
}

export interface CssZone {
  key: string;
  label: string;
  fromPace: number;
  toPace: number;
  rpe: string;
  purpose: string;
}

/** CSS speed in units-per-second from the standard two-test formula. */
export function cssSpeed(input: CssInput): number {
  const deltaDistance = input.distanceLong - input.distanceShort;
  const deltaTime = input.timeLong - input.timeShort;
  if (deltaDistance <= 0 || deltaTime <= 0) {
    return 0;
  }
  return deltaDistance / deltaTime;
}

/** Seconds-per-100 pace derived from a CSS speed. */
export function cssPacePer100(speed: number): number {
  if (speed <= 0) return 0;
  return 100 / speed;
}

/** Practical training zones derived from a CSS per-100 pace (seconds). */
export function cssZones(cssPace: number): CssZone[] {
  const zones: Omit<CssZone, 'fromPace' | 'toPace'>[] = [
    { key: 'recovery', label: 'Zone 1 · Recovery', rpe: '3–4 / 10', purpose: 'Warm-up, cool-down and technique work' },
    { key: 'aerobic', label: 'Zone 2 · Aerobic Endurance', rpe: '5–6 / 10', purpose: 'Base volume at a controlled effort' },
    { key: 'tempo', label: 'Zone 3 · Tempo', rpe: '6–7 / 10', purpose: 'Comfortable but firm aerobic hold' },
    { key: 'threshold', label: 'Zone 4 · Threshold (CSS)', rpe: '7–8 / 10', purpose: 'Repeatable threshold sets on short rest' },
    { key: 'vo2', label: 'Zone 5 · VO₂ / Speed', rpe: '8–10 / 10', purpose: 'Short reps faster than CSS with real recovery' },
  ];
  // Anchor the threshold zone on CSS itself.
  const anchors = [cssPace + 15, cssPace + 10, cssPace + 4, cssPace, cssPace - 8];
  return zones.map((zone, i) => ({
    ...zone,
    toPace: anchors[i],
    fromPace: i < anchors.length - 1 ? anchors[i + 1] : Math.max(0, anchors[i] - 7),
  }));
}

/** Projected time at CSS pace for a set of distances (same units as the input). */
export function cssProjectedTimes(cssPacePer100: number, distances: number[]): { distance: number; seconds: number }[] {
  return distances.map((distance) => ({ distance, seconds: (cssPacePer100 * distance) / 100 }));
}