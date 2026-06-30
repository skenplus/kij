(function () {
  'use strict';

  const defaultLang = 'fr';
  let currentLang = localStorage.getItem('kij_lang') || defaultLang;

  async function loadTranslations(lang) {
    try {
      const response = await fetch(`js/${lang}.json`);
      if (!response.ok) throw new Error('Translation not found');
      return await response.json();
    } catch (error) {
      console.error('Error loading translations:', error);
      return null;
    }
  }

  function applyTranslations(translations) {
    if (!translations) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });
  }

  async function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('kij_lang', lang);
    const translations = await loadTranslations(lang);
    applyTranslations(translations);

    // Update active state on language switchers
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // Setup switchers
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        if (lang && lang !== currentLang) {
          setLanguage(lang);
        }
      });
    });
  });

})();
