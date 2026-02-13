import { getPermalink, getBlogPermalink, getAsset, getHomePermalink } from './utils/permalinks';
import { useTranslations } from '~/i18n/utils';

export const getHeaderData = (lang = 'en') => {
  const t = useTranslations(lang);

  return {
    links: [
      {
        text: t('nav.product'), // War: nav.header.product
        links: [
          {
            text: t('nav.features'),
            href: getPermalink('/#features', 'page', lang),
          },
          {
            text: t('nav.howItWorks'),
            href: getPermalink('/homes/startup', 'page', lang),
          },
          {
            text: t('nav.performance'),
            href: getPermalink('/homes/mobile-app', 'page', lang),
          },
          {
            text: t('nav.testimonials'),
            href: getPermalink('/homes/personal', 'page', lang),
          },
          {
            text: t('nav.faqs'),
            href: getPermalink('/homes/personal', 'page', lang),
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

export const getFooterData = (lang = 'en') => {
  const t = useTranslations(lang);

  return {
    links: [
      {
        title: t('nav.product'), // Wiederverwendet
        links: [
          { text: t('nav.features'), href: '#' },
          { text: t('nav.howItWorks'), href: '#' },
          { text: t('nav.performance'), href: '#' },
          { text: t('nav.pricing'), href: '#' },
          { text: t('nav.changelog'), href: '#' },
        ],
      },
      {
        title: t('nav.resources'),
        links: [
          { text: t('nav.docs'), href: '#' },
          { text: t('nav.community'), href: '#' },
          { text: 'Github', href: '#' }, // Markenname = Keine Übersetzung nötig
          { text: t('nav.help'), href: '#' },
        ],
      },
      {
        title: t('nav.company'),
        links: [
          { text: t('nav.about'), href: '#' },
          { text: t('nav.team'), href: '#' },
          { text: t('nav.blog'), href: '#' },
          { text: t('nav.contact'), href: '#' },
        ],
      },
      {
        title: t('nav.legal'),
        links: [
          { text: t('nav.imprint'), href: '#' },
          { text: t('nav.terms'), href: '#' },
          { text: t('nav.privacy'), href: '#' },
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
    socialLinks: [
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
    ],
    footNote: `
    © ${new Date().getFullYear()} <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo">AmendLogic</a> · ${t('nav.rights')} · <a href="#" data-cc="show-preferencesModal" class="text-blue-600 underline dark:text-muted">Cookie Settings</a>
  `,
  };
};
