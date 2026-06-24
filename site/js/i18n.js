// ========================================
// KIJ Platform — i18n
// Custom vanilla JS internationalization
// ========================================

const translations = {
  fr: {
    'nav_home': `Accueil`,
    'nav_platform': `Plateforme IA`,
    'nav_humanitarian': `Aide humanitaire`,
    'nav_about': `À propos`,
    'nav_contact': `Contact`,
    'hero_badge': `✦ Intelligence artificielle &amp; impact social`,
    'hero_title': `L'IA au service de<br /><em>l'humain</em> et de la<br />performance`,
    'hero_desc': `KIJ est une plateforme IA multi-agents qui analyse, oriente et accompagne — que vous soyez une organisation, un professionnel ou une personne en difficulté.`,
    'hero_btn_platform': `Découvrir la plateforme →`,
    'hero_btn_humanitarian': `Module humanitaire`,
    'stat_1': `Agents principaux`,
    'stat_2': `Sous-agents spécialisés`,
    'stat_3': `Outils connectés`,
    'stat_4': `Formats d'export`,
    'section_2_title': `Deux modules complémentaires`,
    'section_2_desc': `Une même architecture IA, deux applications concrètes — et la logique <strong>ET</strong> : les deux toujours.`,
    'card_1_title': `Plateforme IA multi-agents`,
    'card_1_desc': `Analyse de documents, génération de rapports, correction linguistique, veille, brevets et livrables professionnels — orchestrés par 20 agents spécialisés.`,
    'card_1_f1': `Orchestration intelligente des tâches`,
    'card_1_f2': `Qualité et niveau de confiance`,
    'card_1_f3': `Livrables professionnels sur mesure`,
    'card_2_title': `Plateforme d'aide humanitaire`,
    'card_2_desc': `Orientation administrative, emploi, logement, santé et soutien psychosocial non clinique pour les personnes en situation de vulnérabilité.`,
    'card_2_f1': `Création de CV et lettres`,
    'card_2_f2': `Cartographie des aides`,
    'card_2_f3': `Multilingue (traduction instantanée)`
  },
  en: {
    'nav_home': `Home`,
    'nav_platform': `AI Platform`,
    'nav_humanitarian': `Humanitarian Aid`,
    'nav_about': `About`,
    'nav_contact': `Contact`,
    'hero_badge': `✦ Artificial Intelligence &amp; Social Impact`,
    'hero_title': `AI serving<br /><em>humanity</em> and<br />performance`,
    'hero_desc': `KIJ is a multi-agent AI platform that analyzes, guides, and supports — whether you are an organization, a professional, or a person in need.`,
    'hero_btn_platform': `Discover the platform →`,
    'hero_btn_humanitarian': `Humanitarian Module`,
    'stat_1': `Main Agents`,
    'stat_2': `Specialized Sub-agents`,
    'stat_3': `Connected Tools`,
    'stat_4': `Export Formats`,
    'section_2_title': `Two complementary modules`,
    'section_2_desc': `One AI architecture, two concrete applications — and the <strong>AND</strong> logic: always both.`,
    'card_1_title': `Multi-agent AI Platform`,
    'card_1_desc': `Document analysis, report generation, linguistic correction, monitoring, patents, and professional deliverables — orchestrated by 20 specialized agents.`,
    'card_1_f1': `Intelligent task orchestration`,
    'card_1_f2': `Quality and confidence level`,
    'card_1_f3': `Tailor-made professional deliverables`,
    'card_2_title': `Humanitarian Aid Platform`,
    'card_2_desc': `Administrative orientation, employment, housing, health, and non-clinical psychosocial support for vulnerable individuals.`,
    'card_2_f1': `Creation of CVs and cover letters`,
    'card_2_f2': `Mapping of local resources`,
    'card_2_f3': `Multilingual (instant translation)`
  }
};

function changeLanguage(lang) {
  if (!translations[lang]) return;
  localStorage.setItem('kij_language', lang);

  // Update buttons
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // Memory: Use innerHTML to preserve formatting tags like <em> and <br />
      el.innerHTML = translations[lang][key];
    }
  });
}

function initI18n() {
  const savedLang = localStorage.getItem('kij_language') || 'fr';

  // Add listeners to language switchers
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      changeLanguage(e.target.dataset.lang);
    });
  });

  changeLanguage(savedLang);
}

// Will populate translations in a separate step or when index.html is modified
document.addEventListener('DOMContentLoaded', initI18n);
