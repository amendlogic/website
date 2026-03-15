import { getRssString } from '@astrojs/rss';
import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { LANGUAGES } from '~/i18n/utils';

export const prerender = true;

export async function getStaticPaths() {
  return Object.keys(LANGUAGES).map((lang) => ({ params: { lang } }));
}

export const GET = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params;

  if (!APP_BLOG.isEnabled) {
    return new Response(null, { status: 404, statusText: 'Not found' });
  }

  // Sicherstellen, dass nur Posts der aktuellen Sprache geladen werden
  const posts = await fetchPosts(lang);

  const rss = await getRssString({
    // Optional: Titel sprachspezifisch machen
    title: `${SITE.name} Blog (${lang.toUpperCase()})`,
    description: METADATA?.description || '',
    
    // Die Basis-URL des Feeds
    site: import.meta.env.SITE,

    items: posts.map((post) => ({
      // Nutze post.permalink direkt, wenn er bereits die Sprache enthält
      link: post.permalink, 
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
      // Optional: Kategorie hinzufügen
      categories: post.category ? [post.category] : [],
    })),

    trailingSlash: SITE.trailingSlash,
    // Das language-Tag hilft RSS-Readern bei der Einordnung
    customData: `<language>${lang}</language>`,
  });
  const posts = await fetchPosts(lang);
  console.log(`Anzahl Posts für ${lang}:`, posts.length); // Das siehst du dann im Vercel Log

  if (posts.length === 0) {
    // Erstellt einen leeren Feed oder einen Platzhalter-Eintrag, damit der Build nicht abbricht
    return rss({
        title: `${SITE.name}`,
        description: 'No posts found',
        site: import.meta.env.SITE,
        items: [],
    });
  }

  return new Response(rss, {
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    },
  });
};
