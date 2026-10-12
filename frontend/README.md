# The Unquiet Mind — Existential Damage

A minimalist AI-powered thought generator serving original, late-night philosophical thoughts inspired by the themes explored by thinkers and writers such as Franz Kafka, Fyodor Dostoevsky, Friedrich Nietzsche, Albert Camus, Hermann Hesse, Virginia Woolf, Søren Kierkegaard, Arthur Schopenhauer, Simone de Beauvoir, and Leo Tolstoy.

> These are original AI-generated thoughts inspired by a thinker's themes, not authentic quotations.

## Features

- Generate one random existential thought at a time
- A randomly selected thinker for each generation
- Copy thoughts to the clipboard
- Minimal dark UI with a rose accent
- Express backend errors in the interface

## Tech stack

- React + Vite + Tailwind CSS
- Node.js + Express
- Groq API using `groq-sdk` (default model: `openai/gpt-oss-120b`)

## Run locally

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key
# Optional: override the default model
# GROQ_MODEL=llama-3.3-70b-versatile
PORT=5000
```

Get a key from the [Groq Console](https://console.groq.com/). Keep the key in the backend environment only; never expose it in frontend code or commit it to Git.

Start the backend:

```bash
npm run dev
```

Health check: `http://localhost:5000/api/health`

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start Vite:

```bash
npm run dev
```

## Deployment

- Set `GROQ_API_KEY` in the backend host's environment variables.
- Optionally set `GROQ_MODEL` to an active model available to your Groq account.
- Set `VITE_API_URL` in the frontend host to the deployed backend's base URL, without a trailing slash.
- Redeploy the frontend after changing `VITE_API_URL`, because Vite embeds it at build time.
- After changing backend environment variables, restart or redeploy the backend so they take effect.

## API

- `GET /api/health` — confirms the backend is running.
- `POST /api/thought` — generates a thought and returns `thought`, `thinker`, and `inspiredBy`.
