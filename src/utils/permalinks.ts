import slugify from 'limax';

import { SITE, APP_BLOG } from 'astrowind:config';

import { trim } from '~/utils/utils';

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** * NEU: 'lang' Parameter hinzugefügt.
 * Er wird standardmäßig auf '' gesetzt, damit bestehende Aufrufe nicht brechen.
 */
export const getPermalink = (slug = '', type = 'page', lang = ''): string => {
  let permalink: string;

  // Externe Links oder Anker direkt zurückgeben
  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }
  
  // Wenn es nur ein Anker ist (#), nichts tun
  if (slug.startsWith('#')) {
    return slug;
  }

  switch (type) {
    case 'home':
      // Home Link generieren (unter Berücksichtigung der Sprache)
      return getHomePermalink(lang);

    case 'blog':
      // Blog Link generieren (unter Berücksichtigung der Sprache)
      return getBlogPermalink(lang);

    case 'asset':
      // Assets sind meist sprachunabhängig (liegen in /public)
      return getAsset(slug);

    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  // Wenn eine Sprache (lang) übergeben wurde, fügen wir sie dem Pfad hinzu
  if (lang) {
    permalink = createPath(lang, permalink);
  }

  return definitivePermalink(permalink);
};

/** * NEU: Akzeptiert jetzt 'lang' 
 */
export const getHomePermalink = (lang = ''): string => {
  const path = lang ? createPath(lang) : '/';
  return definitivePermalink(path);
};

/** * NEU: Akzeptiert jetzt 'lang'
 */
export const getBlogPermalink = (lang = ''): string => getPermalink(BLOG_BASE, 'page', lang);

/** * Assets bleiben unverändert (keine Sprache nötig)
 */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);

/** * NEU: Rekursive Funktion akzeptiert jetzt 'lang', um es durchzureichen 
 */
export const applyGetPermalinks = (menu: object = {}, lang = '') => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item, lang));
  } else if (typeof menu === 'object' && menu !== null) {
    const obj = {};
    for (const key in menu) {
      if (key === 'href') {
        if (typeof menu[key] === 'string') {
          // Hier wird die Sprache an getPermalink weitergegeben
          obj[key] = getPermalink(menu[key], 'page', lang);
        } else if (typeof menu[key] === 'object') {
          if (menu[key].type === 'home') {
            obj[key] = getHomePermalink(lang);
          } else if (menu[key].type === 'blog') {
            obj[key] = getBlogPermalink(lang);
          } else if (menu[key].type === 'asset') {
            obj[key] = getAsset(menu[key].url);
          } else if (menu[key].url) {
            obj[key] = getPermalink(menu[key].url, menu[key].type, lang);
          }
        }
      } else {
        obj[key] = applyGetPermalinks(menu[key], lang);
      }
    }
    return obj;
  }
  return menu;
};
