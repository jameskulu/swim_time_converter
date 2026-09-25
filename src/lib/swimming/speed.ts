/** Swim speed and race-projection helpers. Works in either meters or yards. */

export const YARDS_PER_METER = 1.09361;
export const METERS_PER_YARD = 0.9144;

export type DistanceUnit = 'm' | 'yd';

export interface SpeedResult {
  /** Pace in seconds per 100 m. */
  pacePer100M: number;
  /** Pace in seconds per 100 yd. */
  pacePer100Yd: number;
  /** Speed in metres per second. */
  speedMps: number;
  /** Speed in kilometres per hour. */
  speedKmph: number;
  /** Speed in miles per hour. */
  speedMph: number;
  /** Time for a US pool mile (1650 yd) in seconds. */
  poolMileSeconds: number;
  /** Time for a true mile (1760 yd) in seconds. */
  mileSeconds: number;
  /** Time for 1 km in seconds. */
  oneKmSeconds: number;
}

export function speedResult(timeSeconds: number, distanceUnits: number, unit: DistanceUnit): SpeedResult | null {
  if (!Number.isFinite(timeSeconds) || timeSeconds <= 0 || !Number.isFinite(distanceUnits) || distanceUnits <= 0) {
    return null;
  }
  const speed = distanceUnits / timeSeconds; // units / second
  const mps = unit === 'yd' ? speed * METERS_PER_YARD : speed;
  const pacePer100M = 100 / mps;
  const pacePer100Yd = 100 / (mps * YARDS_PER_METER);
  return {
    pacePer100M,
    pacePer100Yd,
    speedMps: mps,
    speedKmph: mps * 3.6,
    speedMph: mps * 2.23694,
    poolMileSeconds: (1650 / (mps * YARDS_PER_METER)),
    mileSeconds: (1760 / (mps * YARDS_PER_METER)),
    oneKmSeconds: 1000 / mps,
  };
}

/** Projected times at a given speed for a list of distances (list unit = parameter). */
export function projectedTimes(
  timeSeconds: number,
  distanceUnits: number,
  unit: DistanceUnit,
  distances: number[],
): { distance: number; seconds: number }[] {
  const result = speedResult(timeSeconds, distanceUnits, unit);
  if (!result) return [];
  const mps = result.speedMps;
  return distances.map((distance) => {
    const seconds = unit === 'm' ? distance / mps : distance / (mps * YARDS_PER_METER);
    return { distance, seconds };
  });
}