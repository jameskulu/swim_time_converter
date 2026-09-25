import { useState } from 'react';
import { formatCalculatorMessage, getCalculatorMessages, type Locale } from '../i18n/calculator';
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

export default function IntervalCalculator({ locale = 'en' }: { locale?: Locale }) {
  const messages = getCalculatorMessages(locale);
  const [unit, setUnit] = useState<'m' | 'yd'>('m');
  const [reps, setReps] = useState('8');
  const [distance, setDistance] = useState('100');
  const [pace, setPace] = useState('');
  const [rest, setRest] = useState('15');
  const [sendOff, setSendOff] = useState('');
  const [mode, setMode] = useState<Mode>('rest');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IntervalOutput | null>(null);
  const unitLabel = messages.units.distanceShort[unit];

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
      setError(messages.interval.errors.repeats);
      return;
    }
    if (!Number.isFinite(distPerRep) || distPerRep <= 0) {
      setResult(null);
      setError(messages.interval.errors.distance);
      return;
    }
    if (paceSeconds === null) {
      setResult(null);
      setError(messages.interval.errors.pace);
      return;
    }

    let restSeconds: number;
    if (mode === 'rest') {
      restSeconds = parseSecondsOrMiss(rest);
      if (Number.isNaN(restSeconds) || restSeconds < 0 || restSeconds > 3600) {
        setResult(null);
        setError(messages.interval.errors.rest);
        return;
      }
    } else {
      const sendOffInput = parseSecondsOrMiss(sendOff);
      if (Number.isNaN(sendOffInput) || sendOffInput <= 0 || sendOffInput > 3600) {
        setResult(null);
        setError(messages.interval.errors.sendOff);
        return;
      }
      const repeat = (distPerRep / 100) * paceSeconds;
      restSeconds = sendOffInput - repeat;
      if (restSeconds < 0) {
        setResult(null);
        setError(formatCalculatorMessage(messages.interval.errors.sendOffShorter, { time: formatSwimTime(repeat) }));
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
          <p className="text-sm font-medium text-ink-muted">{messages.interval.setBuilder}</p>
          <div className="w-full sm:w-auto sm:min-w-[20rem]">
            <SegmentedControl
              id="interval-mode"
              label={messages.interval.whatToCalculate}
              columns={2}
              options={[
                 { value: 'rest', label: messages.interval.restToSendOff, description: messages.interval.restToSendOffDescription },
                 { value: 'sendoff', label: messages.interval.sendOffToRest, description: messages.interval.sendOffToRestDescription },
              ]}
              value={mode}
              onChange={(m) => setMode(m)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="interval-reps" className="mb-1.5 block text-sm font-medium text-ink-muted">
               {messages.interval.repeats}
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
               {formatCalculatorMessage(messages.interval.distancePerRepeat, { unit: unitLabel })}
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
                  label={messages.interval.distanceUnit}
                  columns={2}
                  options={[
                    { value: 'm', label: messages.units.distanceShort.m },
                    { value: 'yd', label: messages.units.distanceShort.yd },
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
                 {formatCalculatorMessage(messages.interval.restPerRepeat, { seconds: messages.interval.seconds })}
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
             <TimeInput id="interval-sendoff" label={messages.interval.sendOff} value={sendOff} onChange={setSendOff} placeholder="1:30.00" locale={locale} />
          )}
        </div>

        <TimeInput
          id="interval-pace"
          label={formatCalculatorMessage(messages.interval.pacePer100, { unit: unitLabel })}
          value={pace}
          onChange={setPace}
          placeholder="1:25.00"
          locale={locale}
        />

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
          {messages.interval.planSet}
        </button>
      </div>

      <div className="border-t border-hairline">
        {result === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            {messages.interval.empty}
          </div>
        ) : (
          <div className="animate-rise space-y-8 p-4 sm:p-6" aria-live="polite">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">{messages.interval.repeatTime}</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.repeatSeconds)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">{messages.interval.rest}</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSeconds(result.restSeconds)}{messages.interval.seconds}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">{messages.interval.sendOff}</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.sendOffSeconds)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">{messages.interval.useOnClock}</p>
                <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-ink">
                  <span className="text-primary">{formatSwimTime(result.sendOff5)}</span>
                  <span className="mx-1 text-ink-tertiary">/</span>
                  <span className="text-primary">{formatSwimTime(result.sendOff10)}</span>
                </p>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                 <span className="text-ink-muted">{messages.interval.totalSetDistance}</span>
                <span className="font-mono tabular-nums text-ink">
                   {Math.round(result.totalDistance)} {unitLabel}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                 <span className="text-ink-muted">{messages.interval.swimTime}</span>
                <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.totalSwimSeconds)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                 <span className="text-ink-muted">{messages.interval.elapsed}</span>
                <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.elapsedSeconds)}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-4 py-3 text-sm">
                 <span className="text-ink-muted">{messages.interval.paceResult}</span>
                <span className="font-mono tabular-nums text-ink">{formatSwimTime(result.repeatSeconds / (Math.max(1, Number(distance)) / 100))}</span>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-ink">{messages.interval.leaveTimes}</p>
              <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
                {result.leaveTimes.map((leave, i) => {
                  if (i >= 20) return null;
                  return (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3.5 py-2.5 text-sm"
                    >
                       <span className="text-ink-muted">{formatCalculatorMessage(messages.interval.rep, { number: i + 1 })}</span>
                       <span className="font-mono tabular-nums text-ink">
                         {i === 0 ? messages.interval.onHorn : `+${formatSwimTime(leave)}`}
                       </span>
                    </li>
                  );
                })}
              </ul>
              {result.leaveTimes.length > 20 && (
                <p className="mt-2 text-xs text-ink-tertiary">                 {formatCalculatorMessage(messages.interval.showing, { shown: 20, total: result.leaveTimes.length })}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}