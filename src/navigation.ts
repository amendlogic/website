import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Product',
      links: [
        {
          text: 'Features',
          href: getPermalink('/#features'),
        },
        {
          text: 'How it Works',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'Performance',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'Testimonials',
          href: getPermalink('/homes/personal'),
        },
        {
          text: 'FAQs',
          href: getPermalink('/homes/personal'),
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/terms'),
    },
    {
      text: 'Insights',
      links: [
        {
          text: 'Get Started',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Docs',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: 'Blog',
          href: getPermalink('tutorials', 'category'),
        },
      ],
    },
    {
      text: 'Pricing',
      href: getPermalink('/terms'),
    },
  ],
  actions: [{ text: 'Get Access', href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'How it Works', href: '#' },
        { text: 'Performance', href: '#' },
        { text: 'Testimonials', href: '#' },
        { text: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Discord Community', href: '#' },
        { text: 'GitHub Repo', href: '#' },
        { text: 'FAQs', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Legal Notice', href: '#' },
        { text: 'Privacy Policy', href: '#' },
        { text: 'Terms of Service', href: '#' },
        { text: 'Cookie Policy', href: '#' },
        { text: 'Cookie-Settings', href: '#', attrs: { 'data-cc': 'show-preferencesModal' } },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'We speak English', href: getPermalink('/terms') },
    { text: 'Wir sprechen Deutsch', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'TikTok', icon: 'tabler:brand-tiktok', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://github.com/arthelokyo/astrowind' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
  ],
  footNote: `
    © ${new Date().getFullYear()} AmendLogic · Site by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo">Kevin Amend</a> · All rights reserved.
  `,
};
