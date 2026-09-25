// @ts-check
import { createRequire } from 'node:module';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const tailwindcss = createRequire(import.meta.url)('@tailwindcss/vite').default;


const locales = {
  en: 'en',
  es: 'es',
  ja: 'ja',
  fr: 'fr',
  pt: 'pt',
  de: 'de',
  ko: 'ko',
  it: 'it',
};

export default defineConfig({
  site: 'https://onlineswimtimeconverter.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'fr', 'pt', 'de', 'ko', 'it'],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      i18n: {
        defaultLocale: 'en',
        locales,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
