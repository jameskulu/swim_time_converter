interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface SegmentedControlProps<T extends string> {
  id: string;
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
}

/** A pill-style radio group. Keyboard accessible via native radio buttons. */
export default function SegmentedControl<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
  columns = options.length,
}: SegmentedControlProps<T>) {
  return (
    <div
      className="grid gap-1 rounded-lg border border-hairline bg-surface-2 p-1"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label
            key={option.value}
            className={[
              'relative cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium select-none transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-primary',
              selected ? 'bg-surface-1 text-ink shadow-card' : 'text-ink-subtle hover:text-ink',
            ].join(' ')}
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="pointer-events-none block">{option.label}</span>
            {option.description && (
              <span className="pointer-events-none mx-auto mt-0.5 block text-[11px] text-ink-subtle">
                {option.description}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}