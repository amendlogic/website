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
  const currentLang =
    lang && lang in LANGUAGES
      ? (lang as keyof typeof LANGUAGES)
      : DEFAULT_LANG;

  const defaultLang = DEFAULT_LANG;

  return function t(
    keyString: string,
    vars?: Record<string, string>
  ): string {
    const firstDotIndex = keyString.indexOf('.');
    if (firstDotIndex === -1) {
      console.warn(`[i18n] Key "${keyString}" needs a namespace`);
      return keyString;
    }

    const namespace = keyString.substring(0, firstDotIndex);
    const specificKey = keyString.substring(firstDotIndex + 1);

    // @ts-ignore
    const langObj = ui[currentLang];
    // @ts-ignore
    const defaultObj = ui[defaultLang];

    const fileObj = langObj?.[namespace] || defaultObj?.[namespace];

    if (!fileObj) {
      console.warn(`[i18n] Namespace "${namespace}" not found`);
      return keyString;
    }

    let text =
      fileObj[specificKey] ||
      defaultObj?.[namespace]?.[specificKey] ||
      keyString;

    // ✅ Interpolation
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        text = text.replace(new RegExp(`{${key}}`, 'g'), value);
      });
    }

    return text;
  };
}

// -----------------------------
// 4️⃣ Sprache aus URL extrahieren
// -----------------------------
export function getLangFromUrl(url: URL): keyof typeof LANGUAGES {
  const [, lang] = url.pathname.split('/');
  return lang && lang in LANGUAGES ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
}
