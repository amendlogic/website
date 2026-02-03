import de from "./locales/de.json";
import en from "./locales/en.json";

export const translations = { de, en };

export type Locale = "de" | "en";

export function t(lang: Locale, key: string) {
  const parts = key.split(".");

  let result: any = translations[lang];

  for (const part of parts) {
    result = result?.[part];
    if (!result) break;
  }

  // Fallback auf Deutsch, falls Key fehlt
  return result ?? t("de", key);
}