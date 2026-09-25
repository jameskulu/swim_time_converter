import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { parseSwimTime } from '../../lib/swimming/time';

interface TimeInputProps {
  id: string;
  /** Time in "52.43", "1:52.37" or "4:32.15" form (kept for backward-compat with callers). */
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  /** Kept for API compatibility; the segmented picker ignores it. */
  placeholder?: string;
  /** Field label shown above the picker, e.g. "Pace per 100". */
  label?: string;
}

interface Parts {
  m: number;
  s: number;
  c: number;
}

const pad2 = (v: number): string => String(v).padStart(2, '0');

/** Split a time string into minutes / seconds / hundredths. Returns null for unparseable input. */
function decompose(value: string): Parts | null {
  if (!value || !value.trim()) return null;
  const secs = parseSwimTime(value);
  if (secs === null || !Number.isFinite(secs)) return null;
  const tenths = Math.round(secs * 100);
  const whole = Math.floor(tenths / 100);
  return { m: Math.floor(whole / 60), s: whole % 60, c: tenths % 100 };
}

/** Rebuild a time string from parts. */
function formatFromParts(m: number, s: number, c: number): string {
  const sec = Math.min(59, Math.max(0, Math.floor(s)));
  const cen = Math.min(99, Math.max(0, Math.floor(c)));
  const min = Math.max(0, Math.floor(m));
  if (min > 0) return `${min}:${pad2(sec)}.${pad2(cen)}`;
  return `${sec}.${pad2(cen)}`;
}

interface SegmentProps {
  ariaLabel: string;
  display: string;
  max: number;
  /** Step size for the steppers and arrow keys. */
  step?: number;
  /** When true the steppers wrap around (0 → max). */
  wrap?: boolean;
  onCommit: (value: number) => void;
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

function Segment({ ariaLabel, display, max, step = 1, wrap = false, onCommit }: SegmentProps) {
  const [draft, setDraft] = useState(display);

  useEffect(() => setDraft(display), [display]);

  const clamp = (v: number) => Math.min(max, Math.max(0, v));

  const commit = (d: string) => {
    const v = parseInt(d, 10);
    if (Number.isNaN(v)) {
      setDraft(display);
      return;
    }
    onCommit(clamp(v));
  };

  const stepBy = (delta: number) => {
    const current = draft === '' ? 0 : parseInt(draft, 10) || 0;
    const adjusted = wrap ? (current + delta + max + 1) % (max + 1) : clamp(current + delta);
    onCommit(adjusted);
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      stepBy(step);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      stepBy(-step);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      commit(draft);
    }
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        autoComplete="off"
        spellCheck={false}
        value={draft}
        placeholder="00"
        onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={handleKey}
        className="w-full rounded-lg border border-hairline bg-surface-1 py-3 pl-2 pr-8 text-center font-mono text-lg text-ink shadow-sm outline-none transition-colors placeholder:font-sans placeholder:text-base placeholder:text-ink-tertiary hover:border-hairline-strong focus:border-primary"
      />
      <div className="pointer-events-auto absolute inset-y-0 right-0 flex w-7 flex-col border-l border-hairline">
        <button
          type="button"
          aria-label={`Increase ${ariaLabel}`}
          onClick={() => stepBy(step)}
          className="flex h-1/2 items-center justify-center rounded-tr-lg text-ink-subtle outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink"
        >
          <Chevron up />
        </button>
        <button
          type="button"
          aria-label={`Decrease ${ariaLabel}`}
          onClick={() => stepBy(-step)}
          className="flex h-1/2 items-center justify-center rounded-br-lg text-ink-subtle outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink"
        >
          <Chevron up={false} />
        </button>
      </div>
    </div>
  );
}

/** Segmented time picker: minutes / seconds / hundredths with typing, arrow keys and steppers. */
export default function TimeInput({ id, value, onChange, error, label = 'Time' }: TimeInputProps) {
  const parts = decompose(value);
  const display = parts
    ? { m: String(parts.m), s: pad2(parts.s), c: pad2(parts.c) }
    : { m: '', s: '', c: '' };

  const commitPart = (key: keyof Parts, v: number) => {
    const base = parts ?? { m: 0, s: 0, c: 0 };
    const next = { ...base, [key]: v };
    onChange(formatFromParts(next.m, next.s, next.c));
  };

  return (
    <div>
      <label id={`${id}-label`} className="mb-1.5 block text-sm font-medium text-ink-muted">
        {label} <span className="font-normal text-ink-tertiary">(MM:SS.ss)</span>
      </label>
      <div role="group" aria-labelledby={`${id}-label`} className="flex items-stretch gap-1">
        <Segment
          ariaLabel="minutes"
          display={display.m}
          max={99}
          step={1}
          onCommit={(v) => commitPart('m', v)}
        />
        <span aria-hidden="true" className="flex items-center justify-center pb-1 text-lg text-ink-tertiary">
          :
        </span>
        <Segment
          ariaLabel="seconds"
          display={display.s}
          max={59}
          step={1}
          wrap
          onCommit={(v) => commitPart('s', v)}
        />
        <span aria-hidden="true" className="flex items-center justify-center pb-1 text-lg text-ink-tertiary">
          .
        </span>
        <Segment
          ariaLabel="hundredths"
          display={display.c}
          max={99}
          step={1}
          wrap
          onCommit={(v) => commitPart('c', v)}
        />
      </div>
      <p id={`${id}-error`} role="alert" className="mt-1.5 min-h-[1.25rem] text-sm text-danger">
        {error ? error : ''}
      </p>
    </div>
  );
}