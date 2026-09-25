import { getCalculatorMessages, getCourseTranslation, type Locale } from '../../i18n/calculator';
import type { Course } from '../../lib/swimming/events';
import type { ConvertResult } from '../../lib/conversions';
import { formatSwimTime } from '../../lib/swimming/time';

const ORDER: Course[] = ['SCY', 'SCM', 'LCM'];

interface CourseComparisonProps {
  results: ConvertResult[];
  sourceCourse: Course;
  locale?: Locale;
}

/** Compact "compare all courses" table with the source course highlighted. */
export default function CourseComparison({ results, sourceCourse, locale = 'en' }: CourseComparisonProps) {
  const messages = getCalculatorMessages(locale);
  return (
    <div className="overflow-hidden rounded-lg border border-hairline">
      <table className="w-full text-sm">
        <caption className="sr-only">{messages.courses.comparisonCaption}</caption>
        <thead>
          <tr className="border-b border-hairline bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
            <th scope="col" className="px-4 py-2.5 font-medium">{messages.courses.comparisonCourse}</th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">{messages.courses.comparisonEquivalent}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {results.map((result, index) => {
            const course = ORDER[index];
            const isSource = course === sourceCourse;
            const courseText = getCourseTranslation(course, locale);
            return (
              <tr key={course} className={isSource ? 'bg-primary/10' : 'bg-surface-1'}>
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {course}
                    <span className="text-xs font-normal text-ink-subtle">
                      {courseText.name} · {courseText.poolLength}
                    </span>
                    {isSource && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {messages.courses.source}
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