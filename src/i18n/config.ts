// Definition der Sprachen
export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG = 'en';

// Helper für getStaticPaths in Astro Pages
// Damit musst du nie wieder manuell ['de', 'en'] schreiben!
export const getI18nPaths = () => {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang },
  }));
};
