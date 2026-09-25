import { useState } from 'react';
import { cssPacePer100, cssProjectedTimes, cssSpeed, cssZones, type CssZone } from '../lib/swimming/css';
import { parseSwimTime, isPlausibleTime, formatSwimTime } from '../lib/swimming/time';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';
import TimeInput from './calculator/TimeInput';

const DIST_LONG = 400;
const DIST_SHORT = 200;

interface CssOutput {
  speed: number;
  pace: number;
  zones: CssZone[];
  projected: { distance: number; seconds: number }[];
}

export default function CssCalculator() {
  const [unit, setUnit] = useState<'m' | 'yd'>('m');
  const [timeLong, setTimeLong] = useState('');
  const [timeShort, setTimeShort] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ran, setRan] = useState(false);
  const [result, setResult] = useState<CssOutput | null>(null);

  const paceUnit = unit === 'yd' ? '100 yd' : '100 m';

  function handleCalculate() {
    const long = parseSwimTime(timeLong);
    const short = parseSwimTime(timeShort);

    if (long === null) {
      setResult(null);
      setError(`Enter a valid ${DIST_LONG} ${unit} time.`);
      return;
    }
    if (short === null) {
      setResult(null);
      setError(`Enter a valid ${DIST_SHORT} ${unit} time.`);
      return;
    }
    if (!isPlausibleTime(short, DIST_SHORT) || !isPlausibleTime(long, DIST_LONG)) {
      setResult(null);
      setError('That time is faster than any plausible record — double-check it.');
      return;
    }
    if (long <= short) {
      setResult(null);
      setError(`The ${DIST_LONG} ${unit} time must be slower than the ${DIST_SHORT} ${unit} time for CSS to work.`);
      return;
    }

    const speed = cssSpeed({ distanceLong: DIST_LONG, timeLong: long, distanceShort: DIST_SHORT, timeShort: short });
    const pace = cssPacePer100(speed);
    setError(null);
    setResult({
      speed,
      pace,
      zones: cssZones(pace),
      projected: cssProjectedTimes(pace, unit === 'yd' ? [50, 100, 200, 300, 400, 500, 800, 1000, 1500, 1650] : [50, 100, 200, 300, 400, 500, 800, 1000, 1500]),
    });
    setRan(true);
    track('css_calculator_used', { unit, long, short, cssPace: pace });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink-muted">Test</p>
            <p className="mt-0.5 text-xs text-ink-tertiary">Wakayoshi two-test method: {DIST_LONG} + {DIST_SHORT}</p>
          </div>
          <div className="w-40">
            <SegmentedControl
              id="css-unit"
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
          <TimeInput id="css-long" label={`${DIST_LONG} ${unit} time`} value={timeLong} onChange={setTimeLong} placeholder="4:30.00" />
          <TimeInput id="css-short" label={`${DIST_SHORT} ${unit} time`} value={timeShort} onChange={setTimeShort} placeholder="2:10.00" />
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
          Calculate CSS
        </button>
      </div>

      <div className="border-t border-hairline">
        {ran && result !== null ? (
          <div className="animate-rise space-y-8 p-4 sm:p-6" aria-live="polite">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">CSS pace ({paceUnit})</p>
                <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink">
                  {formatSwimTime(result.pace)}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-canvas p-4">
                <p className="text-xs uppercase tracking-wide text-ink-subtle">CSS speed</p>
                <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink">
                  {result.speed.toFixed(2)}
                  <span className="ml-1 text-sm font-normal text-ink-subtle">{unit}/s</span>
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Training Zones</p>
              <div className="overflow-x-auto rounded-lg border border-hairline bg-canvas">
                <table className="w-full min-w-[420px] text-sm">
                  <caption className="sr-only">Swim training zones and paces from your CSS</caption>
                  <thead>
                    <tr className="border-b border-hairline text-left text-xs uppercase tracking-wide text-ink-muted">
                      <th scope="col" className="px-3.5 py-2.5 font-medium">Zone</th>
                      <th scope="col" className="px-3.5 py-2.5 font-medium">Pace ({paceUnit})</th>
                      <th scope="col" className="px-3.5 py-2.5 font-medium">Perception</th>
                      <th scope="col" className="px-3.5 py-2.5 font-medium">Pacing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {result.zones.map((zone) => (
                      <tr key={zone.key}>
                        <th scope="row" className="px-3.5 py-2.5 font-medium text-ink">{zone.label}</th>
                        <td className="px-3.5 py-2.5 font-mono tabular-nums text-ink-muted">
                          {formatSwimTime(zone.fromPace)} – {formatSwimTime(zone.toPace)}
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap text-ink-subtle">{zone.rpe}</td>
                        <td className="px-3.5 py-2.5 text-ink-subtle">{zone.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Projected Times at CSS</p>
              <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {result.projected.map((row) => (
                  <li
                    key={row.distance}
                    className="flex items-center justify-between rounded-lg border border-hairline bg-canvas px-3.5 py-2.5 text-sm"
                  >
                    <span className="text-ink-muted">{row.distance} {unit}</span>
                    <span className="font-mono tabular-nums text-ink">{formatSwimTime(row.seconds)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            Enter your {DIST_LONG} and {DIST_SHORT} {unit} test times to find your Critical Swim Speed.
          </div>
        )}
      </div>
    </div>
  );
}