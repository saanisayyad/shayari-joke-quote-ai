import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

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

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
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
    const response = await groq.chat.completions.create({
      // Groq retired llama-3.3-70b-versatile on August 16, 2026.
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: "You write original, concise philosophical thoughts. Return complete sentences only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.85,
      max_tokens: 256
    });

    const choice = response?.choices?.[0];
    const thought = choice?.message?.content?.trim();

    if (!thought) {
      console.warn("Groq returned an empty thought.", {
        finishReason: choice?.finish_reason
      });
      continue;
    }

    const wasTokenLimited = choice?.finish_reason === "length";
    const endsLikeACompleteSentence = /[.!?…]["')\]]?$/.test(thought);

    if (!wasTokenLimited && endsLikeACompleteSentence) {
      return thought;
    }

    console.warn("Groq returned a possibly incomplete thought; retrying.", {
      attempt: attempt + 1,
      finishReason: choice?.finish_reason,
      thought
    });
  }

  throw new Error("Groq did not return a complete thought after retrying.");
}

app.post("/api/thought", async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "The AI service is not configured. Add GROQ_API_KEY to the backend environment."
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
