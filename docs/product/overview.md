# Product Overview

## Goal

Deliver a recruiter-friendly personal landing page that presents Nguyen Phu Quy's frontend engineering profile, experience, projects, and contact options with a polished, credible UI.

## Audience

- Recruiters and hiring managers evaluating frontend fit.
- Engineering peers reviewing portfolio and project depth.
- Collaborators reaching out via email or LinkedIn.

## Scope

In scope:

- Single-page marketing site with ordered sections (hero through contact).
- Static content sourced from `src/data/*`.
- GSAP-driven hero motion with accessibility fallback.
- SEO metadata, Open Graph, `robots.txt`, `sitemap.xml`.
- Vercel deployment with CI quality gates.

Out of scope (v1):

- Authentication, accounts, or admin CMS.
- Database, API routes, or server-side user data.
- Blog, comments, or dynamic content management.
- Contact form backend (mailto / external links only).

## Content Principles

Content must stay specific, realistic, and measurable. Avoid placeholder phrasing. See `docs/product/design-system.md` section 8.

## Primary Surfaces

| Surface         | Path                            | Notes                                      |
| --------------- | ------------------------------- | ------------------------------------------ |
| Homepage        | `/`                             | All sections in `docs/product/sections.md` |
| Resume PDF      | `/resume/nguyen-phu-quy-cv.pdf` | Linked from hero and contact               |
| Metadata routes | `/robots.txt`, `/sitemap.xml`   | Driven by `NEXT_PUBLIC_SITE_URL`           |

## Canonical Site URL

Default: `https://fuwhis.io.vn` (overridable via `NEXT_PUBLIC_SITE_URL`). See `docs/product/seo-and-metadata.md`.

## Related Docs

- `docs/product/sections.md`
- `docs/product/design-system.md`
- `docs/product/seo-and-metadata.md`
- `docs/product/deployment.md`
- `docs/DESIGN.mdc` (as-built design reference)
