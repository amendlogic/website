// Englisch Imports
import navEn from './locales/en/ui/nav.json';
import homeEn from './locales/en/home.json';
import aboutEn from './locales/en/about.json';
import pricingEn from './locales/en/pricing.json';
import performanceEn from './locales/en/performance.json';
import footnotesEn from './locales/en/ui/footnotes.json';
import fallbacksEn from './locales/en/ui/fallbacks.json';
import faqEn from './locales/en/faq.json';

// Deutsch Imports
import navDe from './locales/de/ui/nav.json';
import homeDe from './locales/de/home.json';
import aboutDe from './locales/de/about.json';
import pricingDe from './locales/de/pricing.json';
import performanceDe from './locales/de/performance.json';
import footnotesDe from './locales/de/ui/footnotes.json';
import fallbacksDe from './locales/de/ui/fallbacks.json';
import faqDe from './locales/de/faq.json';

export const ui = {
  en: {
    nav: navEn,
    home: homeEn,
    about: aboutEn,
    pricing: pricingEn,
    performance: performanceEn,
    footnotes: footnotesEn,
    fallbacks: fallbacksEn,
    faq: faqEn,
  },
  de: {
    nav: navDe,
    home: homeDe,
    about: aboutDe,
    pricing: pricingDe,
    performance: performanceDe,
    footnotes: footnotesDe,
    fallbacks: fallbacksDe,
    faq: faqDe,
  },
} as const;
