import { getPermalink, getBlogPermalink, getAsset, getHomePermalink } from './utils/permalinks';
import { useTranslations } from '~/i18n/config';

export const getHeaderData = (lang = 'en') => {
  // Wir nutzen jetzt den Hook, um die t-Funktion für die aktuelle Sprache zu bekommen
  const t = useTranslations(lang);

  return {
    links: [
      {
        text: t('nav.header.product'),
        links: [
          {
            text: t('nav.header.features'),
            href: getPermalink('/#features', 'page', lang),
          },
          {
            text: t('nav.header.howItWorks'),
            href: getPermalink('/homes/startup', 'page', lang),
          },
          {
            text: t('nav.header.performance'),
            href: getPermalink('/homes/mobile-app', 'page', lang),
          },
          {
            text: t('nav.header.testimonials'),
            href: getPermalink('/homes/personal', 'page', lang),
          },
          {
            text: t('nav.header.faqs'),
            href: getPermalink('/homes/personal', 'page', lang),
          },
        ],
      },
      {
        text: t('nav.header.about'),
        href: getPermalink('/about', 'page', lang),
      },
      {
        text: t('nav.header.insights'),
        links: [
          {
            text: t('nav.header.getStarted'),
            href: getPermalink('get-started-website-with-astro-tailwind-css', 'post', lang),
          },
          {
            text: t('nav.header.docs'),
            href: getPermalink('tutorials', 'category', lang),
          },
          {
            text: t('nav.header.blog'),
            href: getBlogPermalink(lang),
          },
        ],
      },
      {
        text: t('nav.header.pricing'),
        href: getPermalink('/pricing', 'page', lang),
      },
    ],
    actions: [{ text: t('nav.header.actionBtn'), href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
  };
};

export const getFooterData = (lang = 'en') => {
  const t = useTranslations(lang);

  return {
    links: [
      {
        title: t('nav.footer.product'),
        links: [
          { text: t('nav.header.features'), href: '#' },
          { text: t('nav.header.howItWorks'), href: '#' },
          { text: t('nav.header.performance'), href: '#' },
          { text: t('nav.header.pricing'), href: '#' },
          { text: t('nav.footer.changelog'), href: '#' },
        ],
      },
      {
        title: t('nav.footer.resources'),
        links: [
          { text: t('nav.header.docs'), href: '#' },
          { text: t('nav.footer.community'), href: '#' },
          { text: t('nav.social.github'), href: '#' },
          { text: t('nav.footer.help'), href: '#' },
        ],
      },
      {
        title: t('nav.footer.company'),
        links: [
          { text: t('nav.header.about'), href: '#' },
          { text: t('nav.footer.team'), href: '#' },
          { text: t('nav.header.blog'), href: '#' },
          { text: t('nav.footer.contact'), href: '#' },
        ],
      },
      {
        title: t('nav.footer.legal'),
        links: [
          { text: t('nav.footer.imprint'), href: '#' },
          { text: t('nav.footer.terms'), href: '#' },
          { text: t('nav.footer.privacy'), href: '#' },
          { text: t('nav.footer.cookie'), href: '#' },
          { text: t('nav.footer.risk'), href: '#' },
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
      { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
    ],
    footNote: `
    © ${new Date().getFullYear()} <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo">AmendLogic</a> · ${t('nav.footer.rights')} · <a href="#" data-cc="show-preferencesModal" class="text-blue-600 underline dark:text-muted">Cookie Settings</a>
  `,
  };
};
