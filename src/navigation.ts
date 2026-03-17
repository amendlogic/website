// src/navigation.ts 
import { SITE } from 'astrowind:config';
import { getPermalink, getBlogPermalink, getAsset, getHomePermalink } from './utils/permalinks';
import { useTranslations } from '~/i18n/utils';

export const FOOTNOTE_ORDER = ['education', 'risk', 'backtest', 'testimonials', 'payments', 'third-party', 'regulatory'];
export const DEFAULT_FOOTNOTES = ['risk', 'backtest', 'advice', 'third-party'];
// -----------------------------
// Header
// -----------------------------
export function getHeaderData(lang?: string) {
  const t = useTranslations(lang);

  return {
    links: [
      {
        text: t('nav.product'),
        links: [
          { text: t('nav.benefits'), href: getPermalink('/#benefits', 'page', lang) },
          { text: t('nav.system'), href: getPermalink('/#system', 'page', lang) },
          { text: t('nav.backtest'), href: getPermalink('/#backtest', 'page', lang) },
          { text: t('nav.testimonials'), href: getPermalink('/#testimonials', 'page', lang) },
          { text: t('nav.faq'), href: getPermalink('/#faq', 'page', lang) },
        ],
      },
      { text: t('nav.about'), href: getPermalink('/about', 'page', lang) },
      {
        text: t('nav.insights'),
        links: [
          { text: t('nav.performance'), href: getPermalink('/performance', 'page', lang) },
          { text: t('nav.getStarted'), href: getPermalink('get-started', 'post', lang) },
          { text: t('nav.docs'), href: getPermalink('documentation', 'category', lang) },
          { text: t('nav.blog'), href: getBlogPermalink(lang) },
        ],
      },
      { text: t('nav.pricing'), href: getPermalink('/pricing', 'page', lang) },
    ],
    actions: [{ text: t('nav.actionBtn'), href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
  };
}

// -----------------------------
// Footer
// -----------------------------
export function getFooterData(
  lang?: string,
  footnotes: string[] = DEFAULT_FOOTNOTES
) {
  const t = useTranslations(lang);

  return {
    links: [
      {
        title: t('nav.product'),
        links: [
          { text: t('nav.benefits'), href: getPermalink('/#benefits', 'page', lang) },
          { text: t('nav.system'), href: getPermalink('/#system', 'page', lang) },
          { text: t('nav.backtest'), href: getPermalink('/#backtest', 'page', lang) },
          { text: t('nav.pricing'), href: getPermalink('/pricing', 'page', lang) },
          { text: t('nav.changelog'), href: getPermalink('changelog', 'category', lang) },
        ],
      },
      {
        title: t('nav.resources'),
        links: [
          { text: t('nav.performance'), href: getPermalink('/performance', 'page', lang) },
          { text: t('nav.docs'), href: getPermalink('documentation', 'category', lang) },
          { text: t('nav.community'), href: 'https://discord.gg/GjGUHRzYvG', target: '_blank', rel: 'noopener noreferrer', icon: 'tabler:external-link' },
          { text: t('nav.github'), href: 'https://github.com/amendlogic', target: '_blank', rel: 'noopener noreferrer', icon: 'tabler:external-link' },
          { text: t('nav.help'), href: getPermalink('/help-center', 'page', lang) },
        ],
      },
      {
        title: t('nav.company'),
        links: [
          { text: t('nav.about'), href: getPermalink('/about', 'page', lang) },
          { text: t('nav.team'), href: getPermalink('/about', 'page', lang) },
          { text: t('nav.blog'), href: getBlogPermalink(lang) },
          { text: t('nav.contact'), href: getPermalink('/contact', 'page', lang) },
          { text: t('nav.portal'), href: 'https://whop.com/@me/settings/orders/', target: '_blank', rel: 'noopener noreferrer', icon: 'tabler:external-link' },
        ],
      },
      {
        title: t('nav.legal'),
        links: [
          { text: t('nav.imprint'), href: getPermalink('/impressum', 'page', lang) },
          { text: t('nav.terms'), href: getPermalink('/terms-of-service', 'page', lang) },
          { text: t('nav.privacy'), href: getPermalink('/privacy-policy', 'page', lang) },
          { text: t('nav.cookie'), href: getPermalink('/cookie-policy', 'page', lang) },
          { text: t('nav.risk'), href: getPermalink('/risk-disclosure', 'page', lang) },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'We speak English', href: getHomePermalink('en') },
      { text: 'Wir sprechen Deutsch', href: getHomePermalink('de') },
    ],
    footnotes,
    socialLinks: [
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#', target: '_blank', rel: 'noopener noreferrer' },
      // { ariaLabel: 'TikTok', icon: 'tabler:brand-tiktok', href: '#', target: '_blank', rel: 'noopener noreferrer' },
      // { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#', target: '_blank', rel: 'noopener noreferrer' },
      // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#', target: '_blank', rel: 'noopener noreferrer' },
      // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#', target: '_blank', rel: 'noopener noreferrer' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset(`/${lang}/rss.xml`) },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/amendlogic', target: '_blank', rel: 'noopener noreferrer' },
    ],
    footNote: `
      © ${new Date().getFullYear()} <a class="text-muted hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out" href="https://github.com/arthelokyo">${SITE?.name}</a> · ${t('nav.rights')} · 
      <a href="#" data-cc="show-preferencesModal" class="text-muted hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out">${t('nav.cookieSettings')}</a>
    `,
  };
}
