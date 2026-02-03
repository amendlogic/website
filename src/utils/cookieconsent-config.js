import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

document.addEventListener('astro:page-load', () => {

    // Sicherheitscheck, ob die Lib geladen ist
    if (typeof CookieConsent === 'undefined') return;

    // --- KONFIGURATION START ---
    const cookieConfig = {
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
        necessary: { readOnly: true },
        functionality: {},
        analytics: {},
        marketing: {}
      },
      language: {
        default: "de", // Habe es mal auf DE gesetzt, da deine Texte deutsch sind
        autoDetect: "browser",
        translations: {
          de: {
            consentModal: {
              title: "Hallo Reisende, es ist Kekszeit!",
              description: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              showPreferencesBtn: "Einstellungen",
              footer: "<a href=\"#\">Datenschutz</a>"
            },
            preferencesModal: {
              title: "Cookie-Einstellungen",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              savePreferencesBtn: "Speichern",
              closeIconLabel: "Schließen",
              sections: [
                { title: "Verwendung von Cookies", description: "Beschreibung..." },
                { title: "Notwendig", description: "Notwendige Cookies.", linkedCategory: "necessary" },
                { title: "Funktional", description: "Funktionale Cookies.", linkedCategory: "functionality" },
                { title: "Analyse", description: "Analyse Cookies.", linkedCategory: "analytics" },
                { title: "Marketing", description: "Marketing Cookies.", linkedCategory: "marketing" }
              ]
            }
          },
          en: {
             consentModal: { title: "Hello", description: "...", acceptAllBtn: "Accept", acceptNecessaryBtn: "Reject", showPreferencesBtn: "Settings" },
             preferencesModal: { title: "Preferences", acceptAllBtn: "Accept", acceptNecessaryBtn: "Reject", savePreferencesBtn: "Save", sections: [] }
          }
        }
      }
    };
    // --- KONFIGURATION ENDE ---

    // 1. CookieConsent starten
    // Das Plugin ist smart genug zu merken, ob schon zugestimmt wurde.
    // Aber es muss neu gerendert werden, weil Astro den Body getauscht hat.
    CookieConsent.run(cookieConfig);

    // 2. Button-Logik für Footer-Links (Einstellungen öffnen)
    // Wir suchen nach Elementen mit der Klasse 'js-cookie-settings' oder dem Attribut data-aw...
    const triggers = document.querySelectorAll('.js-cookie-settings, [data-aw-cookie-prefs]');
    
    triggers.forEach(btn => {
      // Alten Listener entfernen (optional, aber sauber)
      // Da wir inline sind, ist das Klonen ein Trick, um alte Events zu löschen, 
      // aber bei Astro Page-Swap ist das Element eh neu, also reicht addEventListener.
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        CookieConsent.showPreferences();
      });
    });

  });
