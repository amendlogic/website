// Englisch Imports
import homeEn from './locales/en/home.json';
import footerEn from './locales/en/footer.json';

// Deutsch Imports
import homeDe from './locales/de/home.json';
import footerDe from './locales/de/footer.json';

export const ui = {
  en: {
    home: homeEn,
    footer: footerEn,
  },
  de: {
    home: homeDe,
    footer: footerDe,
  },
} as const;
