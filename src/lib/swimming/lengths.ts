/** Pool length / swim-distance conversion helpers. */

export interface PoolOption {
  id: string;
  label: string;
  length: number;
  unit: DistanceUnit;
}

import type { DistanceUnit } from './speed';

export const POOL_OPTIONS: PoolOption[] = [
  { id: 'scy-25', label: '25 yards (short course yards)', length: 25, unit: 'yd' },
  { id: 'scm-25', label: '25 meters (short course meters)', length: 25, unit: 'm' },
  { id: 'lcm-50', label: '50 meters (long course meters)', length: 50, unit: 'm' },
];

export interface LengthsResult {
  fullLengths: number;
  remainder: number;
  lengthLabel: string;
}

/** How many pool lengths equal a swim distance (both in the pool's unit). */
export function lengthsForDistance(totalDistance: number, poolLength: number): LengthsResult | null {
  if (!Number.isFinite(totalDistance) || totalDistance <= 0 || !Number.isFinite(poolLength) || poolLength <= 0) {
    return null;
  }
  const count = totalDistance / poolLength;
  return {
    fullLengths: Math.floor(count),
    remainder: totalDistance - Math.floor(count) * poolLength,
    lengthLabel: `${totalDistance} is ${poolLength} pool lengths`,
  };
}

/** Distance covered (in the pool's unit) from a number of lengths. */
export function distanceForLengths(lengths: number, poolLength: number): number | null {
  if (!Number.isFinite(lengths) || lengths <= 0 || !Number.isFinite(poolLength) || poolLength <= 0) {
    return null;
  }
  return lengths * poolLength;
}