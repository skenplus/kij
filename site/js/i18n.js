// i18n implementation for KIJ Platform
(async function() {
  'use strict';

  // Get preferred language from localStorage or default to 'fr'
  let currentLang = localStorage.getItem('kij_lang') || 'fr';

  // Fetch translations
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`js/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading translations:', error);
      return null;
    }
  }

  // Apply translations to the DOM
  async function applyTranslations(lang) {
    const translations = await loadTranslations(lang);
    if (!translations) return;

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        // Use innerHTML to preserve HTML tags like <em> and <br />
        el.innerHTML = translations[key];
      }
    });

    // Update active state of language switchers if they exist
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Set language and update DOM
  window.setLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('kij_lang', lang);
    applyTranslations(lang);
  };

  // Initial load
  await applyTranslations(currentLang);

  // Expose current language for other scripts if needed
  window.getCurrentLang = () => currentLang;

  // Add event listeners to language switcher buttons
  function setupListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupListeners);
  } else {
    setupListeners();
  }

})();
