// Englisch Imports
import navEn from './locales/en/ui/nav.json';
import indexEn from './locales/en/index.json';
import aboutEn from './locales/en/about.json';
import pricingEn from './locales/en/pricing.json';
import performanceEn from './locales/en/performance.json';
import footnotesEn from './locales/en/ui/footnotes.json';
import fallbacksEn from './locales/en/ui/fallbacks.json';
import faqEn from './locales/en/faq.json';
import 404En from './locales/en/ui/404.json';

// Deutsch Imports
import navDe from './locales/de/ui/nav.json';
import indexDe from './locales/de/index.json';
import aboutDe from './locales/de/about.json';
import pricingDe from './locales/de/pricing.json';
import performanceDe from './locales/de/performance.json';
import footnotesDe from './locales/de/ui/footnotes.json';
import fallbacksDe from './locales/de/ui/fallbacks.json';
import faqDe from './locales/de/faq.json';
import 404De from './locales/de/ui/404.json';

export const ui = {
  en: {
    nav: navEn,
    index: indexEn,
    about: aboutEn,
    pricing: pricingEn,
    performance: performanceEn,
    footnotes: footnotesEn,
    fallbacks: fallbacksEn,
    faq: faqEn,
    404: 404En,
  },
  de: {
    nav: navDe,
    index: indexDe,
    about: aboutDe,
    pricing: pricingDe,
    performance: performanceDe,
    footnotes: footnotesDe,
    fallbacks: fallbacksDe,
    faq: faqDe,
    404: 404De,
  },
} as const;
