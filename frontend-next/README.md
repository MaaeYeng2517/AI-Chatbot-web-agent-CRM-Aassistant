# AI CRM Next.js Frontend

This folder contains a Next.js frontend scaffold for the AI CRM Assistant.

Quick start (from `frontend-next`):

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

The dev server runs on port 3000. API requests under `/api/*` are rewritten to `http://localhost:8000/*` (see `next.config.js`) so start the FastAPI backend on port 8000 first.

Mobile support:
- Responsive CSS in `styles/globals.css` provides a mobile-friendly layout.

Notes:
- This is a minimal scaffold; expand pages and components as needed.
