# Design System

Living product contract for visual and interaction rules. As-built detail lives in `docs/DESIGN.mdc`; this file captures the contract agents must preserve.

## Brand Direction

- Neutral base (`#fafafa` light / `#0a0a0a` dark background, semantic text hierarchy).
- Sky-blue accent system for headings, links, focus rings, motion highlights.
- Modern, recruiter-friendly, high scanning clarity.
- Minimal decorative noise outside the hero motion layer.

## Theme

- Light and dark modes via `next-themes` (`class` on `<html>`, `defaultTheme="system"`).
- Semantic tokens in `src/styles/base/tokens.css`: `background`, `foreground`,
  `surface`, `surface-foreground`, `border`, `muted`, `muted-foreground`,
  `subtle-foreground`.
- Homepage surfaces use Tailwind utilities mapped to those tokens (e.g. `bg-surface`,
  `text-muted-foreground`, `border-border`) — not hard-coded light-only neutrals.
- Visitor toggle UI: Speed Dial FAB (`src/components/ui/speed-dial-fab.tsx`).
- Decision: `docs/decisions/0008-next-themes-dark-mode.md`.

## Typography

- Primary: Geist Sans (`--font-geist-sans`).
- Mono: Geist Mono (`--font-geist-mono`).
- Hero title scales: `text-4xl` → `sm:text-5xl` → `lg:text-6xl`.
- Section titles: `text-2xl` → `sm:text-3xl`.

## Components

| Primitive         | Location                                      | Rules                                                                                                                     |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Speed Dial FAB    | `src/components/ui/speed-dial-fab.tsx`        | Fixed bottom-right settings menu; theme toggle sub-action; sky focus ring; see `src/styles/components/speed-dial-fab.css` |
| Button            | `src/components/ui/button.tsx`                | `rounded-full`, neutral default, sky focus ring; optional `glow` — see `docs/product/components/button.md`                |
| Tag badge         | `src/components/shared/tag-badge.tsx`         | Pill, neutral surface; optional `animate` prop for hover scale (`src/styles/components/tag-badge.css`)                    |
| Section container | `src/components/shared/section-container.tsx` | Shared vertical rhythm and width; optional `decoration` (blob) and `bubbles` slots behind content                         |
| Cards             | Various sections                              | `rounded-2xl border border-border bg-surface`                                                                             |

## Motion

- Hero uses independently importable fluid layers from `src/components/motion/hero-fluid-backdrop.tsx`:
  `HeroFluidBlob` (inset, `size`, `morphDuration`, `scale` / `scaleX` / `scaleY` / `scaleZ` / `scale3d`)
  via `decoration`, `HeroFluidBubbles` via `bubbles`.
- Experience timeline reuses `HeroFluidBlob` with `position="left"` (horizontal mirror)
  and inset props for placement.
- About uses `TextHighlighter` (`src/components/motion/text-highlighter.tsx`) for
  scroll-once LTR highlight reveal on selected phrases; fill color from
  `--text-highlighter-color` in `tokens.css` (overridable via `highlightColor`
  prop; GSAP + Tailwind/inline — see `docs/decisions/0009-gsap-first-fancy-motion-roadmap.md`).
- Hero supporting copy uses `Typewriter` (`src/components/motion/typewriter.tsx`)
  cycling `profile.heroTypewriterLines` (React timers + CSS caret; no Motion).
  Document `h1` stays `profile.fullName`.
- Hero brand row uses `PageMascot` (`src/components/motion/page-mascot.tsx`) from
  the `page-mascot` dependency with otter sheets in `public/mascots/`. Library
  disables cursor tracking without a fine pointer and honours reduced-motion on
  click squash.
- Under `prefers-reduced-motion: reduce`, blob, bubble, and highlighter entrance
  animations are disabled (highlighter stays fully painted); typewriter shows
  static lines with no caret loop.
- Do not add competing accent systems without an explicit re-brand decision.
- Do not add `motion` / Framer Motion without superseding decision 0009.

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
For CSS file layout and conventions, read `docs/product/css-architecture.md`.
