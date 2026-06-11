# Story Backlog

Populated from brownfield spec intake (`docs/spec-intake/2026-06-08-my-landing-page.md`).

## Epics

| Epic | Description                         | Status      |
| ---- | ----------------------------------- | ----------- |
| E01  | Homepage content and section layout | implemented |
| E02  | Design system and hero motion       | implemented |
| E03  | SEO, metadata, and discoverability  | implemented |
| E04  | CI quality gate and deployment      | implemented |
| E05  | Post-deploy verification            | in_progress |

## Stories

| ID     | Title                                        | Lane   | Status      | Packet                                            |
| ------ | -------------------------------------------- | ------ | ----------- | ------------------------------------------------- |
| US-001 | Homepage renders all sections in order       | normal | implemented | `docs/stories/US-001-homepage-sections.md`        |
| US-002 | Hero fluid backdrop respects reduced-motion  | normal | implemented | `docs/stories/US-002-hero-reduced-motion.md`      |
| US-003 | SEO metadata and sitemap use canonical URL   | normal | implemented | `docs/stories/US-003-seo-metadata.md`             |
| US-004 | CI quality gate passes lint, prettier, build | normal | implemented | `docs/stories/US-004-ci-quality-gate.md`          |
| US-005 | Post-deploy verification checklist           | tiny   | planned     | `docs/stories/US-005-post-deploy-verification.md` |

## Slicing Rule

Create new story packets when work is selected. Do not pre-slice every future feature.
