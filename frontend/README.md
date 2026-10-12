# The Unquiet Mind — Existential Damage

A minimalist AI-powered thought generator that creates original, short philosophical thoughts in simple English. Each thought is paired with one of more than 100 philosophers, writers, psychologists, and other thinkers.

## Features

- Generate one random thought at a time
- Draws from a pool of 100+ thinkers
- Simple, clear English rather than academic wording
- Copy the thought together with the displayed thinker's name
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
# Optional: override the default model with one available to your account
# GROQ_MODEL=openai/gpt-oss-120b
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
