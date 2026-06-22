/* ========================================
   KIJ Platform — Chat Widget
   Assistant IA propulsé par Claude (Anthropic)
   ======================================== */

(function () {
  'use strict';

  // Remplacer par l'URL du backend une fois déployé sur Render.
  // Voir server/README.md pour les instructions de déploiement.
  const API_BASE_URL = window.KIJ_CHAT_API_URL || 'https://kij-chat-server.onrender.com';
  const MAX_HISTORY = 12;

  const history = [];
  let isSending = false;

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'kij-chat-toggle';
  toggleBtn.setAttribute('aria-label', 'Ouvrir l\'assistant KIJ');
  toggleBtn.textContent = '💬';

  const panel = document.createElement('div');
  panel.id = 'kij-chat-panel';
  panel.innerHTML = [
    '<div class="kij-chat-header">',
    '  <span>Assistant KIJ</span>',
    '  <button type="button" class="kij-chat-close" aria-label="Fermer">×</button>',
    '</div>',
    '<div class="kij-chat-messages" role="log" aria-live="polite"></div>',
    '<form class="kij-chat-form">',
    '  <input type="text" class="kij-chat-input" placeholder="Posez votre question…" maxlength="4000" autocomplete="off" />',
    '  <button type="submit" class="kij-chat-send">Envoyer</button>',
    '</form>',
  ].join('');

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);

  const messagesEl = panel.querySelector('.kij-chat-messages');
  const formEl = panel.querySelector('.kij-chat-form');
  const inputEl = panel.querySelector('.kij-chat-input');
  const closeBtn = panel.querySelector('.kij-chat-close');

  function appendMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = 'kij-chat-bubble kij-chat-bubble--' + role;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function setOpen(open) {
    panel.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      if (messagesEl.children.length === 0) {
        appendMessage('assistant', 'Bonjour 👋 Je suis l\'assistant KIJ. Comment puis-je vous aider ?');
      }
      inputEl.focus();
    }
  }

  toggleBtn.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  closeBtn.addEventListener('click', () => setOpen(false));

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text || isSending) return;

    appendMessage('user', text);
    history.push({ role: 'user', content: text });
    if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);

    inputEl.value = '';
    isSending = true;
    inputEl.disabled = true;
    const pending = appendMessage('assistant', '…');

    try {
      const res = await fetch(API_BASE_URL + '/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      pending.textContent = data.reply || 'Désolé, je n\'ai pas pu générer de réponse.';
      if (res.ok) {
        history.push({ role: 'assistant', content: pending.textContent });
      }
    } catch (err) {
      pending.textContent = 'Connexion impossible à l\'assistant. Réessayez plus tard.';
    } finally {
      isSending = false;
      inputEl.disabled = false;
      inputEl.focus();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  });

})();
