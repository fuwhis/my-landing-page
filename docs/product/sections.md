# Homepage Sections

## Section Order

The homepage (`src/app/page.tsx`) must render sections in this order:

1. **Hero** — name, role, tagline, primary CTAs, metrics, fluid backdrop.
2. **Tech Stack** — grouped technologies with icons.
3. **About** — summary paragraphs from profile data.
4. **Experience** — timeline of roles and outcomes.
5. **Projects** — featured work cards with links.
6. **Skills** — categorized skill groups.
7. **Contact** — availability, email, social links.

Changing order requires updating this doc, `src/app/page.tsx`, and the story packet.

## Content Sources

| Section    | Data module              | Component                                        |
| ---------- | ------------------------ | ------------------------------------------------ |
| Hero       | `src/data/profile.ts`    | `src/sections/hero/hero-section.tsx`             |
| Tech Stack | `src/data/tech-stack.ts` | `src/sections/tech-stack/tech-stack-section.tsx` |
| About      | `src/data/profile.ts`    | `src/sections/about/about-section.tsx`           |
| Experience | `src/data/experience.ts` | `src/sections/experience/experience-section.tsx` |
| Projects   | `src/data/projects.ts`   | `src/sections/projects/projects-section.tsx`     |
| Skills     | `src/data/skills.ts`     | `src/sections/skills/skills-section.tsx`         |
| Contact    | `src/data/profile.ts`    | `src/sections/contact/contact-section.tsx`       |

## Layout Contract

- All sections use `SectionContainer` (`src/components/shared/section-container.tsx`).
- Vertical rhythm: `py-14 sm:py-20`, max width `max-w-6xl`, horizontal padding `px-6 sm:px-10`.

## Acceptance Signals

- Each section visible on desktop and mobile without horizontal overflow.
- No console errors on initial load.
- Content matches data modules (no hard-coded duplicate copy in components unless intentional).
