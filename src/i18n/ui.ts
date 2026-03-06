// Englisch Imports
import navEn from './locales/en/ui/nav.json';
import indexEn from './locales/en/index.json';
import aboutEn from './locales/en/about.json';
import pricingEn from './locales/en/pricing.json';
import performanceEn from './locales/en/performance.json';
import contactEn from './locales/en/contact.json';
import footnotesEn from './locales/en/ui/footnotes.json';
import fallbacksEn from './locales/en/ui/fallbacks.json';
import faqEn from './locales/en/faq.json';
import blogEn from './locales/en/ui/blog.json';
import error404En from './locales/en/ui/error404.json';

// Deutsch Imports
import navDe from './locales/de/ui/nav.json';
import indexDe from './locales/de/index.json';
import aboutDe from './locales/de/about.json';
import pricingDe from './locales/de/pricing.json';
import performanceDe from './locales/de/performance.json';
import contactDe from './locales/de/contact.json';
import footnotesDe from './locales/de/ui/footnotes.json';
import fallbacksDe from './locales/de/ui/fallbacks.json';
import faqDe from './locales/de/faq.json';
import blogDe from './locales/de/ui/blog.json';
import error404De from './locales/de/ui/error404.json';

export const ui = {
  en: {
    nav: navEn,
    index: indexEn,
    about: aboutEn,
    pricing: pricingEn,
    performance: performanceEn,
    contact: contactEn,
    footnotes: footnotesEn,
    fallbacks: fallbacksEn,
    faq: faqEn,
    blog: blogEn,
    error404: error404En,
  },
  de: {
    nav: navDe,
    index: indexDe,
    about: aboutDe,
    pricing: pricingDe,
    performance: performanceDe,
    contact: contactDe,
    footnotes: footnotesDe,
    fallbacks: fallbacksDe,
    faq: faqDe,
    blog: blogDe,
    error404: error404De,
  },
} as const;
