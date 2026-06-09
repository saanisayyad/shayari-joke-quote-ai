import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ======================
// Prompts
// ======================

const shayariPrompt = `
Generate one original emotional shayari.

Requirements:
- Hindi or Urdu words written in English script
- 2 to 4 lines only
- Theme can be love, friendship, motivation, life, nature, or dreams
- Deep and meaningful
- No emojis
- Return only the shayari
`;

const pickupLinePrompt = `
Generate one original pickup line.

Requirements:
- Hindi written in English script
- Funny, cute, or romantic
- One or two lines only
- No emojis
- Return only the pickup line
`;

const quotePrompt = `
Generate one original motivational quote.

Requirements:
- Maximum 20 words
- Powerful and memorable
- No clichés
- No quotation marks
- Return only the quote
`;

// ======================
// Helper Function
// ======================

async function generateContent(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.9,
    max_tokens: 60,
  });

  return completion.choices[0].message.content.trim();
}

// ======================
// Pickup Line API
// ======================

app.post("/api/joke", async (req, res) => {
  try {
    const text = await generateContent(pickupLinePrompt);

    res.json({ text });
  } catch (err) {
    console.error("Pickup Line Error:", err);

    res.status(500).json({
      error: "Failed to generate pickup line",
    });
  }
});

// ======================
// Shayari API
// ======================

app.post("/api/shayari", async (req, res) => {
  try {
    const text = await generateContent(shayariPrompt);

    res.json({ text });
  } catch (err) {
    console.error("Shayari Error:", err);

    res.status(500).json({
      error: "Failed to generate shayari",
    });
  }
});

// ======================
// Quote API
// ======================

app.post("/api/quote", async (req, res) => {
  try {
    const text = await generateContent(quotePrompt);

    res.json({ text });
  } catch (err) {
    console.error("Quote Error:", err);

    res.status(500).json({
      error: "Failed to generate quote",
    });
  }
});

// ======================
// Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});