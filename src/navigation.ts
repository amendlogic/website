import { getPermalink, getBlogPermalink, getAsset, getHomePermalink } from './utils/permalinks';
import navTranslations from '~/i18n/navigation.json';

// Ein kleiner Helper, falls eine Sprache angefordert wird, die nicht existiert (Fallback auf EN)
const getNavTexts = (lang: string) => {
  const key = lang in navTranslations ? lang : 'en';
  // @ts-ignore
  return navTranslations[key];
};

export const getHeaderData = (lang = 'en') => {
  const t = getNavTexts(lang);

  return {
    links: [
      {
        text: t.header.product,
        links: [
          {
            text: t.header.features,
            href: getPermalink('/#features', 'page', lang),
          },
          {
            text: t.header.howItWorks,
            href: getPermalink('/homes/startup', 'page', lang),
          },
          {
            text: t.header.performance,
            href: getPermalink('/homes/mobile-app', 'page', lang),
          },
          {
            text: t.header.testimonials,
            href: getPermalink('/homes/personal', 'page', lang),
          },
          {
            text: t.header.faqs,
            href: getPermalink('/homes/personal', 'page', lang),
          },
        ],
      },
      {
        text: t.header.about,
        href: getPermalink('/about', 'page', lang),
      },
      {
        text: t.header.insights,
        links: [
          {
            text: t.header.getStarted,
            href: getPermalink('get-started-website-with-astro-tailwind-css', 'post', lang),
          },
          {
            text: t.header.docs,
            href: getPermalink('tutorials', 'category', lang),
          },
          {
            text: t.header.blog,
            href: getBlogPermalink(lang),
          },
        ],
      },
      {
        text: t.header.pricing,
        href: getPermalink('/pricing', 'page', lang),
      },
    ],
    actions: [{ text: t.header.actionBtn, href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
  };
};

export const getFooterData = (lang = 'en') => {
  const t = getNavTexts(lang);

  return {
    links: [
      {
        title: t.footer.product,
        links: [
          { text: t.header.features, href: '#' },
          { text: t.header.howItWorks, href: '#' },
          { text: t.header.performance, href: '#' },
          { text: t.header.pricing, href: '#' },
          { text: t.footer.changelog, href: '#' },
        ],
      },
      {
        title: t.footer.resources,
        links: [
          { text: t.header.docs, href: '#' },
          { text: t.footer.community, href: '#' },
          { text: t.social.github, href: '#' },
          { text: t.footer.help, href: '#' },
        ],
      },
      {
        title: t.footer.company,
        links: [
          { text: t.header.about, href: '#' },
          { text: t.footer.team, href: '#' },
          { text: t.header.blog, href: '#' },
          { text: t.footer.contact, href: '#' },
        ],
      },
      {
        title: t.footer.legal,
        links: [
          { text: t.footer.imprint, href: '#' },
          { text: t.footer.terms, href: '#' },
          { text: t.footer.privacy, href: '#' },
          { text: t.footer.cookie, href: '#' },
          { text: t.footer.risk, href: '#' },
        ],
      },
    ],
    secondaryLinks: [
      { 
        text: 'English', 
        href: getHomePermalink('en'), 
      },
      { 
        text: 'Deutsch', 
        href: getHomePermalink('de'), 
      },
    ],
    socialLinks: [
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: t.social.rss, icon: 'tabler:rss', href: getAsset('/rss.xml') },
      { ariaLabel: t.social.github, icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
    ],
    footNote: `
    © ${new Date().getFullYear()} <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo">AmendLogic</a> · ${t.footer.rights} · <a href="#" data-cc="show-preferencesModal" class="text-blue-600 underline dark:text-muted">Cookie Settings</a>
  `,
  };
};
