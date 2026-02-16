import { ui } from './ui';

/**
 * 1. Languages sauber typisiert
 */
export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Language = keyof typeof LANGUAGES;
export const DEFAULT_LANG: Language = 'en';

/**
 * 2. Get Static Paths Helper
 */
export const getI18nPaths = () => {
  return (Object.keys(LANGUAGES) as Language[]).map((lang) => ({
    params: { lang },
  }));
};

/**
 * 3. Sichere Object-Wert-Auflösung
 */
function getValueFromObject(
  obj: unknown,
  key: string
): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;

  const record = obj as Record<string, unknown>;

  // Direkter Zugriff
  if (record[key] !== undefined) {
    const val = record[key];
    if (typeof val === 'string' || typeof val === 'number') {
      return String(val);
    }
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

  if (typeof current === 'string' || typeof current === 'number') {
    return String(current);
  }

  return undefined;
}

/**
 * 4. Interpolation
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
 * 5. useTranslations (mit Cache & Type-Safety)
 */
export function useTranslations(lang: string) {
  const currentLang: Language =
    lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG;

  const cache = new Map<string, string>();

  return function t(
    keyString: string,
    vars?: Record<string, string | number>
  ): string {
    const cacheKey = `${currentLang}:${keyString}:${JSON.stringify(vars)}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const firstDotIndex = keyString.indexOf('.');
    if (firstDotIndex === -1) {
      console.warn(
        `[i18n] Key "${keyString}" needs namespace (e.g. 'home.title')`
      );
      return keyString;
    }

    const namespace = keyString.slice(0, firstDotIndex);
    const specificKey = keyString.slice(firstDotIndex + 1);

    const langObj = ui[currentLang];
    const defaultObj = ui[DEFAULT_LANG];

    const fileObj = langObj?.[namespace];
    const defaultFileObj = defaultObj?.[namespace];

    if (!fileObj && !defaultFileObj) {
      console.warn(`[i18n] Namespace "${namespace}" not found.`);
      return keyString;
    }

    // Aktuelle Sprache
    let text = getValueFromObject(fileObj, specificKey);

    // Fallback
    if (text === undefined && currentLang !== DEFAULT_LANG) {
      text = getValueFromObject(defaultFileObj, specificKey);
    }

    if (text === undefined) {
      console.warn(`[i18n] Missing translation: "${keyString}"`);
      return keyString;
    }

    const finalText = interpolate(text, vars);

    cache.set(cacheKey, finalText);

    return finalText;
  };
}

/**
 * 6. Sprache aus URL holen
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');

  if (lang && lang in LANGUAGES) {
    return lang as Language;
  }

  return DEFAULT_LANG;
}

/**
 * 7. Dynamischer Localized Pathname Helper
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
