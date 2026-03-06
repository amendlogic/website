export const SUPPORTED_LANGUAGES = ['de', 'en'];
const cookieIcon = `<span style="display:flex;align-items:center;gap:0.5rem"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 13v.01"/><path d="M12 17v.01"/><path d="M12 12v.01"/><path d="M16 14v.01"/><path d="M11 8v.01"/><path d="M13.148 3.476l2.667 1.104a4 4 0 0 0 4.615 6.27l.579 2.537a3 3 0 0 1 -1.44 3.522l-5.69 3.2a3 3 0 0 1 -2.979 0l-5.69 -3.2a3 3 0 0 1 -1.508 -3.664l2.208 -6.139a3 3 0 0 1 2.272 -1.762l2.267 -.385a3 3 0 0 1 2.699 .517z"/></svg>`;
const cookieIconClose = `</span>`;

// Helper: Consent-Update an GA4 senden
const updateGAConsent = (granted) => {
  if (typeof window.gtag !== 'function') {
    console.warn('[CookieConsent] gtag nicht verfügbar');
    return;
  }
  window.gtag('consent', 'update', {
    analytics_storage:   granted ? 'granted' : 'denied',
    ad_user_data:        granted ? 'granted' : 'denied',
    ad_personalization:  granted ? 'granted' : 'denied',
  });
};

