# KIJ Chat Server

Backend Express du widget de chat IA affiché sur le site KIJ (`/site`). Il expose un
unique endpoint qui relaie les messages de l'utilisateur vers l'API Claude (Anthropic)
et renvoie la réponse.

## Pourquoi un backend séparé ?

Le site (`/site`) est statique et hébergé sur GitHub Pages, qui ne peut pas exécuter de
code serveur ni cacher une clé API. Ce dossier `server/` est un petit service Node à
héberger séparément (ex. Render) ; il est le seul endroit où la clé `ANTHROPIC_API_KEY`
existe.

## Installation locale

```bash
cd server
npm install
cp .env.example .env   # puis renseigner ANTHROPIC_API_KEY et ALLOWED_ORIGINS
npm run dev
```

Le serveur écoute par défaut sur `http://localhost:3000`.

- `GET /health` → `{ "status": "ok" }`
- `POST /chat` avec `{ "messages": [{ "role": "user", "content": "..." }] }`
  → `{ "reply": "..." }`

## Variables d'environnement

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Clé API Claude (console.anthropic.com). **Jamais commitée.** |
| `ALLOWED_ORIGINS` | Domaines autorisés à appeler l'API, séparés par des virgules (CORS). |
| `PORT` | Port d'écoute (Render le fournit automatiquement). |

## Déploiement sur Render

1. Pousser ce dépôt sur GitHub (déjà fait).
2. Sur [render.com](https://render.com) → **New** → **Web Service** → connecter le repo `skenplus/kij`.
3. Configuration :
   - **Root Directory** : `server`
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance Type** : Free (suffisant pour démarrer)
4. Dans l'onglet **Environment**, ajouter les variables :
   - `ANTHROPIC_API_KEY` = votre clé Claude
   - `ALLOWED_ORIGINS` = `https://skenplus.github.io` (+ `http://localhost:5500` en dev)
5. Déployer. Render fournit une URL du type `https://kij-chat-server.onrender.com`.
6. Reporter cette URL dans `site/js/chat-widget.js` (constante `API_BASE_URL`) et
   republier le site (branche `gh-pages`).

### Limite du plan gratuit Render

Un service gratuit s'endort après ~15 min d'inactivité ; le premier message après une
période d'inactivité peut prendre 30-50s (cold start). C'est acceptable pour une démo,
à upgrader vers un plan payant si le trafic devient régulier.

## Sécurité

- La clé API ne quitte jamais le serveur : le navigateur ne parle qu'à ce backend.
- CORS restreint aux origines listées dans `ALLOWED_ORIGINS`.
- Rate limiting : 20 requêtes / minute / IP sur `/chat`.
- Validation stricte des messages entrants (type, longueur, nombre).
- Les erreurs détaillées sont loguées côté serveur uniquement ; le client ne reçoit
  qu'un message générique.
