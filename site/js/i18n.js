const translations = {
  fr: {
    "nav-accueil": "Accueil",
    "nav-plateforme": "Plateforme IA",
    "nav-humanitaire": "Aide humanitaire",
    "nav-apropos": "À propos",
    "nav-contact": "Contact",
    "hero-badge": "✦ Intelligence artificielle & impact social",
    "hero-title": "L'IA au service de<br /><em>l'humain</em> et de la<br />performance",
    "hero-desc": "KIJ est une plateforme IA multi-agents qui analyse, oriente et accompagne — que vous soyez une organisation, un professionnel ou une personne en difficulté.",
    "hero-btn-primary": "Découvrir la plateforme",
    "hero-btn-secondary": "Module humanitaire"
  },
  en: {
    "nav-accueil": "Home",
    "nav-plateforme": "AI Platform",
    "nav-humanitaire": "Humanitarian Aid",
    "nav-apropos": "About us",
    "nav-contact": "Contact",
    "hero-badge": "✦ Artificial Intelligence & social impact",
    "hero-title": "AI at the service of<br /><em>humanity</em> and<br />performance",
    "hero-desc": "KIJ is a multi-agent AI platform that analyzes, guides and supports — whether you are an organization, a professional or a person in difficulty.",
    "hero-btn-primary": "Discover the platform",
    "hero-btn-secondary": "Humanitarian module"
  },
  es: {
    "nav-accueil": "Inicio",
    "nav-plateforme": "Plataforma IA",
    "nav-humanitaire": "Ayuda humanitaria",
    "nav-apropos": "Sobre nosotros",
    "nav-contact": "Contacto",
    "hero-badge": "✦ Inteligencia artificial e impacto social",
    "hero-title": "IA al servicio de la<br /><em>humanidad</em> y el<br />rendimiento",
    "hero-desc": "KIJ es una plataforma de IA multiagente que analiza, orienta y acompaña, ya seas una organización, un profesional o una persona en dificultades.",
    "hero-btn-primary": "Descubrir la plataforma",
    "hero-btn-secondary": "Módulo humanitario"
  }
};

function changeLanguage(lang) {
  if (!translations[lang]) return;

  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-switcher').forEach(select => {
    select.value = lang;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'fr';
  changeLanguage(savedLang);

  document.querySelectorAll('.lang-switcher').forEach(select => {
    select.addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });
  });
});
