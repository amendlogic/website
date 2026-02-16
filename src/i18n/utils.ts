import { ui } from "./ui";

/* ------------------------------------------------ */
/* 1. Language Setup */
/* ------------------------------------------------ */

export const LANGUAGES = {
  en: "English",
  de: "Deutsch",
} as const;

export type Language = keyof typeof LANGUAGES;
export const DEFAULT_LANG: Language = "en";

/* ------------------------------------------------ */
/* 2. Type Magic (Full Autocomplete Support) */
/* ------------------------------------------------ */

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type NestedKeys<T> = (
  T extends object
    ? {
        [K in keyof T & string]:
          `${K}${DotPrefix<NestedKeys<T[K]>>}`;
      }[keyof T & string]
    : ""
);

type TranslationSchema = typeof ui[typeof DEFAULT_LANG];
export type TranslationKey = NestedKeys<TranslationSchema>;

/* ------------------------------------------------ */
/* 3. Strict Deep Resolver (No any, Fast) */
/* ------------------------------------------------ */

function resolvePath(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== "object") return undefined;

  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (
      current == null ||
      typeof current !== "object" ||
      !(part in (current as Record<string, unknown>))
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

/* ------------------------------------------------ */
/* 4. Interpolation */
/* ------------------------------------------------ */

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

/* ------------------------------------------------ */
/* 5. useTranslations (Strict + Typed) */
/* ------------------------------------------------ */

export function useTranslations(lang: string) {
  const currentLang: Language =
    lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG;

  const langObj = ui[currentLang];
  const defaultObj = ui[DEFAULT_LANG];

  const cache = new Map<string, string>();

  return function t<K extends TranslationKey>(
    key: K,
    vars?: Record<string, string | number>
  ): string {

    const cacheKey = vars
      ? `${currentLang}:${key}:${JSON.stringify(vars)}`
      : `${currentLang}:${key}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    // 1️⃣ Lookup in active language
    let value = resolvePath(langObj, key);

    // 2️⃣ Fallback to default language
    if (value === undefined && currentLang !== DEFAULT_LANG) {
      value = resolvePath(defaultObj, key);
    }

    // 3️⃣ Strict validation
    if (
      value === undefined ||
      (typeof value !== "string" && typeof value !== "number")
    ) {
      if (import.meta.env.DEV) {
        throw new Error(`[i18n] Missing translation: "${key}"`);
      }
      return key;
    }

    let result = String(value);

    // 4️⃣ Interpolation
    if (vars) {
      result = interpolate(result, vars);
    }

    cache.set(cacheKey, result);
    return result;
  };
}

/* ------------------------------------------------ */
/* 6. Astro Static Paths */
/* ------------------------------------------------ */

export const getI18nPaths = () =>
  (Object.keys(LANGUAGES) as Language[]).map((lang) => ({
    params: { lang },
  }));

/* ------------------------------------------------ */
/* 7. Language from URL */
/* ------------------------------------------------ */

export function getLangFromUrl(url: URL): Language {
  const lang = url.pathname.split("/")[1];
  return lang in LANGUAGES
    ? (lang as Language)
    : DEFAULT_LANG;
}

/* ------------------------------------------------ */
/* 8. Localized Path Helper */
/* ------------------------------------------------ */

export function getLocalizedPathname(
  pathname: string,
  newLang: Language
): string {
  const langs = Object.keys(LANGUAGES).join("|");
  const langRegex = new RegExp(`^\\/(${langs})(?=\\/|$)`);

  if (langRegex.test(pathname)) {
    return pathname.replace(langRegex, `/${newLang}`);
  }

  return `/${newLang}${pathname === "/" ? "" : pathname}`;
}
