import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

// Prompt arrays
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

const jokePrompt = `
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

function getRandomJokePrompt() {
  return jokePrompts[Math.floor(Math.random() * jokePrompts.length)];
}

function getRandomShayariPrompt() {
  return shayariPrompts[Math.floor(Math.random() * shayariPrompts.length)];
}

function getRandomQuotePrompt() {
  return quotePrompts[Math.floor(Math.random() * quotePrompts.length)];
}

// API endpoint
app.post("/api/joke", async (req, res) => {
  try {
    const prompt = getRandomJokePrompt();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 50
      }
    });

    res.json({ text:response.candidates[0].content.parts[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/shayari", async (req, res) => {
  try {
    const prompt = getRandomShayariPrompt();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 50
      }
    });

    res.json({ text:response.candidates[0].content.parts[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/quote", async (req, res) => {
  try {
    const prompt = getRandomQuotePrompt();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({ text:response.candidates[0].content.parts[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
