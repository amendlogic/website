import slugify from 'limax';
import { SITE, APP_BLOG } from 'astrowind:config';
import { trim } from '~/utils/utils';
import { getRelativeLocaleUrl } from 'astro:i18n';

// ----------------------------------------------------------------------
// KONSTANTEN & CLEANUP
// ----------------------------------------------------------------------
export const trimSlash = (s: string) => trim(trim(s, '/'));

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname) || 'blog';
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname) || 'category';
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';
export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

// ----------------------------------------------------------------------
// HAUPTFUNKTION: getPermalink
// ----------------------------------------------------------------------
export const getPermalink = (slug = '', type = 'page', lang = 'en'): string => {
  
  // 1. Externe Links oder Anker ignorieren
  if (slug.startsWith('https://') || slug.startsWith('http://') || slug.startsWith('#') || slug.startsWith('mailto:')) {
    return slug;
  }

  const trimmedSlug = trimSlash(slug);
  let path = trimmedSlug;

  // 2. Pfad basierend auf Typ berechnen
  switch (type) {
    case 'home':
      path = ''; 
      break;

    case 'blog':
      path = BLOG_BASE; 
      break;

    case 'post':
      // Erzeugt: blog/mein-post
      path = `${BLOG_BASE}/${trimmedSlug}`;
      break;

    case 'category':
      // FIX: Erzeugt blog/category/name (Passend zu deiner Ordnerstruktur)
      path = `${BLOG_BASE}/${CATEGORY_BASE}/${trimmedSlug}`;
      break;

    case 'tag':
      // FIX: Erzeugt blog/tag/name (Passend zu deiner Ordnerstruktur)
      path = `${BLOG_BASE}/${TAG_BASE}/${trimmedSlug}`;
      break;

    case 'asset':
      return getAsset(slug); 

    case 'page':
    default:
      path = trimmedSlug;
      break;
  }

  // 3. Native Astro i18n Funktion
  // Erzeugt /en/blog/category/tutorials oder /de/blog/tag/tools
  return getRelativeLocaleUrl(lang, path);
};

// ----------------------------------------------------------------------
// HELPER FUNKTIONEN
// ----------------------------------------------------------------------

export const getHomePermalink = (lang = 'en'): string => 
  getRelativeLocaleUrl(lang, '');

export const getBlogPermalink = (lang = 'en'): string => 
  getPermalink('', 'blog', lang);

export const getAsset = (path: string): string => {
  const clean = trimSlash(path);
  return clean ? `/${clean}` : '';
};

// ----------------------------------------------------------------------
// SEO: CANONICAL URLS
// ----------------------------------------------------------------------
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

// ----------------------------------------------------------------------
// NAVIGATION HELPER
// ----------------------------------------------------------------------
export const applyGetPermalinks = (menu: any = {}, lang = 'en') => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item, lang));
  } else if (typeof menu === 'object' && menu !== null) {
    const obj: any = {};
    for (const key in menu) {
      if (key === 'href') {
        if (typeof menu[key] === 'string') {
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
