import { useState } from 'react';
import { distanceForLengths, lengthsForDistance, POOL_OPTIONS } from '../lib/swimming/lengths';
import { METERS_PER_YARD, YARDS_PER_METER, type DistanceUnit } from '../lib/swimming/speed';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';

type PoolId = 'scy-25' | 'scm-25' | 'lcm-50';
type Direction = 'distance' | 'lengths';

interface LengthsOutput {
  fullLengths: number;
  remainder: number;
  totalInPoolUnits: number;
  poolLength: number;
  poolUnit: DistanceUnit;
  lengthLabel: string;
  otherUnit: DistanceUnit;
  otherValue: number;
  distanceLabel: string;
}

export default function LengthsConverter() {
  const [pool, setPool] = useState<PoolId>('scm-25');
  const [direction, setDirection] = useState<Direction>('distance');
  const [unit, setUnit] = useState<DistanceUnit>('m');
  const [distance, setDistance] = useState('1500');
  const [lengths, setLengths] = useState('30');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LengthsOutput | null>(null);

  const poolOption = POOL_OPTIONS.find((p) => p.id === pool) ?? POOL_OPTIONS[1];

  const toMeters = (value: number, valueUnit: DistanceUnit) => (valueUnit === 'yd' ? value * METERS_PER_YARD : value);
  const fromMeters = (value: number, target: DistanceUnit) => (target === 'yd' ? value * YARDS_PER_METER : value);

  function handleConvert() {
    if (direction === 'lengths') {
      const n = Number(lengths);
      if (!Number.isInteger(n) || n < 0) {
        setResult(null);
        setError('Enter the number of lengths (a whole number).');
        return;
      }
      const poolUnits = distanceForLengths(n, poolOption.length);
      if (poolUnits === null) {
        setResult(null);
        setError('Could not compute that distance.');
        return;
      }
      const shownUnit: DistanceUnit = unit === poolOption.unit ? poolOption.unit : unit;
      const shownValue = unit === poolOption.unit ? poolUnits : fromMeters(toMeters(poolUnits, poolOption.unit), unit);
      const otherUnit: DistanceUnit = shownUnit === 'm' ? 'yd' : 'm';
      const otherValue = shownUnit === 'm' ? shownValue * YARDS_PER_METER : shownValue * METERS_PER_YARD;
      setError(null);
      setResult({
        fullLengths: n,
        remainder: 0,
        totalInPoolUnits: poolUnits,
        poolLength: poolOption.length,
        poolUnit: poolOption.unit,
        lengthLabel: `${n} × ${poolOption.length} ${poolOption.unit}`,
        otherUnit,
        otherValue,
        distanceLabel: `${shownValue} ${shownUnit}`,
      });
      track('lengths_calculator_used', { direction: 'lengths', pool, count: n });
      return;
    }

    const d = Number(distance);
    if (!Number.isFinite(d) || d <= 0) {
      setResult(null);
      setError('Enter a swim distance greater than zero.');
      return;
    }
    const inPoolUnits = (toMeters(d, unit) / toMeters(poolOption.length, poolOption.unit)) * poolOption.length;
    const poolLength = poolOption.length;
    const full = lengthsForDistance(inPoolUnits, poolLength);
    if (!full) {
      setResult(null);
      setError('Could not compute that length count.');
      return;
    }
    const shownValue = toMeters(inPoolUnits, poolOption.unit) / (unit === 'yd' ? METERS_PER_YARD : 1);
    const shownUnit = unit;
    const otherUnit: DistanceUnit = shownUnit === 'm' ? 'yd' : 'm';
    const otherValue = shownUnit === 'm' ? shownValue * YARDS_PER_METER : shownValue * METERS_PER_YARD;
    setError(null);
    setResult({
      ...full,
      totalInPoolUnits: inPoolUnits,
      poolLength,
      poolUnit: poolOption.unit,
      lengthLabel: `${poolOption.label}`,
      otherUnit,
      otherValue,
      distanceLabel: `${shownValue} ${shownUnit}`,
    });
    track('lengths_calculator_used', { direction: 'distance', pool, distance: d, unit });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">Pool Length</p>
          <SegmentedControl
            id="lengths-pool"
            label="Pool length"
            columns={3}
            options={POOL_OPTIONS.map((p) => ({
              value: p.id as PoolId,
              label: p.label.split('(')[0].trim(),
              description: p.label.split('(')[1]?.replace(')', ''),
            }))}
            value={pool}
            onChange={(p) => setPool(p)}
          />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">What do you want to know?</p>
          <SegmentedControl
            id="lengths-direction"
            label="Direction"
            columns={2}
            options={[
              { value: 'distance', label: 'Distance → lengths' },
              { value: 'lengths', label: 'Lengths → distance' },
            ]}
            value={direction}
            onChange={(d) => setDirection(d)}
          />
        </div>

        {direction === 'distance' ? (
          <div>
            <label htmlFor="lengths-distance" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Swim Distance
            </label>
            <div className="flex flex-wrap gap-2">
              <div className="flex w-full gap-2">
                <input
                  id="lengths-distance"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full min-w-0 rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
                />
                <div className="shrink-0 basis-40">
                  <SegmentedControl
                    id="lengths-unit"
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
              {(unit === 'm' ? ['200', '400', '1000', '1500'] : ['200', '500', '1000', '1650']).map((d) => (
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
        ) : (
          <div>
            <label htmlFor="lengths-count" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Number of Lengths
            </label>
            <input
              id="lengths-count"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={lengths}
              onChange={(e) => setLengths(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
            />
            <p className="mt-1.5 text-xs text-ink-tertiary">
              A length is one crossing of the pool; a lap is two lengths.
            </p>
          </div>
        )}

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
          Convert
        </button>
      </div>

      <div className="border-t border-hairline">
        {result === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            {direction === 'distance'
              ? 'Enter a swim distance to see how many pool lengths that is.'
              : 'Enter the number of lengths to see the distance you covered.'}
          </div>
        ) : (
          <div className="animate-rise p-4 sm:p-6" aria-live="polite">
            <div className="rounded-lg border border-hairline bg-canvas p-4">
              {direction === 'distance' ? (
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide text-ink-subtle">{result.lengthLabel}</p>
                  <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-ink">
                    {result.fullLengths}
                    <span className="ml-1 text-base font-normal text-ink-subtle">lengths</span>
                  </p>
                  {result.remainder > 0 && (
                    <p className="mt-1 text-sm text-ink-subtle">
                      …plus {Math.round(result.remainder * 100) / 100} of one length ({Math.round(fromMeters(toMeters(result.remainder * result.poolLength, result.poolUnit), unit) * 100) / 100} {unit})
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide text-ink-subtle">{result.lengthLabel}</p>
                  <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-ink">
                    {Math.round(fromMeters(toMeters(result.totalInPoolUnits, result.poolUnit), unit) * 100) / 100}
                    <span className="ml-1 text-base font-normal text-ink-subtle">{unit}</span>
                  </p>
                  <p className="mt-2 text-sm text-ink-subtle">
                    ≈ {Math.round(result.otherValue * 100) / 100} {result.otherUnit}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}