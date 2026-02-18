// src/lib/cookie-banner.js
import CookieConsent from 'vanilla-cookie';
import { config } from './cookieconsent-config.js';

export function initCookie() {
  const currentLang = document.documentElement.lang?.split('-')[0] || 'de';
  CookieConsent.reset();
  CookieConsent.run({
    ...config,
    language: { ...config.language, current: currentLang }
  });

  // Preferences Modal
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cc="show-preferencesModal"]');
    if (!trigger) return;
    e.preventDefault();
    CookieConsent?.showPreferences();
  });

  // Language Switch
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-lang]');
    if (!link) return;
    e.preventDefault();
    const lang = link.dataset.lang;
    if (!['de','en'].includes(lang)) return;

    const isProd = location.protocol === 'https:';
    document.cookie = `preferred_language=${lang}; path=/; max-age=31536000; SameSite=Lax${isProd ? '; Secure' : ''}`;
    const query = window.location.search || '';
    const hash = window.location.hash || '';
    window.location.href = `/${lang}/${query}${hash}`;
  });
}
