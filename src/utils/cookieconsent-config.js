// DATEI: src/utils/cookieconsent-config.js
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

// 1. Die Config definieren
const config = {
    guiOptions: {
        consentModal: { layout: "box", position: "bottom right", flipButtons: false },
        preferencesModal: { layout: "box", position: "right", flipButtons: false }
    },
    categories: {
        necessary: { readOnly: true },
        functionality: {},
        analytics: {},
        marketing: {}
    },
    language: {
        default: "de",
        autoDetect: "browser",
        translations: {
            de: {
                consentModal: {
                    title: "Hallo Reisende!",
                    description: "Wir nutzen Cookies.",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Alle ablehnen",
                    showPreferencesBtn: "Einstellungen"
                },
                preferencesModal: {
                    title: "Einstellungen",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Alle ablehnen",
                    savePreferencesBtn: "Speichern",
                    sections: [
                        { title: "Verwendung", description: "..." },
                        { title: "Notwendig", linkedCategory: "necessary" },
                        { title: "Analyse", linkedCategory: "analytics" }
                    ]
                }
            }
        }
    }
};

// 2. Diese Funktion EXPORTIEREN wir jetzt
export const initCookieConsent = () => {
    
    // Prüfen ob Lib da ist
    if (typeof CookieConsent === 'undefined') return;

    // CookieConsent starten
    CookieConsent.run(config);

    // Button Logic verbinden
    const triggers = document.querySelectorAll('.js-cookie-settings, [data-aw-cookie-prefs]');
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            CookieConsent.showPreferences();
        });
    });
};
