// Englisch Imports
import navEn from './locales/en/nav.json';
import homeEn from './locales/en/home.json';
import aboutEn from './locales/en/about.json';
import footnotesEn from './locales/en/footnotes.json';
import fallbacksEn from './locales/en/fallbacks.json';
import faqEn from './locales/en/faq.json';

// Deutsch Imports
import navDe from './locales/de/nav.json';
import homeDe from './locales/de/home.json';
import aboutDe from './locales/de/about.json';
import footnotesDe from './locales/de/footnotes.json';
import fallbacksDe from './locales/de/fallbacks.json';
import faqDe from './locales/de/faq.json';

export const ui = {
  en: {
    nav: navEn,
    home: homeEn,
    about: aboutEn,
    footnotes: footnotesEn,
    fallbacks: fallbacksEn,
    faq: faqEn,
  },
  de: {
    nav: navDe,
    home: homeDe,
    about: aboutDe,
    footnotes: footnotesDe,
    fallbacks: fallbacksDe,
    faq: faqDe,
  },
} as const;
