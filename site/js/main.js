/* ========================================
   KIJ Platform — Main JavaScript
   Zero dependencies
   ======================================== */

(function () {
  'use strict';

  // === MOBILE MENU ===
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // === ACTIVE NAV LINK ===
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === CONTACT FORM (local only) ===
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const original = btn.textContent;
      btn.textContent = '✓ Message enregistré localement';
      btn.disabled = true;
      btn.style.background = '#1aaa6c';
      const msg = document.getElementById('form-success');
      if (msg) msg.style.display = 'block';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        if (msg) msg.style.display = 'none';
        form.reset();
      }, 4000);
    });
  }

  // === SMOOTH REVEAL ON SCROLL ===
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, .agent-card, .step, .roadmap-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .45s ease, transform .45s ease';
      observer.observe(el);
    });

    document.addEventListener('animationsReady', () => {});
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
  }

  // === HEADER SCROLL SHADOW ===
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 4px 24px rgba(26,58,108,.13)'
        : '0 2px 16px rgba(26,58,108,.06)';
    }, { passive: true });
  }

  // === BACK TO TOP (auto inject) ===
  const topBtn = document.createElement('button');
  topBtn.textContent = '↑';
  topBtn.setAttribute('aria-label', 'Retour en haut');
  topBtn.style.cssText = [
    'position:fixed;bottom:28px;right:28px;width:44px;height:44px;',
    'border-radius:50%;background:var(--primary);color:#fff;border:none;',
    'font-size:1.2rem;cursor:pointer;z-index:999;',
    'opacity:0;transition:opacity .3s;box-shadow:0 4px 16px rgba(26,58,108,.3);',
  ].join('');
  document.body.appendChild(topBtn);
  window.addEventListener('scroll', () => {
    topBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
  }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

})();

  // === GAMING MODE ANIMATION ===
  const gamingBtn = document.getElementById('gaming-mode-btn');
  if (gamingBtn) {
    gamingBtn.addEventListener('click', () => {
      // Prevent multiple clicks from starting multiple animations
      if (document.querySelector('.gaming-container')) return;

      const container = document.createElement('div');
      container.className = 'gaming-container';

      const pacman = document.createElement('div');
      pacman.className = 'pacman';

      const ghost = document.createElement('div');
      ghost.className = 'ghost';

      container.appendChild(pacman);
      container.appendChild(ghost);
      document.body.appendChild(container);

      // Remove after animation completes (6s)
      setTimeout(() => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, 6000);
    });
  }
