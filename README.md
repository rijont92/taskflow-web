# TaskFlow Web

A separate React frontend for **TaskFlow API**. This repository is not inside the FastAPI project. The UI talks to the backend over HTTP; the backend remains the source of truth for authentication and task ownership.

Backend repository: [taskflow-api](https://github.com/rijont92/taskflow-api)

## Tech stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- TanStack Query
- Vitest + Testing Library

## Architecture

```text
Component
    ↓
Hook (TanStack Query / AuthContext)
    ↓
Feature API function
    ↓
apiClient (Axios)
    ↓
FastAPI
```

JWT flow:

```text
Login → POST /auth/login → store access token
Protected request → Authorization: Bearer <token>
401 → clear token and cached data → /login
```

The client never sends `user_id` when creating tasks.

## Folder structure

```text
src/
├── app/
├── components/
├── features/auth
├── features/tasks
├── lib/apiClient.ts
├── pages/
├── routes/
└── types/api.ts
```

## Backend requirements

Run TaskFlow API locally first:

```bash
cd ../taskflow-api
source .venv/bin/activate
.venv/bin/python -m uvicorn app.main:app --reload
```

The API must allow the Vite origin. TaskFlow API reads `CORS_ORIGINS` (default `http://localhost:5173,http://127.0.0.1:5173`).

## Local setup

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173

`.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Do not commit `.env`.

## npm commands

```bash
npm run dev       # Vite dev server
npm run build     # production build
npm run preview   # serve the build
npm run lint      # ESLint
npm test          # Vitest
```

## Authentication

- Public: `/login`, `/register`
- Protected: `/dashboard`, `/tasks`, `/tasks/:taskId`, `/profile`
- Refresh keeps the session if the token is still valid (`GET /users/me`)
- Logout clears the token and TanStack Query cache

## Git workflow

```text
main ← dev ← feature/*
```

Use conventional commits and pull requests. Never push feature work straight to `main`.
