import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE, getPermalink } from './permalinks';

// --- HELPER: Post Normalisieren (Sprache erkennen!) ---
const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  // 1. ID Splitten (en/mein-post.md -> lang: en, slug: mein-post)
  const [lang, ...slugParts] = id.split('/');
  const rawSlug = slugParts.join('/').replace(/\.[^/.]+$/, ""); // .md entfernen
  const slug = cleanSlug(rawSlug);

  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  // 2. Permalink mit Sprache generieren (nutzt deine neue permalinks.ts)
  const permalink = getPermalink(post.permalink || slug, 'post', lang);

  return {
    id: id,
    slug: slug,
    permalink: permalink,
    
    // Wir speichern die Sprache im Post-Objekt, wichtig für Filter!
    lang: lang, 

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }
  return _posts;
};

// --- FIX: Filter nach Sprache hinzugefügt ---
export const findLatestPosts = async ({ count, lang }: { count?: number, lang?: string }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  // Wenn eine Sprache übergeben wurde, filtern wir!
  const filtered = lang ? posts.filter(p => p.lang === lang) : posts;

  return filtered ? filtered.slice(0, _count) : [];
};

export const getRelatedPosts = async (originalPost: Post, maxResults: number = 4): Promise<Post[]> => {
  const allPosts = await fetchPosts();
  
  // WICHTIG: Nur Posts der gleichen Sprache vorschlagen!
  const langPosts = allPosts.filter(p => p.lang === originalPost.lang);

  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = langPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
};

// --- VERALTETE ROUTING FUNKTIONEN ---
// Diese werden von den neuen [lang] Pages nicht mehr genutzt, 
// bleiben aber hier, falls alte Komponenten sie noch aufrufen.
// (Sie funktionieren evtl. nicht korrekt mit i18n, aber stören auch nicht, wenn nicht genutzt)

export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];
  const posts = await fetchPosts();
  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];
  const posts = await fetchPosts();
  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

// Die folgenden getStaticPaths... Funktionen sind eigentlich obsolet, 
// da wir jetzt [lang]/blog nutzen.
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => { return [] };
export const getStaticPathsBlogPost = async () => { return [] };
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => { return [] };
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => { return [] };
