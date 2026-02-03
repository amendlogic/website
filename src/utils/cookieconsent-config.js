<script is:inline type="module">
    import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

    // 1. Konfiguration definieren
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
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
                                description: "Lorem ipsum dolor sit amet..."
                            },
                            {
                                title: "Streng Notwendige Cookies <span class=\"pm__badge\">Immer Aktiviert</span>",
                                description: "Lorem ipsum dolor sit amet...",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Funktionalitäts Cookies",
                                description: "Lorem ipsum dolor sit amet...",
                                linkedCategory: "functionality"
                            },
                            {
                                title: "Analytische Cookies",
                                description: "Lorem ipsum dolor sit amet...",
                                linkedCategory: "analytics"
                            },
                            {
                                title: "Werbung Cookies",
                                description: "Lorem ipsum dolor sit amet...",
                                linkedCategory: "marketing"
                            },
                            {
                                title: "Weitere Informationen",
                                description: "For any query in relation to my policy on cookies please <a class=\"cc__link\" href=\"#yourdomain.com\">contact me</a>."
                            }
                        ]
                    }
                },
                en: {
                    consentModal: {
                        title: "Hello traveller, it's cookie time!",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
                            { title: "Cookie Usage", description: "Lorem ipsum..." },
                            { title: "Strictly Necessary Cookies", description: "Lorem ipsum...", linkedCategory: "necessary" },
                            { title: "Functionality Cookies", description: "Lorem ipsum...", linkedCategory: "functionality" },
                            { title: "Analytics Cookies", description: "Lorem ipsum...", linkedCategory: "analytics" },
                            { title: "Advertisement Cookies", description: "Lorem ipsum...", linkedCategory: "marketing" },
                            { title: "More information", description: "Contact me..." }
                        ]
                    }
                }
            }
        }
    };

    // 2. Funktion zum Starten des Plugins
    function initCookieConsent() {
        if (typeof CookieConsent !== 'undefined') {
            CookieConsent.run(cookieConfig);
        }
    }

    // 3. Funktion: Button für Einstellungen neu verbinden
    // HINWEIS: Passe '.js-cookie-settings' an die Klasse oder ID deines Buttons im Footer an!
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

    // 4. Ablaufsteuerung
    
    // A) Beim ersten Laden
    initCookieConsent();
    attachPreferenceButton();

    // B) Bei Astro Seitenwechsel (View Transitions)
    document.addEventListener('astro:after-swap', () => {
        initCookieConsent();
        attachPreferenceButton();
    });
</script>
