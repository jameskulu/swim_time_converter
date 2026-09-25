import type { KeyboardEvent } from 'react';
import { getCalculatorMessages, type Locale } from '../../i18n/calculator';

interface TimeInputProps {
  id: string;
  /** Time in "52.43", "1:52.37" or "4:32.15" form. */
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  placeholder?: string;
  /** Field label shown above the picker, e.g. "Time" or "Pace per 100". */
  label?: string;
  locale?: Locale;
  onEnter?: () => void;
}

interface TimeParts {
  minutes: string;
  seconds: string;
  hundredths: string;
}

function Chevron({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 10 6" fill="none" className="h-1.5 w-2.5" aria-hidden="true">
      {up ? (
        <path d="M1 5 5 1l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function splitTime(value: string): TimeParts {
  const [minutePart, secondPart] = value.includes(':') ? value.split(':', 2) : ['', value];
  const [seconds, hundredths = ''] = secondPart.split('.', 2);
  return {
    minutes: minutePart,
    seconds,
    hundredths,
  };
}

function composeTime(parts: TimeParts): string {
  const minutes = parts.minutes.replace(/\D/g, '').slice(0, 4);
  const seconds = parts.seconds.replace(/\D/g, '').slice(0, 2);
  const hundredths = parts.hundredths.replace(/\D/g, '').slice(0, 2);
  if (!minutes && !seconds && !hundredths) return '';
  const secondText = seconds || '0';
  const decimalText = hundredths ? `.${hundredths}` : '';
  return minutes ? `${minutes}:${secondText.padStart(2, '0')}${decimalText}` : `${secondText}${decimalText}`;
}

/** Segmented time input with minutes, seconds, hundredths, and arrow steppers. */
export default function TimeInput({
  id,
  value,
  onChange,
  error,
  placeholder,
  label,
  locale = 'en',
  onEnter,
}: TimeInputProps) {
  const messages = getCalculatorMessages(locale);
  const fieldLabel = label ?? messages.time.label;
  const inputPlaceholder = placeholder ?? '52.43 or 1:52.37';
  const parts = splitTime(value);

  const updatePart = (part: keyof TimeParts, nextValue: string) => {
    const nextParts = { ...parts, [part]: nextValue };
    const numericValue = Number(nextValue);
    if (part === 'seconds' && numericValue > 59) nextParts.seconds = '59';
    if (part === 'hundredths' && numericValue > 99) nextParts.hundredths = '99';
    onChange(composeTime(nextParts));
  };

  const stepPart = (part: keyof TimeParts, delta: number) => {
    const currentValue = Number(parts[part] || 0);
    const maxValue = part === 'minutes' ? 9999 : 59;
    const minValue = 0;
    const nextValue = Math.min(maxValue, Math.max(minValue, currentValue + delta));
    updatePart(part, String(nextValue).padStart(part === 'minutes' ? 1 : 2, '0'));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, part: keyof TimeParts) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      stepPart(part, 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      stepPart(part, -1);
    }
  };

  const segmentClass = (segmentError: boolean) => `w-full min-w-0 border bg-surface-1 px-2.5 py-2.5 text-center font-mono text-base text-ink shadow-sm outline-none transition-colors placeholder:font-sans placeholder:text-sm placeholder:text-ink-tertiary hover:border-hairline-strong focus:border-primary focus:ring-1 focus:ring-primary ${segmentError ? 'border-danger' : 'border-hairline'}`;

  const segment = (part: keyof TimeParts, labelText: string, placeholderText: string, maxLength: number) => (
    <div className="flex min-w-0 flex-1 flex-col">
      <label htmlFor={`${id}-${part}`} className="sr-only">{labelText}</label>
      <div className="relative flex min-w-0">
        <input
          id={`${id}-${part}`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          spellCheck={false}
          maxLength={maxLength}
          value={parts[part]}
          placeholder={placeholderText}
          onChange={(event) => updatePart(part, event.target.value.replace(/\D/g, ''))}
          onKeyDown={(event) => handleKeyDown(event, part)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${segmentClass(Boolean(error))} pr-8`}
        />
        <div className="absolute inset-y-0 right-0 flex w-7 flex-col border-l border-hairline">
          <button
            type="button"
            aria-label={`Increase ${labelText.toLowerCase()}`}
            onClick={() => stepPart(part, 1)}
            className="flex h-1/2 items-center justify-center rounded-tr-lg text-ink-subtle outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink"
          >
            <Chevron up />
          </button>
          <button
            type="button"
            aria-label={`Decrease ${labelText.toLowerCase()}`}
            onClick={() => stepPart(part, -1)}
            className="flex h-1/2 items-center justify-center rounded-br-lg text-ink-subtle outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink"
          >
            <Chevron up={false} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <label id={`${id}-label`} htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-muted">
        {fieldLabel} <span className="font-normal text-ink-tertiary">({inputPlaceholder})</span>
      </label>
      <div className="flex items-center gap-1.5" aria-labelledby={`${id}-label`}>
        {segment('minutes', 'Minutes', 'MM', 4)}
        <span className="font-mono text-ink-subtle" aria-hidden="true">:</span>
        {segment('seconds', 'Seconds', 'SS', 2)}
        <span className="font-mono text-ink-subtle" aria-hidden="true">.</span>
        {segment('hundredths', 'Hundredths', 'SS', 2)}
        {value && (
          <button
            type="button"
            aria-label="Clear time"
            onClick={() => onChange('')}
            className="shrink-0 px-1.5 text-ink-tertiary outline-none transition-colors hover:text-ink focus-visible:text-ink"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <p id={`${id}-error`} role="alert" className="mt-1.5 min-h-[1.25rem] text-sm text-danger">
        {error ? error : ''}
      </p>
    </div>
  );
}