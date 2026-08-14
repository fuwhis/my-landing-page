## Ticket: US-012 — Replace Tech Stack section with How I Engineer section

### Action + Object + Technology

Replace the existing Tech Stack section (`src/sections/tech-stack/tech-stack-section.tsx`)
with a new V.A.S.T positioning section, built with React 19 + TypeScript + Tailwind v4 + GSAP
(ScrollTrigger), following the project's existing SectionContainer layout contract.

### Context

- This replaces Tech Stack because it duplicates Skills (both list technologies by category). V.A.S.T communicates _how I engineer_, not _what tools I use_ — no overlap with Skills section.
- V.A.S.T = Value-driven, Adaptable, System Thinking, Technical Depth. Four short labels + four one-line descriptions (content below).

### Content (final copy — do not paraphrase)

1. **V — Value-driven** — Build for outcomes, not just requirements.
2. **A — Adaptable** — Adapt to change, technology, and constraints.
3. **S — System Thinking** — Think beyond individual features.
4. **T — Technical Depth** — Understand the system beneath the framework.

### Scope

**In scope:**

- New data module: `src/data/vast.ts` exporting the 4 items above
  (`letter`, `title`, `description` fields).
- New component: `src/sections/vast/vast-section.tsx`, replacing tech-stack-section
  in `src/app/page.tsx` (same position in section order, position 2).
- Delete or archive `src/sections/tech-stack/` and `src/data/tech-stack.ts` only after
  new section is approved and confirmed working (do not delete in the same commit as
  the new section — separate cleanup commit).
- Scroll-triggered entrance animation using GSAP ScrollTrigger:
  - Each V/A/S/T block animates in as it enters viewport (not all at once on page load).
  - Text should have a subtle drifting/floating motion (e.g. slight vertical
    translateY + opacity fade-in, staggered per letter/block), not a hard cut-in.
  - Motion should feel consistent with the existing Hero blob / rising bubbles motion
    language already in the project (same easing curve family, similar duration range)
    — inspect `hero-section.tsx` and any shared GSAP config/util (e.g.
    `src/lib/gsap-config.ts` or similar) and reuse the same ease/duration tokens
    instead of inventing new ones.
- Use `SectionContainer` exactly as other sections do (`decoration`/`bubbles` slots
  optional — reuse if a fluid blob asset is already shared, do not create a new one
  unless required).
- Color usage: pull from existing Tailwind theme tokens / CSS variables already defined
  in the project (e.g. `globals.css` `:root` custom properties or `tailwind.config`
  theme colors) for both light and dark mode. Do NOT hardcode new hex colors. If no
  existing token fits, flag it in the PR description instead of inventing a new palette
  value.
- Responsive: section must render without horizontal overflow and without broken
  animation on mobile (< 640px) — on mobile, animation can be simplified (e.g. reduce
  stagger delay, disable drift, keep fade only) rather than removed entirely.
- Respect `prefers-reduced-motion`: if enabled, skip scroll-triggered motion and show
  content statically (opacity 1, no transform).

**Out of scope:**

- Do not modify Skills section content or layout.
- Do not modify section order beyond the Tech Stack → V.A.S.T swap.
- Do not add new dependencies (GSAP is already in use — no Framer Motion, no new
  animation libraries).
- Do not restyle unrelated sections "for consistency" — only match existing tokens,
  don't refactor them.
- No copy changes to the four V.A.S.T lines above.

### Acceptance Criteria

- [ ] `src/app/page.tsx` renders V.A.S.T section in the same position Tech Stack
      previously occupied.
- [ ] All four V.A.S.T items render with correct letter/title/description content.
- [ ] Scroll into view triggers the animation once per item (no re-trigger loop on
      scroll up/down repeatedly, unless explicitly designed to re-trigger — state
      your choice in the PR).
- [ ] Animation easing/duration is visually consistent with Hero section's existing
      motion (same GSAP ease preset reused, not reinvented).
- [ ] All colors used are existing project theme tokens (light + dark mode both
      verified).
- [ ] No horizontal overflow on mobile viewport (375px width minimum).
- [ ] No console errors on initial load or on scroll.
- [ ] `prefers-reduced-motion: reduce` disables the scroll animation gracefully.
- [ ] `docs/sections.md` updated: Tech Stack row replaced with V.A.S.T row (data
      module + component path), section order list updated.

### Approval Gate

Do not delete `src/sections/tech-stack/` or `src/data/tech-stack.ts` until I explicitly
approve the new V.A.S.T section after visual review. Implement first, present for
review, wait for go-ahead before cleanup commit.
