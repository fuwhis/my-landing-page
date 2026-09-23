# US-015 V.A.S.T Letter 3D Swap (GSAP)

## Status

implemented — awaiting visual review before merge

## Lane

normal

## Product Contract

Each V.A.S.T decorative letter (V / A / S / T) uses a CSS 3D box swap
orchestrated with **GSAP only** (no `motion`). Interaction follows decision
0009:

- Fine pointer + hover: play swap on hover.
- Touch / coarse pointer: auto-swap when in view (enter + gentle interval while
  visible) — no hover required.
- `prefers-reduced-motion: reduce`: static letter, no swap.

Visual review on preview is required before merge.

## Relevant Product Docs

- `docs/product/design-system.md`
- `docs/product/sections.md`
- `docs/product/css-architecture.md`
- `docs/decisions/0009-gsap-first-fancy-motion-roadmap.md`

## Acceptance Criteria

- [ ] Shared `Letter3DSwap` under `src/components/motion/`.
- [ ] V.A.S.T section uses it for the four decorative letters only (titles /
      descriptions unchanged).
- [ ] Pointer mode via `(hover: hover) and (pointer: fine)` — not width-only.
- [ ] Reduced-motion disables all swap tweens.
- [ ] Accessible: visible letter remains available to AT (`sr-only` / aria as
      needed); decorative 3D faces `aria-hidden`.
- [ ] Sky letter color tokens preserved (light + dark).
- [ ] No new animation libraries.
- [ ] Product docs mention the primitive.
- [ ] `npm run lint:check && npm run prettier:check && npm run build` pass.

## Design Notes

- UI surfaces: `#vast` letter column only.
- Domain rules: single-grapheme (or short) labels; default rotate direction
  `top` (rotateX).
- Commands / queries / API / tables: none.

## Validation

| Layer       | Expected proof                                                  |
| ----------- | --------------------------------------------------------------- |
| Unit        | n/a                                                             |
| Integration | n/a                                                             |
| E2E         | n/a                                                             |
| Platform    | `npm run lint:check && npm run prettier:check && npm run build` |
| Release     | Visual review: desktop hover + mobile/tablet auto-swap          |

## Harness Delta

None beyond story matrix row.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass
- `Letter3DSwap` on four V.A.S.T letters; `decorative` + title `sr-only`
- Fancy-aligned CharBox transforms (`top|right|bottom|left`); GSAP tween on
  `.letter-3d-swap-char-box-item` (no `motion`); V.A.S.T uses `rotateDirection="right"`
- Pointer: `(hover: hover) and (pointer: fine)` → hover; else in-view auto + 4.8s interval
- `prefers-reduced-motion: reduce` → static (no GSAP swap)
