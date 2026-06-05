# My Landing Page

A personal landing page built with Next.js App Router, React 19, Tailwind CSS v4, and GSAP animations.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP (`gsap` + `@gsap/react`)
- Vercel Analytics (`@vercel/analytics`)
- UI utilities: `class-variance-authority`, `clsx`, `tailwind-merge`
- Icons: `lucide-react`, `simple-icons`
- ESLint + Prettier (`prettier-plugin-tailwindcss`)

## Requirements

- Node.js 22+ (matches CI)
- npm 10+

> This repository uses `npm` in CI (`npm ci`), so keep `package-lock.json` in sync with `package.json`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev`: Start development server (Turbopack).
- `npm run build`: Create production build.
- `npm run start`: Start production server.
- `npm run serve`: Build then start production server.
- `npm run lint:check`: Run ESLint checks.
- `npm run lint`: Run ESLint with auto-fix.
- `npm run prettier`: Format files with Prettier.
- `npm run prettier:check`: Verify formatting (used in CI).
- `npm run clean`: Remove `node_modules` and `.next`.

## Environment Variables

Create `.env.local` (optional for local development):

```bash
NEXT_PUBLIC_SITE_URL=<DOMAIN_NAME>
```

- Used for canonical URL metadata, `robots.txt`, and `sitemap.xml`.
- If not provided, the app falls back to `https://fuwhis.io.vn`.
- CI sets `NEXT_PUBLIC_SITE_URL=https://fuwhis.io.vn` for consistent build metadata.

## Project Structure

```text
src/
  app/          # App Router pages and metadata routes
  components/   # Shared UI and motion components
    ui/         # Reusable primitives (e.g. Button)
    motion/     # GSAP and scroll-driven animations
    shared/     # Section-level shared UI
  sections/     # Homepage sections (hero, about, projects, etc.)
  data/         # Static content/data used by sections
  lib/          # Shared utilities (site config, GSAP, helpers)
  styles/       # Global CSS (Tailwind v4)
  types/        # Shared TypeScript types
```

## CI and Quality

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pushes and pull requests to `main` and `feature/preview`:

1. `npm ci` (Node.js 22, npm cache)
2. `npm run lint:check`
3. `npm run prettier:check`
4. `npm run build`

If CI fails with `npm ci` lockfile errors:

```bash
npm install
git add package-lock.json
git commit -m "update: sync lockfile with package changes"
```

## Deployment

- Recommended platform: Vercel
- Production branch: `main`
- Preview branch: `feature/preview`

See `DEPLOYMENT_CHECKLIST.md` for a full deployment checklist and post-deploy validation steps.
