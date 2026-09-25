import { useState } from 'react';
import { formatSwimTime, paceForDistance, parseSwimTime } from '../lib/swimming/time';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';
import TimeInput from './calculator/TimeInput';

const SPLIT_LENGTHS = [
  { value: '25', label: 'per 25' },
  { value: '50', label: 'per 50' },
  { value: '100', label: 'per 100' },
];

const QUICK = ['200', '400', '500', '800', '1000', '1500', '1650'];

interface SplitRow {
  index: number;
  cumulativeSeconds: number;
  splitSeconds: number;
  per100: number;
}

export default function SplitCalculator() {
  const [unit, setUnit] = useState<'m' | 'yd'>('m');
  const [distance, setDistance] = useState('400');
  const [time, setTime] = useState('');
  const [splitLength, setSplitLength] = useState('100');
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<SplitRow[] | null>(null);

  // Per-100m pace in the chosen unit, used for labelling.
  const paceUnit = unit === 'yd' ? '100 yd' : '100 m';

  function handleConvert() {
    const total = Number(distance);
    if (!Number.isFinite(total) || total <= 0) {
      setRows(null);
      setError('Enter a race distance greater than zero.');
      return;
    }
    const seconds = parseSwimTime(time);
    if (seconds === null) {
      setRows(null);
      setError('Enter a valid total race time, for example 5:30.00.');
      return;
    }
    const phase = Number(splitLength);
    const count = total / phase;
    if (!Number.isInteger(count) || count <= 0) {
      setRows(null);
      setError(`The race distance is not divisible into ${phase}-unit splits.`);
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
          <p className="mb-1.5 text-sm font-medium text-ink-muted">Common Race Distances</p>
          <div className="flex flex-wrap gap-2">
            {QUICK.map((d) => {
              const unitLabel = unit === 'yd' ? 'yd' : 'm';
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
              Race Distance
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
                  label="Distance unit"
                  columns={2}
                  options={[
                    { value: 'm', label: 'Meters' },
                    { value: 'yd', label: 'Yards' },
                  ]}
                  value={unit}
                  onChange={(u) => setUnit(u)}
                />
              </div>
            </div>
          </div>

          <TimeInput id="split-time" value={time} onChange={setTime} placeholder="5:30.00" />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">Split Length</p>
          <SegmentedControl
            id="split-length"
            label="Split length"
            columns={3}
            options={SPLIT_LENGTHS}
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
          Generate Splits
        </button>
      </div>

      <div className="border-t border-hairline">
        {rows === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            Pick an event and time to generate even target splits.
          </div>
        ) : (
          <div className="animate-rise p-4 sm:p-6" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium uppercase tracking-wide text-ink-subtle">Even Target Splits</p>
              <p className="text-xs text-ink-tertiary">
                Split: {formatSwimTime(rows[0].splitSeconds)} · Pace: {formatSwimTime(rows[0].per100)} / {paceUnit}
              </p>
            </div>
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((row) => (
                <li
                  key={row.index}
                  className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3.5 py-2.5 text-sm"
                >
                  <span className="text-ink-muted">
                    {row.index}. <span className="text-ink-subtle">after {row.index * Number(splitLength)} {unit}</span>
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