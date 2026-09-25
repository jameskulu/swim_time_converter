export const locales = ['en', 'es', 'ja', 'fr', 'pt', 'de', 'ko', 'it'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
  fr: 'Français',
  pt: 'Português',
  de: 'Deutsch',
  ko: '한국어',
  it: 'Italiano',
};

export const localeOg: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  ja: 'ja_JP',
  fr: 'fr_FR',
  pt: 'pt_PT',
  de: 'de_DE',
  ko: 'ko_KR',
  it: 'it_IT',
};

export const routeKeys = [
  'home',
  'pace-calculator',
  'split-calculator',
  'css-calculator',
  'interval-calculator',
  'speed-calculator',
  'calories-calculator',
  'lengths-converter',
  'scy-to-lcm',
  'scy-to-scm',
  'scm-to-lcm',
  'lcm-to-scy',
  'lcm-to-scm',
  'scm-to-scy',
  'guides',
  'about',
  'contact',
  'privacy-policy',
  'terms',
] as const;

export type RouteKey = (typeof routeKeys)[number];

export const routePaths: Record<RouteKey, string> = {
  home: '/',
  'pace-calculator': '/pace-calculator/',
  'split-calculator': '/split-calculator/',
  'css-calculator': '/css-calculator/',
  'interval-calculator': '/interval-calculator/',
  'speed-calculator': '/speed-calculator/',
  'calories-calculator': '/calories-calculator/',
  'lengths-converter': '/lengths-converter/',
  'scy-to-lcm': '/scy-to-lcm/',
  'scy-to-scm': '/scy-to-scm/',
  'scm-to-lcm': '/scm-to-lcm/',
  'lcm-to-scy': '/lcm-to-scy/',
  'lcm-to-scm': '/lcm-to-scm/',
  'scm-to-scy': '/scm-to-scy/',
  guides: '/guides/',
  about: '/about/',
  contact: '/contact/',
  'privacy-policy': '/privacy-policy/',
  terms: '/terms/',
};

export const calculatorRouteKeys: RouteKey[] = [
  'home',
  'pace-calculator',
  'split-calculator',
  'css-calculator',
  'interval-calculator',
  'speed-calculator',
  'calories-calculator',
  'lengths-converter',
];

export const conversionRouteKeys: RouteKey[] = [
  'scy-to-lcm',
  'scy-to-scm',
  'scm-to-lcm',
  'lcm-to-scy',
  'lcm-to-scm',
  'scm-to-scy',
];

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return normalizeLocale(segment);
}

export function stripLocale(pathname: string): string {
  const normalized = pathname === '/' ? '/' : `/${pathname.split('/').filter(Boolean).join('/')}/`;
  const first = pathname.split('/').filter(Boolean)[0];
  if (isLocale(first)) {
    const rest = pathname.split('/').filter(Boolean).slice(1).join('/');
    return rest ? `/${rest}/` : '/';
  }
  return normalized;
}

export function routeKeyFromPath(pathname: string): RouteKey | undefined {
  const path = stripLocale(pathname);
  return routeKeys.find((key) => routePaths[key] === path);
}

export function localizedPath(locale: Locale, route: RouteKey | string): string {
  const path = route in routePaths ? routePaths[route as RouteKey] : route.startsWith('/') ? route : `/${route}`;
  if (locale === defaultLocale) return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, 'https://onlineswimtimeconverter.com').href;
}

export function alternateUrls(route: RouteKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, route))])) as Record<Locale, string>;
}

export function localizedRouteFromPath(pathname: string, locale: Locale): string {
  const route = routeKeyFromPath(pathname);
  return route ? localizedPath(locale, route) : localizedPath(locale, 'home');
}
