import type { Course } from '../swimming/events';
import { isPlausibleTime } from '../swimming/time';
import type { ConversionEquation, ConversionMethodTable, CoursePair } from './types';
import { ConversionError } from './types';

/**
 * "Standard" conversion methodology.
 *
 * This is the widely adopted factor set used by U.S. Masters Swimming and
 * age-group swimming conversions (the Colorado Timing / SportsEngine factors,
 * also used by TeamUnify and SwimSwam). It is documented publicly at
 * sportsengine (help / "How to Perform Course Conversion/Factoring of Times")
 * and in the Colorado Timing factor tables.
 *
 * Model:
 *  - Yards and meters: each meter is longer than a yard (0.9144), so short-course
 *    yard times are multiplied by 1.11 to reach the equivalent short-course meter
 *    time for the same nominal event.
 *  - Long-course vs short-course: a 50m pool has fewer turns than a 25m pool.
 *    Each missing turn costs the swimmer an estimated fixed number of seconds
 *    that depends on the stroke (free 0.8, back 0.6, breast 1.0, fly 0.7, IM 0.8).
 *  - Long-distance freestyle pairings use their own factors (500y <-> 400m,
 *    1000y <-> 800m, 1650y <-> 1500m).
 *
 * Reverse conversions (metric -> yards, LCM -> SCM) invert the same equations.
 *
 * IMPORTANT: all swimming course conversions are estimates. Different factors
 * and different organizations produce different results, and no model is exact.
 */

export const STANDARD_TABLE: ConversionMethodTable = {
  turnSeconds: {
    free: 0.8,
    back: 0.6,
    breast: 1.0,
    fly: 0.7,
    im: 0.8,
  },
  long: {
    long400: { factor: 0.8925, increment: 6.4 },
    long800: { factor: 0.8925, increment: 12.8 },
    long1500: { factor: 1.02, increment: 24 },
  },
};

const YARD_TO_METER_FACTOR = 1.11;

function longPairEquation(pairing: 'long400' | 'long800' | 'long1500', key: CoursePair): ConversionEquation {
  const { factor, increment } = STANDARD_TABLE.long![pairing];
  switch (key) {
    case 'SCY|SCM':
      return { factor, increment: -increment };
    case 'SCM|SCY':
      return { factor, increment: -increment, inverse: true };
    case 'SCY|LCM':
      return { factor, increment: 0 };
    case 'LCM|SCY':
      return { factor, increment: 0, inverse: true };
    case 'SCM|LCM':
      return { factor: 1, increment };
    case 'LCM|SCM':
      return { factor: 1, increment, inverse: true };
  }
  // Safety net (should be unreachable).
  return { factor: 1, increment: 0 };
}

function standardPairEquation(_stroke: keyof ConversionMethodTable['turnSeconds'], turnIncrement: number, key: CoursePair): ConversionEquation {
  switch (key) {
    case 'SCY|SCM':
      return { factor: YARD_TO_METER_FACTOR, increment: 0 };
    case 'SCM|SCY':
      return { factor: YARD_TO_METER_FACTOR, increment: 0, inverse: true };
    case 'SCY|LCM':
      return { factor: YARD_TO_METER_FACTOR, increment: turnIncrement };
    case 'LCM|SCY':
      return { factor: YARD_TO_METER_FACTOR, increment: turnIncrement, inverse: true };
    case 'SCM|LCM':
      return { factor: 1, increment: turnIncrement };
    case 'LCM|SCM':
      return { factor: 1, increment: turnIncrement, inverse: true };
  }
  // Safety net (should be unreachable).
  return { factor: 1, increment: 0 };
}

/** Convert `seconds` from one course to another for a given event. Returns null
 *  for an unsupported pair combination (module can be extended). */
export function convertSeconds(
  from: Course,
  to: Course,
  seconds: number,
  event: { pairing: 'standard' | 'long400' | 'long800' | 'long1500'; stroke: keyof ConversionMethodTable['turnSeconds']; meterNominal: number },
): number {
  if (from === to) return seconds;

  const key = `${from}|${to}` as CoursePair;
  const equation =
    event.pairing === 'standard'
      ? standardPairEquation(event.stroke, turnIncrement(event), key)
      : longPairEquation(event.pairing, key);

  const out = equation.inverse ? (seconds - equation.increment) / equation.factor : seconds * equation.factor + equation.increment;
  // Round to the nearest hundredth, matching how meet results are reported.
  return Math.round(out * 100) / 100;
}

function turnIncrement(event: { stroke: keyof ConversionMethodTable['turnSeconds']; meterNominal: number }): number {
  // When moving to a 50m pool the event has (distance/50) fewer turns than in a
  // 25m pool, so the increment is distance/50 × seconds-per-turn.
  const extraTurns = event.meterNominal / 50;
  return Math.round(extraTurns * STANDARD_TABLE.turnSeconds[event.stroke] * 100) / 100;
}

/** Root conversion helper for the standard methodology.
 *  Throws ConversionError when the input is not usable. */
export function standardConvert(
  arg: {
    courseFrom: Course;
    courseTo: Course;
    seconds: number;
    event: EventLike;
  },
): { seconds: number } {
  const { courseFrom, courseTo, seconds, event } = arg;

  if (!Number.isFinite(seconds) || seconds <= 0) {
    throw new ConversionError('INVALID_INPUT', 'Enter a time greater than zero.');
  }

  if (!isPlausibleTime(seconds, event.distance[courseFrom])) {
    throw new ConversionError('UNREASONABLE_TIME', 'That time is faster than any known swimming record for this event.');
  }

  return { seconds: convertSeconds(courseFrom, courseTo, seconds, event) };
}

type EventLike = {
  pairing: 'standard' | 'long400' | 'long800' | 'long1500';
  stroke: keyof ConversionMethodTable['turnSeconds'];
  meterNominal: number;
  distance: Record<Course, number>;
};