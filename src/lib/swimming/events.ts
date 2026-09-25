import type { Locale } from '../../i18n/config';
import { getStrokeLabel } from '../../i18n/calculator';

/** Swimming event catalog: which events exist on each course and their race distance. */

export type Stroke = 'free' | 'back' | 'breast' | 'fly' | 'im';
export type Course = 'SCY' | 'SCM' | 'LCM';

/** Conversion pairing bucket. "standard" covers 50/100/200 events and IM races;
 *  the "long*" buckets pair SCY distance freestyle with the metric equivalents. */
export type PairingKey = 'standard' | 'long400' | 'long800' | 'long1500';

export interface EventDef {
  id: string;
  stroke: Stroke;
  pairing: PairingKey;
  /** Display name per course (e.g. "500 Free" in SCY vs "400 Free" in LCM). */
  name: Record<Course, string>;
  /** Actual race distance in meters per course. */
  distance: Record<Course, number>;
  /** Nominal metric distance used to derive per-turn increments on standard events. */
  meterNominal: number;
}

const FREE = (name: string, scy: number, scm: number, pair: PairingKey) =>
  ({
    id: `${name.toLowerCase().replace(/ /g, '-')}-free`,
    stroke: 'free',
    pairing: pair,
    name: { SCY: `${name} Free`, SCM: `${name} Free`, LCM: `${name} Free` },
    distance: {
      SCY: Math.round((scy * 0.9144) * 100) / 100,
      SCM: scm,
      LCM: scm,
    },
    meterNominal: scy, // for standard events the nominal is the common distance
  }) as EventDef;

const STROKE_EVENT = (stroke: Stroke, name: string, distance: number) => ({
  id: `${name.toLowerCase().replace(/ /g, '-')}-${stroke}`,
  stroke,
  pairing: 'standard' as const,
  name: { SCY: `${name} ${strokeLabel(stroke)}`, SCM: `${name} ${strokeLabel(stroke)}`, LCM: `${name} ${strokeLabel(stroke)}` },
  distance: {
    SCY: Math.round(distance * 0.9144 * 100) / 100,
    SCM: distance,
    LCM: distance,
  },
  meterNominal: distance,
});

function strokeLabel(stroke: Stroke): string {
  switch (stroke) {
    case 'free':
      return 'Free';
    case 'back':
      return 'Back';
    case 'breast':
      return 'Breast';
    case 'fly':
      return 'Fly';
    case 'im':
      return 'IM';
  }
}

function distanceFree(
  id: string,
  scyName: string,
  metricName: string,
  scyYards: number,
  metricMeters: number,
  pairing: PairingKey,
): EventDef {
  return {
    id,
    stroke: 'free',
    pairing,
    name: { SCY: scyName, SCM: metricName, LCM: metricName },
    distance: {
      SCY: Math.round(scyYards * 0.9144 * 100) / 100,
      SCM: metricMeters,
      LCM: metricMeters,
    },
    meterNominal: metricMeters,
  };
}

export const EVENTS: EventDef[] = [
  // Freestyle — sprint & middle distance (same nominal distance everywhere)
  FREE('50', 50, 50, 'standard'),
  FREE('100', 100, 100, 'standard'),
  FREE('200', 200, 200, 'standard'),
  // Freestyle — distance events (paired across courses)
  distanceFree('dist400-free', '500 Free', '400 Free', 500, 400, 'long400'),
  distanceFree('dist800-free', '1000 Free', '800 Free', 1000, 800, 'long800'),
  distanceFree('dist1500-free', '1650 Free', '1500 Free', 1650, 1500, 'long1500'),
  // Backstroke
  STROKE_EVENT('back', '50', 50),
  STROKE_EVENT('back', '100', 100),
  STROKE_EVENT('back', '200', 200),
  // Breaststroke
  STROKE_EVENT('breast', '50', 50),
  STROKE_EVENT('breast', '100', 100),
  STROKE_EVENT('breast', '200', 200),
  // Butterfly
  STROKE_EVENT('fly', '50', 50),
  STROKE_EVENT('fly', '100', 100),
  STROKE_EVENT('fly', '200', 200),
  // Individual medley
  STROKE_EVENT('im', '100', 100),
  STROKE_EVENT('im', '200', 200),
  STROKE_EVENT('im', '400', 400),
];

/** Events selectable on a given course. */
export function eventsForCourse(_course: Course): EventDef[] {
  return EVENTS;
}

/** Events grouped by stroke for the event picker UI. */
export function eventsByStroke(course: Course, locale: Locale = 'en'): Array<{ stroke: Stroke; label: string; events: EventDef[] }> {
  const strokes: Stroke[] = ['free', 'back', 'breast', 'fly', 'im'];
  return strokes.map((stroke) => ({
    stroke,
    label: getStrokeLabel(stroke, locale),
    events: eventsForCourse(course).filter((e) => e.stroke === stroke),
  }));
}

export const COURSE_LONG_NAMES: Record<Course, string> = {
  SCY: 'Short Course Yards',
  SCM: 'Short Course Meters',
  LCM: 'Long Course Meters',
};

export const COURSE_POOL_LENGTH: Record<Course, string> = {
  SCY: '25 yards',
  SCM: '25 meters',
  LCM: '50 meters',
};