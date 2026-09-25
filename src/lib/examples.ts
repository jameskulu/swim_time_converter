import type { Locale } from '../i18n/config';
import { getEventLabel } from '../i18n/calculator';
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
export function buildExamples(from: Course, to: Course, locale: Locale = 'en'): Example[] {
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
      locale,
    });
    const needsPairNote = event.pairing !== 'standard';
    const fromName = getEventLabel(event, from, locale);
    const toName = getEventLabel(event, to, locale);
    const label = locale === 'en' && sample.label
      ? sample.label
      : sample.label
        ? fromName
        : `${fromName} → ${toName}`;
    return {
      label: needsPairNote && !sample.label ? `${label}` : label,
      fromText: `${formatSwimTime(sample.seconds)} ${fromName}`,
      toText: `${formatSwimTime(result.seconds)} ${toName}`,
    };
  });
}