# US-016 Hero Typewriter (GSAP/CSS)

## Status

implemented — awaiting visual review before merge

## Lane

normal

## Product Contract

Hero replaces the tagline + summary paragraphs with a **Typewriter** that cycles
a small set of friendly lines (brand + motto). Implementation uses React timers +
CSS cursor blink — **no `motion` / Framer Motion** (ADR 0009).

SEO/`h1`: keep a visible `h1` with `profile.fullName`. Typewriter is supporting
copy under the role badge, not a substitute for the document heading.

`prefers-reduced-motion: reduce`: show the typewriter lines as static text (no
type/delete loop, no blinking cursor).

Visual review on preview is required before merge.

## Relevant Product Docs

- `docs/product/sections.md`
- `docs/product/design-system.md`
- `docs/decisions/0009-gsap-first-fancy-motion-roadmap.md`

## Acceptance Criteria

- [ ] `Typewriter` client component under `src/components/motion/`.
- [ ] Hero no longer renders `profile.tagline` / `profile.summary` as static
      paragraphs; uses `profile.heroTypewriterLines` instead.
- [ ] Lines include the settled copy family: greeting with Quy/Fuwhis and
      “Code today, ship our futures.”
- [ ] `h1` remains `profile.fullName` (SEO + brand).
- [ ] Typing/deleting loops when motion is allowed; cursor blink via CSS.
- [ ] `prefers-reduced-motion: reduce` → static lines, no loop/cursor animation.
- [ ] No horizontal overflow on mobile; reserve vertical space to limit CLS.
- [ ] No new animation libraries.
- [ ] Product docs updated (sections + design-system Motion).
- [ ] `npm run lint:check && npm run prettier:check && npm run build` pass.

## Design Notes

- UI surfaces: Hero left column under role badge.
- Domain rules: content in `src/data/profile.ts`; no hard-coded lines in JSX.
- Commands / queries / API / tables: none.

## Validation

| Layer       | Expected proof                                                  |
| ----------- | --------------------------------------------------------------- |
| Unit        | n/a                                                             |
| Integration | n/a                                                             |
| E2E         | n/a                                                             |
| Platform    | `npm run lint:check && npm run prettier:check && npm run build` |
| Release     | Visual review before merge                                      |

## Harness Delta

None beyond story matrix row.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass
- Hero uses `Typewriter` + `heroTypewriterLines`; `h1` remains `fullName`
- Reduced-motion / pending: static lines; animate mode: type/delete + CSS caret
- PR: https://github.com/fuwhis/my-landing-page/pull/65
