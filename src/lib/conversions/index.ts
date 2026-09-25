import type { Course } from '../swimming/events';
import { standardConvert } from './standard';
import type { ConvertRequest, ConvertResult } from './types';
import { ConversionError } from './types';

export type { ConvertRequest, ConvertResult, Method, Gender } from './types';
export { ConversionError } from './types';
export { STANDARD_TABLE } from './standard';

/** Map a source time to an equivalent time on the requested course. */
export function convertTime(request: ConvertRequest): ConvertResult {
  // Only the "standard" methodology ships in v1; a switch here is where new
  // methods (NCAA, performance-based) register.
  switch (request.method) {
    case 'standard':
    default:
      return toResult(request, standardConvert(request));
  }
}

function toResult(request: ConvertRequest, converted: { seconds: number }): ConvertResult {
  return {
    eventTo: request.event,
    seconds: converted.seconds,
  };
}

/** Convert a source time into every course, for the "compare all courses" view. */
export function convertToAllCourses(request: Omit<ConvertRequest, 'courseTo'>): Array<ConvertResult> {
  const courses: Course[] = ['SCY', 'SCM', 'LCM'];
  return courses.map((course) => convertTime({ ...request, courseTo: course }));
}

/** Convenience wrapper that returns null instead of throwing for the UI. */
export function tryConvertTime(request: ConvertRequest): ConvertResult | { error: string; code: ConversionError['code'] } {
  try {
    return convertTime(request);
  } catch (error) {
    if (error instanceof ConversionError) return { error: error.message, code: error.code };
    return { error: 'Something went wrong with this conversion.', code: 'INVALID_INPUT' };
  }
}