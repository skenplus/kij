const translations = {
  fr: {
    "nav-home": "Accueil",
    "nav-platform": "Plateforme IA",
    "nav-humanitarian": "Aide humanitaire",
    "nav-about": "À propos",
    "nav-contact": "Contact",
    "hero-title": "L'IA au service de<br /><em>l'humain</em> et de la<br />performance",
    "hero-desc": "KIJ est une plateforme IA multi-agents qui analyse, oriente et accompagne — que vous soyez une organisation, un professionnel ou une personne en difficulté.",
    "btn-discover": "Découvrir la plateforme →",
    "btn-humanitarian": "Module humanitaire",
    "stat-agents": "Agents principaux",
    "stat-sub": "Sous-agents spécialisés",
    "stat-tools": "Outils connectés",
    "stat-export": "Formats d'export",
    "lang-fr": "FR",
    "lang-en": "EN"
  },
  en: {
    "nav-home": "Home",
    "nav-platform": "AI Platform",
    "nav-humanitarian": "Humanitarian Aid",
    "nav-about": "About",
    "nav-contact": "Contact",
    "hero-title": "AI serving<br /><em>humanity</em> and<br />performance",
    "hero-desc": "KIJ is a multi-agent AI platform that analyzes, guides, and supports — whether you are an organization, a professional, or a person in need.",
    "btn-discover": "Discover the platform →",
    "btn-humanitarian": "Humanitarian module",
    "stat-agents": "Main agents",
    "stat-sub": "Specialized sub-agents",
    "stat-tools": "Connected tools",
    "stat-export": "Export formats",
    "lang-fr": "FR",
    "lang-en": "EN"
  }
};

let currentLang = localStorage.getItem('kij-lang') || 'fr';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('kij-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});
