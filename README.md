# The Unquiet Mind — Existential Damage

A minimalist AI-powered thought generator that creates original, short philosophical thoughts in simple English. Each thought is paired with one of 100+ philosophers, writers, psychologists, and other thinkers.

## Features

- Generate one random thought at a time
- Draws from a pool of 100+ thinkers across philosophy, literature, psychology, and more
- Simple, clear English rather than academic wording
- Copy the thought together with the displayed thinker's name
- Minimal dark UI with a rose accent
- Backend retries when a generated thought appears incomplete

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Groq API via `groq-sdk`
- **Default model:** `openai/gpt-oss-120b`

## Project structure

```text
.
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
└── frontend/
    ├── src/
    ├── index.html
    └── package.json
```

## Run locally

### 1. Start the backend

From the repository root:

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
GROQ_API_KEY=your_groq_api_key
# Optional: override the default model with one available to your account
# GROQ_MODEL=openai/gpt-oss-120b
PORT=5000
```

Get an API key from the [Groq Console](https://console.groq.com/). Keep the key in the backend environment only. Never put it in frontend code or commit it to Git.

Start the backend:

```bash
npm run dev
```

The backend health endpoint is available at `http://localhost:5000/api/health`.

### 2. Start the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
```

Create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Deployment

### Backend

Deploy the `backend` directory using your Node.js hosting provider.

Configure these environment variables in the backend service:

- `GROQ_API_KEY` — your Groq API key (required)
- `GROQ_MODEL` — optional model override; must be available to your Groq account
- `PORT` — normally assigned automatically by the hosting provider

### Frontend

Deploy the `frontend` directory as a Vite application and set:

- `VITE_API_URL` — the base URL of your deployed backend, without a trailing slash

Redeploy the frontend after changing `VITE_API_URL`, because Vite embeds this variable at build time. After changing backend environment variables, restart or redeploy the backend.

## API endpoints

- `GET /api/health` — confirms the backend is running.
- `POST /api/thought` — generates a thought and returns a JSON response containing `thought`, `thinker`, and `inspiredBy`.

## Notes

The generated thoughts are original AI-generated content associated with a randomly selected thinker. They should not be treated as authentic quotations or attributed as the thinker's actual words.
