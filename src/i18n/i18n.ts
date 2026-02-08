import deHome from "./locales/de/home.json";
import enHome from "./locales/en/home.json";

export const translations = {
  de: {
    home: deHome,
  },
  en: {
    home: enHome,
  },
} as const;

export type Locale = "de" | "en";

/**
 * 🔹 Interne Hilfsfunktion:
 * Holt einen verschachtelten Wert aus einer Sprache
 */
function getValue(lang: Locale, parts: string[]) {
  let result: any = translations[lang];

  for (const part of parts) {
    result = result?.[part];
    if (!result) return undefined;
  }

  return result;
}

/**
 * 🔹 Öffentliche Übersetzungsfunktion mit Fallback auf EN
 */
export function t(lang: Locale, key: string): string {
  const parts = key.split(".");

  return (
    getValue(lang, parts) ??
    getValue("en", parts) ??
    ""
  );
}