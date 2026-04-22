# Design System (Current As-Built State)

This document reflects the design currently implemented in code.

## 1. Brand Direction

The website uses a **clean neutral base** with a **sky-blue accent system**.
Overall tone is modern, product-oriented, and recruiter-friendly:

- Neutral surfaces for readability and trust
- Sky accents for headings, links, focus rings, and motion highlights
- Minimal decorative noise outside the hero motion layer
- Strong hierarchy and clear scanning

## 2. Core Tokens

### Base Variables (`src/styles/globals.css`)

- `--background`: `#fafafa`
- `--foreground`: `#0a0a0a`
- `--surface`: `#ffffff`
- `--surface-foreground`: `#171717`

### Practical Color Roles

- **Page background**: `#fafafa`
- **Primary text**: neutral 900 range (`#0a0a0a` / `text-neutral-900`)
- **Secondary text**: `text-neutral-600` to `text-neutral-500`
- **Borders**: `border-neutral-200` (global default via universal selector)
- **Accent**: sky palette (`text-sky-600`, `text-sky-900`, `bg-sky-*`, `ring-sky-400`)

### Selection Color

- `::selection`: `rgb(14 165 233 / 0.18)`

## 3. Typography

### Font Stack

- Primary UI/body font: **Geist Sans** (`--font-geist-sans`)
- Mono font: **Geist Mono** (`--font-geist-mono`)
- Fallbacks: `Arial, Helvetica, sans-serif`

### Practical Type Scale

- Hero title: `text-4xl` -> `sm:text-5xl` -> `lg:text-6xl`
- Section title: `text-2xl` -> `sm:text-3xl`
- Lead/support copy: `text-base` to `text-xl`
- Eyebrow labels: `text-xs`, uppercase, tracked letters

## 4. Layout & Spacing

### Section Container (`components/shared/section-container.tsx`)

- Vertical rhythm: `py-14 sm:py-20`
- Content width: `max-w-6xl`
- Horizontal padding: `px-6 sm:px-10`
- Supports optional full-bleed decoration layer (`decoration` prop)

### Page Section Order (`src/app/page.tsx`)

1. Hero
2. Tech Stack
3. About
4. Experience
5. Projects
6. Skills
7. Contact

### Grid Patterns

- Hero: split layout on large screens (`lg:grid-cols-[1.15fr_0.85fr]`)
- Card-heavy sections: `md:grid-cols-2`, projects extend to `xl:grid-cols-3`
- Vertical timelines/lists: `space-y-*` stacks with staggered motion

## 5. Component Language

### Buttons (`components/ui/button.tsx`)

- Shape: `rounded-full`
- Default: `bg-neutral-900 text-white hover:bg-neutral-700`
- Outline: `border-neutral-300 text-neutral-900 hover:bg-neutral-100`
- Focus ring: `focus-visible:ring-2 focus-visible:ring-sky-400`
- Sizes:
  - default: `h-10 px-5`
  - lg: `h-11 px-6 text-base`

### Tag Badge (`components/shared/tag-badge.tsx`)

- Pill shape with subtle surface
- `border-neutral-200 bg-neutral-100`
- `text-xs font-medium text-neutral-700`

### Cards (metrics, projects, timeline, stack groups)

Shared baseline:

- `rounded-2xl border border-neutral-200 bg-white`
- Padding typically `p-5` to `p-7`
- Neutral typography hierarchy
- Optional sky accents for links or bullets

## 6. Motion & Hero Backdrop

### Hero Motion Model

Hero decoration combines:

1. Morphing organic blob (`hero-blob-morph`, 22s, alternate, infinite)
2. Rising bubbles (`hero-bubble-rise`, transform/opacity animation)

### Bubble System (Current Implementation)

- Bubble count: `40` (`BUBBLE_COUNT` in `hero-fluid-backdrop.tsx`)
- Bubble props are generated per index via deterministic pseudo-random math
- Runtime variables per bubble:
  - `--bubble-x`
  - `--bubble-size`
  - `--bubble-delay`
  - `--bubble-duration`
  - `--bubble-peak-opacity`
  - `--bubble-mid-opacity`
  - `--bubble-drift`
- No `nth-child` sequencing is used now; distribution is non-sequential across the width

### Water-like Palette

Blob gradient:

- `rgb(186 230 253 / 0.38)`
- `rgb(125 211 252 / 0.22)`
- `rgb(56 189 248 / 0.1)`

Bubble gradient and glow:

- `rgb(255 255 255 / 0.98)`
- `rgb(224 242 254 / 0.72)`
- `rgb(125 211 252 / 0.4)`
- `rgb(56 189 248 / 0.12)`
- Glow: `0 0 14px rgb(14 165 233 / 0.22)`

### Accessibility

- Under `prefers-reduced-motion: reduce`:
  - Blob animation is disabled
  - Bubble animation is disabled and bubbles are hidden

## 7. Interaction Rules

- Hover transitions stay subtle and quick
- Accent usage remains sky-focused for interactive emphasis
- Keep keyboard focus visible on all actionable elements
- Avoid introducing competing accent systems unless intentionally re-branding

## 8. Content Tone

Content style stays professional and high-signal:

- specific
- realistic
- measurable
- non-placeholder

### Preferred

- Direct CTA labels (e.g., "View Resume", "Contact Me")
- Outcome-focused claims with context
- Concise section descriptions

### Avoid

- Placeholder phrasing
- Vague claims without evidence
- Overly promotional copy without substance

## 9. Prompt Guide for Future Edits

Use these prompts for AI-assisted UI iterations:

- "Keep the neutral base with sky-blue accents and recruiter-friendly readability."
- "Preserve Geist Sans hierarchy and concise, high-signal content."
- "Match existing card language: rounded-2xl, white surface, neutral border."
- "Preserve hero fluid backdrop with morphing blob + non-sequential rising bubbles and reduced-motion fallback."

## 10. Change Control Checklist

Before approving new visual changes:

1. Confirm alignment with neutral + sky design direction.
2. Check consistency with button/card/tag language.
3. Validate content credibility (no placeholders).
4. Re-check responsive behavior and run lint/type checks.

If a significantly different visual direction is needed, create a separate version rather than mixing systems in-place.
