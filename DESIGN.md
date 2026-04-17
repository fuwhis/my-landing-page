# Design System (Current Approved Website)

## 1. Brand Direction

This website uses a **clean neutral base** with a selective **indigo accent**.
The visual tone is modern, product-focused, and recruiter-friendly:

- Neutral white/black surfaces for readability and trust
- Indigo for interaction, links, and visual focus
- Minimal decoration outside of the hero motion layer
- Clear hierarchy, strong scannability, low visual noise

This document is the source of truth for the currently approved implementation and near-term iteration.

## 2. Core Tokens

### Base Variables (`globals.css`)

- `--background`: `#fafafa`
- `--foreground`: `#0a0a0a`
- `--surface`: `#ffffff`
- `--surface-foreground`: `#171717`

### Practical Color Roles

- **Page background**: `#fafafa` (`bg-neutral-50`)
- **Primary text**: `#0a0a0a` to `text-neutral-900`
- **Secondary text**: `text-neutral-600` / `text-neutral-500`
- **Borders**: `border-neutral-200` (global default)
- **Accent**: Indigo (`text-indigo-600`, `bg-indigo-*`, selection tint)

### Selection Color

- `::selection`: `rgb(99 102 241 / 0.18)`

## 3. Typography

### Font Stack

- Primary UI/body font: **Geist Sans** (`--font-geist-sans`)
- Mono font: **Geist Mono** (`--font-geist-mono`)
- Fallbacks: `Arial, Helvetica, sans-serif`

### Principles

- Prefer clarity over expressive display typography.
- Use `font-semibold` for headings and key values.
- Use neutral text colors and avoid low-contrast decorative copy.
- Keep line-height relaxed for descriptive paragraphs (`leading-relaxed`).

### Typical Scale (Current)

- Hero title: `text-4xl` -> `sm:text-5xl` -> `lg:text-6xl`
- Section title: `text-2xl` -> `sm:text-3xl`
- Body text: `text-sm` / `text-base`
- Eyebrow labels: `text-xs` + uppercase tracking

## 4. Layout & Spacing

### Section Container

- Vertical rhythm: `py-14 sm:py-20`
- Content width: `max-w-6xl`
- Horizontal padding: `px-6 sm:px-10`

### Grids

- Feature/card sections commonly use `md:grid-cols-2` or `xl:grid-cols-3`.
- Hero uses a two-column split on large screens and stacks on smaller screens.

### Spacing Rhythm

- Use Tailwind spacing scale (`gap-3`, `gap-6`, `space-y-8`, etc.).
- Keep consistent spacing between heading, description, and content groups.

## 5. Components (Current Approved Style)

### Buttons (`components/ui/button.tsx`)

- Shape: `rounded-full`
- Default: dark fill (`bg-neutral-900`, white text)
- Outline: neutral border + neutral text
- Focus: `focus-visible:ring-2 focus-visible:ring-indigo-400`
- Sizes:
  - default: `h-10 px-5`
  - lg: `h-11 px-6 text-base`

### Tags (`components/shared/tag-badge.tsx`)

- Shape: full pill (`rounded-full`)
- Surface: `bg-neutral-100`
- Border: `border-neutral-200`
- Label: `text-xs font-medium text-neutral-700`

### Cards (Project / Timeline / Metric / Skill Groups)

Current approved card baseline:

- Shape: `rounded-2xl`
- Surface: `bg-white`
- Border: `border-neutral-200`
- Padding: typically `p-5` to `p-7`
- Text hierarchy:
  - title/value: `text-neutral-900`
  - body/support: `text-neutral-600` / `text-neutral-700`

## 6. Motion & Hero Backdrop

### Hero Motion Concept

Hero decoration combines:

1. Morphing organic blob (`hero-blob-morph`)
2. Rising bubbles (`hero-bubble-rise`)

This creates a soft "fluid tech" feel while keeping core content readable.

### Updated Water-like Palette

Blob:

- `rgb(186 230 253 / 0.38)`
- `rgb(125 211 252 / 0.22)`
- `rgb(56 189 248 / 0.1)`

Bubble:

- Highlight center: `rgb(255 255 255 / 0.98)`
- Mid tint: `rgb(224 242 254 / 0.72)`
- Outer tint: `rgb(125 211 252 / 0.4)` to `rgb(56 189 248 / 0.12)`
- Glow: `0 0 14px rgb(14 165 233 / 0.22)`

### Accessibility

- Respect reduced motion:
  - Disable blob animation
  - Hide bubble animation under `prefers-reduced-motion: reduce`

## 7. Interaction Rules

- Hover transitions are subtle and fast.
- Accent color should remain indigo-focused for links and active affordances.
- Avoid introducing warm-tone accent systems unless explicitly requested.
- Keep focus styles visible and keyboard-friendly.

## 8. Content Tone Guidelines

The site is positioned for professional trust. Content should feel:

- specific
- realistic
- measurable
- non-placeholder

### Do

- Use concrete claims ("respond within 24 hours", "improved LCP by 30%").
- Keep CTA labels direct ("View Resume", "Contact Me").
- Use concise, high-signal section descriptions.

### Avoid

- "Placeholder" wording in user-facing copy
- vague claims without context
- overly promotional language without proof

## 9. Prompt Guide for Future Edits

Use these prompts when asking an AI/design tool for new UI:

- "Keep neutral white/black base with indigo accents only. Preserve current portfolio tone and readability."
- "Use Geist Sans hierarchy and clean recruiter-friendly copy. Avoid decorative typography."
- "Match existing cards: rounded-2xl, white surface, neutral border, minimal shadow."
- "For hero visuals, keep water-like bubble palette and gentle motion, with reduced-motion fallback."

## 10. Change Control

Before accepting new visual changes:

1. Confirm it still matches neutral + indigo direction.
2. Check consistency with existing card/button/tag language.
3. Verify text credibility (no placeholder phrasing).
4. Re-run lint and quickly review responsive behavior.

If a new direction is desired (e.g., warm editorial style), create a separate design version instead of mixing systems in-place.
