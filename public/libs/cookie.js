// src/lib/cookie.js
import CookieConsent from 'vanilla-cookie';
import { config } from '~/libs/cookieconsent-config.js';

export function initCookieBanner() {
  const currentLang = document.documentElement.lang?.split('-')[0] || 'de';

  CookieConsent.reset();
  CookieConsent.run({
    ...config,
    language: {
      ...config.language,
      current: currentLang
    }
  });
}

// Optional: Modal und Language Switch
export function handlePreferencesModal(triggerSelector = '[data-cc="show-preferencesModal"]') {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest(triggerSelector);
    if (!trigger) return;
    e.preventDefault();
    CookieConsent?.showPreferences();
  });
}

export function handleLangSwitcher() {
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
