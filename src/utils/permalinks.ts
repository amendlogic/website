import { trim } from '~/utils/utils';
import { SITE } from 'astrowind:config';

export const trimSlash = (s: string) => trim(trim(s, '/'));

export const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const getAsset = (path: string): string => {
  return '/' + trimSlash(path);
};

// --- NEU HINZUGEFÜGT FÜR BLOG.TS ---
// Diese Konstanten werden von src/utils/blog.ts benötigt.
export const BLOG_BASE = 'blog';
export const CATEGORY_BASE = 'category';
export const TAG_BASE = 'tag';
export const POST_PERMALINK_PATTERN = 'slug'; // Standard Slug-Muster

export const cleanSlug = (text = '') => trimSlash(text);
// -----------------------------------

export const getPermalink = (slug: string = '', type = 'page'): string => {
  if (slug.startsWith('http')) return slug;
  
  // Wir geben einfach den Pfad zurück.
  // Die Sprach-Logik passiert jetzt in den Komponenten/Pages selbst.
  const permalink = createPath(slug);
  return permalink;
};

export const getBlogPermalink = () => getPermalink('/blog');
export const getHomePermalink = () => getPermalink('/');

/**
 * Erstellt die absolute URL (https://deine-seite.com/de/...) für SEO.
 */
export const getCanonical = (path: string = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};
