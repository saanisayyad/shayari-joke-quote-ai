import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// A broad mix of philosophers, writers, psychologists, and thinkers.
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
  "Leo Tolstoy",
  "Jean-Paul Sartre",
  "Marcel Proust",
  "George Orwell",
  "Aldous Huxley",
  "Samuel Beckett",
  "Milan Kundera",
  "Thomas Mann",
  "Rainer Maria Rilke",
  "Johann Wolfgang von Goethe",
  "William Shakespeare",
  "Dante Alighieri",
  "Miguel de Unamuno",
  "Fernando Pessoa",
  "Clarice Lispector",
  "Jorge Luis Borges",
  "Gabriel García Márquez",
  "José Saramago",
  "Julio Cortázar",
  "Haruki Murakami",
  "Osamu Dazai",
  "Yukio Mishima",
  "Yasunari Kawabata",
  "Kenzaburō Ōe",
  "James Baldwin",
  "Toni Morrison",
  "Maya Angelou",
  "Sylvia Plath",
  "Emily Dickinson",
  "Walt Whitman",
  "Edgar Allan Poe",
  "Herman Melville",
  "Mark Twain",
  "Ralph Waldo Emerson",
  "Henry David Thoreau",
  "William James",
  "Carl Jung",
  "Sigmund Freud",
  "Viktor Frankl",
  "Erich Fromm",
  "Rollo May",
  "Abraham Maslow",
  "Hannah Arendt",
  "Michel Foucault",
  "Jacques Derrida",
  "Gilles Deleuze",
  "Judith Butler",
  "bell hooks",
  "Frantz Fanon",
  "Cornel West",
  "Byung-Chul Han",
  "Mark Fisher",
  "Plato",
  "Aristotle",
  "Socrates",
  "Marcus Aurelius",
  "Seneca",
  "Epictetus",
  "Epicurus",
  "Heraclitus",
  "Diogenes",
  "Confucius",
  "Laozi",
  "Zhuangzi",
  "Sun Tzu",
  "Mencius",
  "Nagarjuna",
  "Gautama Buddha",
  "Rumi",
  "Omar Khayyam",
  "Khalil Gibran",
  "Rabindranath Tagore",
  "Jiddu Krishnamurti",
  "Swami Vivekananda",
  "Sri Aurobindo",
  "Mirza Ghalib",
  "B. R. Ambedkar",
  "Mahatma Gandhi",
  "Premchand",
  "Saadat Hasan Manto",
  "Ismat Chughtai",
  "Amrita Pritam",
  "Mahasweta Devi",
  "R. K. Narayan",
  "Arundhati Roy",
  "Chinua Achebe",
  "Wole Soyinka",
  "Ngũgĩ wa Thiong'o",
  "Federico García Lorca",
  "Octavio Paz",
  "Pablo Neruda",
  "Simone Weil",
  "Mary Wollstonecraft",
  "John Stuart Mill",
  "Thomas Hobbes",
  "John Locke",
  "Baruch Spinoza",
  "David Hume",
  "Immanuel Kant",
  "Georg Wilhelm Friedrich Hegel",
  "Karl Marx",
  "Walter Benjamin",
  "Susan Sontag",
  "Iris Murdoch",
  "Ayn Rand",
  "Ursula K. Le Guin",
  "Octavia E. Butler",
  "Mary Shelley"
];

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "The Unquiet Mind" });
});

async function generateCompleteThought(thinker) {
  const prompt = `Write one original, thoughtful idea loosely inspired by themes associated with ${thinker}.

Rules:
- Use simple, everyday English that most people can understand.
- Keep it short: one or two complete sentences.
- Make it thoughtful, emotionally sharp, and memorable.
- Use clear words; avoid academic language, complicated metaphors, and confusing phrasing.
- Create a new thought. Do not copy, paraphrase, or imitate any real quote or passage.
- Do not claim the thinker said or wrote this thought.
- Do not include the thinker's name in the thought itself.
- End with proper punctuation.
- Return only the thought, without a heading or quotation marks.`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: "Write original philosophical thoughts in simple, natural English. Avoid obscure words. Always return complete sentences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 180
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
