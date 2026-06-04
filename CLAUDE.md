# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **AI multi-agent platform** that receives user requests or file uploads, routes them through specialized agents, and produces structured deliverables (reports, analyses, documents, code). The platform is designed to handle document classification, linguistic correction, research, and report generation using a complementary stack of AI tools.

Core principle: when two options are complementary, use both. Prefer "and" logic over "or" logic.

## Planned Tech Stack

| Layer | Tool | Role |
|---|---|---|
| Primary AI | Claude API | Reasoning, prompt engineering, agents, report generation, linguistic correction |
| Document analysis | NotebookLM | Organizing and synthesizing document sources |
| Multimodal / large files | Gemini API | Images, audio, video, long documents |
| Web research | Perplexity API | Market intelligence, trends, sourced facts |
| Workflow automation | n8n | Trigger-based orchestration, API calls, notifications |
| Database / memory | Supabase | PostgreSQL, auth, file storage, vector embeddings (RAG) |
| Agent teams | CrewAI | Defining and executing specialized agent crews |
| Advanced orchestration | LangGraph | State machines, conditional routing, quality loops |
| Frontend | React / Next.js | User interface |
| Backend | Python/FastAPI or Node.js | API routes, business logic |

## Architecture

```
User (chat / form / file upload)
↓
n8n  ←  receives and routes
↓
Gemini  ←  extracts content from heavy/multimodal files if needed
↓
Claude  ←  corrects request, detects objective, selects agents
↓
Perplexity  ←  verifies current information if needed
↓
CrewAI  ←  executes specialized agent team
↓
LangGraph  ←  handles conditions, quality loops, state
↓
Supabase  ←  stores file, analysis, agents used, report
↓
n8n  ←  delivers report via email / Notion / Drive / dashboard
```

## Supabase Data Schema

| Table | Purpose |
|---|---|
| `users` | Accounts, roles, permissions |
| `projects` | Project objectives, status, history |
| `files` | Uploaded files, detected type, storage URL |
| `agents` | Available agents, roles, prompts, active status |
| `skills` | Existing, missing, and generated competencies |
| `analyses` | Analysis results, agents used, confidence score |
| `reports` | Final reports, summaries, recommendations, deliverables |
| `sources` | Official sources, references, verifications |
| `patents` | Known patents, keywords, proximity risks |
| `logs` | Execution journal, errors, test events |
| `workflows` | n8n workflow definitions |

## Agent Architecture

The platform uses 20 principal agents and 36 sub-agents. The orchestrator selects and sequences the others per request.

**Core agents (Phase 1 priority):**
- **Orchestrateur** — selects agents, merges results, produces final response
- **Détection de fichiers** — classifies uploaded content (CV, contract, report, invoice, code, image, table)
- **Linguistique** — orthography, grammar, style, clarity correction
- **Rapport automatique** — structures analysis into executive summary + action plan
- **Qualité** — detects contradictions, verifies coherence, assigns confidence level

**Business agents (Phase 2):**
Technique, Juridique, Financier, Marketing, RH/Parcours, Commercial, Sécurité & Confidentialité, RGPD

**Advanced agents (Phase 3+):**
Prompt Engineer, Compétences/Skills, Chef de projet, UX/UI, Prospective/Tendances, Recherche officielle, Brevets, Base de données/Mémoire, API/Automatisation, Documentation

## Standard Response Format

Every agent response must include these sections:
1. Demande corrigée
2. Objectif détecté
3. Type de contenu détecté
4. Agents activés
5. Compétences détectées / manquantes
6. Analyse principale
7. Actions appliquées
8. Livrable final
9. Rapport automatique
10. Sources officielles à vérifier
11. Limites et niveau de confiance
12. Résumé du produit final

## Development Roadmap

- **Phase 1 — Noyau** : Orchestrator, file detection, linguistic correction, auto-report, quality control
- **Phase 2 — Agents métiers** : Technical, legal, financial, marketing, HR, commercial, security agents
- **Phase 3 — Automatisation** : n8n + Supabase integration, form intake, storage, exports
- **Phase 4 — Recherche** : Official sources, competitive intelligence, patent search, citations
- **Phase 5 — SaaS** : User accounts, freemium tiers, frontend UI, documentation, support
- **Phase 6 — Multi-agents avancé** : CrewAI crews, LangGraph state machines, observability

## Output Formats

The platform must support export in: TXT, Markdown, PDF, DOCX, JSON, CSV, HTML, ZIP.

## Key Conventions

- **Confidence levels**: Always attach a confidence level (élevé / moyen / faible) to analyses and indicate what would need human verification.
- **Complementary logic**: Never force a binary choice between two compatible options — activate both.
- **Non-clinical analysis**: Psycholinguistic/tone analysis must remain non-clinical, limited to observable text signals, with no medical or psychological diagnosis.
- **GDPR**: Sensitive files must be anonymized before external processing. User consent, data retention, and deletion workflows are required before production launch.
- **Source classification**: Distinguish official sources (canonical texts, institutional documents, recognized authorities) from unofficial ones (oral traditions, alternative hypotheses, popular narratives). Always label the status: well-attested / probable / possible / speculative / legendary.

## Prompt Libraries in This Repository

The `prompts/` directory stores reusable operational system prompts:

| File | Description |
|---|---|
| `plateforme_aide_humanitaire_professionnelle.md` | **Humanitarian & professional aid platform** — 12 specialized agents covering employment, housing, legal orientation, health access, social resources, CV/cover letter writing, non-clinical psychosocial support, and multilingual communication. Includes emergency numbers, ethical rules, action plan format, and Supabase schema extension. |
| `Concepteur_IA_multi_agents_complet` | Master system prompt for the full platform |
| `Prompt_Ultime_Creation_Livres_IA` | Book generation pipeline (all genres, KDP-ready) |
| `prompt_atlas_spiritualites_religions_traditions` | World spiritualities comparative atlas |
| `version_prompt_operationnel_plateforme_ia_multi_agents` | Short operational system prompt |
| Domain-specific prompts | Financial sciences, public administration, general culture |

## Humanitarian Platform — Additional Supabase Tables

This module extends the base schema with:
- `beneficiaires` — profile, situation, language, location
- `dossiers` — identified needs, activated agents, follow-up status
- `ressources_locales` — services and organizations indexed by department/region
- `documents_produits` — generated CVs, letters, administrative documents
- `plans_action` — steps, deadlines, status (done / in progress / to do)
