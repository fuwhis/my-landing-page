# Architecture

Personal landing page — Next.js 15 App Router, static content, Vercel deployment.

## Product Surfaces

| Surface   | Technology          | Notes                             |
| --------- | ------------------- | --------------------------------- |
| Browser   | Next.js App Router  | Single homepage + metadata routes |
| Analytics | `@vercel/analytics` | Loaded in root layout             |

No API routes, database, workers, or mobile shell.

## Runtime Stack

| Layer     | Choice                                                 |
| --------- | ------------------------------------------------------ |
| Framework | Next.js 15 (App Router, Turbopack dev)                 |
| UI        | React 19, TypeScript                                   |
| Styling   | Tailwind CSS v4 (`src/styles/globals.css`)             |
| Motion    | GSAP + `@gsap/react` (hero and scroll-driven sections) |
| Icons     | `lucide-react`, `simple-icons`                         |
| Hosting   | Vercel                                                 |
| Node      | 22+ (CI)                                               |

## Repository Layout

```text
src/
  app/              # App Router: page, layout, metadata routes
  components/
    ui/             # Primitives (Button)
    motion/         # GSAP helpers
    shared/         # SectionContainer, TagBadge
  sections/         # Homepage sections (one folder per section)
  data/             # Static content modules (profile, projects, etc.)
  lib/              # siteUrl, utils, GSAP helpers
  styles/           # Global CSS tokens
  types/            # Shared TypeScript types (content models)
docs/
  product/          # Living product contract
  stories/          # Story packets and backlog
  decisions/        # Durable architecture and product decisions
public/             # Static assets (favicon, resume PDF, icons)
```

## Core Domains

| Domain            | Location                                | Contract doc                       |
| ----------------- | --------------------------------------- | ---------------------------------- |
| Profile & contact | `src/data/profile.ts`                   | `docs/product/overview.md`         |
| Section layout    | `src/app/page.tsx`                      | `docs/product/sections.md`         |
| Visual system     | `src/styles/globals.css`, components    | `docs/product/design-system.md`    |
| SEO               | `src/app/layout.tsx`, `src/lib/site.ts` | `docs/product/seo-and-metadata.md` |

## Dependency Rule (Adapted)

```text
data (content types)
  <- sections (presentation)
      <- components (shared UI)
          <- app (composition, metadata)
```

- `src/data/*` holds plain content; no React imports.
- Sections compose components and read from data modules.
- `src/app/*` composes sections and owns global metadata.
- `src/lib/site.ts` is the single canonical URL resolver.

## Boundary Rules

- **Env boundary:** `NEXT_PUBLIC_SITE_URL` parsed once in `src/lib/site.ts`.
- **Content boundary:** Section copy lives in `src/data/*`, not duplicated in section components.
- **Motion boundary:** GSAP logic stays in `src/components/motion/` and section-specific motion files; respect `prefers-reduced-motion`.
- **No parse-first server boundary** — no user input, webhooks, or database rows in v1.

## Validation Ladder

| Command                  | Proves                                          |
| ------------------------ | ----------------------------------------------- |
| `npm run lint:check`     | ESLint / Next.js rules                          |
| `npm run prettier:check` | Formatting (CI)                                 |
| `npm run build`          | TypeScript, App Router compile, metadata routes |
| `npm run dev`            | Local smoke only (not CI proof)                 |

Future E2E (optional): Playwright homepage section smoke.

## Observability

- Vercel Analytics for page views.
- No custom JSON request logging (static site, no server actions in v1).

## Related Decisions

- `docs/decisions/0007-nextjs-landing-stack.md`
