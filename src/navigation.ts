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
          text: 'User Feedback',
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
      text: 'Plans',
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
        { text: 'User Feedback', href: '#' },
        { text: 'Customer stories', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Discord', href: '#' },
        { text: 'FAQs', href: '#' },
      ],
    },
    {
      title: 'Legal & Privacy',
      links: [
        { text: 'Terms of Service', href: '#' },
        { text: 'Disclaimer', href: '#' },
        { text: 'Legal Notice', href: '#' },
        { text: 'Privacy Policy', href: '#' },
        { text: 'Cookie Policy', href: '#' },
        { text: 'Cookie-Settings', href: '#', attrs: { 'data-cc': 'show-settings' } // Das Attribut triggert das Modal },
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
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
  ],
  footNote: `
    © ${new Date().getFullYear()} AmendLogic · Site by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo">Kevin Amend</a> · All rights reserved.
  `,
};
