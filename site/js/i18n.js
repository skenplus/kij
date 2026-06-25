// i18n logic with video game style animation
document.addEventListener('DOMContentLoaded', async () => {
  let translations = {};

  // Try to load translations
  try {
    const frRes = await fetch('js/fr.json');
    const enRes = await fetch('js/en.json');
    translations.fr = await frRes.json();
    translations.en = await enRes.json();
  } catch (e) {
    console.error('Error loading translations', e);
  }

  // Create language switcher UI
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const langSwitcher = document.createElement('div');
    langSwitcher.className = 'lang-switcher';
    langSwitcher.innerHTML = `
      <button class="lang-btn" data-lang="fr">FR</button>
      <button class="lang-btn" data-lang="en">EN</button>
    `;
    navLinks.appendChild(langSwitcher);
  }

  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    const mobileLangSwitcher = document.createElement('div');
    mobileLangSwitcher.className = 'lang-switcher mobile';
    mobileLangSwitcher.innerHTML = `
      <button class="lang-btn" data-lang="fr">FR</button>
      <button class="lang-btn" data-lang="en">EN</button>
    `;
    mobileMenu.appendChild(mobileLangSwitcher);
  }

  // Create glitch animation overlay
  const glitchOverlay = document.createElement('div');
  glitchOverlay.className = 'glitch-overlay';
  document.body.appendChild(glitchOverlay);

  // Set initial language
  let currentLang = localStorage.getItem('kij_lang') || 'fr';
  applyLanguage(currentLang, false);

  // Add event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const newLang = e.target.getAttribute('data-lang');
      if (newLang !== currentLang) {
        currentLang = newLang;
        localStorage.setItem('kij_lang', currentLang);
        applyLanguage(currentLang, true);
      }
    });
  });

  function applyLanguage(lang, animate) {
    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (animate) {
      // Trigger video game animation (glitch / scanlines / pixelate effect)
      document.body.classList.add('translating');
      glitchOverlay.classList.add('active');

      // Play a sound? Maybe too intrusive. Just visual.

      setTimeout(() => {
        updateDOM(lang);
      }, 400); // Update text halfway through the animation

      setTimeout(() => {
        document.body.classList.remove('translating');
        glitchOverlay.classList.remove('active');
      }, 800);
    } else {
      updateDOM(lang);
    }
  }

  function updateDOM(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (el.tagName === 'TITLE') {
          document.title = translations[lang][key];
        } else {
          // Use innerHTML to preserve tags like <br/> or <em>
          el.innerHTML = translations[lang][key];
        }
      }
    });
  }
});
