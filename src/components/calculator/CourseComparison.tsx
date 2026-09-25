import type { Course } from '../../lib/swimming/events';
import type { ConvertResult } from '../../lib/conversions';
import { formatSwimTime } from '../../lib/swimming/time';
import { COURSE_LONG_NAMES, COURSE_POOL_LENGTH } from '../../lib/swimming/events';

const ORDER: Course[] = ['SCY', 'SCM', 'LCM'];

interface CourseComparisonProps {
  results: ConvertResult[];
  sourceCourse: Course;
}

/** Compact "compare all courses" table with the source course highlighted. */
export default function CourseComparison({ results, sourceCourse }: CourseComparisonProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <caption className="sr-only">Equivalent times across courses</caption>
        <thead>
          <tr className="border-b border-hairline bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
            <th scope="col" className="px-4 py-2.5 font-medium">Course</th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">Equivalent Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {results.map((result, index) => {
            const course = ORDER[index];
            const isSource = course === sourceCourse;
            return (
              <tr className={isSource ? 'bg-primary/10' : 'bg-surface-1'}>
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {course}
                    <span className="hidden text-xs font-normal text-ink-subtle lg:inline">
                      {COURSE_LONG_NAMES[course]} · {COURSE_POOL_LENGTH[course]}
                    </span>
                    <span className="sm:hidden text-xs font-normal text-ink-subtle">
                      {COURSE_POOL_LENGTH[course]}
                    </span>
                    {isSource && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                        Source
                      </span>
                    )}
                  </span>
                </th>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-ink">
                  {formatSwimTime(result.seconds)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}