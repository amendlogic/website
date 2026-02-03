import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

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
        default: "en",
        autoDetect: "browser",
        translations: {
            de: {
                consentModal: {
                    title: "Hallo Reisende, es ist Kekszeit!",
                    description: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Alle ablehnen",
                    showPreferencesBtn: "Einstellungen verwalten",
                    footer: "<a href=\"#link\">Datenschutz</a>\n<a href=\"#link\">AGB</a>"
                },
                preferencesModal: {
                    title: "Cookie-Einstellungen",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Alle ablehnen",
                    savePreferencesBtn: "Einstellungen speichern",
                    closeIconLabel: "Schließen",
                    sections: [
                        { title: "Verwendung von Cookies", description: "Wir nutzen Cookies..." },
                        { title: "Notwendig", description: "Diese Cookies sind zwingend erforderlich.", linkedCategory: "necessary" },
                        { title: "Funktional", description: "Einstellungen speichern etc.", linkedCategory: "functionality" },
                        { title: "Analyse", description: "Besucherstatistiken.", linkedCategory: "analytics" },
                        { title: "Marketing", description: "Werbung.", linkedCategory: "marketing" }
                    ]
                }
            },
            en: {
                consentModal: {
                    title: "Hello traveller, it's cookie time!",
                    description: "We use cookies to improve your experience.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage preferences",
                    footer: "<a href=\"#link\">Privacy Policy</a>\n<a href=\"#link\">Terms</a>"
                },
                preferencesModal: {
                    title: "Consent Preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close",
                    sections: [
                        { title: "Cookie Usage", description: "We use cookies..." },
                        { title: "Strictly Necessary", description: "Required for the site to work.", linkedCategory: "necessary" },
                        { title: "Functionality", description: "Preferences etc.", linkedCategory: "functionality" },
                        { title: "Analytics", description: "Visitor statistics.", linkedCategory: "analytics" },
                        { title: "Marketing", description: "Ads.", linkedCategory: "marketing" }
                    ]
                }
            }
        }
    }
};

function initCookieConsent() {
    if (typeof CookieConsent !== 'undefined') {
        CookieConsent.run(cookieConfig);
    }
}

function attachPreferenceButton() {
    const triggers = document.querySelectorAll('.js-cookie-settings, [data-aw-cookie-prefs]');
    triggers.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof CookieConsent !== 'undefined') {
                CookieConsent.showPreferences();
            }
        });
    });
}

// Initialer Start
initCookieConsent();
attachPreferenceButton();

// Neustart bei Astro View Transitions
document.addEventListener('astro:after-swap', () => {
    initCookieConsent();
    attachPreferenceButton();
});
