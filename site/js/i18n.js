(async function() {
    'use strict';

    let currentLang = localStorage.getItem('kij_lang') || 'fr';
    let translations = {};

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`js/${lang}.json`);
            if (response.ok) {
                translations = await response.json();
            }
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.innerHTML = translations[key];
            }
        });
        document.documentElement.lang = currentLang;
    }

    window.setLang = async function(lang) {
        currentLang = lang;
        localStorage.setItem('kij_lang', lang);
        await loadTranslations(lang);
        applyTranslations();
    };

    // Initialize
    await loadTranslations(currentLang);
    applyTranslations();

    // Create Language Switcher in the DOM
    const createLangSwitcher = () => {
        const switcher = document.createElement('div');
        switcher.style.position = 'fixed';
        switcher.style.bottom = '80px';
        switcher.style.right = '28px';
        switcher.style.zIndex = '1000';
        switcher.style.display = 'flex';
        switcher.style.gap = '8px';

        const btnFr = document.createElement('button');
        btnFr.textContent = 'FR';
        btnFr.style.cssText = 'padding: 5px 10px; cursor: pointer; border: 1px solid var(--primary); border-radius: 4px; background: white; color: var(--primary); font-weight: bold;';
        btnFr.onclick = () => window.setLang('fr');

        const btnEn = document.createElement('button');
        btnEn.textContent = 'EN';
        btnEn.style.cssText = 'padding: 5px 10px; cursor: pointer; border: 1px solid var(--primary); border-radius: 4px; background: white; color: var(--primary); font-weight: bold;';
        btnEn.onclick = () => window.setLang('en');

        switcher.appendChild(btnFr);
        switcher.appendChild(btnEn);
        document.body.appendChild(switcher);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createLangSwitcher);
    } else {
        createLangSwitcher();
    }
})();