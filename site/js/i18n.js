(function() {
  'use strict';

  const defaultLang = 'fr';
  const validLangs = ['fr', 'en'];

  let currentLang = localStorage.getItem('kij_lang');
  if (!currentLang || !validLangs.includes(currentLang)) {
    currentLang = defaultLang;
    localStorage.setItem('kij_lang', currentLang);
  }

  const translations = {};

  async function loadTranslations(lang) {
    if (translations[lang]) return;
    try {
      const response = await fetch(`js/${lang}.json`);
      if (response.ok) {
        translations[lang] = await response.json();
      } else {
        console.error(`Failed to load translation file for ${lang}`);
      }
    } catch (e) {
      console.error(`Error loading translations for ${lang}:`, e);
    }
  }

  function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.documentElement.lang = lang;
    updateSwitcherUI(lang);
  }

  function updateSwitcherUI(activeLang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === activeLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  async function switchLang(lang) {
    if (lang === currentLang) return;
    if (!validLangs.includes(lang)) return;

    await loadTranslations(lang);
    currentLang = lang;
    localStorage.setItem('kij_lang', currentLang);
    applyTranslations(currentLang);
  }

  async function init() {
    await loadTranslations(currentLang);
    applyTranslations(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        switchLang(lang);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
