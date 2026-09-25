import type { KeyboardEvent } from 'react';
import { formatCalculatorMessage, getCalculatorMessages, type Locale } from '../../i18n/calculator';
import { formatSwimTime, parseSwimTime } from '../../lib/swimming/time';

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

/** Direct time input with typing, steppers, and quick clear. Supports MM:SS.ss and SS.ss formats. */
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

  const stepTime = (delta: number) => {
    const current = parseSwimTime(value) ?? (placeholder ? parseSwimTime(placeholder) ?? 0 : 0);
    const updated = Math.max(0, Math.round((current + delta) * 100) / 100);
    onChange(formatSwimTime(updated));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      stepTime(e.shiftKey ? 0.1 : 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      stepTime(e.shiftKey ? -0.1 : -1);
    }
  };

  const handleChange = (raw: string) => {
    // Allow digits, colons, dots, and commas (normalized to dots)
    const sanitized = raw.replace(/,/g, '.').replace(/[^\d:.]/g, '');
    onChange(sanitized);
  };

  return (
    <div>
      <label id={`${id}-label`} htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-muted">
        {fieldLabel} <span className="font-normal text-ink-tertiary">({inputPlaceholder})</span>
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          aria-labelledby={`${id}-label`}
          autoComplete="off"
          spellCheck={false}
          value={value}
          placeholder={inputPlaceholder}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-surface-1 py-2.5 pl-3.5 pr-16 font-mono text-base text-ink shadow-sm outline-none transition-colors placeholder:font-sans placeholder:text-sm placeholder:text-ink-tertiary hover:border-hairline-strong focus:border-primary focus:ring-1 focus:ring-primary ${
            error ? 'border-danger' : 'border-hairline'
          }`}
        />
        <div className="pointer-events-auto absolute inset-y-0 right-0 flex items-stretch">
          {value && (
            <button
              type="button"
              aria-label="Clear time"
              onClick={() => onChange('')}
              className="px-2 text-ink-tertiary outline-none transition-colors hover:text-ink focus-visible:text-ink"
            >
              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <div className="flex w-7 flex-col border-l border-hairline">
            <button
              type="button"
              aria-label={formatCalculatorMessage(messages.time.increase, { field: messages.time.seconds })}
              onClick={() => stepTime(1)}
              className="flex h-1/2 items-center justify-center rounded-tr-lg text-ink-subtle outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink"
            >
              <Chevron up />
            </button>
            <button
              type="button"
              aria-label={formatCalculatorMessage(messages.time.decrease, { field: messages.time.seconds })}
              onClick={() => stepTime(-1)}
              className="flex h-1/2 items-center justify-center rounded-br-lg text-ink-subtle outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink"
            >
              <Chevron up={false} />
            </button>
          </div>
        </div>
      </div>
      <p id={`${id}-error`} role="alert" className="mt-1.5 min-h-[1.25rem] text-sm text-danger">
        {error ? error : ''}
      </p>
    </div>
  );
}