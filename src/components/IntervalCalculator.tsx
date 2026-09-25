import { useState } from 'react';
import { planInterval, roundSendOff } from '../lib/swimming/interval';
import { formatSwimTime, formatSeconds, parseSwimTime } from '../lib/swimming/time';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';
import TimeInput from './calculator/TimeInput';

type Mode = 'rest' | 'sendoff';

interface IntervalOutput {
  repeatSeconds: number;
  sendOffSeconds: number;
  restSeconds: number;
  totalDistance: number;
  totalSwimSeconds: number;
  elapsedSeconds: number;
  leaveTimes: number[];
  sendOff5: number;
  sendOff10: number;
}

export default function IntervalCalculator() {
  const [unit, setUnit] = useState<'m' | 'yd'>('m');
  const [reps, setReps] = useState('8');
  const [distance, setDistance] = useState('100');
  const [pace, setPace] = useState('');
  const [rest, setRest] = useState('15');
  const [sendOff, setSendOff] = useState('');
  const [mode, setMode] = useState<Mode>('rest');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IntervalOutput | null>(null);

  function parseSecondsOrMiss(input: string): number {
    if (input.trim() === '') return NaN;
    const n = Number(input);
    return Number.isFinite(n) ? n : NaN;
  }

  function handlePlan() {
    const count = Number(reps);
    const distPerRep = Number(distance);
    const paceSeconds = parseSwimTime(pace);

    if (!Number.isInteger(count) || count < 1 || count > 200) {
      setResult(null);
      setError('Enter a repeat count between 1 and 200.');
      return;
    }
    if (!Number.isFinite(distPerRep) || distPerRep <= 0) {
      setResult(null);
      setError('Enter a distance per repeat greater than zero.');
      return;
    }
    if (paceSeconds === null) {
      setResult(null);
      setError('Enter a valid pace per 100, for example 1:25.00.');
      return;
    }

    let restSeconds: number;
    if (mode === 'rest') {
      restSeconds = parseSecondsOrMiss(rest);
      if (Number.isNaN(restSeconds) || restSeconds < 0 || restSeconds > 3600) {
        setResult(null);
        setError('Enter a rest time between 0 and 3600 seconds.');
        return;
      }
    } else {
      const sendOffInput = parseSecondsOrMiss(sendOff);
      if (Number.isNaN(sendOffInput) || sendOffInput <= 0 || sendOffInput > 3600) {
        setResult(null);
        setError('Enter a send-off between 1 and 3600 seconds.');
        return;
      }
      const repeat = (distPerRep / 100) * paceSeconds;
      restSeconds = sendOffInput - repeat;
      if (restSeconds < 0) {
        setResult(null);
        setError(`The send-off is shorter than your repeat time (${formatSwimTime(repeat)}). Increase it or swim faster.`);
        return;
      }
    }

    const plan = planInterval(count, distPerRep, paceSeconds, restSeconds);
    setResult({
      repeatSeconds: plan.repeatSeconds,
      sendOffSeconds: plan.sendOffSeconds,
      restSeconds: plan.restSeconds,
      totalDistance: plan.totalDistance,
      totalSwimSeconds: plan.totalSwimSeconds,
      elapsedSeconds: plan.elapsedSeconds,
      leaveTimes: plan.leaveTimes,
      sendOff5: roundSendOff(plan.sendOffSeconds, 5),
      sendOff10: roundSendOff(plan.sendOffSeconds, 10),
    });
    setError(null);

    track('interval_calculator_used', {
      mode,
      unit,
      reps: count,
      distancePerRepeat: distPerRep,
      pacePer100: paceSeconds,
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-ink-muted">Set Builder</p>
          <div className="w-full sm:w-auto sm:min-w-[20rem]">
            <SegmentedControl
              id="interval-mode"
              label="What to calculate"
              columns={2}
              options={[
                { value: 'rest', label: 'Pick rest → send-off', description: 'Enter pace + rest' },
                { value: 'sendoff', label: 'Pick send-off → rest', description: 'Enter pace + send-off' },
              ]}
              value={mode}
              onChange={(m) => setMode(m)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="interval-reps" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Repeats
            </label>
            <input
              id="interval-reps"
              type="number"
              min="1"
              max="200"
              step="1"
              inputMode="numeric"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="interval-distance" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Distance per repeat ({unit})
            </label>
            <div className="flex gap-2">
              <input
                id="interval-distance"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
              />
              <div className="shrink-0 basis-32">
                <SegmentedControl
                  id="interval-unit"
                  label="Distance unit"
                  columns={2}
                  options={[
                    { value: 'm', label: 'm' },
                    { value: 'yd', label: 'yd' },
                  ]}
                  value={unit}
                  onChange={(u) => setUnit(u)}
                />
              </div>
            </div>
          </div>
          {mode === 'rest' ? (
            <div>
              <label htmlFor="interval-rest" className="mb-1.5 block text-sm font-medium text-ink-muted">
                Rest per repeat <span className="font-normal text-ink-tertiary">(sec)</span>
              </label>
              <input
                id="interval-rest"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={rest}
                onChange={(e) => setRest(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
              />
            </div>
          ) : (
            <TimeInput id="interval-sendoff" label="Send-off" value={sendOff} onChange={setSendOff} placeholder="1:30.00" />
          )}
        </div>

        <TimeInput id="interval-pace" label={`Pace per 100 ${unit}`} value={pace} onChange={setPace} placeholder="1:25.00" />

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handlePlan}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-hover active:bg-primary-focus"
        >
          Plan Set
        </button>
      </div>

      <div className="border-t border-hairline">
        {result === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            Enter repeats, distance and pacing to build your set and find the send-off.
          </div>
        ) : (
          <div className="animate-rise space-y-8 p-4 sm:p-6" aria-live="polite">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Repeat time</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.repeatSeconds)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Rest</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSeconds(result.restSeconds)}s
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Send-off</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.sendOffSeconds)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">Use on the clock</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  <span className="text-primary">{formatSwimTime(result.sendOff5)}</span>
                  <span className="mx-1 text-ink-tertiary">/</span>
                  <span className="text-primary">{formatSwimTime(result.sendOff10)}</span>
                </p>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                <span className="text-ink-muted">Total set distance</span>
                <span className="font-mono tabular-nums text-ink">
                  {Math.round(result.totalDistance)} {unit}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                <span className="text-ink-muted">Swim time</span>
                <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.totalSwimSeconds)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                <span className="text-ink-muted">Elapsed (scheduled send-offs)</span>
                <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.elapsedSeconds)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                <span className="text-ink-muted">Pace per 100</span>
                <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.repeatSeconds / (Math.max(1, Number(distance)) / 100))}</span>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Wall-clock leave times</p>
              <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
                {result.leaveTimes.map((leave, i) => {
                  if (i >= 20) return null;
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3.5 py-2.5 text-sm"
                    >
                      <span className="text-ink-muted">Rep {i + 1}</span>
                      <span className="font-mono tabular-nums text-ink">
                        {i === 0 ? 'on the horn' : `+${formatSwimTime(leave)}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {result.leaveTimes.length > 20 && (
                <p className="mt-2 text-xs text-ink-tertiary">Showing the first 20 leave times of {result.leaveTimes.length} reps.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}