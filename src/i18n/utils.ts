import { ui } from './ui';

// -------------------------
// Typen
// -------------------------
export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Language = 'en';

type UI = typeof ui;

// -------------------------
// Pfade für Static Generation
// -------------------------
export const getI18nPaths = (): { params: { lang: Language } }[] =>
  Object.keys(LANGUAGES).map((lang) => ({
    params: { lang: lang as Language },
  }));

// -------------------------
// Hauptfunktion: useTranslations
// -------------------------
export function useTranslations(lang: string) {
  const currentLang: Language = lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG;

  // Funktion für rekursives Traversieren von verschachtelten Keys
  const getValue = (obj: any, path: string): string | undefined =>
    path.split('.').reduce((acc, part) => acc?.[part], obj);

  return function t(keyString: string): string {
    if (!keyString.includes('.')) {
      console.warn(`[i18n] Key "${keyString}" should include a namespace, e.g. "home.title"`);
      return keyString;
    }

    // Versuch erst die aktuelle Sprache, dann Default Language
    const text =
      getValue(ui[currentLang], keyString) ||
      getValue(ui[DEFAULT_LANG], keyString);

    if (!text) {
      console.warn(`[i18n] Missing key "${keyString}" in language "${currentLang}" and fallback "${DEFAULT_LANG}"`);
      return keyString;
    }

    return text;
  };
}

// -------------------------
// Sprache aus URL ermitteln
// -------------------------
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  return (lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG);
}
