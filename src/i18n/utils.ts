import { ui } from './ui';

export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
} as const;

export const DEFAULT_LANG: keyof typeof LANGUAGES = 'en';

export const getI18nPaths = () =>
  Object.keys(LANGUAGES).map((lang) => ({ params: { lang } }));

export function useTranslations(lang?: string) {
  const currentLang = lang && lang in LANGUAGES ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;

  return function t(keyString: string) {
    const [namespace, ...rest] = keyString.split('.');
    if (!namespace || rest.length === 0) {
      console.warn(`[i18n] Key "${keyString}" invalid. Use namespace.key format.`);
      return keyString;
    }
    const specificKey = rest.join('.');

    const langObj = ui[currentLang] || ui[DEFAULT_LANG];
    const defaultObj = ui[DEFAULT_LANG];

    const fileObj = (langObj as any)[namespace] || (defaultObj as any)[namespace];
    if (!fileObj) {
      console.warn(`[i18n] Namespace "${namespace}" not found in ui.ts`);
      return keyString;
    }

    const text = fileObj[specificKey];
    if (!text && currentLang !== DEFAULT_LANG) {
      // fallback auf default language
      return (defaultObj as any)[namespace]?.[specificKey] || keyString;
    }

    return text || keyString;
  };
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  return lang in LANGUAGES ? (lang as keyof typeof LANGUAGES) : DEFAULT_LANG;
}