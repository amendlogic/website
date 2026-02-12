import { trim } from '~/utils/utils';

// Hilfsfunktion: Entfernt / am Anfang und Ende
export const trimSlash = (s: string) => trim(trim(s, '/'));

// Hilfsfunktion: Baut den Pfad (verhindert doppelte Slashes)
export const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (paths ? '/' : ''); // Trailing Slash Logik (optional)
};

/**
 * WICHTIG: Assets (Bilder im public Ordner) bleiben sprach-neutral.
 * Diese Funktion wird oft von AstroWind-Komponenten genutzt.
 */
export const getAsset = (path: string): string => {
  return '/' + trimSlash(path);
};

/**
 * VEREINFACHT:
 * Früher hat AstroWind hier magisch Blog-Pfade berechnet.
 * Jetzt geben wir einfach den Pfad zurück oder hängen die Sprache an, 
 * falls sie übergeben wird (was wir in Zukunft tun sollten).
 */
export const getPermalink = (slug: string = '', type = 'page'): string => {
  
  // Wenn es ein externer Link ist (https://...), direkt zurückgeben
  if (slug.startsWith('http')) return slug;

  // Hier können wir Logik einbauen, falls nötig.
  // Fürs erste geben wir den Slug sauber zurück.
  // WICHTIG: Da wir natives i18n nutzen, müssen wir in den .astro Dateien
  // darauf achten, dass wir `getPermalink` den kompletten Pfad inkl. Sprache geben
  // oder wir nutzen hier keine Logik mehr.
  
  const permalink = createPath(slug);
  return permalink;
};

/**
 * Alte Helper für Blog und Home.
 * Diese werden oft im Metadata-Code aufgerufen.
 * Wir leiten sie auf generische Pfade um.
 */
export const getBlogPermalink = () => getPermalink('/blog');
export const getHomePermalink = () => getPermalink('/');