export const config = {
  cookie: {
    name: 'cc_cookie',
    expiresAfterDays: 365,
    domain: '',
    path: '/',
    sameSite: 'Lax',
  },

  root: "body",

  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false
    }
  },

  categories: {
    necessary: {
      readOnly: true
    },
    functionality: {
      // autoClear für Cookies entfällt — YouTube nutzt hier nur localStorage
      // Cleanup läuft stattdessen im onChange-Callback
    },
    analytics: {
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: '_gid' },
        ]
      }
    },
  },

  // ✅ NEU: Wird aufgerufen wenn Nutzer erstmals entscheidet
  //         UND bei jedem Seitenload wenn Consent bereits gespeichert ist
  onConsent({ cookie }) {
    updateGAConsent(cookie.categories.includes('analytics'));
  },

  // ✅ NEU: Wird aufgerufen wenn Nutzer seine Einstellungen ändert
  onChange({ cookie }) {
    updateGAConsent(cookie.categories.includes('analytics'));

    // Analytics abgelehnt → alle GA-Cookies sofort löschen
    if (!cookie.categories.includes('analytics')) {
      const domain = location.hostname;
      const gaCookies = document.cookie
        .split(';')
        .map(c => c.trim().split('=')[0])
        .filter(name => /^_ga/.test(name) || name === '_gid');

      gaCookies.forEach(name => {
        document.cookie = `${name}=; max-age=0; path=/; domain=${domain}`;
        document.cookie = `${name}=; max-age=0; path=/; domain=.${domain}`;
      });
    }

    // Functionality abgelehnt → YouTube localStorage-Einträge löschen
    // (autoClear greift nur auf Cookies, nicht auf localStorage)
    if (!cookie.categories.includes('functionality')) {
      Object.keys(localStorage)
        .filter(key => /^yt[.\-_]|^ytidb/.test(key))
        .forEach(key => localStorage.removeItem(key));
    }
  },

  language: {
    default: "en",
    autoDetect: "document",
    translations: {

      // ─────────────────────────────────────────────
      // DEUTSCH
      // ─────────────────────────────────────────────
      de: {
        consentModal: {
          title: `${cookieIcon}Wir verwenden Cookies${cookieIconClose}`,
          description: "Wir setzen notwendige Cookies ein, die für den Betrieb der Website erforderlich sind. Mit Ihrer Einwilligung setzen wir zusätzlich Analyse-Cookies (Google Analytics 4) sowie funktionale Cookies für eingebettete YouTube-Videos ein. Eine Ablehnung hat keinen Einfluss auf die Funktionalität der Website.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          showPreferencesBtn: "Einstellungen verwalten",
          footer: `
            <a href="/de/datenschutz">Datenschutzerklärung</a>
            <a href="/de/cookies">Cookie-Richtlinie</a>
          `
        },
        preferencesModal: {
          title: "Cookie-Einstellungen",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          savePreferencesBtn: "Einstellungen speichern",
          closeIconLabel: "Schließen",
          serviceCounterLabel: "Dienst|Dienste",
          sections: [
            {
              title: "Ihre Privatsphäre",
              description: "Wir verwenden Cookies, um die grundlegenden Funktionen der Website zu gewährleisten und Ihre Online-Erfahrung zu verbessern. Für jede Kategorie können Sie entscheiden, ob Sie Ihre Einwilligung erteilen oder widerrufen möchten. Weitere Details entnehmen Sie bitte unserer <a class=\"cc__link\" href=\"/de/cookies\">Cookie-Richtlinie</a>."
            },
            {
              title: "Notwendige Cookies <span class=\"pm__badge\">Immer aktiv</span>",
              description: "Diese Cookies sind für den ordnungsgemäßen Betrieb der Website unerlässlich und können nicht deaktiviert werden. Sie umfassen Sicherheits-Cookies von Cloudflare (<code>_cfuvid</code>, <code>cf_clearance</code>) sowie das Cookie zur Speicherung Ihrer Cookie-Einwilligungsentscheidung (<code>cc_cookie</code>). Diese Cookies speichern keine personenbezogenen Daten zu Marketingzwecken.",
              linkedCategory: "necessary",
              cookieTable: {
                headers: {
                  name: "Cookie",
                  domain: "Anbieter",
                  desc: "Zweck",
                  expiration: "Laufzeit"
                },
                body: [
                  {
                    name: "_cfuvid",
                    domain: "Cloudflare",
                    desc: "Ratenbegrenzung und Missbrauchsprävention",
                    expiration: "Sitzung"
                  },
                  {
                    name: "cf_clearance",
                    domain: "Cloudflare",
                    desc: "Bestandene Cloudflare-Sicherheitsprüfung",
                    expiration: "1 Jahr"
                  },
                  {
                    name: "cc_cookie",
                    domain: "Diese Website",
                    desc: "Speichert Ihre Cookie-Einwilligungsentscheidung",
                    expiration: "1 Jahr"
                  }
                ]
              }
            },
            {
              title: "Funktionale Cookies",
              description: "Diese Cookies werden beim aktiven Abspielen eingebetteter YouTube-Videos gesetzt. Wir verwenden den erweiterten Datenschutzmodus (<code>youtube-nocookie.com</code>) — vor dem Abspielen werden keine Cookies gesetzt. Beim aktiven Abspielen überträgt YouTube Daten (inkl. IP-Adresse) an Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Datenübertragung in die USA auf Basis von Standardvertragsklauseln (SCC).",
              linkedCategory: "functionality",
              cookieTable: {
                headers: {
                  name: "Cookie",
                  domain: "Anbieter",
                  desc: "Zweck",
                  expiration: "Laufzeit"
                },
                body: [
                  {
                    name: "VISITOR_INFO1_LIVE",
                    domain: "YouTube",
                    desc: "Schätzt die Bandbreite des Nutzers für Videowiedergabe",
                    expiration: "6 Monate"
                  },
                  {
                    name: "YSC",
                    domain: "YouTube",
                    desc: "Verhindert missbräuchliche Nutzung; eindeutige Video-Sitzungs-ID",
                    expiration: "Sitzung"
                  },
                  {
                    name: "yt-remote-device-id",
                    domain: "YouTube",
                    desc: "Speichert Nutzer-Videopräferenzen",
                    expiration: "Dauerhaft"
                  }
                ]
              }
            },
            {
              title: "Analyse-Cookies",
              description: "Diese Cookies ermöglichen uns, die Nutzung der Website anonymisiert zu analysieren, um Inhalte und Benutzerführung zu verbessern. Alle Daten werden anonymisiert erhoben — IP-Adressen werden vor der Speicherung gekürzt. Die Daten werden nicht für Werbezwecke verwendet. Anbieter: Google Ireland Limited. Datenübertragung in die USA auf Basis von Standardvertragsklauseln (SCC).",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Cookie",
                  domain: "Anbieter",
                  desc: "Zweck",
                  expiration: "Laufzeit"
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    desc: "Unterscheidet Unique Users; speichert Client-ID",
                    expiration: "2 Jahre"
                  },
                  {
                    name: "_ga_[ID]",
                    domain: "Google Analytics",
                    desc: "Speichert und zählt Seitenaufrufe",
                    expiration: "2 Jahre"
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    desc: "Nutzerunterscheidung; täglich erneuert",
                    expiration: "24 Stunden"
                  }
                ]
              }
            },
            {
              title: "Weitere Informationen",
              description: "Für Fragen zu unserer Cookie-Richtlinie und Ihren Wahlmöglichkeiten kontaktieren Sie uns bitte per <a class=\"cc__link\" href=\"mailto:contact@amendlogic.com\">E-Mail</a>. Weitere Details finden Sie in unserer <a class=\"cc__link\" href=\"/de/privacy-policy\">Datenschutzerklärung</a> und <a class=\"cc__link\" href=\"/de/cookie-policy\">Cookie-Richtlinie</a>."
            }
          ]
        }
      },

      // ─────────────────────────────────────────────
      // ENGLISH
      // ─────────────────────────────────────────────
      en: {
        consentModal: {
          title: "We use cookies",
          description: "We use necessary cookies required for the operation of this website. With your consent, we additionally use analytics cookies (Google Analytics 4) and functional cookies for embedded YouTube videos. Declining does not affect the functionality of the website.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Necessary only",
          showPreferencesBtn: "Manage preferences",
          footer: `
            <a href="/en/privacy">Privacy Policy</a>
            <a href="/en/cookies">Cookie Policy</a>
          `
        },
        preferencesModal: {
          title: "Cookie Preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Necessary only",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Your Privacy",
              description: "We use cookies to ensure the basic functionality of the website and to enhance your experience. For each category, you can choose to grant or withdraw your consent at any time. For more details, please refer to our <a class=\"cc__link\" href=\"/en/cookies\">Cookie Policy</a>."
            },
            {
              title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always active</span>",
              description: "These cookies are essential for the proper operation of the website and cannot be disabled. They include security cookies from Cloudflare (<code>_cfuvid</code>, <code>cf_clearance</code>) and the cookie storing your consent decision (<code>cc_cookie</code>). These cookies do not store any personal data for marketing purposes.",
              linkedCategory: "necessary",
              cookieTable: {
                headers: {
                  name: "Cookie",
                  domain: "Provider",
                  desc: "Purpose",
                  expiration: "Duration"
                },
                body: [
                  {
                    name: "_cfuvid",
                    domain: "Cloudflare",
                    desc: "Rate limiting and abuse prevention",
                    expiration: "Session"
                  },
                  {
                    name: "cf_clearance",
                    domain: "Cloudflare",
                    desc: "Records a passed Cloudflare security check",
                    expiration: "1 year"
                  },
                  {
                    name: "cc_cookie",
                    domain: "This website",
                    desc: "Stores your cookie consent decision",
                    expiration: "1 year"
                  }
                ]
              }
            },
            {
              title: "Functional Cookies",
              description: "These cookies are set when embedded YouTube videos are actively played. We use Privacy-Enhanced Mode (<code>youtube-nocookie.com</code>) — no cookies are set before playback. Upon active playback, YouTube transmits data (including IP address) to Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Data transfer to the USA is based on Standard Contractual Clauses (SCCs).",
              linkedCategory: "functionality",
              cookieTable: {
                headers: {
                  name: "Cookie",
                  domain: "Provider",
                  desc: "Purpose",
                  expiration: "Duration"
                },
                body: [
                  {
                    name: "VISITOR_INFO1_LIVE",
                    domain: "YouTube",
                    desc: "Estimates user bandwidth for video playback",
                    expiration: "6 months"
                  },
                  {
                    name: "YSC",
                    domain: "YouTube",
                    desc: "Prevents abusive use; unique video session ID",
                    expiration: "Session"
                  },
                  {
                    name: "yt-remote-device-id",
                    domain: "YouTube",
                    desc: "Stores user video preferences",
                    expiration: "Persistent"
                  }
                ]
              }
            },
            {
              title: "Analytics Cookies",
              description: "These cookies allow us to anonymously analyse website usage in order to improve content and navigation. All data is collected anonymously — IP addresses are truncated before storage. Data is not used for advertising purposes. Provider: Google Ireland Limited. Data transfer to the USA is based on Standard Contractual Clauses (SCCs).",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Cookie",
                  domain: "Provider",
                  desc: "Purpose",
                  expiration: "Duration"
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    desc: "Distinguishes unique users; stores client ID",
                    expiration: "2 years"
                  },
                  {
                    name: "_ga_[ID]",
                    domain: "Google Analytics",
                    desc: "Stores and counts page views",
                    expiration: "2 years"
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    desc: "User distinction; renewed daily",
                    expiration: "24 hours"
                  }
                ]
              }
            },
            {
              title: "More information",
              description: "For any questions regarding our cookie policy and your choices, please <a class=\"cc__link\" href=\"mailto:contact@amendlogic.com\">contact us</a>. For more details, see our <a class=\"cc__link\" href=\"/en/privacy-policy\">Privacy Policy</a> and <a class=\"cc__link\" href=\"/en/cookie-policy\">Cookie Policy</a>."
            }
          ]
        }
      }

    }
  }
};
