import { ui } from './ui';

/**
 * -----------------------------
 * 1. Language Setup
 * -----------------------------
 */

export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Language = 'en';

/**
 * -----------------------------
 * 2. Static Paths Helper (Astro)
 * -----------------------------
 */

export const getI18nPaths = () => {
  return (Object.keys(LANGUAGES) as Language[]).map((lang) => ({
    params: { lang },
  }));
};

/**
 * -----------------------------
 * 3. Deep Value Resolver
 * Unterstützt:
 * - direkte keys
 * - verschachtelte keys (a.b.c)
 * - arrays
 * - objects
 * -----------------------------
 */

function getValueFromObject(
  obj: unknown,
  key: string
): unknown {
  if (!obj || typeof obj !== 'object') return undefined;

  const record = obj as Record<string, unknown>;

  // Direkter Zugriff
  if (record[key] !== undefined) {
    return record[key];
  }

  // Verschachtelter Zugriff
  const parts = key.split('.');
  let current: unknown = record;

  for (const part of parts) {
    if (
      !current ||
      typeof current !== 'object' ||
      !(part in (current as Record<string, unknown>))
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

/**
 * -----------------------------
 * 4. String Interpolation
 * Beispiel:
 * "Hello {name}"
 * -----------------------------
 */

function interpolate(
  text: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return text;

  return text.replace(/\{(.*?)\}/g, (_, key) => {
    const value = vars[key.trim()];
    return value !== undefined ? String(value) : `{${key}}`;
  });
}

/**
 * -----------------------------
 * 5. useTranslations Hook
 * - Unterstützt Strings, Arrays, Objekte
 * - Fallback auf DEFAULT_LANG
 * - Caching
 * -----------------------------
 */

export function useTranslations(lang: string) {
  const currentLang: Language =
    lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG;

  const cache = new Map<string, unknown>();

  return function t<T = unknown>(
    keyString: string,
    vars?: Record<string, string | number>
  ): T {
    const cacheKey = `${currentLang}:${keyString}:${JSON.stringify(vars)}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as T;
    }

    const firstDotIndex = keyString.indexOf('.');
    if (firstDotIndex === -1) {
      console.warn(`[i18n] Key "${keyString}" needs namespace`);
      return keyString as T;
    }

    const namespace = keyString.slice(0, firstDotIndex);
    const specificKey = keyString.slice(firstDotIndex + 1);

    const langObj = ui[currentLang];
    const defaultObj = ui[DEFAULT_LANG];

    const fileObj = langObj?.[namespace];
    const defaultFileObj = defaultObj?.[namespace];

    let value = getValueFromObject(fileObj, specificKey);

    // Fallback auf Default Language
    if (value === undefined && currentLang !== DEFAULT_LANG) {
      value = getValueFromObject(defaultFileObj, specificKey);
    }

    if (value === undefined) {
      console.warn(`[i18n] Missing translation: "${keyString}"`);
      return keyString as T;
    }

    // Interpolation nur bei Strings
    if (typeof value === 'string' && vars) {
      value = interpolate(value, vars);
    }

    cache.set(cacheKey, value);

    return value as T;
  };
}

/**
 * -----------------------------
 * 6. Sprache aus URL holen
 * -----------------------------
 */

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');

  if (lang && lang in LANGUAGES) {
    return lang as Language;
  }

  return DEFAULT_LANG;
}

/**
 * -----------------------------
 * 7. Localized Path Helper
 * Dynamisch – keine hardcoded Regex
 * -----------------------------
 */

export const getLocalizedPathname = (
  pathname: string,
  newLang: Language
) => {
  const langs = Object.keys(LANGUAGES).join('|');
  const langRegex = new RegExp(`^\\/(${langs})(?=\\/|$)`);

  if (langRegex.test(pathname)) {
    return pathname.replace(langRegex, `/${newLang}`);
  }

  return `/${newLang}${pathname === '/' ? '' : pathname}`;
};
