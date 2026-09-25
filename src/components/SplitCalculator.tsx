import { useState } from 'react';
import { formatCalculatorMessage, getCalculatorMessages, type Locale } from '../i18n/calculator';
import { formatSwimTime, paceForDistance, parseSwimTime } from '../lib/swimming/time';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';
import TimeInput from './calculator/TimeInput';

const SPLIT_LENGTHS = ['25', '50', '100'];

const QUICK = ['200', '400', '500', '800', '1000', '1500', '1650'];

interface SplitRow {
  index: number;
  cumulativeSeconds: number;
  splitSeconds: number;
  per100: number;
}

export default function SplitCalculator({ locale = 'en' }: { locale?: Locale }) {
  const messages = getCalculatorMessages(locale);
  const splitLengths = SPLIT_LENGTHS.map((distance) => ({
    value: distance,
    label: formatCalculatorMessage(messages.split.perOption, { distance }),
  }));
  const [unit, setUnit] = useState<'m' | 'yd'>('m');
  const [distance, setDistance] = useState('400');
  const [time, setTime] = useState('');
  const [splitLength, setSplitLength] = useState('100');
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<SplitRow[] | null>(null);
  const unitLabel = messages.units.distanceShort[unit];

  // Per-100m pace in the chosen unit, used for labelling.
  const paceUnit = messages.units.pace100[unit];

  function handleConvert() {
    const total = Number(distance);
    if (!Number.isFinite(total) || total <= 0) {
      setRows(null);
      setError(messages.split.errors.distance);
      return;
    }
    const seconds = parseSwimTime(time);
    if (seconds === null) {
      setRows(null);
      setError(messages.split.errors.time);
      return;
    }
    const phase = Number(splitLength);
    const count = total / phase;
    if (!Number.isInteger(count) || count <= 0) {
      setRows(null);
      setError(formatCalculatorMessage(messages.split.errors.divisibility, { phase }));
      return;
    }

    track('split_calculator_used', { unit, distance: total, count });

    const splitSeconds = seconds / count;
    const out: SplitRow[] = [];
    let cumulative = 0;
    for (let i = 0; i < count; i++) {
      cumulative = Math.round((cumulative + splitSeconds) * 100) / 100;
      out.push({
        index: i + 1,
        cumulativeSeconds: cumulative,
        splitSeconds: Math.round(splitSeconds * 100) / 100,
        per100: paceForDistance(splitSeconds, phase, 100),
      });
    }
    setRows(out);
    setError(null);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">{messages.split.commonRaceDistances}</p>
          <div className="flex flex-wrap gap-2">
            {QUICK.map((d) => {
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistance(unit === 'yd' && d === '400' ? '500' : d)}
                  className={[
                    'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                    distance === d
                      ? 'border-primary/40 bg-primary/10 text-ink'
                      : 'border-hairline bg-surface-1 text-ink-muted hover:text-ink',
                  ].join(' ')}
                >
                  {d} {unitLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="split-distance" className="mb-1.5 block text-sm font-medium text-ink-muted">
              {messages.split.raceDistance}
            </label>
            <div className="flex gap-2">
              <input
                id="split-distance"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm transition-colors hover:border-hairline-strong focus:outline-2 focus:outline-primary"
              />
              <div className="shrink-0 basis-40">
                <SegmentedControl
                  id="split-unit"
                  label={messages.split.distanceUnit}
                  columns={2}
                  options={[
                    { value: 'm', label: messages.units.meters },
                    { value: 'yd', label: messages.units.yards },
                  ]}
                  value={unit}
                  onChange={(u) => setUnit(u)}
                />
              </div>
            </div>
          </div>

          <TimeInput id="split-time" value={time} onChange={setTime} placeholder="5:30.00" locale={locale} />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">{messages.split.splitLength}</p>
          <SegmentedControl
            id="split-length"
            label={messages.split.splitLength}
            columns={3}
            options={splitLengths}
            value={splitLength}
            onChange={(s) => setSplitLength(s)}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleConvert}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover active:bg-primary-focus"
        >
          {messages.split.generate}
        </button>
      </div>

      <div className="border-t border-hairline">
        {rows === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            {messages.split.empty}
          </div>
        ) : (
          <div className="animate-rise p-4 sm:p-6" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium uppercase tracking-wide text-ink-subtle">{messages.split.results}</p>
              <p className="text-xs text-ink-tertiary">
                {formatCalculatorMessage(messages.split.splitSummary, {
                  split: formatSwimTime(rows[0].splitSeconds),
                  pace: formatSwimTime(rows[0].per100),
                  paceUnit,
                })}
              </p>
            </div>
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((row) => (
                <li
                  key={row.index}
                  className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3.5 py-2.5 text-sm"
                >
                  <span className="text-ink-muted">
                     {row.index}. <span className="text-ink-subtle">{formatCalculatorMessage(messages.split.after, {
                       distance: row.index * Number(splitLength),
                       unit: unitLabel,
                     })}</span>
                  </span>
                  <span className="font-mono tabular-nums text-ink">{formatSwimTime(row.cumulativeSeconds)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}