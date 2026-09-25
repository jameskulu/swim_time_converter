import { useEffect, useMemo, useState } from 'react';
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
}

const COURSES: { value: Course; label: string; description: string }[] = [
  { value: 'SCY', label: 'SCY', description: '25 yd' },
  { value: 'SCM', label: 'SCM', description: '25 m' },
  { value: 'LCM', label: 'LCM', description: '50 m' },
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

export default function SwimCalculator({ from, to }: SwimCalculatorProps) {
  const [course, setCourse] = useState<Course>(from ?? 'SCY');
  const [toCourse, setToCourse] = useState<Course>(to ?? 'LCM');
  const [eventId, setEventId] = useState<string>('100-free');
  const [gender, setGender] = useState<'Men' | 'Women'>('Men');
  const [time, setTime] = useState('');
  const [results, setResults] = useState<ConvertResult[] | null>(null);
  const [targetSeconds, setTargetSeconds] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const event = EVENTS_BY_ID.get(eventId) ?? EVENTS[1];
  const targetCourse = toCourse;

  // Read deep-link params once: ?from&to&event&time
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get('from');
    const t = params.get('to');
    const ev = params.get('event');
    const tm = params.get('time');
    if (f && (f === 'SCY' || f === 'SCM' || f === 'LCM')) setCourse(f);
    if (t && (t === 'SCY' || t === 'SCM' || t === 'LCM')) setToCourse(t);
    if (ev && EVENTS_BY_ID.has(ev)) setEventId(ev);
    if (tm) setTime(tm);
  }, []);

  const result = useMemo(() => {
    if (!results) return null;
    return results[['SCY', 'SCM', 'LCM'].indexOf(targetCourse)] ?? null;
  }, [results, targetCourse]);

  function handleConvert() {
    const seconds = parseSwimTime(time);
    if (seconds === null) {
      setResults(null);
      setTargetSeconds(null);
      setError('Enter a valid time, for example 52.43 or 1:52.37.');
      return;
    }
    track('calculator_used', { course });

    try {
      const all = convertToAllCourses({
        courseFrom: course,
        event,
        seconds,
        gender,
        method: 'standard',
      });
      setResults(all);
      setTargetSeconds(seconds);
      setError(null);
      track('conversion_completed', { from: course, event: event.id, seconds });
    } catch (err) {
      setResults(null);
      setTargetSeconds(null);
      setError(err instanceof ConversionError ? err.message : 'Something went wrong with this conversion.');
    }
  }

  function resultText(): string {
    if (!results || targetSeconds === null) return '';
    const fromPart = `${formatSwimTime(targetSeconds)} ${event.name[course]} · ${course}`;
    const targetRow = ` ${formatSwimTime(results[['SCY', 'SCM', 'LCM'].indexOf(targetCourse)].seconds)} ${event.name[targetCourse]} · ${targetCourse}`;
    const all = results
      .map((r, i) => `${['SCY', 'SCM', 'LCM'][i]} ${formatSwimTime(r.seconds)}`)
      .join(' · ');
    return `Swim Time Converter: ${fromPart} →${targetRow}\nCompare: ${all}`;
  }

  async function handleCopy() {
    try {
      await copyToClipboard(resultText());
      setFeedback('Copied');
      track('copy_result');
    } catch {
      setFeedback('Copy blocked');
    } finally {
      window.setTimeout(() => setFeedback(null), 2000);
    }
  }

  async function handleShare() {
    const payload = {
      title: `Swim Time · ${event.name[course]}`,
      text: resultText(),
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
      } else {
        await copyToClipboard(payload.text + ' ' + payload.url);
        setFeedback('Link copied');
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
              Course
            </p>
            <SegmentedControl
              id="course"
              label="Convert from course"
              options={COURSES}
              value={course}
              onChange={(c) => setCourse(c)}
            />
          </section>

          {from && to && (
            <section className="space-y-1.5" aria-labelledby="to-course-label">
              <p id="to-course-label" className="text-sm font-medium text-ink-muted">
                Convert to
              </p>
              <SegmentedControl
                id="to-course"
                label="Convert to course"
                options={COURSES}
                value={toCourse}
                onChange={(c) => setToCourse(c)}
              />
            </section>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <EventSelector id="event" course={course} value={event.id} onChange={(ev) => setEventId(ev.id)} />

          <section className="space-y-1.5" aria-labelledby="gender-label">
            <p id="gender-label" className="text-sm font-medium text-ink-muted">
              Gender <span className="font-normal text-ink-tertiary">(used by some conversion models)</span>
            </p>
            <SegmentedControl
              id="gender"
              label="Gender"
              columns={2}
              options={[
                { value: 'Men', label: "Men's" },
                { value: 'Women', label: "Women's" },
              ]}
              value={gender}
              onChange={(g) => setGender(g)}
            />
          </section>
        </div>

        <TimeInput id="time" value={time} onChange={setTime} error={error} />

        <button
          type="button"
          onClick={handleConvert}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover active:bg-primary-focus"
        >
          Convert Time
        </button>

        <p className="text-xs leading-relaxed text-ink-tertiary">
          Standard conversion method (Colorado factor set). Results are estimates — different organizations and
          models may produce different numbers.
        </p>
      </div>

      {/* Results */}
      <div className="border-t border-hairline">
        {results === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            Enter a time and press <span className="mx-1 font-medium text-ink">Convert Time</span> to see the equivalent
            times.
          </div>
        ) : (
          <div className="animate-rise space-y-6 p-4 sm:p-6">
            <div aria-live="polite">
              <p className="text-sm font-medium uppercase tracking-wide text-ink-subtle">Equivalent Time</p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="font-mono text-4xl font-semibold tabular-nums tracking-tight text-ink sm:text-5xl">
                    {result ? formatSwimTime(result.seconds) : '—'}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {event.name[targetCourse]} · {targetCourse}
                  </p>
                </div>
                <div className="text-right text-sm text-ink-subtle">
                  <p>Converted from</p>
                  <p className="font-mono tabular-nums text-ink-muted">
                    {targetSeconds !== null ? formatSwimTime(targetSeconds) : ''} {event.name[course]} · {course}
                  </p>
                </div>
              </div>
            </div>

            <CourseComparison results={results} sourceCourse={course} />

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Result actions">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-ink-subtle" aria-hidden="true">
                  <rect x="6.5" y="6.5" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4" />
                  <path d="M9 5h4.5a1 1 0 0 1 1 1V11" stroke="currentColor" stroke-width="1.4" />
                </svg>
                Copy
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-ink-subtle" aria-hidden="true">
                  <circle cx="5.5" cy="10" r="2" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="14.5" cy="4.5" r="2" stroke="currentColor" stroke-width="1.4" />
                  <circle cx="14.5" cy="15.5" r="2" stroke="currentColor" stroke-width="1.4" />
                  <path d="m7.2 8.8 6-3M7.2 11.2l6 3" stroke="currentColor" stroke-width="1.4" />
                </svg>
                Share
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-ink-subtle transition-colors hover:text-ink"
              >
                Reset
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