// Englisch Imports
import navEn from './locales/en/nav.json';
import homeEn from './locales/en/home.json';

// Deutsch Imports
import navDe from './locales/de/nav.json';
import homeDe from './locales/de/home.json';

export const ui = {
  en: {
    nav: navEn,
    home: homeEn,
  },
  de: {
    nav: navDe,
    home: homeDe,
  },
} as const;
