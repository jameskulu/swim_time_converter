import { useEffect, useMemo, useState } from 'react';
import { getCalculatorMessages, getEventLabel, type Locale } from '../../i18n/calculator';
import type { Course } from '../../lib/swimming/events';
import { EVENTS } from '../../lib/swimming/events';
import { convertToAllCourses, type ConvertResult, ConversionError } from '../../lib/conversions';
import { formatSwimTime, parseSwimTime } from '../../lib/swimming/time';
import { track } from '../../lib/analytics';
import SegmentedControl from './SegmentedControl';
import EventSelector from './EventSelector';
import TimeInput from './TimeInput';
import CourseComparison from './CourseComparison';

interface SwimCalculatorProps {
  /** Preset source course (e.g. on SCY-to-LCM landing pages). */
  from?: Course;
  /** Preset target course; when set the headline targets this course. */
  to?: Course;
  locale?: Locale;
}

const COURSES: { value: Course; label: string }[] = [
  { value: 'SCY', label: 'SCY' },
  { value: 'SCM', label: 'SCM' },
  { value: 'LCM', label: 'LCM' },
];

const EVENTS_BY_ID = new Map(EVENTS.map((e) => [e.id, e]));

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // fall through to the legacy path
    }
  }
  await fallbackCopy(text);
}

function fallbackCopy(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try {
      const doc = document as unknown as { execCommand(commandId: string, ui?: boolean, value?: string): boolean };
      if (!doc.execCommand('copy')) reject(new Error('copy failed'));
      else resolve();
    } catch {
      reject(new Error('copy failed'));
    } finally {
      document.body.removeChild(area);
    }
  });
}

