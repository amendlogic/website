import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, getPermalink } from './permalinks';

// --------------------------------------------------------------------------
// CONFIG & CACHING
// --------------------------------------------------------------------------

// Deine unterstützten Sprachen
const LOCALES = ['en', 'de'];
const DEFAULT_LANG = 'en';

// Regex: Erkennt "en/" oder "de/" am Anfang der ID
const LOCALE_REGEX = new RegExp(`^(${LOCALES.join('|')})/`);

// Der Cache: Speichert die verarbeiteten Posts, damit wir nicht 100x neu rechnen müssen
let _postsCache: Post[] | null = null;

// --------------------------------------------------------------------------
// HELPER: POST NORMALISIEREN
// --------------------------------------------------------------------------

const getNormalizedPost = async (entry: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = entry;
  const { Content, remarkPluginFrontmatter } = await render(entry);

  const {
    publishDate = new Date(),
    updateDate,
    title,
    excerpt,
    image,
    tags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  // 1. Sprache ermitteln (aus ID oder Frontmatter)
  let lang = DEFAULT_LANG;
  const match = id.match(LOCALE_REGEX);
  
  if (match) {
    lang = match[1]; // "en" oder "de"
  }

  // 2. ID bereinigen (Sprache entfernen für den Slug)
  // Aus "en/mein-post.md" wird "mein-post"
  const baseId = id.replace(LOCALE_REGEX, '').replace(/\.[^/.]+$/, "");
  const slug = cleanSlug(data.slug || baseId); // Frontmatter Slug hat Vorrang

  // 3. Permalink via permalinks.ts generieren
  const permalink = getPermalink(slug, 'post', lang);

  const publishDateObj = new Date(publishDate);
  const updateDateObj = updateDate ? new Date(updateDate) : undefined;

  const category = rawCategory
    ? { slug: cleanSlug(rawCategory), title: rawCategory }
    : undefined;

  const normalizedTags = tags.map((t: string) => ({
    slug: cleanSlug(t),
    title: t,
  }));

  return {
    id: id,
    slug: slug,
    permalink: permalink,
    lang: lang, // Wichtig für Filter!

    publishDate: publishDateObj,
    updateDate: updateDateObj,
    title,
    excerpt,
    image,
    category,
    tags: normalizedTags,
    author,
    draft,
    metadata,
    
    Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

// --------------------------------------------------------------------------
// LOAD & CACHE LOGIC
// --------------------------------------------------------------------------

const load = async (): Promise<Post[]> => {
  if (_postsCache) {
    return _postsCache;
  }

  const entries = await getCollection('post');
  const normalized = await Promise.all(entries.map(getNormalizedPost));

  // Sortieren nach Datum (Neueste zuerst) und Drafts entfernen
  _postsCache = normalized
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((p) => !p.draft);

  return _postsCache;
};

// --------------------------------------------------------------------------
// PUBLIC API
// --------------------------------------------------------------------------

export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/**
 * Holt Posts für eine bestimmte Sprache.
 * @param lang 'en' | 'de' | undefined (wenn undefined, gibt alle zurück)
 */
export const fetchPosts = async (lang?: string) => {
  const posts = await load();
  return lang ? posts.filter((p) => p.lang === lang) : posts;
};

/**
 * Holt Posts für eine Sprache, aber falls leer, gibt es Default-Sprache zurück.
 * (Gut für "Latest Posts" Widgets, damit die nicht leer bleiben)
 */
export const fetchPostsWithFallback = async (lang: string) => {
  const posts = await load();
  const inLang = posts.filter((p) => p.lang === lang);

  if (inLang.length === 0 && lang !== DEFAULT_LANG) {
    // Fallback auf Englisch, falls keine deutschen Posts da sind
    return posts.filter((p) => p.lang === DEFAULT_LANG);
  }
  return inLang;
};

/**
 * Findet die neuesten Posts (gefiltert nach Sprache)
 */
export const findLatestPosts = async ({ count = 4, lang = DEFAULT_LANG }: { count?: number; lang?: string }) => {
  const posts = await fetchPosts(lang); // Hier nutzen wir Strict Fetch, kein Fallback für Hauptlisten
  return posts.slice(0, count);
};

export const findPostsByIds = async (ids: string[]) => {
  const posts = await load();
  return ids
    .map((id) => posts.find((p) => p.id === id))
    .filter((p): p is Post => Boolean(p));
};

/**
 * Findet verwandte Artikel (nur in der gleichen Sprache!)
 */
export const getRelatedPosts = async (original: Post, maxResults = 4) => {
  const posts = await fetchPosts(original.lang); // Nur Posts gleicher Sprache laden
  const tagSet = new Set(original.tags.map((t) => t.slug));

  const scored = posts
    .filter((p) => p.slug !== original.slug) // Sich selbst ausschließen
    .map((p) => {
      let score = 0;

      // Gleiche Kategorie gibt viele Punkte
      if (p.category && original.category && p.category.slug === original.category.slug) {
        score += 5;
      }

      // Gleiche Tags geben Punkte
      p.tags.forEach((t) => {
        if (tagSet.has(t.slug)) score += 1;
      });

      return { post: p, score };
    })
    .filter((p) => p.score > 0) // Nur Posts mit Relevanz
    .sort((a, b) => b.score - a.score); // Beste zuerst

  return scored.slice(0, maxResults).map((s) => s.post);
};
