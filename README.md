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

- Node.js 24.x (matches CI)
- pnpm 10.x
- Corepack enabled

This project uses pnpm as the only package manager.

Do not use:

`npm install` or `yarn install`

Do not commit:

- `package-lock.json`
- `yarn.lock`

The only dependency lockfile should be:

`pnpm-lock.yaml`

## Getting Started

1. Enable Corepack:

```bash
corepack enable
```

2. Install dependencies:

```bash
pnpm install --frozen-lockfile
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev`: Start development server (**Turbopack**).
- `pnpm build`: Create production build.
- `pnpm start`: Start production server.
- `pnpm serve`: Build then start production server.
- `pnpm lint:check`: Run ESLint checks.
- `pnpm lint`: Run ESLint with auto-fix.
- `pnpm prettier`: Format files with Prettier.
- `pnpm prettier:check`: Verify formatting (used in CI).
- `pnpm clean`: Remove `node_modules` and `.next`.

## Environment Variables

Create `.env.local` (optional for local development):

```bash
NEXT_PUBLIC_SITE_URL=<DOMAIN_NAME>
```

- Used for canonical URL metadata, `robots.txt`, and `sitemap.xml`.
- If not provided, the app falls back to `https://<DOMAIN_URL>`.
- CI sets `NEXT_PUBLIC_SITE_URL=https://<DOMAIN_URL>` for consistent build metadata.

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

1. `pnpm install --frozen-lockfile` (Node.js 24, pnpm global package manager)
2. `pnpm lint:check`
3. `pnpm prettier:check`
4. `pnpm build`

If CI fails with pnpm lockfile issues:

Firstly, it need to be removed the previous versions:

Re-install pnpm packages:

```bash
pnpm install
```

If old lockfile appear, remove them:

```bash
rm -rf package-lock.json yarn.lock
```

Then commit the cleanup:

```bash
git add package.json pnpm-lock.yaml
git rm -f package-lock.json yarn.lock 2>/dev/null || true
git commit -m "chore: remove legacy lockfile"
```

If a dependency needs install/build scripts, approve it explicitly:

```bash
pnpm approve-builds
```

Then commit the generated or updated file: `pnpm-workspace.yaml` and should do not bypass this with npm or yarn.

## Deployment

- Recommended platform: Vercel
- Production branch: `main`
- Preview branch: `feature/preview`

See `DEPLOYMENT_CHECKLIST.md` for a full deployment checklist and post-deploy validation steps.
