import { getCalculatorMessages, getEventLabel, type Locale } from '../../i18n/calculator';
import { eventsByStroke, type Course, type EventDef } from '../../lib/swimming/events';

interface EventSelectorProps {
  id: string;
  course: Course;
  value: string;
  onChange: (event: EventDef) => void;
  locale?: Locale;
}

/** Grouped <select> of swimming events for the selected course. */
export default function EventSelector({ id, course, value, onChange, locale = 'en' }: EventSelectorProps) {
  const groups = eventsByStroke(course, locale);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-muted">
        {getCalculatorMessages(locale).events.label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => {
            const event = groups.flatMap((g) => g.events).find((ev) => ev.id === e.target.value);
            if (event) onChange(event);
          }}
          className="w-full appearance-none rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 text-sm text-ink shadow-sm transition-colors hover:border-hairline-strong focus:outline-2 focus:outline-primary"
        >
          {groups.map((group) => (
            <optgroup key={group.stroke} label={group.label}>
              {group.events.map((event) => (
                <option key={event.id} value={event.id}>
                  {getEventLabel(event, course, locale)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
          aria-hidden="true"
        >
          <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}