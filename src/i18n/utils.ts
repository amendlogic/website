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
/* 2. Type Magic (Autocomplete + Smart Return) */
/* ------------------------------------------------ */

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

// Rekursive Key-Generierung, stoppt bei Arrays
type NestedKeys<T> = T extends object
  ? T extends any[]
    ? "" // keine Autocomplete für Array-Indizes
    : {
        [K in keyof T & string]: `${K}${DotPrefix<NestedKeys<T[K]>>}`;
      }[keyof T & string]
  : "";

// Rückgabetyp basierend auf Key
type NestedValue<T, K extends string> = K extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? NestedValue<T[Head], Rest>
    : never
  : K extends keyof T
  ? T[K]
  : never;

type TranslationSchema = typeof ui[typeof DEFAULT_LANG];
export type TranslationKey = NestedKeys<TranslationSchema>;

/* ------------------------------------------------ */
/* 3. Strict Deep Resolver (No any) */
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
/* 4. Interpolation (Strings only) */
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
/* 5. useTranslations (Master Function) */
/* ------------------------------------------------ */

export function useTranslations(lang: string | Language) {
  const currentLang: Language =
    lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG;

  const langObj = ui[currentLang];
  const defaultObj = ui[DEFAULT_LANG];

  const cache = new Map<string, unknown>();

  return function t<K extends TranslationKey>(
    key: K,
    vars?: Record<string, string | number>
  ): NestedValue<TranslationSchema, K> {
    // Stabiler Cache-Key, sortiert die Variablen
    const varsKey = vars
      ? Object.entries(vars)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}:${v}`)
          .join("|")
      : "";

    const cacheKey = `${currentLang}:${key}:${varsKey}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as NestedValue<TranslationSchema, K>;
    }

    // 1️⃣ Aktuelle Sprache
    let value = resolvePath(langObj, key);

    // 2️⃣ Fallback auf Default
    if (value === undefined && currentLang !== DEFAULT_LANG) {
      value = resolvePath(defaultObj, key);
    }

    // 3️⃣ DEV-Validierung
    if (value === undefined) {
      if (import.meta.env.DEV) {
        throw new Error(`[i18n] Missing translation: "${key}"`);
      }
      return key as unknown as NestedValue<TranslationSchema, K>;
    }

    // 4️⃣ Interpolation (nur Strings)
    if (typeof value === "string") {
      value = interpolate(value, vars);
    }

    cache.set(cacheKey, value);

    return value as NestedValue<TranslationSchema, K>;
  };
}

/* ------------------------------------------------ */
/* 6. Helpers */
/* ------------------------------------------------ */

export const getI18nPaths = () =>
  (Object.keys(LANGUAGES) as Language[]).map((lang) => ({
    params: { lang },
  }));

export function getLangFromUrl(url: URL): Language {
  const lang = url.pathname.split("/")[1];
  return lang in LANGUAGES ? (lang as Language) : DEFAULT_LANG;
}

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
