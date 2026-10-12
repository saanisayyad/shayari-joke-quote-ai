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

app.post("/api/thought", async (req, res) => {
  try {
    if (!process.env.API_KEY) {
      return res.status(500).json({
        error: "The AI service is not configured. Add API_KEY to the backend environment."
      });
    }

    const thinker = thinkers[Math.floor(Math.random() * thinkers.length)];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write one original, thought-provoking existential thought inspired by themes explored by ${thinker}.

Style:
- Introspective, darkly witty, philosophical, and emotionally sharp
- One to three short sentences
- Make it feel like a striking late-night realization
- Do not imitate or claim to reproduce the person's exact writing
- Do not present it as a real quote or use quotation marks
- Return only the thought, with no heading or explanation`,
      config: {
        temperature: 0.95,
        maxOutputTokens: 120
      }
    });

    const thought = response?.text?.trim()
      || response?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

    if (!thought) {
      throw new Error("The model returned an empty response.");
    }

    res.json({ thought, thinker, inspiredBy: true });
  } catch (err) {
    console.error("Thought generation failed:", err);
    res.status(500).json({
      error: "Could not summon a thought right now. Please try again."
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The Unquiet Mind backend is running on port ${PORT}`));
