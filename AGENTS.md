# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

OpenNow is a Next.js 16 PWA (single service, not a monorepo) — a travel hours dashboard that shows which saved places are open/closed/closing-soon. See `OpenNow-Cursor-Prompt.md` for the full product spec.

### Running the app

- **Dev server:** `npm run dev` (port 3000). Uses Turbopack — starts in ~600ms.
- **Guest mode** works without any external services (Supabase, Google APIs). Data is stored in Zustand + localStorage.
- Full auth/DB functionality requires Supabase credentials and Google OAuth — see `OpenNow-Cursor-Prompt.md` "Environment Variables Needed" section.

### Environment variables

A `.env.local` file is required. At minimum it needs `NEXTAUTH_URL=http://localhost:3000`, `NEXTAUTH_SECRET` (any base64 string), and placeholder values for `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the Supabase client is instantiated at module level and will error without them). See `.env.local` for the current dev defaults.

### Lint / Build / Test

- **Lint:** `npm run lint` (ESLint 9 flat config). Pre-existing warnings/errors exist in the repo (2 errors, 3 warnings as of initial setup).
- **Build:** `npm run build`. Currently fails due to a pre-existing TypeScript error in `components/PlaceSearch.tsx` (`useRef()` needs an initial argument with React 19 types). The dev server is unaffected.
- **Tests:** No test framework is configured (no Jest, Vitest, etc.). There are no automated tests.

### Gotchas

- The Supabase client in `lib/supabase.ts` uses `!` non-null assertions on env vars, so `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be set (even to placeholder values) or the import will throw at runtime.
- Seed data (10 Chicago restaurants) is loaded via the Zustand store in guest mode — no API call needed.
- The `npm run build` TypeScript error does not affect `npm run dev` since Turbopack does not block on type errors.
