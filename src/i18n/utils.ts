import { ui } from './ui';
import { LANGUAGES, DEFAULT_LANG } from './config';

export function useTranslations(lang: string) {
  return function t(key: keyof typeof ui) {
    const currentLang = (lang in LANGUAGES) ? lang : DEFAULT_LANG;
    
    // 1. Hole das Translation-Objekt für diesen Key
    const translation = ui[key];

    // Sicherheitscheck: Falls der Key gar nicht in der ui.ts existiert
    if (!translation) {
      console.warn(`[i18n] Key "${key}" existiert nicht in der ui.ts!`);
      return key; 
    }

    // 2. Falltreppe (Logic-Fallback)
    // Wir prüfen auf Existenz UND ob der String nicht leer ist
    return (
      translation[currentLang as keyof typeof translation] || 
      translation[DEFAULT_LANG as keyof typeof translation] || 
      key
    );
  };
}
