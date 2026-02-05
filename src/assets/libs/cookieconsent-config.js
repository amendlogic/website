export const config = {
  // 1. WICHTIG: Cookie-Einstellungen explizit setzen
  cookie: {
    name: 'cc_cookie',
    expiresAfterDays: 182,
    domain: '', // Leer lassen = automatisch aktuelle Domain (wichtig für localhost!)
    path: '/',
    sameSite: 'Lax', 
  },

  // 2. Root Element definieren
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
          functionality: {},
          analytics: {},
          marketing: {}
      },
      language: {
          default: "en",
          autoDetect: "browser",
          translations: {
              de: {
                  consentModal: {
                      title: "Hallo Reisende, es ist Kekszeit!",
                      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
                      acceptAllBtn: "Alle akzeptieren",
                      acceptNecessaryBtn: "Alle ablehnen",
                      showPreferencesBtn: "Einstellungen verwalten",
                      footer: "<a href=\"#link\">Datenschutz</a>\n<a href=\"#link\">Bedingungen und Konditionen</a>"
                  },
                  preferencesModal: {
                      title: "Präferenzen für die Zustimmung",
                      acceptAllBtn: "Alle akzeptieren",
                      acceptNecessaryBtn: "Alle ablehnen",
                      savePreferencesBtn: "Einstellungen speichern",
                      closeIconLabel: "Modal schließen",
                      serviceCounterLabel: "Dienstleistungen",
                      sections: [
                          {
                              title: "Verwendung von Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                          },
                          {
                              title: "Streng Notwendige Cookies <span class=\"pm__badge\">Immer Aktiviert</span>",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "necessary"
                          },
                          {
                              title: "Funktionalitäts Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "functionality"
                          },
                          {
                              title: "Analytische Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "analytics"
                          },
                          {
                              title: "Werbung Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "marketing"
                          },
                          {
                              title: "Weitere Informationen",
                              description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"#yourdomain.com\">contact me</a>."
                          }
                      ]
                  }
              },
              en: {
                  consentModal: {
                      title: "Hello traveller, it's cookie time!",
                      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
                      acceptAllBtn: "Accept all",
                      acceptNecessaryBtn: "Reject all",
                      showPreferencesBtn: "Manage preferences",
                      footer: "<a href=\"#link\">Privacy Policy</a>\n<a href=\"#link\">Terms and conditions</a>"
                  },
                  preferencesModal: {
                      title: "Consent Preferences Center",
                      acceptAllBtn: "Accept all",
                      acceptNecessaryBtn: "Reject all",
                      savePreferencesBtn: "Save preferences",
                      closeIconLabel: "Close modal",
                      serviceCounterLabel: "Service|Services",
                      sections: [
                          {
                              title: "Cookie Usage",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                          },
                          {
                              title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "necessary"
                          },
                          {
                              title: "Functionality Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "functionality"
                          },
                          {
                              title: "Analytics Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "analytics"
                          },
                          {
                              title: "Advertisement Cookies",
                              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                              linkedCategory: "marketing"
                          },
                          {
                              title: "More information",
                              description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"#yourdomain.com\">contact me</a>."
                          }
                      ]
                  }
              }
          }
      }
    };
