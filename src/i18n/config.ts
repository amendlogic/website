import { ui } from './ui';

// 1. Sprachen definieren (SSoT)
export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG = 'en';

// 2. Paths Helper für [lang] Seiten
export const getI18nPaths = () => {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang },
  }));
};

// 3. Übersetzungs-Helper (Mit Fallback Logik)
export function useTranslations(lang: string) {
  return function t(key: keyof typeof ui) {
    const currentLang = (lang in LANGUAGES) ? lang : DEFAULT_LANG;
    
    // @ts-ignore - JSON Imports können in TS manchmal Typ-Probleme machen
    const translation = ui[key];

    if (!translation) {
      console.warn(`[i18n] Key "${key}" not found.`);
      return key;
    }

    // Fallback-Logik:
    // 1. Versuche gewünschte Sprache
    // 2. Versuche Default Sprache
    // 3. Gib Key-Name zurück
    return (
      translation[currentLang as keyof typeof translation] || 
      translation[DEFAULT_LANG as keyof typeof translation] || 
      key
    );
  };
}
