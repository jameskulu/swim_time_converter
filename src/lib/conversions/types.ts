import type { Course, EventDef } from '../swimming/events';

/** Conversion models. Only "standard" ships in v1; the type is extensible. */
export type Method = 'standard' | 'ncaa' | 'performance';

export type Gender = 'Men' | 'Women';

export interface ConvertRequest {
  courseFrom: Course;
  courseTo: Course;
  event: EventDef;
  /** Time in seconds. */
  seconds: number;
  /** Reserved for methodology models that are gender-dependent (e.g. NCAA). */
  gender: Gender;
  method: Method;
}

export interface ConvertResult {
  /** The same nominal event, rendered for the target course. */
  eventTo: EventDef;
  /** Equivalent time in seconds (rounded to the nearest hundredth). */
  seconds: number;
}

/** Error thrown by the conversion engine for invalid conversions. */
export class ConversionError extends Error {
  code: 'INVALID_INPUT' | 'UNSUPPORTED_PAIR' | 'UNREASONABLE_TIME';
  constructor(code: ConversionError['code'], message: string) {
    super(message);
    this.name = 'ConversionError';
    this.code = code;
  }
}

/** A t_out = t_in * factor + increment equation (or its inverse when `inverse`). */
export type ConversionEquation = { factor: number; increment: number; inverse?: boolean };

export type CoursePair = `${Course}|${Course}`;

/** Stroke keys used by per-turn conversion increments. */
export type TurnStrokeKey = 'free' | 'back' | 'breast' | 'fly' | 'im';

export interface LongPairFactors {
  factor: number;
  increment: number;
}

/** Per-methodology factor tables (the "standard" method ships in v1). */
export interface ConversionMethodTable {
  turnSeconds: Record<TurnStrokeKey, number>;
  long: { long400: LongPairFactors; long800: LongPairFactors; long1500: LongPairFactors } | null;
}