import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import deAbout from "./locales/de/about.json";
import deBlog from "./locales/de/blog.json";
import deFooter from "./locales/de/footer.json";

import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enBlog from "./locales/en/blog.json";
import enFooter from "./locales/en/footer.json";

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