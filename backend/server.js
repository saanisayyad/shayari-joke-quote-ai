import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const thinkers = [
  "Franz Kafka",
  "Fyodor Dostoevsky",
  "Friedrich Nietzsche",
  "Albert Camus",
  "Hermann Hesse",
  "Virginia Woolf",
  "Søren Kierkegaard",
  "Arthur Schopenhauer",
  "Simone de Beauvoir",
  "Leo Tolstoy"
];

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "The Unquiet Mind" });
});

async function generateCompleteThought(thinker) {
  const prompt = `Write one original, thought-provoking existential thought inspired by themes explored by ${thinker}.

Style:
- Introspective, darkly witty, philosophical, and emotionally sharp
- One or two concise, complete sentences
- Make it feel like a striking late-night realization
- Finish every sentence fully and end with proper punctuation
- Never stop mid-word or mid-sentence
- Do not imitate or claim to reproduce the person's exact writing
- Do not present it as a real quote or use quotation marks
- Return only the thought, with no heading or explanation`;

  // Retry once if the model appears to have returned a cut-off thought.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.85,
        maxOutputTokens: 256
      }
    });

    const candidate = response?.candidates?.[0];
    const thought = response?.text?.trim()
      || candidate?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!thought) {
      console.warn("Gemini returned an empty thought.", {
        finishReason: candidate?.finishReason
      });
      continue;
    }

    const wasTokenLimited = candidate?.finishReason === "MAX_TOKENS";
    const endsLikeACompleteSentence = /[.!?…]["')\]]?$/.test(thought);

    if (!wasTokenLimited && endsLikeACompleteSentence) {
      return thought;
    }

    console.warn("Gemini returned a possibly incomplete thought; retrying.", {
      attempt: attempt + 1,
      finishReason: candidate?.finishReason,
      thought
    });
  }

  throw new Error("Gemini did not return a complete thought after retrying.");
}

app.post("/api/thought", async (req, res) => {
  try {
    if (!process.env.API_KEY) {
      return res.status(500).json({
        error: "The AI service is not configured. Add API_KEY to the backend environment."
      });
    }

    const thinker = thinkers[Math.floor(Math.random() * thinkers.length)];
    const thought = await generateCompleteThought(thinker);

    res.json({ thought, thinker, inspiredBy: true });
  } catch (err) {
    console.error("Thought generation failed:", err);
    res.status(500).json({
      error: "Could not generate a complete thought right now. Please try again."
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The Unquiet Mind backend is running on port ${PORT}`));
