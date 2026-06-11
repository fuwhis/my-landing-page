# Spec Intake

Date: 2026-06-08

## Source

Where did the spec come from?

- User prompt: Brownfield intake — derive harness product contract from the existing `my-landing-page` repository.
- Attached file: `README.md`, `docs/DESIGN.mdc`, `DEPLOYMENT_CHECKLIST.md`, implemented `src/` tree.
- External reference: Harness v0 spec-intake template (`docs/templates/spec-intake.md`).

## Project Summary

**Product:** Personal portfolio landing page for Nguyen Phu Quy (Frontend Engineer).

**Audience:** Recruiters, hiring managers, and technical collaborators evaluating frontend experience.

**Why:** Present a credible, high-signal CV/portfolio with modern UI, motion, SEO metadata, and production deployment on Vercel. Content is static; no auth, database, or user accounts.

**Current state:** Application is implemented (brownfield). Harness v0 is being wired to make future agent work traceable and contract-driven.

## Candidate Product Docs

| File                               | Purpose                                     | Source sections                         |
| ---------------------------------- | ------------------------------------------- | --------------------------------------- |
| `docs/product/overview.md`         | Product goal, audience, scope, non-goals    | README, profile data                    |
| `docs/product/sections.md`         | Homepage section order and content contract | `src/app/page.tsx`, `src/data/*`        |
| `docs/product/design-system.md`    | Visual and interaction rules                | `docs/DESIGN.mdc`                       |
| `docs/product/seo-and-metadata.md` | Canonical URL, OG, robots, sitemap          | `src/app/layout.tsx`, `src/lib/site.ts` |
| `docs/product/deployment.md`       | Vercel, env vars, CI, post-deploy checks    | README, DEPLOYMENT_CHECKLIST.md         |

## Candidate Epics

| Epic | Description                                              | Status             |
| ---- | -------------------------------------------------------- | ------------------ |
| E01  | Homepage content and section layout                      | implemented        |
| E02  | Design system and motion (hero backdrop, reduced-motion) | implemented        |
| E03  | SEO, metadata, and discoverability                       | implemented        |
| E04  | CI quality gate and production deployment                | implemented        |
| E05  | Post-deploy verification and Lighthouse                  | partially complete |

## Architecture Questions

- Runtime stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP.
- Product surfaces: Browser only (responsive marketing site).
- Storage: Static TypeScript data modules under `src/data/`; no database.
- External providers: Vercel Analytics; hosting on Vercel.
- Deployment target: Vercel (`main` production, `feature/preview` previews).
- Security model: Public static site; no auth; secrets only in env (`NEXT_PUBLIC_SITE_URL`).

## Validation Shape

| Layer       | Expected proof                                                                       |
| ----------- | ------------------------------------------------------------------------------------ |
| Unit        | Not required for v1 (no isolated domain modules); optional later for pure utilities. |
| Integration | Not required (no backend or external API contracts).                                 |
| E2E         | Optional future Playwright smoke for homepage sections.                              |
| Platform    | `npm run lint:check`, `npm run prettier:check`, `npm run build` (CI parity).         |
| Release     | GitHub Actions CI on PR; Vercel production deploy; manual post-deploy checklist.     |

## Open Decisions

- Lighthouse audit on production URL — tracked in DEPLOYMENT_CHECKLIST, not yet closed.
- E2E browser tests — deferred until a story explicitly requires them.

## First Story Candidates

- US-001: Homepage renders all sections in contract order (implemented).
- US-002: Hero fluid backdrop respects reduced-motion (implemented).
- US-003: SEO metadata, robots, and sitemap use canonical site URL (implemented).
- US-004: CI quality gate passes lint, prettier, and build (implemented).
- US-005: Post-deploy verification checklist (planned).

## Harness Delta

- Promoted Harness operating files from `harness/` to root `docs/` and `scripts/`.
- Created product contract under `docs/product/`.
- Recorded project stack decision `docs/decisions/0007-nextjs-landing-stack.md`.
- Seeded story backlog and durable CLI records for brownfield proof status.
