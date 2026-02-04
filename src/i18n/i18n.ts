
import deHome from "./locales/de/home.json";


import enHome from "./locales/en/home.json";


export const translations = {
  de: {
    common: deCommon,
    home: deHome,
    about: deAbout,
    blog: deBlog,
    footer: deFooter,
  },
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    blog: enBlog,
    footer: enFooter,
  },
};

export type Locale = "de" | "en";

export function t(lang: Locale, key: string) {
  const parts = key.split(".");
  let result: any = translations[lang];

  for (const part of parts) {
    result = result?.[part];
  }

  // Fallback auf Deutsch, falls Key fehlt
  if (!result) {
    result = translations.de;
    for (const part of parts) {
      result = result?.[part];
    }
  }

  return result ?? "";
}