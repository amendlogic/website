import { ui } from './ui';

// 1. Definition der Sprachen
export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG = 'en';

// 2. Helper für [lang] Pfade
export const getI18nPaths = () => {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang },
  }));
};

// 3. Übersetzungs-Funktion (angepasst an die neue Struktur)
export function useTranslations(lang: string) {
  return function t(key: string) { // string statt keyof, da Typescript bei JSON Spread manchmal zickt
    
    // Aktuelle Sprache oder Default
    const currentLang = (lang in LANGUAGES) ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
    const defaultLang = DEFAULT_LANG;

    // Zugriff auf das Sprach-Objekt (z.B. ui.de)
    // @ts-ignore
    const strings = ui[currentLang];
    // @ts-ignore
    const defaultStrings = ui[defaultLang];

    // Zugriff auf den Key
    const text = strings[key] || defaultStrings[key];

    if (!text) {
      console.warn(`[i18n] Key "${key}" not found in language "${currentLang}" or fallback.`);
      return key;
    }

    return text;
  };
}

/** Helper um Sprache aus URL zu lesen */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as keyof typeof LANGUAGES;
  return DEFAULT_LANG;
}
