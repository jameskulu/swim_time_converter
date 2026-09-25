import {
  calculatorRouteKeys,
  conversionRouteKeys,
  getUi,
  localizedPath,
  routeKeyFromPath,
  routePaths,
  type Locale,
  type RouteKey,
  type UiMessages,
} from '../i18n';

export interface NavLink {
  href: string;
  label: string;
  route?: RouteKey;
}

const converterLabels: Record<string, string> = {
  'scy-to-lcm': 'SCY to LCM',
  'scy-to-scm': 'SCY to SCM',
  'scm-to-lcm': 'SCM to LCM',
  'lcm-to-scy': 'LCM to SCY',
  'lcm-to-scm': 'LCM to SCM',
  'scm-to-scy': 'SCM to SCY',
};

const calculatorLabelKeys: Record<string, keyof UiMessages['calculatorLinks']> = {
  home: 'home',
  'pace-calculator': 'pace',
  'split-calculator': 'split',
  'css-calculator': 'css',
  'interval-calculator': 'interval',
  'speed-calculator': 'speed',
  'calories-calculator': 'calories',
  'lengths-converter': 'lengths',
};

const companyEntries = [
  { route: 'about', label: 'about' },
  { route: 'contact', label: 'contact' },
  { route: 'privacy-policy', label: 'privacyPolicy' },
  { route: 'terms', label: 'terms' },
] as const;

function navHref(locale: Locale, route: RouteKey): string {
  return locale === 'en' ? routePaths[route] : localizedPath(locale, route);
}

function normalizePath(path: string): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash === '/' ? '/' : `${withLeadingSlash.replace(/\/+$/, '')}/`;
}

export function getConverterLinks(locale: Locale = 'en'): NavLink[] {
  return conversionRouteKeys.map((route) => ({
    href: navHref(locale, route),
    label: converterLabels[route],
    route,
  }));
}

export function getCalculatorLinks(locale: Locale = 'en'): NavLink[] {
  const labels = getUi(locale).calculatorLinks;
  return calculatorRouteKeys.map((route) => ({
    href: navHref(locale, route),
    label: labels[calculatorLabelKeys[route]],
    route,
  }));
}

export function getCompanyLinks(locale: Locale = 'en'): NavLink[] {
  const labels = getUi(locale);
  return companyEntries.map(({ route, label }) => ({
    href: navHref(locale, route),
    label: labels[label],
    route,
  }));
}

export const converterLinks: NavLink[] = getConverterLinks().map(({ href, label }) => ({ href, label }));
export const calculatorLinks: NavLink[] = getCalculatorLinks().map(({ href, label }) => ({ href, label }));
export const companyLinks: NavLink[] = getCompanyLinks().map(({ href, label }) => ({ href, label }));

export function isNavActive(path: string, href: string, locale: Locale = 'en'): boolean {
  const normalizedPath = normalizePath(path);
  const candidates = new Set([normalizePath(href), normalizePath(localizedPath(locale, href))]);
  const localizedHome = normalizePath(localizedPath(locale, 'home'));

  if (candidates.has(localizedHome) || normalizePath(href) === '/') {
    return normalizedPath === localizedHome;
  }

  return [...candidates].some((candidate) => normalizedPath.startsWith(candidate));
}

function isCurrentLink(link: NavLink, currentHref: string, locale: Locale): boolean {
  const currentRoute = routeKeyFromPath(currentHref);
  if (currentRoute) return link.route === currentRoute;
  return isNavActive(currentHref, link.href, locale);
}

export function otherCalculators(currentHref?: string, locale: Locale = 'en'): NavLink[] {
  return getCalculatorLinks(locale).filter((link) => !currentHref || !isCurrentLink(link, currentHref, locale));
}

export function otherConverters(currentHref: string, locale: Locale = 'en'): NavLink[] {
  return getConverterLinks(locale).filter((link) => !isCurrentLink(link, currentHref, locale));
}
