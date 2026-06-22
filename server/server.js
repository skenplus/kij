import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Anthropic from "@anthropic-ai/sdk";

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY manquante. Définissez-la dans les variables d'environnement.");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT =
  "Tu es l'assistant IA du site KIJ, une plateforme IA multi-agents pour l'analyse " +
  "intelligente de documents et l'aide humanitaire. Réponds en français, de façon " +
  "claire, concise et bienveillante. Si une question dépasse tes compétences ou " +
  "nécessite une vérification humaine, dis-le clairement.";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

function isValidConversation(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return false;
  }
  return messages.every(
    (m) =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0 &&
      m.content.length <= MAX_MESSAGE_LENGTH
  );
}

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.use(
  cors({
    origin: ALLOWED_ORIGINS.length > 0 ? ALLOWED_ORIGINS : false,
  })
);

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { reply: "Trop de requêtes. Merci de réessayer dans une minute." },
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", chatLimiter, async (req, res) => {
  const { messages } = req.body ?? {};

  if (!isValidConversation(messages)) {
    return res.status(400).json({
      reply: "Requête invalide : fournissez un tableau de messages non vide (1 à 20 messages, 4000 caractères max chacun).",
    });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const block = response.content?.[0];
    const reply = block && block.type === "text" ? block.text : "";

    res.json({ reply: reply || "Désolé, je n'ai pas pu générer de réponse." });
  } catch (error) {
    console.error("Erreur API Claude:", error);
    res.status(502).json({ reply: "Erreur serveur IA. Merci de réessayer plus tard." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur de chat KIJ démarré sur le port ${PORT}`);
});
