import { ui } from './ui';

export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG = 'en';

// Helper für die Pfade (für getStaticPaths)
export const getI18nPaths = () => {
  return Object.keys(LANGUAGES).map((lang) => ({
    params: { lang },
  }));
};

/**
 * Hilfsfunktion: Versucht einen Wert zu finden.
 * Strategie 1: Direkter Zugriff (für "hero.titleStart")
 * Strategie 2: Verschachtelter Zugriff (für "post.title" -> post -> title)
 */
function getValueFromObject(obj: any, key: string): string | undefined {
  if (!obj) return undefined;

  // 1. Versuch: Gibt es den Key exakt so? (z.B. home.json "hero.titleStart")
  if (obj[key] !== undefined) {
    return obj[key];
  }

  // 2. Versuch: Ist es verschachtelt? (z.B. fallbacks.json { post: { title: ... } })
  const parts = key.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }

  // Wenn wir am Ende einen String (oder Zahl) haben, zurückgeben
  if (typeof current === 'string' || typeof current === 'number') {
    return String(current);
  }

  return undefined;
}

export function useTranslations(lang: string) {
  return function t(keyString: string) {
    const currentLang = (lang in LANGUAGES) ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
    const defaultLang = DEFAULT_LANG;

    // 1. Namespace trennen (immer am ersten Punkt)
    const firstDotIndex = keyString.indexOf('.');
    
    if (firstDotIndex === -1) {
      console.warn(`[i18n] Key "${keyString}" needs a namespace (e.g. 'home.title')`);
      return keyString;
    }

    const namespace = keyString.substring(0, firstDotIndex); // z.B. "home" oder "fallbacks"
    const specificKey = keyString.substring(firstDotIndex + 1); // z.B. "hero.titleStart" oder "post.title"

    // 2. Sprach-Objekte laden
    // @ts-ignore
    const langObj = ui[currentLang];
    // @ts-ignore
    const defaultObj = ui[defaultLang];

    // 3. Datei-Objekt laden (Namespace)
    const fileObj = langObj?.[namespace];
    const defaultFileObj = defaultObj?.[namespace];

    if (!fileObj && !defaultFileObj) {
      console.warn(`[i18n] Namespace "${namespace}" not found in ui.ts`);
      return keyString;
    }

    // 4. Wert suchen (Hybrid-Strategie)
    
    // A. Suche in aktueller Sprache
    const text = getValueFromObject(fileObj, specificKey);
    if (text) return text;

    // B. Fallback auf Default-Sprache (nur wenn wir nicht eh schon dort sind)
    if (currentLang !== defaultLang) {
      const fallbackText = getValueFromObject(defaultFileObj, specificKey);
      if (fallbackText) return fallbackText;
    }

    // Nichts gefunden -> Key zurückgeben
    return keyString;
  };
}

// Helper um Sprache aus URL zu holen (für Middleware etc.)
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as keyof typeof LANGUAGES;
  return DEFAULT_LANG;
}

// Helper für Link-Austausch (hatten wir vorhin besprochen, hier der Vollständigkeit halber)
export const getLocalizedPathname = (pathname: string, newLang: string) => {
  const langRegex = /^\/(en|de)/;
  if (langRegex.test(pathname)) {
    return pathname.replace(langRegex, `/${newLang}`);
  }
  return `/${newLang}${pathname === '/' ? '' : pathname}`;
};
