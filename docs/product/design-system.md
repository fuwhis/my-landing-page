# Design System

Living product contract for visual and interaction rules. As-built detail lives in `docs/DESIGN.mdc`; this file captures the contract agents must preserve.

## Brand Direction

- Neutral base (`#fafafa` background, neutral text hierarchy).
- Sky-blue accent system for headings, links, focus rings, motion highlights.
- Modern, recruiter-friendly, high scanning clarity.
- Minimal decorative noise outside the hero motion layer.

## Typography

- Primary: Geist Sans (`--font-geist-sans`).
- Mono: Geist Mono (`--font-geist-mono`).
- Hero title scales: `text-4xl` → `sm:text-5xl` → `lg:text-6xl`.
- Section titles: `text-2xl` → `sm:text-3xl`.

## Components

| Primitive         | Location                                      | Rules                                            |
| ----------------- | --------------------------------------------- | ------------------------------------------------ |
| Button            | `src/components/ui/button.tsx`                | `rounded-full`, neutral default, sky focus ring  |
| Tag badge         | `src/components/shared/tag-badge.tsx`         | Pill, neutral surface                            |
| Section container | `src/components/shared/section-container.tsx` | Shared vertical rhythm and width                 |
| Cards             | Various sections                              | `rounded-2xl border border-neutral-200 bg-white` |

## Motion

- Hero uses morphing blob + rising bubbles (`src/sections/hero/hero-fluid-backdrop.tsx`).
- Under `prefers-reduced-motion: reduce`, blob and bubble animations are disabled.
- Do not add competing accent systems without an explicit re-brand decision.

## Content Tone

- Direct CTAs (e.g. "View Resume", "Contact Me").
- Outcome-focused, evidence-backed claims.
- No placeholder or vague promotional copy.

## Change Control

Before visual changes:

1. Align with neutral + sky direction.
2. Match button/card/tag language.
3. Validate responsive behavior.
4. Run `npm run lint:check` and `npm run build`.

For full token values and bubble parameters, read `docs/DESIGN.mdc`.
