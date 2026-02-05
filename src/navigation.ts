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
        { text: 'Pricing', href: '#' },
        { text: 'Changelog', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '#' },
        { text: 'Community (Discord)', href: '#' },
        { text: 'GitHub', href: '#' },
        { text: 'Help Center', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Imprint', href: '#' },
        { text: 'Terms of Service', href: '#' },
        { text: 'Privacy Policy', href: '#' },
        { text: 'Cookie Policy', href: '#' },
        { text: 'Risk Disclosure', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'We speak English', href: getPermalink('/en'), attrs: { 'data-lang': 'en', 'data-cc': 'necessary' }, },
    { text: 'Wir sprechen Deutsch', href: getPermalink('/de'), attrs: { 'data-lang': 'de', 'data-cc': 'necessary' }, },
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
    © ${new Date().getFullYear()} <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo">AmendLogic</a> · All rights reserved · <a href="#" data-cc="show-preferencesModal" class="text-blue-600 underline dark:text-muted">Cookie Settings</a>
  `,
};
