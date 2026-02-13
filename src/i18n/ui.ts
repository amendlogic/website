// Englisch Imports
import homeEn from './locales/en/home.json';
import footerEn from './locales/en/footer.json';

// Deutsch Imports
import homeDe from './locales/de/home.json';
import footerDe from './locales/de/footer.json';

// Exportiere ein Objekt, das nach Sprachen sortiert ist
export const ui = {
  en: {
    homeEn,
    footerEn,
  },
  de: {
    homeDe,
    footerDe,
  },
} as const;
