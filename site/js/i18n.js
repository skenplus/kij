// i18n.js
// Custom vanilla JS internationalization (i18n) solution

const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.platform": "Plateforme IA",
    "nav.humanitarian": "Aide humanitaire",
    "nav.about": "À propos",
    "nav.contact": "Contact",

    "hero.badge": "✦ Intelligence artificielle & impact social",
    "hero.title": "L'IA au service de<br /><em>l'humain</em> et de la<br />performance",
    "hero.desc": "KIJ est une plateforme IA multi-agents qui analyse, oriente et accompagne — que vous soyez une organisation, un professionnel ou une personne en difficulté.",
    "hero.btn.primary": "Découvrir la plateforme →",
    "hero.btn.outline": "Module humanitaire",

    "hero.stat.agents": "Agents principaux",
    "hero.stat.subagents": "Sous-agents spécialisés",
    "hero.stat.tools": "Outils connectés",
    "hero.stat.exports": "Formats d'export",

    "modules.title": "Deux modules complémentaires",
    "modules.desc": "Une même architecture IA, deux applications concrètes — et la logique <strong>ET</strong> : les deux toujours.",

    "modules.plat.title": "Plateforme IA multi-agents",
    "modules.plat.desc": "Analyse de documents, génération de rapports, correction linguistique, veille, brevets et livrables professionnels — orchestrés par 20 agents spécialisés.",
    "modules.plat.feat1.title": "Analyse intelligente",
    "modules.plat.feat1.desc": "CV, contrats, rapports, factures, images, tableaux",
    "modules.plat.feat2.title": "Rapport automatique",
    "modules.plat.feat2.desc": "Résumé exécutif + plan d'action structuré",
    "modules.plat.feat3.title": "Sources officielles",
    "modules.plat.feat3.desc": "Vérification, brevets, veille marché",
    "modules.plat.btn": "Explorer →",

    "modules.hum.title": "Module aide humanitaire & pro",
    "modules.hum.desc": "Accompagnement des personnes en situation de vulnérabilité : emploi, logement, santé, droits, formation et soutien psychosocial — sans jugement, avec dignité.",
    "modules.hum.feat1.title": "Orientation multi-domaines",
    "modules.hum.feat1.desc": "Juridique, logement, santé, social, administratif",
    "modules.hum.feat2.title": "CV, lettres & dossiers",
    "modules.hum.feat2.desc": "Rédigés et personnalisés selon la situation",
    "modules.hum.feat3.title": "Plan d'action concret",
    "modules.hum.feat3.desc": "Aujourd'hui / 30 jours / moyen terme",
    "modules.hum.btn": "Découvrir →",

    "steps.title": "Comment ça fonctionne",
    "steps.desc": "Du dépôt de fichier ou de la demande au rapport final — en automatique.",
    "steps.s1.title": "Dépôt ou demande",
    "steps.s1.desc": "L'utilisateur envoie un fichier, une question ou remplit un formulaire. n8n reçoit et route automatiquement.",
    "steps.s2.title": "Analyse et détection",
    "steps.s2.desc": "Claude corrige la demande, Gemini lit les fichiers lourds, Perplexity vérifie les informations récentes.",
    "steps.s3.title": "Agents spécialisés",
    "steps.s3.desc": "L'orchestrateur active les bons agents (juridique, linguistique, emploi, qualité…) selon le contenu détecté.",
    "steps.s4.title": "Livrable & rapport",
    "steps.s4.desc": "Supabase stocke tout. Le rapport final est livré par email, PDF ou tableau de bord — avec niveau de confiance.",

    "stack.title": "La pile technologique",
    "stack.desc": "Huit outils complémentaires, une logique <strong>ET</strong> : tous activés selon le besoin.",

    "cta.title": "Prêt à construire la plateforme ?",
    "cta.desc": "Démarrez avec la pile gratuite. Ajoutez les outils payants quand les limites arrivent.",
    "cta.btn.outline": "Voir l'architecture complète",
    "cta.btn.primary": "Nous contacter",

    "footer.brand.desc": "Plateforme IA multi-agents pour l'analyse intelligente, l'aide humanitaire et l'insertion professionnelle.",
    "footer.nav.plat": "Plateforme",
    "footer.nav.plat.arch": "Architecture IA",
    "footer.nav.plat.agents": "Agents",
    "footer.nav.plat.roadmap": "Roadmap",
    "footer.nav.plat.db": "Base de données",

    "footer.nav.help": "Aide",
    "footer.nav.help.mod": "Module humanitaire",
    "footer.nav.help.services": "Services",
    "footer.nav.help.urgency": "Numéros d'urgence",
    "footer.nav.help.resources": "Ressources",

    "footer.nav.proj": "Projet",
    "footer.nav.proj.about": "À propos",
    "footer.nav.proj.values": "Valeurs",
    "footer.nav.proj.ethics": "Éthique",
    "footer.nav.proj.contact": "Contact",

    "footer.bottom.rights": "© 2026 KIJ Platform — Tous droits réservés",
    "footer.bottom.ethics": "Construit sans API externe · <a href=\"apropos.html#ethique\">Éthique & RGPD</a>"
  },
  en: {
    "nav.home": "Home",
    "nav.platform": "AI Platform",
    "nav.humanitarian": "Humanitarian Aid",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.badge": "✦ Artificial Intelligence & Social Impact",
    "hero.title": "AI at the service of<br /><em>humans</em> and<br />performance",
    "hero.desc": "KIJ is a multi-agent AI platform that analyzes, guides, and supports — whether you are an organization, a professional, or a person in difficulty.",
    "hero.btn.primary": "Discover the platform →",
    "hero.btn.outline": "Humanitarian module",

    "hero.stat.agents": "Main agents",
    "hero.stat.subagents": "Specialized sub-agents",
    "hero.stat.tools": "Connected tools",
    "hero.stat.exports": "Export formats",

    "modules.title": "Two complementary modules",
    "modules.desc": "The same AI architecture, two concrete applications — and the <strong>AND</strong> logic: always both.",

    "modules.plat.title": "Multi-agent AI Platform",
    "modules.plat.desc": "Document analysis, report generation, linguistic correction, intelligence, patents and professional deliverables — orchestrated by 20 specialized agents.",
    "modules.plat.feat1.title": "Intelligent analysis",
    "modules.plat.feat1.desc": "CVs, contracts, reports, invoices, images, tables",
    "modules.plat.feat2.title": "Automated reporting",
    "modules.plat.feat2.desc": "Executive summary + structured action plan",
    "modules.plat.feat3.title": "Official sources",
    "modules.plat.feat3.desc": "Verification, patents, market intelligence",
    "modules.plat.btn": "Explore →",

    "modules.hum.title": "Humanitarian & Pro Aid Module",
    "modules.hum.desc": "Supporting vulnerable people: employment, housing, health, rights, training, and psychosocial support — without judgment, with dignity.",
    "modules.hum.feat1.title": "Multi-domain orientation",
    "modules.hum.feat1.desc": "Legal, housing, health, social, administrative",
    "modules.hum.feat2.title": "CVs, letters & files",
    "modules.hum.feat2.desc": "Written and personalized according to the situation",
    "modules.hum.feat3.title": "Concrete action plan",
    "modules.hum.feat3.desc": "Today / 30 days / medium term",
    "modules.hum.btn": "Discover →",

    "steps.title": "How it works",
    "steps.desc": "From file upload or request to the final report — automatically.",
    "steps.s1.title": "Deposit or request",
    "steps.s1.desc": "The user sends a file, a question, or fills out a form. n8n receives and routes automatically.",
    "steps.s2.title": "Analysis and detection",
    "steps.s2.desc": "Claude corrects the request, Gemini reads heavy files, Perplexity verifies recent information.",
    "steps.s3.title": "Specialized agents",
    "steps.s3.desc": "The orchestrator activates the right agents (legal, linguistic, employment, quality...) according to the detected content.",
    "steps.s4.title": "Deliverable & report",
    "steps.s4.desc": "Supabase stores everything. The final report is delivered by email, PDF or dashboard — with confidence level.",

    "stack.title": "The Technology Stack",
    "stack.desc": "Eight complementary tools, an <strong>AND</strong> logic: all activated as needed.",

    "cta.title": "Ready to build the platform?",
    "cta.desc": "Start with the free stack. Add paid tools when limits are reached.",
    "cta.btn.outline": "View complete architecture",
    "cta.btn.primary": "Contact us",

    "footer.brand.desc": "Multi-agent AI platform for intelligent analysis, humanitarian aid and professional integration.",
    "footer.nav.plat": "Platform",
    "footer.nav.plat.arch": "AI Architecture",
    "footer.nav.plat.agents": "Agents",
    "footer.nav.plat.roadmap": "Roadmap",
    "footer.nav.plat.db": "Database",

    "footer.nav.help": "Help",
    "footer.nav.help.mod": "Humanitarian module",
    "footer.nav.help.services": "Services",
    "footer.nav.help.urgency": "Emergency numbers",
    "footer.nav.help.resources": "Resources",

    "footer.nav.proj": "Project",
    "footer.nav.proj.about": "About",
    "footer.nav.proj.values": "Values",
    "footer.nav.proj.ethics": "Ethics",
    "footer.nav.proj.contact": "Contact",

    "footer.bottom.rights": "© 2026 KIJ Platform — All rights reserved",
    "footer.bottom.ethics": "Built without external API · <a href=\"apropos.html#ethique\">Ethics & GDPR</a>"
  }
};

function getSavedLanguage() {
  const saved = localStorage.getItem('siteLang');
  return saved ? saved : 'fr';
}

function setLanguage(lang) {
  localStorage.setItem('siteLang', lang);
  document.documentElement.lang = lang;
  applyTranslations(lang);
  updateSwitcherUI(lang);
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations['fr'];
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // Using innerHTML instead of textContent to preserve HTML tags like <em> and <br />
      el.innerHTML = dict[key];
    }
  });
}

function updateSwitcherUI(lang) {
  const buttons = document.querySelectorAll('.lang-switcher button');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getSavedLanguage();
  setLanguage(currentLang);

  const buttons = document.querySelectorAll('.lang-switcher button');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});
