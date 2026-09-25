import { eventsByStroke, type Course, type EventDef } from '../../lib/swimming/events';

interface EventSelectorProps {
  id: string;
  course: Course;
  value: string;
  onChange: (event: EventDef) => void;
}

/** Grouped <select> of swimming events for the selected course. */
export default function EventSelector({ id, course, value, onChange }: EventSelectorProps) {
  const groups = eventsByStroke(course);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-muted">
        Event / Distance
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
                  {event.name[course]}
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
          <path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  );
}