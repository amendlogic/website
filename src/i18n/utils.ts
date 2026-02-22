// src/i18n/utils.ts
import { ui } from './ui';

// -----------------------------
// 1️⃣ Sprachen
// -----------------------------
export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG = 'en';

// -----------------------------
// 2️⃣ Generiere alle i18n Pfade (für getStaticPaths)
// -----------------------------
export const getI18nPaths = () => {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang },
  }));
};

// -----------------------------
// 3️⃣ useTranslations Hook
// -----------------------------
export function useTranslations(lang?: string) {
  // 3a. sichere Sprache
  const currentLang = lang && lang in LANGUAGES ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
  const defaultLang = DEFAULT_LANG;

  // 3b. die eigentliche Übersetzungsfunktion
  return function t(keyString: string): string {
    // Sicherheitscheck: namespace vorhanden?
    const firstDotIndex = keyString.indexOf('.');
    if (firstDotIndex === -1) {
      console.warn(`[i18n] Key "${keyString}" needs a namespace (e.g. 'home.title')`);
      return keyString;
    }

    const namespace = keyString.substring(0, firstDotIndex);
    const specificKey = keyString.substring(firstDotIndex + 1);

    // Zugriff auf Sprachobjekte
    // @ts-ignore
    const langObj = ui[currentLang];
    // @ts-ignore
    const defaultObj = ui[defaultLang];

    // Zugriff auf Namespace
    const fileObj = langObj?.[namespace] || defaultObj?.[namespace];

    if (!fileObj) {
      console.warn(`[i18n] Namespace "${namespace}" not found in ui.ts`);
      return keyString;
    }

    // Text abrufen
    const text = fileObj[specificKey];

    // Fallback auf default
    if (!text && currentLang !== defaultLang) {
      return defaultObj?.[namespace]?.[specificKey] || keyString;
    }

    return text || keyString;
  };
}

// -----------------------------
// 4️⃣ Sprache aus URL extrahieren
// -----------------------------
export function getLangFromUrl(url: URL): keyof typeof LANGUAGES {
  const [, lang] = url.pathname.split('/');
  return lang && lang in LANGUAGES ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
}