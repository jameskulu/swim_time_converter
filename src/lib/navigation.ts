/** Shared site navigation data used by the header, footer and cross-link sections. */

export interface NavLink {
  href: string;
  label: string;
}

export const converterLinks: NavLink[] = [
  { href: '/scy-to-lcm/', label: 'SCY to LCM' },
  { href: '/scy-to-scm/', label: 'SCY to SCM' },
  { href: '/scm-to-lcm/', label: 'SCM to LCM' },
  { href: '/lcm-to-scy/', label: 'LCM to SCY' },
  { href: '/lcm-to-scm/', label: 'LCM to SCM' },
  { href: '/scm-to-scy/', label: 'SCM to SCY' },
];

export const calculatorLinks: NavLink[] = [
  { href: '/', label: 'Swim Time Converter' },
  { href: '/pace-calculator/', label: 'Pace Calculator' },
  { href: '/split-calculator/', label: 'Split Calculator' },
  { href: '/css-calculator/', label: 'Critical Swim Speed (CSS)' },
  { href: '/interval-calculator/', label: 'Interval & Send-off' },
  { href: '/speed-calculator/', label: 'Speed & Race Projection' },
  { href: '/calories-calculator/', label: 'Calories Calculator' },
  { href: '/lengths-converter/', label: 'Lengths & Distance' },
];

/** True when the given path is on the page (or shares the page's path prefix). */
export function isNavActive(path: string, href: string): boolean {
  if (href === '/') return path === '/';
  return path.startsWith(href);
}

/** List of calculators excluding the current page (for "more tools" sections). */
export function otherCalculators(currentHref?: string): NavLink[] {
  return calculatorLinks.filter((l) => l.href !== currentHref);
}

/** List of converters excluding the current page (for "more conversions" sections). */
export function otherConverters(currentHref: string): NavLink[] {
  return converterLinks.filter((l) => l.href !== currentHref);
}