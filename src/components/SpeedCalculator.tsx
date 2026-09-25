import { useState } from 'react';
import { projectedTimes, speedResult, type DistanceUnit } from '../lib/swimming/speed';
import { formatSwimTime, isPlausibleTime, parseSwimTime } from '../lib/swimming/time';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';
import TimeInput from './calculator/TimeInput';

interface SpeedOutput {
  result: NonNullable<ReturnType<typeof speedResult>>;
  projected: { distance: number; seconds: number; wide: boolean }[];
}

export default function SpeedCalculator() {
  const [unit, setUnit] = useState<DistanceUnit>('m');
  const [distance, setDistance] = useState('400');
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeedOutput | null>(null);

  function handleCalculate() {
    const dist = Number(distance);
    const seconds = parseSwimTime(time);

    if (!Number.isFinite(dist) || dist <= 0) {
      setResult(null);
      setError('Enter a benchmark distance greater than zero.');
      return;
    }
    if (seconds === null) {
      setResult(null);
      setError('Enter a valid benchmark time, for example 4:20.00.');
      return;
    }
    if (!isPlausibleTime(seconds, dist)) {
      setResult(null);
      setError('That time is faster than any plausible record — double-check it.');
      return;
    }

    const out = speedResult(seconds, dist, unit);
    if (!out) {
      setResult(null);
      setError('Could not compute a speed from those inputs.');
      return;
    }

    const metric: number[] = [200, 400, 750, 1000];
    const imperial: number[] = [200, 400, 500, 1000, 1650];
    const list = unit === 'yd' ? imperial : metric;
    const extra: { distance: number; seconds: number }[] = unit === 'yd'
      ? [{ distance: 1760, seconds: out.mileSeconds }]
      : unit === 'm'
        ? [{ distance: 1500, seconds: out.oneKmSeconds * 1.5 }]
        : [];
    const projected = [
      ...projectedTimes(seconds, dist, unit, list).map((p) => ({ ...p, wide: false })),
      ...extra.map((p) => ({ ...p, wide: true })),
    ];

    setError(null);
    setResult({ result: out, projected });
    track('speed_calculator_used', { unit, distance: dist, time: seconds });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink-muted">Benchmark</p>
            <p className="mt-0.5 text-xs text-ink-tertiary">Any swim you already know the time for</p>
          </div>
          <div className="w-40">
            <SegmentedControl
              id="speed-unit"
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

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="speed-distance" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Distance ({unit})
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                id="speed-distance"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
              />
              {(unit === 'm' ? ['200', '400', '750', '1000', '1500'] : ['200', '500', '1000', '1650']).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistance(d)}
                  className={[
                    'rounded-md border px-2.5 py-1 text-sm font-medium transition-colors',
                    distance === d
                      ? 'border-primary/40 bg-primary/10 text-ink'
                      : 'border-hairline bg-surface-1 text-ink-muted hover:text-ink',
                  ].join(' ')}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <TimeInput id="speed-time" value={time} onChange={setTime} placeholder="4:20.00" />
        </div>

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleCalculate}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover active:bg-primary-focus"
        >
          Calculate Speed
        </button>
      </div>

      <div className="border-t border-hairline">
        {result === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            Enter a benchmark time and distance to see pace, speed and projected race times.
          </div>
        ) : (
          <div className="animate-rise space-y-8 p-4 sm:p-6" aria-live="polite">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Pace per 100 m</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.result.pacePer100M)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Pace per 100 yd</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.result.pacePer100Yd)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Speed</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {result.result.speedMps.toFixed(2)} m/s
                </p>
                <p className="mt-0.5 text-xs text-ink-subtle">
                  {result.result.speedKmph.toFixed(1)} km/h · {result.result.speedMph.toFixed(1)} mph
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Projected Race Times</p>
              <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {result.projected.map((row) => (
                  <li
                    key={row.distance}
                    className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3.5 py-2.5 text-sm"
                  >
                    <span className="text-ink-muted">
                      {row.wide && <span className="mr-1 text-primary">★</span>}
                      {row.distance} {row.distance >= 1650 ? 'yd (pool mile)' : unit}
                    </span>
                    <span className="font-mono tabular-nums text-ink">{formatSwimTime(row.seconds)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Key Milestones</p>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                  <span className="text-ink-muted">1 km</span>
                  <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.result.oneKmSeconds)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                  <span className="text-ink-muted">Pool mile (1650 yd)</span>
                  <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.result.poolMileSeconds)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                  <span className="text-ink-muted">True mile (1760 yd)</span>
                  <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.result.mileSeconds)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}