import { ui } from './ui';

export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG = 'en';

export const getI18nPaths = () => {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang },
  }));
};

export function useTranslations(lang: string) {
  return function t(keyString: string) {
    const currentLang = (lang in LANGUAGES) ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
    const defaultLang = DEFAULT_LANG;

    // 1. Key splitten: "home.hero.titleStart" -> file: "home", key: "hero.titleStart"
    const firstDotIndex = keyString.indexOf('.');
    
    // Sicherheitscheck: Hat der Key überhaupt einen Punkt?
    if (firstDotIndex === -1) {
      console.warn(`[i18n] Key "${keyString}" needs a namespace (e.g. 'home.title')`);
      return keyString;
    }

    const namespace = keyString.substring(0, firstDotIndex); // z.B. "home"
    const specificKey = keyString.substring(firstDotIndex + 1); // z.B. "hero.titleStart"

    // 2. Zugriff auf die Sprach-Ebene
    // @ts-ignore
    const langObj = ui[currentLang];
    // @ts-ignore
    const defaultObj = ui[defaultLang];

    // 3. Zugriff auf die Datei-Ebene (Namespace)
    const fileObj = langObj[namespace] || defaultObj[namespace];

    if (!fileObj) {
      console.warn(`[i18n] Namespace "${namespace}" not found in ui.ts`);
      return keyString;
    }

    // 4. Zugriff auf den eigentlichen Text
    const text = fileObj[specificKey];

    // Fallback auf Default-Sprache, wenn Text fehlt
    if (!text && currentLang !== defaultLang) {
       const fallbackFileObj = defaultObj[namespace];
       return fallbackFileObj ? fallbackFileObj[specificKey] || keyString : keyString;
    }

    return text || keyString;
  };
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as keyof typeof LANGUAGES;
  return DEFAULT_LANG;
}
