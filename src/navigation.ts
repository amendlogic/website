import { SITE } from 'astrowind:config';
import { getPermalink, getBlogPermalink, getAsset, getHomePermalink } from './utils/permalinks';
import { useTranslations } from '~/i18n/utils';

export const getHeaderData = (lang = 'en') => {
  const { t } = useTranslations(lang);

  return {
    links: [
      {
        text: t('nav.product'), // War: nav.header.product
        links: [
          {
            text: t('nav.benefits'),
            href: getPermalink('/#benefits', 'page', lang),
          },
          {
            text: t('nav.system'),
            href: getPermalink('/#system', 'page', lang),
          },
          {
            text: t('nav.performance'),
            href: getPermalink('/#performance', 'page', lang),
          },
          {
            text: t('nav.testimonials'),
            href: getPermalink('/#testimonials', 'page', lang),
          },
          {
            text: t('nav.faq'),
            href: getPermalink('/#faq', 'page', lang),
          },
        ],
      },
      {
        text: t('nav.about'),
        href: getPermalink('/about', 'page', lang),
      },
      {
        text: t('nav.insights'),
        links: [
          {
            text: t('nav.getStarted'),
            href: getPermalink('get-started-website-with-astro-tailwind-css', 'post', lang),
          },
          {
            text: t('nav.docs'),
            href: getPermalink('tutorials', 'category', lang),
          },
          {
            text: t('nav.blog'),
            href: getBlogPermalink(lang),
          },
        ],
      },
      {
        text: t('nav.pricing'),
        href: getPermalink('/pricing', 'page', lang),
      },
    ],
    actions: [{ text: t('nav.actionBtn'), href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
  };
};

export const DEFAULT_FOOTNOTES = ['risk', 'education'];

export const getFooterData = (lang = 'en', footnotes: string[] = DEFAULT_FOOTNOTES) => {
  const { t } = useTranslations(lang);

  return {
    links: [
      {
        title: t('nav.product'), // Wiederverwendet
        links: [
          { text: t('nav.benefits'), href: getPermalink('/#benefits', 'page', lang) },
          { text: t('nav.system'), href: getPermalink('/#system', 'page', lang) },
          { text: t('nav.performance'), href: getPermalink('/#performance', 'page', lang) },
          { text: t('nav.pricing'), href: getPermalink('/pricing', 'page', lang) },
          { text: t('nav.changelog'), href: '#' },
        ],
      },
      {
        title: t('nav.resources'),
        links: [
          { text: t('nav.docs'), href: '#' },
          { text: t('nav.community'), href: '#', icon: 'tabler:external-link' },
          { text: t('nav.github'), href: '#', icon: 'tabler:external-link' },
          { text: t('nav.help'), href: getPermalink('/help-center', 'page', lang) },
        ],
      },
      {
        title: t('nav.company'),
        links: [
          { text: t('nav.about'), href: getPermalink('/about', 'page', lang) },
          { text: t('nav.team'), href: '#' },
          { text: t('nav.blog'), href: getBlogPermalink(lang) },
          { text: t('nav.contact'), href: getPermalink('/contact', 'page', lang) },
        ],
      },
      {
        title: t('nav.legal'),
        links: [
          { text: t('nav.imprint'), href: '#' },
          { text: t('nav.terms'), href: getPermalink('/terms', 'page', lang) },
          { text: t('nav.privacy'), href: getPermalink('/privacy', 'page', lang) },
          { text: t('nav.cookie'), href: '#' },
          { text: t('nav.risk'), href: '#' },
        ],
      },
    ],
    secondaryLinks: [
      { 
        text: 'We speak English', 
        href: getHomePermalink('en'), 
      },
      { 
        text: 'Wir sprechen Deutsch', 
        href: getHomePermalink('de'), 
      },
    ],
    footnotes,
    socialLinks: [
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
    ],
    footNote: `
    © ${new Date().getFullYear()} <a class="text-muted hover:text-gray-700 hover:underline dark:text-gray-400 transition duration-150 ease-in-out inline-flex items-center" href="https://github.com/arthelokyo">${SITE?.name}</a> · ${t('nav.rights')} · <a href="#" data-cc="show-preferencesModal" class="text-muted hover:text-gray-700 hover:underline dark:text-gray-400 transition duration-150 ease-in-out inline-flex items-center">${t('nav.cookieSettings')}</a>
  `,
  };
};
