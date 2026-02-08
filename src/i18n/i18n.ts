import deHome from "./locales/de/home.json";
import enHome from "./locales/en/home.json";

export const translations = {
  de: { home: deHome },
  en: { home: enHome },
} as const;

/**
 * 🔹 Exportiert die verfügbaren Sprachen als Array.
 * Wichtig für Astro's getStaticPaths(), damit wir sie nicht doppelt pflegen müssen.
 */
export const locales = Object.keys(translations) as Locale[];

export type Locale = keyof typeof translations;
type Schema = typeof translations.en; // Wir nutzen Englisch als Schema-Referenz

/**
 * 🔹 Rekursiver Hilfstyp:
 * Erzeugt eine Union aller Pfade zu Blattknoten (z.B. "home.title"),
 * ignoriert Zwischenobjekte (z.B. "home").
 */
type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

/**
 * 🔹 Der öffentliche Typ für Keys (mit Autocomplete)
 */
export type TranslationKey = NestedKeyOf<Schema>;

/**
 * 🔹 Interne Funktion zum Holen des Wertes
 */
function getValue(lang: Locale, key: TranslationKey) {
  const parts = key.split(".");
  let result: any = translations[lang];

  for (const part of parts) {
    result = result?.[part];
    if (result === undefined) return undefined;
  }
  return result;
}

/**
 * 🔹 Hauptfunktion für Übersetzungen
 */
export function t(
  lang: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  const val = 
    getValue(lang, key) ?? 
    getValue("en", key) ?? 
    key;

  // Safety-Check: Verhindert, dass Objekte gerendert werden, falls der Typ
  // "TranslationKey" doch mal umgangen wird (z.B. durch 'as any').
  if (typeof val !== "string" && typeof val !== "number") {
    console.warn(`i18n: Key "${key}" points to object/null, expected string.`);
    return key;
  }

  let str = String(val);

  if (vars) {
    // replaceAll ist verfügbar ab ES2021 / Node 15+
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replaceAll(`{{${k}}}`, String(v));
    });
  }

  return str;
}