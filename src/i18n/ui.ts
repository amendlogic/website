// Englisch Imports
import navEn from './locales/en/nav.json';
import homeEn from './locales/en/home.json';
import footerEn from './locales/en/footer.json';
import fallbacksEn from './locales/en/fallbacks.json';
import faqEn from './locales/en/faq.json';

// Deutsch Imports
import navDe from './locales/de/nav.json';
import homeDe from './locales/de/home.json';
import footerDe from './locales/de/footer.json';
import fallbacksDe from './locales/de/fallbacks.json';
import faqDe from './locales/de/faq.json';

export const ui = {
  en: {
    nav: navEn,
    home: homeEn,
    footer: footerEn,
    fallbacks: fallbacksEn,
    faq: faqEn,
  },
  de: {
    nav: navDe,
    home: homeDe,
    footer: footerDe,
    fallbacks: fallbacksDe,
    faq: faqDe,
  },
} as const;
