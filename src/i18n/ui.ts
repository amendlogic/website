// Englisch Imports
import navEn from './locales/en/nav.json';
import homeEn from './locales/en/home.json';
import footerEn from './locales/en/footer.json';

// Deutsch Imports
import navDe from './locales/de/nav.json';
import homeDe from './locales/de/home.json';
import footerDe from './locales/de/footer.json';

export const ui = {
  en: {
    nav: navEn,
    home: homeEn,
    footer: footerEn,
  },
  de: {
    nav: navDe,
    home: homeDe,
    footer: footerDe,
  },
} as const;
