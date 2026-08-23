# Homepage Sections

## Section Order

The homepage (`src/app/page.tsx`) must render sections in this order:

1. **Hero** — name, role, tagline, location, email, metrics, fluid blob (right) + rising bubbles. Profile CTAs live in Contact Close kit.
2. **How I Engineer (V.A.S.T)** — Value-driven, Adaptable, System Thinking, Technical Depth; scroll-triggered entrance via GSAP.
3. **About** — summary paragraphs from profile data.
4. **Experience** — vertical timeline of roles, one outcome sentence per entry, optional scroll link to a matching project card, fluid blob (left).
5. **Projects** — featured work cards with links.
6. **Skills** — categorized skill groups.
7. **Contact** — heading from profile data; contact card with form plus Close kit (direct line, reply contract, profile CTAs). Credly Badge stays in `profile.socialLinks` with `visible: false`.

Changing order requires updating this doc, `src/app/page.tsx`, and the story packet.

## Content Sources

| Section        | Data module                                        | Component                                             |
| -------------- | -------------------------------------------------- | ----------------------------------------------------- |
| Hero           | `src/data/profile.ts`                              | `src/sections/hero/hero-section.tsx`                  |
| How I Engineer | `src/data/vast.ts`                                 | `src/sections/vast/vast-section.tsx`                  |
| About          | `src/data/profile.ts`                              | `src/sections/about/about-section.tsx`                |
| Experience     | `src/data/experience-timeline.ts`                  | `src/sections/experience/timeline-record-section.tsx` |
| Projects       | `src/data/projects.ts`                             | `src/sections/projects/projects-section.tsx`          |
| Skills         | `src/data/skills.ts`                               | `src/sections/skills/skills-section.tsx`              |
| Contact        | `src/data/profile.ts`, `src/data/contact-panel.ts` | `src/sections/contact/contact-section.tsx`            |

## Layout Contract

- All sections use `SectionContainer` (`src/components/shared/section-container.tsx`).
- Optional `decoration` and `bubbles` slots render full-bleed layers behind content (`z-10`).
- Vertical rhythm: `py-14 sm:py-20`, max width `max-w-6xl`, horizontal padding `px-6 sm:px-10`.
- Experience timeline entries with `projectSlug` are interactive buttons that scroll to the matching project card; they use the same surface styling as non-linked entries (no hover or focus background).
- Contact `#contact-form` card: large screens use `lg:grid-cols-[minmax(0,36rem)_minmax(16rem,1fr)]` (form column + Close kit). Small screens stack intro, Close kit, then form. Close kit copy lives in `src/data/contact-panel.ts`.

## Acceptance Signals

- Each section visible on desktop and mobile without horizontal overflow.
- No console errors on initial load.
- Content matches data modules (no hard-coded duplicate copy in components unless intentional).
