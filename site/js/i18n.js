(function () {
  'use strict';

  // Check language in localStorage or default to 'fr'
  let currentLang = localStorage.getItem('kij_lang') || 'fr';
  let translations = {};

  async function loadTranslations(lang) {
    try {
      const response = await fetch(`js/${lang}.json`);
      if (response.ok) {
        translations = await response.json();
        applyTranslations();
      } else {
        console.error('Translations not found for lang:', lang);
      }
    } catch (err) {
      console.error('Error loading translations:', err);
    }
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        // Use innerHTML as requested in memory to preserve formatting tags (e.g., <em>, <br />)
        el.innerHTML = translations[key];
      }
    });
  }

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('kij_lang', lang);
    loadTranslations(lang);
    updateLangToggleUI();
  }

  function updateLangToggleUI() {
    const langBtns = document.querySelectorAll('.lang-toggle-btn');
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  window.kij_i18n = {
    setLanguage,
    currentLang: () => currentLang
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
    updateLangToggleUI();

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage(btn.getAttribute('data-lang'));
      });
    });
  });
})();
