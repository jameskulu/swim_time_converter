import type { RouteKey } from '../config';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
}

export interface ToolCard {
  route: RouteKey;
  title: string;
  description: string;
  tag?: string;
}

export interface CourseRow {
  code: string;
  name: string;
  length: string;
  usage: string;
}

export interface PageContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  eyebrow?: string;
  sections: ContentSection[];
  faqs?: FaqItem[];
  tools?: ToolCard[];
  courses?: CourseRow[];
}

export type PageCatalog = Record<RouteKey, PageContent>;
