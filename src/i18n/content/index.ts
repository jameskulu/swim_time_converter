import type { Locale, RouteKey } from '../config';
import { englishPages } from './en';
import { spanishPages } from './es';
import { frenchPages } from './fr';
import { portuguesePages } from './pt';
import { germanPages } from './de';
import { japanesePages } from './ja';
import { koreanPages } from './ko';
import { italianPages } from './it';
import type { PageCatalog, PageContent } from './types';

export type { ContentSection, CourseRow, FaqItem, PageCatalog, PageContent, ToolCard } from './types';

export const pagesByLocale: Record<Locale, PageCatalog> = {
  en: englishPages,
  es: spanishPages,
  fr: frenchPages,
  pt: portuguesePages,
  de: germanPages,
  ja: japanesePages,
  ko: koreanPages,
  it: italianPages,
};

export function getPageContent(locale: Locale, route: RouteKey): PageContent {
  return pagesByLocale[locale][route] ?? englishPages[route];
}