export default function SwimCalculator({ from, to, locale = 'en' }: SwimCalculatorProps) {
  const messages = getCalculatorMessages(locale);
  const courseOptions = COURSES.map((option) => ({
    ...option,
    description: `${option.value === 'LCM' ? 50 : 25} ${messages.units.distanceShort[option.value === 'SCY' ? 'yd' : 'm']}`,
  }));

  const initialCourse = from ?? 'SCY';
  const initialToCourse = to ?? (initialCourse === 'LCM' ? 'SCY' : 'LCM');
  const initialEventId = '100-free';
  const initialEvent = EVENTS_BY_ID.get(initialEventId) ?? EVENTS[1];
  const initialTime = '52.43';
  const initialSeconds = 52.43;

  const [course, setCourse] = useState<Course>(initialCourse);
  const [toCourse, setToCourse] = useState<Course>(initialToCourse);
  const [eventId, setEventId] = useState<string>(initialEventId);
  const [gender, setGender] = useState<'Men' | 'Women'>('Men');
  const [time, setTime] = useState(initialTime);

  // Compute initial conversion so the calculator renders with complete results on load
  const initialResults = useMemo(() => {
    try {
      return convertToAllCourses({
        courseFrom: initialCourse,
        event: initialEvent,
        seconds: initialSeconds,
        gender: 'Men',
        method: 'standard',
        locale,
      });
    } catch {
      return null;
    }
  }, [initialCourse, initialEvent, locale]);

  const [results, setResults] = useState<ConvertResult[] | null>(() => initialResults);
  const [targetSeconds, setTargetSeconds] = useState<number | null>(() => initialSeconds);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const event = EVENTS_BY_ID.get(eventId) ?? EVENTS[1];
  const targetCourse = toCourse;

  function runConvert(
    cFrom = course,
    cTo = toCourse,
    evId = eventId,
    g = gender,
    tStr = time,
    isManual = false
  ) {
    const curEvent = EVENTS_BY_ID.get(evId) ?? EVENTS[1];
    const seconds = parseSwimTime(tStr);
    if (seconds === null) {
      if (isManual) {
        setResults(null);
        setTargetSeconds(null);
        setError(messages.conversion.invalidTime);
      }
      return;
    }
    if (isManual) {
      track('calculator_used', { course: cFrom });
    }

    try {
      const all = convertToAllCourses({
        courseFrom: cFrom,
        event: curEvent,
        seconds,
        gender: g,
        method: 'standard',
        locale,
      });
      setResults(all);
      setTargetSeconds(seconds);
      setError(null);
      if (isManual) {
        track('conversion_completed', { from: cFrom, event: curEvent.id, seconds });
      }
    } catch (err) {
      if (isManual) {
        setResults(null);
        setTargetSeconds(null);
        setError(err instanceof ConversionError ? err.message : messages.conversion.genericError);
      }
    }
  }

  // Read deep-link params once: ?from&to&event&time
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get('from');
    const t = params.get('to');
    const ev = params.get('event');
    const tm = params.get('time');

    const nextCourse = (f === 'SCY' || f === 'SCM' || f === 'LCM') ? f : course;
    const nextToCourse = (t === 'SCY' || t === 'SCM' || t === 'LCM') ? t : toCourse;
    const nextEventId = (ev && EVENTS_BY_ID.has(ev)) ? ev : eventId;
    const nextTime = tm ? tm : time;

    if (f && (f === 'SCY' || f === 'SCM' || f === 'LCM')) setCourse(f);
    if (t && (t === 'SCY' || t === 'SCM' || t === 'LCM')) setToCourse(t);
    if (ev && EVENTS_BY_ID.has(ev)) setEventId(ev);
    if (tm) setTime(tm);

    if (f || t || ev || tm) {
      runConvert(nextCourse, nextToCourse, nextEventId, gender, nextTime, false);
    }
  }, []);

  const result = useMemo(() => {
    if (!results) return null;
    return results[['SCY', 'SCM', 'LCM'].indexOf(targetCourse)] ?? null;
  }, [results, targetCourse]);

  function handleConvert() {
    runConvert(course, toCourse, eventId, gender, time, true);
  }

  function handleCourseChange(c: Course) {
    setCourse(c);
    runConvert(c, toCourse, eventId, gender, time, false);
  }

  function handleToCourseChange(t: Course) {
    setToCourse(t);
  }

  function handleEventChange(ev: { id: string }) {
    setEventId(ev.id);
    runConvert(course, toCourse, ev.id, gender, time, false);
  }

  function handleGenderChange(g: 'Men' | 'Women') {
    setGender(g);
    runConvert(course, toCourse, eventId, g, time, false);
  }

  function handleTimeChange(newTime: string) {
    setTime(newTime);
    if (error) setError(null);
  }

  function resultText(): string {
    if (!results || targetSeconds === null) return '';
    const fromPart = `${formatSwimTime(targetSeconds)} ${getEventLabel(event, course, locale)} · ${course}`;
    const targetIdx = ['SCY', 'SCM', 'LCM'].indexOf(targetCourse);
    const targetRow = results[targetIdx]
      ? ` ${formatSwimTime(results[targetIdx].seconds)} ${getEventLabel(event, targetCourse, locale)} · ${targetCourse}`
      : '';
    const all = results
      .map((r, i) => `${['SCY', 'SCM', 'LCM'][i]} ${formatSwimTime(r.seconds)}`)
      .join(' · ');
    return `${messages.conversion.resultTitle}: ${fromPart} →${targetRow}\n${messages.courses.compare}: ${all}`;
  }

  async function handleCopy() {
    try {
      await copyToClipboard(resultText());
      setFeedback(messages.conversion.copied);
      track('copy_result');
    } catch {
      setFeedback(messages.conversion.copyBlocked);
    } finally {
      window.setTimeout(() => setFeedback(null), 2000);
    }
  }

  async function handleShare() {
    const payload = {
      title: `${messages.conversion.shareTitle} · ${getEventLabel(event, course, locale)}`,
      text: resultText(),
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else {
        await copyToClipboard(payload.text + ' ' + payload.url);
        setFeedback(messages.conversion.linkCopied);
      }
      track('share_result');
    } catch {
      /* user cancelled */
    } finally {
      window.setTimeout(() => setFeedback(null), 2000);
    }
  }

  function handleReset() {
    setTime('');
    setResults(null);
    setTargetSeconds(null);
    setError(null);
    setFeedback(null);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Course selection */}
        <div className={from && to ? 'grid gap-6 sm:grid-cols-2' : 'space-y-6'}>
          <section className="space-y-1.5" aria-labelledby="course-label">
            <p id="course-label" className="text-sm font-medium text-ink-muted">
              {messages.courses.label}
            </p>
            <SegmentedControl
              id="course"
              label={messages.courses.convertFromCourse}
              options={courseOptions}
              value={course}
              onChange={handleCourseChange}
            />
            <p className="mt-2 text-xs leading-relaxed text-ink-tertiary">
              {messages.courses.courseLegend}
            </p>
          </section>

          {from && to && (
            <section className="space-y-1.5" aria-labelledby="to-course-label">
              <p id="to-course-label" className="text-sm font-medium text-ink-muted">
                {messages.courses.convertTo}
              </p>
              <SegmentedControl
                id="to-course"
                label={messages.courses.convertToCourse}
                options={courseOptions}
                value={toCourse}
                onChange={handleToCourseChange}
              />
            </section>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <EventSelector id="event" course={course} value={event.id} onChange={handleEventChange} locale={locale} />

          <section className="space-y-1.5" aria-labelledby="gender-label">
            <p id="gender-label" className="text-sm font-medium text-ink-muted">
              {messages.gender.label} <span className="font-normal text-ink-tertiary">{messages.gender.note}</span>
            </p>
            <SegmentedControl
              id="gender"
              label={messages.gender.label}
              columns={2}
              options={[
                { value: 'Men', label: messages.gender.men },
                { value: 'Women', label: messages.gender.women },
              ]}
              value={gender}
              onChange={handleGenderChange}
            />
          </section>
        </div>

        <TimeInput
          id="time"
          value={time}
          onChange={handleTimeChange}
          onEnter={handleConvert}
          error={error}
          locale={locale}
          placeholder="52.43 or 1:52.37"
        />

        <button
          type="button"
          onClick={handleConvert}
          className="w-full cursor-pointer rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover active:bg-primary-focus"
        >
          {messages.conversion.button}
        </button>

        <p className="text-xs leading-relaxed text-ink-tertiary">
          {messages.conversion.methodNote}
        </p>
      </div>

      {/* Results */}
      <div className="border-t border-hairline">
        {results === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            {messages.courses.resultEmptyBefore}
            <span className="mx-1 font-medium text-ink">{messages.courses.resultEmptyAction}</span>
            {messages.courses.resultEmptyAfter}
          </div>
        ) : (
          <div className="animate-rise space-y-6 p-4 sm:p-6">
            <div aria-live="polite">
              <p className="text-sm font-medium uppercase tracking-wide text-ink-subtle">{messages.courses.resultHeading}</p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight text-ink sm:text-5xl">
                    {result ? formatSwimTime(result.seconds) : '—'}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {getEventLabel(event, targetCourse, locale)} · {targetCourse}
                  </p>
                </div>
                <div className="text-right text-sm text-ink-subtle">
                  <p>{messages.courses.convertedFrom}</p>
                  <p className="font-mono tabular-nums text-ink-muted">
                    {targetSeconds !== null ? formatSwimTime(targetSeconds) : ''} {getEventLabel(event, course, locale)} · {course}
                  </p>
                </div>
              </div>
            </div>

            <CourseComparison results={results} sourceCourse={course} locale={locale} />

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label={messages.courses.resultActions}>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-ink-subtle" aria-hidden="true">
                  <rect x="6.5" y="6.5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M9 5h4.5a1 1 0 0 1 1 1V11" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                {messages.conversion.copy}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-ink-subtle" aria-hidden="true">
                  <circle cx="5.5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="14.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="14.5" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="m7.2 8.8 6-3M7.2 11.2l6 3" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                {messages.conversion.share}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-ink-subtle transition-colors hover:text-ink"
              >
                {messages.conversion.reset}
              </button>
              <span className="sr-only" aria-live="polite">
                {feedback}
              </span>
              {feedback && <span className="text-sm font-medium text-success">{feedback}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}