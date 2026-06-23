const translations = {
  fr: {
    navHome: "Accueil",
    navPlatform: "Plateforme IA",
    navHumanitarian: "Aide humanitaire",
    navAbout: "À propos",
    navContact: "Contact",
    heroBadge: "✦ Intelligence artificielle &amp; impact social",
    heroTitle: "L'IA au service de<br /><em>l'humain</em> et de la<br />performance",
    heroDesc: "KIJ est une plateforme IA multi-agents qui analyse, oriente et accompagne — que vous soyez une organisation, un professionnel ou une personne en difficulté.",
    heroBtnDiscover: "Découvrir la plateforme →",
    heroBtnHumanitarian: "Module humanitaire",
    heroStatAgents: "Agents principaux",
    heroStatSub: "Sous-agents spécialisés",
    heroStatTools: "Outils connectés",
    heroStatExports: "Formats d'export",
    sectionModulesTitle: "Deux modules complémentaires",
    sectionModulesDesc: "Une même architecture IA, deux applications concrètes — et la logique <strong>ET</strong> : les deux toujours.",
    module1Title: "Plateforme IA multi-agents",
    module1Desc: "Analyse de documents, génération de rapports, correction linguistique, veille, brevets et livrables professionnels — orchestrés par 20 agents spécialisés.",
    mod1F1Title: "Analyse intelligente",
    mod1F1Desc: "CV, contrats, rapports, factures, images, tableaux",
    mod1F2Title: "Rapport automatique",
    mod1F2Desc: "Résumé exécutif + plan d'action structuré",
    mod1F3Title: "Sources officielles",
    mod1F3Desc: "Vérification, brevets, veille marché",
    btnExplore: "Explorer →",
    module2Title: "Module aide humanitaire &amp; pro",
    module2Desc: "Accompagnement des personnes en situation de vulnérabilité : emploi, logement, santé, droits, formation et soutien psychosocial — sans jugement, avec dignité.",
    mod2F1Title: "Orientation multi-domaines",
    mod2F1Desc: "Juridique, logement, santé, social, administratif",
    mod2F2Title: "CV, lettres &amp; dossiers",
    mod2F2Desc: "Rédigés et personnalisés selon la situation",
    mod2F3Title: "Plan d'action concret",
    mod2F3Desc: "Aujourd'hui / 30 jours / moyen terme",
    btnDiscover: "Découvrir →",
    howItWorksTitle: "Comment ça fonctionne",
    howItWorksDesc: "Du dépôt de fichier ou de la demande au rapport final — en automatique.",
    step1Title: "Dépôt ou demande",
    step1Desc: "L'utilisateur envoie un fichier, une question ou remplit un formulaire. n8n reçoit et route automatiquement.",
    step2Title: "Analyse et détection",
    step2Desc: "Claude corrige la demande, Gemini lit les fichiers lourds, Perplexity vérifie les informations récentes.",
    step3Title: "Agents spécialisés",
    step3Desc: "L'orchestrateur active les bons agents (juridique, linguistique, emploi, qualité…) selon le contenu détecté.",
    step4Title: "Livrable &amp; rapport",
    step4Desc: "Supabase stocke tout. Le rapport final est livré par email, PDF ou tableau de bord — avec niveau de confiance.",
    techStackTitle: "La pile technologique",
    techStackDesc: "Huit outils complémentaires, une logique <strong>ET</strong> : tous activés selon le besoin.",
    ctaTitle: "Prêt à construire la plateforme ?",
    ctaDesc: "Démarrez avec la pile gratuite. Ajoutez les outils payants quand les limites arrivent.",
    ctaBtnArch: "Voir l'architecture complète",
    ctaBtnContact: "Nous contacter"
  },
  en: {
    navHome: "Home",
    navPlatform: "AI Platform",
    navHumanitarian: "Humanitarian Aid",
    navAbout: "About",
    navContact: "Contact",
    heroBadge: "✦ Artificial Intelligence &amp; Social Impact",
    heroTitle: "AI at the service of<br /><em>humanity</em> and<br />performance",
    heroDesc: "KIJ is a multi-agent AI platform that analyzes, guides, and supports — whether you are an organization, a professional, or a person in difficulty.",
    heroBtnDiscover: "Discover the platform →",
    heroBtnHumanitarian: "Humanitarian module",
    heroStatAgents: "Main agents",
    heroStatSub: "Specialized sub-agents",
    heroStatTools: "Connected tools",
    heroStatExports: "Export formats",
    sectionModulesTitle: "Two complementary modules",
    sectionModulesDesc: "The same AI architecture, two concrete applications — and the <strong>AND</strong> logic: always both.",
    module1Title: "Multi-agent AI Platform",
    module1Desc: "Document analysis, report generation, linguistic correction, monitoring, patents, and professional deliverables — orchestrated by 20 specialized agents.",
    mod1F1Title: "Intelligent Analysis",
    mod1F1Desc: "Resumes, contracts, reports, invoices, images, tables",
    mod1F2Title: "Automatic Report",
    mod1F2Desc: "Executive summary + structured action plan",
    mod1F3Title: "Official Sources",
    mod1F3Desc: "Verification, patents, market monitoring",
    btnExplore: "Explore →",
    module2Title: "Humanitarian &amp; Pro Aid Module",
    module2Desc: "Support for people in vulnerable situations: employment, housing, health, rights, training, and psychosocial support — without judgment, with dignity.",
    mod2F1Title: "Multi-domain Guidance",
    mod2F1Desc: "Legal, housing, health, social, administrative",
    mod2F2Title: "Resumes, Letters &amp; Files",
    mod2F2Desc: "Drafted and personalized according to the situation",
    mod2F3Title: "Concrete Action Plan",
    mod2F3Desc: "Today / 30 days / medium term",
    btnDiscover: "Discover →",
    howItWorksTitle: "How it works",
    howItWorksDesc: "From file submission or request to final report — automatically.",
    step1Title: "Submission or Request",
    step1Desc: "The user sends a file, a question, or fills out a form. n8n receives and routes automatically.",
    step2Title: "Analysis and Detection",
    step2Desc: "Claude corrects the request, Gemini reads heavy files, Perplexity verifies recent information.",
    step3Title: "Specialized Agents",
    step3Desc: "The orchestrator activates the right agents (legal, linguistic, employment, quality...) according to the detected content.",
    step4Title: "Deliverable &amp; Report",
    step4Desc: "Supabase stores everything. The final report is delivered by email, PDF, or dashboard — with a confidence level.",
    techStackTitle: "The Technology Stack",
    techStackDesc: "Eight complementary tools, one <strong>AND</strong> logic: all activated according to the need.",
    ctaTitle: "Ready to build the platform?",
    ctaDesc: "Start with the free stack. Add paid tools when limits arrive.",
    ctaBtnArch: "View the complete architecture",
    ctaBtnContact: "Contact us"
  }
};

function setLanguage(lang) {
  if (!translations[lang]) lang = 'fr';
  localStorage.setItem('kij-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
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
  const savedLang = localStorage.getItem('kij-lang') || 'fr';
  setLanguage(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});
