# 0007 Next.js Landing Page Stack

Date: 2026-06-08

## Status

Accepted

## Context

Brownfield spec intake for `my-landing-page` required recording the implemented
stack so future agents do not re-litigate framework or hosting choices.

## Decision

Adopt and maintain this stack for the portfolio site:

- **Framework:** Next.js 15 App Router with React 19 and TypeScript.
- **Styling:** Tailwind CSS v4 with tokens in `src/styles/globals.css`.
- **Motion:** GSAP for hero and scroll-driven animations; must honor `prefers-reduced-motion`.
- **Content:** Static modules in `src/data/*` (no CMS or database in v1).
- **Hosting:** Vercel with `NEXT_PUBLIC_SITE_URL` for canonical metadata.
- **Quality gate:** GitHub Actions — lint, prettier, build.

## Consequences

Positive:

- Agents have a single architecture reference aligned with implemented code.
- Validation commands map directly to CI.

Tradeoffs:

- No server-side dynamic content without a new initiative and decision.
- E2E tests are optional until explicitly scoped.

## Validation

- `npm run lint:check && npm run prettier:check && npm run build`
