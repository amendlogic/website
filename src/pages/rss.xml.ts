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

  const posts = await fetchPosts(lang);

  const rss = await getRssString({
    title: `${SITE.name}'s Blog`,
    description: METADATA?.description || '',
    site: `${import.meta.env.SITE}${lang}/`,

    items: posts.map((post) => ({
      link: new URL(post.permalink, SITE.site).toString(),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
    })),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
};