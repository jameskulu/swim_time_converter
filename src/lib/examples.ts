import type { Course } from './swimming/events';
import { EVENTS } from './swimming/events';
import { convertTime } from './conversions';
import { formatSwimTime } from './swimming/time';

export interface Example {
  label: string;
  fromText: string;
  toText: string;
}

/** Worked examples for a from->to pair, computed with the standard methodology. */
export function buildExamples(from: Course, to: Course): Example[] {
  const samples = [
    { eventId: '100-free', seconds: 52.43, label: '100 Free' },
    { eventId: '200-free', seconds: 112.37, label: '200 Free' },
    { eventId: 'dist400-free', seconds: 272.15, label: null },
  ];

  return samples.map((sample) => {
    const event = EVENTS.find((e) => e.id === sample.eventId)!;
    const result = convertTime({
      courseFrom: from,
      courseTo: to,
      event,
      seconds: sample.seconds,
      gender: 'Men',
      method: 'standard',
    });
    const needsPairNote = event.pairing !== 'standard';
    const label =
      sample.label ?? `${event.name[from]} → ${event.name[to]}`;
    return {
      label: needsPairNote && !sample.label ? `${label}` : label,
      fromText: `${formatSwimTime(sample.seconds)} ${event.name[from]}`,
      toText: `${formatSwimTime(result.seconds)} ${event.name[to]}`,
    };
  });
}