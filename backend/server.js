import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(cors({
  origin:['https://shayari-joke-quote-ai-mds.vercel.app/']
}));
app.use(express.json());
  
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

// Prompt arrays
const shayariPrompts = [
  'You are a poetic genius who writes heartfelt and original shayari.Give one short, meaningful, and emotional shayari.Language must be Hindi or Urdu but the text must be English.It should be unique, never repeated, and have a touch of creativity or surprise.Focus on emotions like love, friendship, inspiration, or nature.Keep it concise (2-4 lines) and do not add explanations or extra commentary.Choose a new theme each time to make it feel fresh.'
];

const jokePrompts = [
  'You are a witty dad who loves telling groan-worthy jokes.Write one original, clean, and family-friendly dad joke that has never been told before.It should be short, pun-based, and in classic dad-joke style.Each time, choose a random topic so the joke feels new and surprising.Avoid reusing jokes you’ve given before. Only return the joke itself, no explanations or introductions.'
];

const quotePrompts = [
  'You are a wise thinker who crafts original, inspiring, and thought-provoking quotes.Write one short quote that has never been written before.It can be about life, success, motivation, happiness, or learning.Keep it concise, memorable, and impactful.Avoid clichés and repeated ideas.Pick a slightly different perspective or theme each time for uniqueness. Only return the quote itself, no explanations or introductions.'
];

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
      contents: prompt
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
      contents: prompt
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
