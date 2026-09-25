import { useState } from 'react';
import { caloriesBurned, INTENSITIES, SWIM_STROKES, type IntensityKey, type StrokeKey } from '../lib/swimming/calories';
import { track } from '../lib/analytics';
import SegmentedControl from './calculator/SegmentedControl';

type WeightUnit = 'kg' | 'lb';

const KG_PER_LB = 0.453592;

export default function CaloriesCalculator() {
  const [weight, setWeight] = useState('68');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [minutes, setMinutes] = useState('45');
  const [stroke, setStroke] = useState<StrokeKey>('free');
  const [intensity, setIntensity] = useState<IntensityKey>('moderate');
  const [error, setError] = useState<string | null>(null);
  const [kcal, setKcal] = useState<number | null>(null);

  function handleCalculate() {
    const w = Number(weight);
    const mins = Number(minutes);

    if (!Number.isFinite(w) || w <= 0) {
      setKcal(null);
      setError('Enter your body weight.');
      return;
    }
    if (!Number.isFinite(mins) || mins <= 0 || mins > 720) {
      setKcal(null);
      setError('Enter a duration between 1 and 720 minutes.');
      return;
    }

    const weightKg = weightUnit === 'lb' ? w * KG_PER_LB : w;
    const found = caloriesBurned(weightKg, mins, stroke, intensity);
    if (found === null) {
      setError('Could not estimate calories for those inputs.');
      return;
    }
    setError(null);
    setKcal(found);
    track('calories_calculator_used', { weightKg, minutes: mins, stroke, intensity });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-card">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="cal-weight" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Body Weight
            </label>
            <div className="flex gap-2">
              <input
                id="cal-weight"
                type="number"
                min="1"
                step="0.1"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
              />
              <div className="shrink-0 basis-32">
                <SegmentedControl
                  id="cal-weight-unit"
                  label="Weight unit"
                  columns={2}
                  options={[
                    { value: 'kg', label: 'kg' },
                    { value: 'lb', label: 'lb' },
                  ]}
                  value={weightUnit}
                  onChange={(u) => setWeightUnit(u)}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="cal-minutes" className="mb-1.5 block text-sm font-medium text-ink-muted">
              Swim Time <span className="font-normal text-ink-tertiary">(minutes)</span>
            </label>
            <input
              id="cal-minutes"
              type="number"
              min="1"
              max="720"
              step="1"
              inputMode="numeric"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors hover:border-hairline-strong focus:border-primary"
            />
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">Stroke</p>
          <SegmentedControl
            id="cal-stroke"
            label="Stroke"
            columns={3}
            options={SWIM_STROKES.map((strokeOption) => ({
              value: strokeOption.id,
              label: strokeOption.label,
            }))}
            value={stroke}
            onChange={(s) => setStroke(s)}
          />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink-muted">Intensity</p>
          <SegmentedControl
            id="cal-intensity"
            label="Intensity"
            columns={3}
            options={INTENSITIES.map((intensityOption) => ({
              value: intensityOption.id,
              label: intensityOption.label,
            }))}
            value={intensity}
            onChange={(i) => setIntensity(i)}
          />
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
          Estimate Calories
        </button>
      </div>

      <div className="border-t border-hairline">
        {kcal === null ? (
          <div className="flex min-h-28 items-center justify-center px-6 py-8 text-sm text-ink-subtle">
            Enter your weight and a swim time to estimate calories burned.
          </div>
        ) : (
          <div className="animate-rise p-4 sm:p-6" aria-live="polite">
            <div className="rounded-lg border border-hairline bg-canvas p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-ink-subtle">Estimated calories burned</p>
              <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-ink">
                {Math.round(kcal)}
                <span className="ml-1 text-base font-normal text-ink-subtle">kcal</span>
              </p>
              <p className="mt-2 text-xs text-ink-tertiary">
                ≈ {Math.round((kcal / Math.max(1, Number(minutes))) * 60)} kcal/hour · estimate only
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}