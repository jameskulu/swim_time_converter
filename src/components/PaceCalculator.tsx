import { useState } from 'react';
import { formatCalculatorMessage, getCalculatorMessages, type Locale } from '../i18n/calculator';
import { formatSwimTime, parseSwimTime } from '../lib/swimming/time';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';
import TimeInput from './calculator/TimeInput';

const PHASES = [
  { value: '25' },
  { value: '50' },
  { value: '100' },
  { value: '200' },
  { value: '400' },
  { value: 'custom' },
];

interface PaceResult {
  phase: number;
  seconds: number;
}

export default function PaceCalculator({ locale = 'en' }: { locale?: Locale }) {
  const messages = getCalculatorMessages(locale);
  const phases = PHASES.map((phase) => ({
    value: phase.value,
    label: phase.value === 'custom' ? messages.pace.customPhase : phase.value,
  }));
  const [unit, setUnit] = useState<'yd' | 'm'>('m');
  const [distance, setDistance] = useState('500');
  const [phase, setPhase] = useState('100');
  const [customPhase, setCustomPhase] = useState('50');
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PaceResult[] | null>(null);

  function handleConvert() {
    const total = Number(distance);
    if (!Number.isFinite(total) || total <= 0) {
      setResults(null);
      setError(messages.pace.errors.distance);
      return;
    }
    const seconds = parseSwimTime(time);
    if (seconds === null) {
      setResults(null);
      setError(messages.pace.errors.time);
      return;
    }
    track('pace_calculator_used', { unit, distance: total });

    const phaseValue = phase === 'custom' ? Number(customPhase) : Number(phase);
    if (!Number.isFinite(phaseValue) || phaseValue <= 0) {
      setResults(null);
      setError(messages.pace.errors.phase);
      return;
    }

    const quick: PaceResult[] = [25, 50, 100].map((p) => ({ phase: p, seconds: (seconds / total) * p }));
    const chosen: PaceResult[] = [{ phase: phaseValue, seconds: (seconds / total) * phaseValue }];
    setResults([...chosen, ...quick.filter((r) => r.phase !== phaseValue)]);
    setError(null);
  }

  const unitLabel = messages.units.distanceShort[unit];

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="pace-distance" className="mb-1.5 block text-sm font-medium text-ink-muted">
              {messages.pace.totalDistance}
            </label>
            <div className="flex gap-2">
              <input
                id="pace-distance"
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
                  id="pace-unit"
                  label={messages.pace.distanceUnit}
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

          <TimeInput id="pace-time" value={time} onChange={setTime} placeholder="6:05.00" locale={locale} />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">{messages.pace.pacePer}</p>
          <SegmentedControl
            id="pace-phase"
            label={messages.pace.paceInterval}
            columns={6}
            options={phases}
            value={phase}
            onChange={(p) => setPhase(p)}
          />
          {phase === 'custom' && (
            <div className="mt-3 flex max-w-xs items-center gap-2">
              <label htmlFor="pace-custom" className="sr-only">
                {messages.pace.customPaceDistance}
              </label>
              <input
                id="pace-custom"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={customPhase}
                onChange={(e) => setCustomPhase(e.target.value)}
                className="w-full rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 font-mono text-sm text-ink shadow-sm focus:outline-2 focus:outline-primary"
              />
              <span className="text-sm text-ink-subtle">{unitLabel}</span>
            </div>
          )}
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
          {messages.pace.calculate}
        </button>
      </div>

      <div className="border-t border-hairline">
        {results === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            {messages.pace.empty}
          </div>
        ) : (
          <div className="animate-rise space-y-4 p-4 sm:p-6" aria-live="polite">
            <p className="text-sm font-medium uppercase tracking-wide text-ink-subtle">{messages.pace.results}</p>
            <ul className="divide-y divide-hairline overflow-hidden rounded-lg border border-hairline">
              {results.map((r) => (
                <li key={r.phase} className="flex items-center justify-between bg-surface-1 px-4 py-3 text-sm">
                  <span className="text-ink-muted">
                    {formatCalculatorMessage(messages.pace.per, { distance: r.phase, unit: unitLabel })}
                    {r.phase === 100 && <span className="text-ink-tertiary">{messages.pace.standard}</span>}
                  </span>
                  <span className="font-mono tabular-nums text-ink">{formatSwimTime(r.seconds)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}