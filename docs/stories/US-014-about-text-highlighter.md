# US-014 About Text Highlighter (GSAP)

## Status

implemented — awaiting visual review before merge

## Lane

normal

## Product Contract

About body copy can mark 1–2 outcome phrases with a scroll-triggered highlight
reveal (gradient `background-size` animation) implemented with **GSAP + CSS
only** — no `motion` / Framer Motion. Under `prefers-reduced-motion: reduce`,
phrases render fully highlighted with no tween. Visual review on preview is
required before merge.

## Relevant Product Docs

- `docs/product/sections.md`
- `docs/product/design-system.md`
- `docs/product/css-architecture.md`
- `docs/decisions/0009-gsap-first-fancy-motion-roadmap.md`

## Acceptance Criteria

- [ ] Shared `TextHighlighter` client component under `src/components/motion/`.
- [ ] About section wraps exactly the highlight segments defined in
      `src/data/profile.ts` (content boundary: no hard-coded phrase strings in
      the section JSX beyond data).
- [ ] Highlight uses existing sky accent tokens (light + dark), not a new hex
      palette.
- [ ] Animation: LTR `background-size` reveal on enter viewport; `ScrollTrigger`
      `once: true`; ease/duration aligned with existing entrance language
      (`power2.out`, ~0.7–1.0s).
- [ ] `prefers-reduced-motion: reduce` → no scroll tween; highlight already at
      full size.
- [ ] No new animation dependencies (`motion`, Fancy registry, etc.).
- [ ] `docs/product/design-system.md` Motion section documents this primitive.
- [ ] `npm run lint:check && npm run prettier:check && npm run build` pass.

## Design Notes

- UI surfaces: About right column paragraphs only (not Hero, not V.A.S.T).
- Domain rules: max two highlighted phrases across About for this story.
- Commands: none.
- Queries: none.
- API: none.
- Tables: none.

## Validation

| Layer       | Expected proof                                                  |
| ----------- | --------------------------------------------------------------- |
| Unit        | n/a                                                             |
| Integration | n/a                                                             |
| E2E         | n/a                                                             |
| Platform    | `npm run lint:check && npm run prettier:check && npm run build` |
| Release     | Visual review on preview before merge                           |

## Harness Delta

- Story id is **US-014** because **US-013** already maps to Contact Close kit.
- Follow-up backlog (not this story): US-015 Letter 3D Swap (VAST), US-016
  Typewriter Hero, US-017 Gravity lab (`?lab=1` / flag — G2).

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass
- Highlight phrases in data: `4+ years`;
  `interfaces that feel clear and hold up in production`
- ScrollTrigger `once: true`; reduced-motion → `background-size: 100% 100%`
