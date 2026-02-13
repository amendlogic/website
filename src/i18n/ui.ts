// Importiere die separaten JSON Dateien
import home from './locales/home.json';
import footer from './locales/footer.json';

// Füge alles in ein großes UI-Objekt zusammen
export const ui = {
  ...home,
  ...footer,
} as const;
