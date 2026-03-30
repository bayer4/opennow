# OpenNow

A mobile-first web app that gives travelers an instant, glanceable view of which saved places are **open right now**, **closing soon**, or **closed** — for any city they're visiting.

**Live at [getopennow.com](https://getopennow.com)**

## What it does

- Save restaurants, cafes, and bars to trip-based shortlists
- See live opening hours at a glance with color-coded status (open / closing soon / closed)
- Search and add places with Google Places autocomplete
- View your places as a today list, weekly grid, or on a map
- Works on any device — optimized for mobile

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Auth:** NextAuth.js (Google OAuth)
- **Database:** Supabase (PostgreSQL)
- **State:** Zustand
- **Monitoring:** Sentry
- **Deployment:** Vercel

## Getting started

```bash
npm install
cp .env.local.example .env.local  # add your API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project structure

```
app/          → Pages and API routes (Next.js App Router)
components/   → Shared UI components
lib/          → Utilities, API wrappers, status engine
store/        → Zustand state management
types/        → TypeScript type definitions
supabase/     → Database migrations
public/       → Static assets and PWA manifest
```
