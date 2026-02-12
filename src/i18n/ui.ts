import { DEFAULT_LANG } from './config';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.terms': 'Terms',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.blog': 'Blog',
    'nav.about': 'Über uns',
    'nav.terms': 'AGB',
  },
} as const;

// Einfacher Helper zum Abrufen
export function useTranslations(lang: string) {
  return function t(key: keyof typeof ui['en']) {
    // @ts-ignore
    return ui[lang][key] || ui[DEFAULT_LANG][key];
  }
}
