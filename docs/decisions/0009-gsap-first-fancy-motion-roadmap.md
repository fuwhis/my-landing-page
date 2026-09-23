# 0009 GSAP-first fancy motion roadmap

Date: 2026-09-24

## Status

Accepted

## Context

A shortlist of Fancy Components–style interactions was evaluated (Text
Highlighter, Letter 3D Swap, Typewriter, Gravity). The repo already standardizes
on GSAP + CSS (`docs/ARCHITECTURE.md` motion boundary). Introducing `motion`
without a capability gap would create a dual animation engine on a static
landing page.

## Decision

1. **Do not add `motion` / Framer Motion.** Ship Fancy-like effects with GSAP +
   CSS (and Matter.js only if Gravity ships).
2. **Ship order:** Text Highlighter (About) → Letter 3D Swap (V.A.S.T) →
   Typewriter (Hero) → Gravity as a **hidden homepage lab** (G2: feature flag
   and/or `?lab=1`), not a default recruiter surface.
3. **Letter 3D Swap interaction split:**
   - Fine pointer + hover (`(hover: hover) and (pointer: fine)`): hover to swap.
   - Touch / coarse pointer (typical mobile & tablet): **auto-swap** without
     hover (interval or enter-view stagger), not hover-gated.
   - `prefers-reduced-motion: reduce`: static text, no swap.
4. **Typewriter** may replace the Hero primary copy block with a small set of
   lines (brand + tagline style). Story must cover SEO/`h1`, reduced-motion full
   text, and product doc updates.
5. Each ship requires **visual preview approval before merge**.

## Alternatives Considered

1. Add `motion` and copy Fancy components wholesale — rejected for dual-engine
   cost while GSAP covers highlighter / 3D / typewriter cores.
2. Gravity as always-visible homepage section — rejected for recruiter scan /
   noise; G2 hidden lab keeps production testability without default noise.
3. Letter 3D desktop-only / mobile static — superseded by auto-swap on touch.

## Consequences

Positive:

- One motion mental model (GSAP) for agents and humans.
- Clear backlog and interaction rules before implementation.

Tradeoffs:

- Typewriter Hero weakens instant brand readability; must be mitigated in
  US-016 (stable accessible name, reduced-motion).
- Gravity still adds Matter.js when US-017 lands — isolate behind lab gate.

## Follow-Up

- US-014 About Text Highlighter (this decision’s first slice).
- US-015 Letter 3D Swap on V.A.S.T.
- US-016 Typewriter Hero.
- US-017 Gravity lab (G2).
