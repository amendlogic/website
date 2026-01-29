import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Product',
      href: getPermalink('/'),
      links: [
        {
          text: 'Features',
          href: getPermalink('/homes/saas'),
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
  actions: [{ text: 'Download', href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
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
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
  ],
  disclaimer: [
    { text: '1. Finanzmärkte sind von Natur aus risikobehaftet, und es besteht ein erhebliches Risiko, Kapital zu verlieren, wenn man mit irgendeiner Anlageklasse handelt. Die auf dieser Website bereitgestellten Inhalte dienen ausschließlich Informationszwecken und sollten nicht als Finanzberatung betrachtet werden. Investitionsentscheidungen in Bezug auf Wertpapiere, Rohstoffe oder andere Märkte sind mit inhärenten Risiken verbunden und sollten am besten in Absprache mit einem qualifizierten Finanzexperten getroffen werden. Vergangene Ergebnisse sind nicht zwangsläufig ein Indikator für zukünftige Resultate.' },
    { text: '2. Simulierte Leistungsergebnisse weisen inhärente Einschränkungen auf. Im Gegensatz zum tatsächlichen Handel repräsentieren simulierte Ergebnisse keine realen Handelsaktivitäten. Zudem werden simulierte Trades nicht ausgeführt, und die Ergebnisse spiegeln möglicherweise nicht genau die Auswirkungen bestimmter Marktfaktoren wider, wie etwa Liquiditätsbeschränkungen. Simulierte Handelsprogramme profitieren im Allgemeinen von der Rückschau und basieren auf historischen Informationen. Es gibt keine Garantie dafür, dass ein Konto ähnliche Gewinne oder Verluste wie die in Simulationen gezeigten erzielt.' },
    { text: '3. Erfahrungsberichte, die auf dieser Website erscheinen, sind nicht unbedingt repräsentativ für die Erfahrungen aller Kunden oder Klienten und garantieren keinen zukünftigen Erfolg oder Leistung.' },
    { text: '3. Erfahrungsberichte, die auf dieser Website erscheinen, sind nicht unbedingt repräsentativ für die Erfahrungen aller Kunden oder Klienten und garantieren keinen zukünftigen Erfolg oder Leistung.' },
    { text: '3. Erfahrungsberichte, die auf dieser Website erscheinen, sind nicht unbedingt repräsentativ für die Erfahrungen aller Kunden oder Klienten und garantieren keinen zukünftigen Erfolg oder Leistung.' },
    { text: '3. Erfahrungsberichte, die auf dieser Website erscheinen, sind nicht unbedingt repräsentativ für die Erfahrungen aller Kunden oder Klienten und garantieren keinen zukünftigen Erfolg oder Leistung.' },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/arthelokyo"> Arthelokyo</a> · All rights reserved.
  `,
};
