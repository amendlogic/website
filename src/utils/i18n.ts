export const LANGUAGES = {
  en: 'English',
  de: 'Deutsch',
};

export const DEFAULT_LANG = 'en';

export function getI18nPaths() {
  const paths = Object.keys(LANGUAGES).map((lang) => ({
    params: { lang: lang },
  }));
  
  return paths;
}
