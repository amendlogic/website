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

  // Hier wird "posts" zum ERSTEN und EINZIGEN Mal deklariert
  const allPosts = await fetchPosts(lang);

  // Falls keine Posts gefunden wurden, geben wir einen leeren Feed zurück, 
  // um den Build-Fehler von vorhin zu vermeiden.
  if (!allPosts || allPosts.length === 0) {
    return rss({
      title: `${SITE.name}`,
      description: 'No posts found',
      site: import.meta.env.SITE,
      items: [],
    });
  }

  const rssString = await getRssString({
    title: `${SITE.name} Blog (${lang.toUpperCase()})`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE,
    items: allPosts.map((post) => ({
      link: post.permalink,
      title: post.title || 'No Title',
      description: post.excerpt || '',
      pubDate: post.publishDate ? new Date(post.publishDate) : new Date(),
    })),
    trailingSlash: SITE.trailingSlash,
    customData: `<language>${lang}</language>`,
  });

  return new Response(rssString, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
