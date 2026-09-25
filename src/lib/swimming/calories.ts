/** Swimming calorie helpers based on Compendium of Physical Activities MET values. */

export type StrokeKey = 'free' | 'back' | 'breast' | 'fly' | 'general' | 'tread';

export interface StrokeOption {
  id: StrokeKey;
  label: string;
  /** MET by intensity (light / moderate / vigorous). Treading ignores intensity. */
  mets: { light: number; moderate: number; vigorous: number };
}

export const SWIM_STROKES: StrokeOption[] = [
  { id: 'free', label: 'Freestyle / front crawl', mets: { light: 4.8, moderate: 5.8, vigorous: 9.8 } },
  { id: 'back', label: 'Backstroke', mets: { light: 4.8, moderate: 6.8, vigorous: 9.5 } },
  { id: 'breast', label: 'Breaststroke', mets: { light: 5.3, moderate: 8.3, vigorous: 10.3 } },
  { id: 'fly', label: 'Butterfly', mets: { light: 6.8, moderate: 9.8, vigorous: 13.8 } },
  { id: 'general', label: 'General swimming (laps, mixed)', mets: { light: 4.5, moderate: 6.0, vigorous: 8.0 } },
  { id: 'tread', label: 'Water treading', mets: { light: 3.5, moderate: 3.5, vigorous: 3.5 } },
];

export type IntensityKey = 'light' | 'moderate' | 'vigorous';

export const INTENSITIES: { id: IntensityKey; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'vigorous', label: 'Vigorous' },
];

/** Calories burned per session (kcal) using the MET formula: kcal = MET x 3.5 x kg / 200 x minutes. */
export function caloriesBurned(
  weightKg: number,
  minutes: number,
  stroke: StrokeKey,
  intensity: IntensityKey,
): number | null {
  if (!Number.isFinite(weightKg) || weightKg <= 0 || !Number.isFinite(minutes) || minutes <= 0) return null;
  const option = SWIM_STROKES.find((s) => s.id === stroke);
  if (!option) return null;
  const met = option.mets[intensity];
  return (met * 3.5 * weightKg * minutes) / 200;
}