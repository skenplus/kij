// Custom Vanilla JS i18n
(function() {
  const defaultLang = 'fr';
  const supportedLangs = ['fr', 'en'];

  function getLang() {
    let lang = localStorage.getItem('kij_lang');
    if (!lang || !supportedLangs.includes(lang)) {
      lang = defaultLang;
    }
    return lang;
  }

  async function setLang(lang) {
    if (supportedLangs.includes(lang)) {

      // Video game transition animation
      let overlay = document.getElementById('vg-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'vg-overlay';
        overlay.className = 'vg-transition-overlay';

        const text = document.createElement('div');
        text.className = 'vg-loading-text';
        text.innerText = 'LOADING...';
        overlay.appendChild(text);

        document.body.appendChild(overlay);
      }

      // Trigger animation
      overlay.classList.add('animating');
      document.body.classList.add('vg-pixelate');

      // Wait for a short moment to simulate loading screen
      await new Promise(r => setTimeout(r, 600));

      localStorage.setItem('kij_lang', lang);
      document.documentElement.lang = lang;
      await loadTranslationsAndApply(lang);

      // End animation
      overlay.classList.remove('animating');
      setTimeout(() => {
        document.body.classList.remove('vg-pixelate');
      }, 100);
    }
  }

  async function loadTranslationsAndApply(lang) {
    try {
      const response = await fetch(`js/${lang}.json`);
      if (!response.ok) throw new Error('Translation not found');
      const translations = await response.json();

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.innerHTML = translations[key];
        }
      });

      // Update active state in language selector
      document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    } catch (err) {
      console.error('Failed to load translations:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getLang();
    document.documentElement.lang = currentLang;
    loadTranslationsAndApply(currentLang);

    // Bind click events on language selectors
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setLang(e.currentTarget.dataset.lang);
      });
    });
  });

  window.KIJ_i18n = { setLang, getLang };
})();
