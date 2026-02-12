const getUrl = (lang: string, path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (cleanPath === '/') return `/${lang}/`;
  return `/${lang}${cleanPath}`;
};

export const getNavigationData = (lang = 'de') => {
  
  // === DEUTSCHE NAVIGATION ===
  if (lang === 'de') {
    return {
      headerData: {
        links: [
          {
            text: 'Produkt',
            links: [
              { text: 'Funktionen', href: getUrl(lang, '#features') },
              { text: 'Wie es funktioniert', href: getUrl(lang, 'homes/startup') },
              { text: 'Leistung', href: getUrl(lang, 'homes/mobile-app') },
              { text: 'Kundenstimmen', href: getUrl(lang, 'homes/personal') },
              { text: 'FAQs', href: getUrl(lang, 'homes/personal') },
            ],
          },
          {
            text: 'Über uns',
            href: getUrl(lang, 'about'), // Beispielpfad
          },
          {
            text: 'Einblicke',
            links: [
              { text: 'Loslegen', href: getUrl(lang, 'blog/get-started-website-with-astro-tailwind-css') },
              { text: 'Doku', href: getUrl(lang, 'category/tutorials') },
              { text: 'Blog', href: getUrl(lang, 'blog') },
            ],
          },
          {
            text: 'Preise',
            href: getUrl(lang, 'pricing'),
          },
        ],
        actions: [{ text: 'Zugriff erhalten', href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
      },

      footerData: {
        links: [
          {
            title: 'Produkt',
            links: [
              { text: 'Funktionen', href: '#' },
              { text: 'Preise', href: '#' },
            ],
          },
          {
            title: 'Ressourcen',
            links: [
              { text: 'Dokumentation', href: '#' },
              { text: 'Community', href: '#' },
            ],
          },
          {
            title: 'Rechtliches',
            links: [
              { text: 'Impressum', href: getUrl(lang, 'imprint') },
              { text: 'Datenschutz', href: getUrl(lang, 'privacy') },
            ],
          },
        ],
        secondaryLinks: [
           // Hier verlinken wir fest auf die Sprachen
          { text: 'English', href: '/en/' }, 
          { text: 'Deutsch', href: '/de/' },
        ],
        socialLinks: [
          { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
          { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
        ],
        footNote: `
          © ${new Date().getFullYear()} AmendLogic · Alle Rechte vorbehalten.
        `,
      },
    };
  }

  // === ENGLISCHE NAVIGATION (Fallback) ===
  return {
    headerData: {
      links: [
        {
          text: 'Product',
          links: [
            { text: 'Features', href: getUrl(lang, '#features') },
            { text: 'How it Works', href: getUrl(lang, 'homes/startup') },
            { text: 'Performance', href: getUrl(lang, 'homes/mobile-app') },
            { text: 'Testimonials', href: getUrl(lang, 'homes/personal') },
            { text: 'FAQs', href: getUrl(lang, 'homes/personal') },
          ],
        },
        {
          text: 'About',
          href: getUrl(lang, 'about'),
        },
        {
          text: 'Insights',
          links: [
            { text: 'Get Started', href: getUrl(lang, 'blog/get-started-website-with-astro-tailwind-css') },
            { text: 'Docs', href: getUrl(lang, 'category/tutorials') },
            { text: 'Blog', href: getUrl(lang, 'blog') },
          ],
        },
        {
          text: 'Pricing',
          href: getUrl(lang, 'pricing'),
        },
      ],
      actions: [{ text: 'Get Access', href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
    },

    footerData: {
      links: [
        {
          title: 'Product',
          links: [
            { text: 'Features', href: '#' },
            { text: 'Pricing', href: '#' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { text: 'Documentation', href: '#' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { text: 'Terms', href: '#' },
            { text: 'Privacy Policy', href: '#' },
          ],
        },
      ],
      secondaryLinks: [
        { text: 'English', href: '/en/' },
        { text: 'Deutsch', href: '/de/' },
      ],
      socialLinks: [
        { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
        { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/arthelokyo/astrowind' },
      ],
      footNote: `
        © ${new Date().getFullYear()} AmendLogic · All rights reserved.
      `,
    },
  };
};
