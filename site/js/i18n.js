(async function() {
  'use strict';

  const currentLang = localStorage.getItem('kij_lang') || 'fr';

  try {
    const res = await fetch(`js/${currentLang}.json`);
    if (!res.ok) throw new Error('Failed to load translations');
    const translations = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });
  } catch (err) {
    console.error('i18n error:', err);
  }

  const langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    langSwitcher.value = currentLang;
    langSwitcher.addEventListener('change', (e) => {
      localStorage.setItem('kij_lang', e.target.value);
      location.reload();
    });
  }
})();
