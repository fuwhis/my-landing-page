# Agent Instructions

Personal landing page for Nguyen Phu Quy. Stack: Next.js 15 App Router, React 19,
TypeScript, Tailwind CSS v4, GSAP, Vercel.

## Before Any Work

1. Classify the request with `docs/FEATURE_INTAKE.md` (lane: `tiny`, `normal`, or `high-risk`).
2. Read affected product docs under `docs/product/`.
3. Check proof status: `scripts/bin/harness-cli query matrix`.
4. Record intake before implementation: `scripts/bin/harness-cli intake ...`.

## Project Reading List

| Topic                               | Path                                               |
| ----------------------------------- | -------------------------------------------------- |
| Product goal and scope              | `docs/product/overview.md`                         |
| Homepage sections                   | `docs/product/sections.md`                         |
| Design rules                        | `docs/product/design-system.md`, `docs/DESIGN.mdc` |
| SEO / metadata                      | `docs/product/seo-and-metadata.md`                 |
| Deploy / CI                         | `docs/product/deployment.md`, `README.md`          |
| Architecture                        | `docs/ARCHITECTURE.md`                             |
| Brownfield spec intake (historical) | `docs/spec-intake/2026-06-08-my-landing-page.md`   |
| Content data                        | `src/data/*`                                       |
| Site URL                            | `src/lib/site.ts`                                  |

## Conventions

- Content changes: edit `src/data/*`, not hard-coded strings in sections.
- Visual changes: follow `docs/product/design-system.md`; preserve reduced-motion behavior.
- Validation default: `npm run lint:check && npm run prettier:check && npm run build`.
- No auth, database, or API routes unless a new high-risk story explicitly adds them.

## Done Definition

- Change complete or blocker documented.
- Product docs and story packet updated when behavior changes.
- Proof commands run; story matrix updated via `scripts/bin/harness-cli story update`.
- Trace recorded: `scripts/bin/harness-cli trace`.

<!-- HARNESS:BEGIN -->

## Harness

This repo uses Harness. Before work, read:

- `README.md`
- `docs/HARNESS.md`
- `docs/FEATURE_INTAKE.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTEXT_RULES.md`
- `scripts/bin/harness-cli query matrix` on macOS/Linux, or `.\scripts\bin\harness-cli.exe query matrix` on Windows

Use the Rust Harness CLI at `scripts/bin/harness-cli` on macOS/Linux or
`scripts/bin/harness-cli.exe` on Windows as the main operational tool.

<!-- HARNESS:END -->
