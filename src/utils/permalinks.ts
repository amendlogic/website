import { trim } from '~/utils/utils';
import { SITE } from 'astrowind:config'; // WICHTIG: Das muss importiert werden

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

export const getPermalink = (slug: string = '', type = 'page'): string => {
  if (slug.startsWith('http')) return slug;
  
  // Wir erstellen den Pfad
  const permalink = createPath(slug);
  return permalink;
};

export const getBlogPermalink = () => getPermalink('/blog');
export const getHomePermalink = () => getPermalink('/');

/**
 * DIE FEHLENDE FUNKTION:
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
