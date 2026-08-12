# US-011 Split Fluid Blob and Bubbles for Reuse

## Status

implemented

## Lane

tiny

## Product Contract

Hero fluid ambiance is two independently importable layers. Hero keeps a right-side blob plus rising bubbles. Experience timeline reuses the same blob mirrored on the left. Reduced-motion behavior from US-002 is unchanged.

## Relevant Product Docs

- `docs/product/design-system.md`
- `docs/product/sections.md`
- `docs/DESIGN.mdc` section 6

## Acceptance Criteria

- `HeroFluidBlob` and `HeroFluidBubbles` can be imported separately from `src/components/motion/hero-fluid-backdrop.tsx`.
- `HeroFluidBlob` accepts `position: "left" | "right"` (default `"right"`) and inset props `top` / `right` / `bottom` / `left`.
- `SectionContainer` exposes `decoration` for the blob and `bubbles` for the bubble layer.
- Hero uses right blob + bubbles; Experience uses left blob only.
- No new dependencies. CSS-only motion. Reduced-motion still disables blob morph and hides bubbles.

## Design Notes

- UI surfaces: Hero, Experience timeline
- Blob left is a horizontal mirror (`scaleX(-1)`); placement is via inset props (Experience: `top={5}` `left="1%"`)
- Timeline section uses `overflow-hidden` so the blob does not spill into neighbors

## Validation

| Layer    | Expected proof                                                  |
| -------- | --------------------------------------------------------------- |
| Platform | `npm run lint:check && npm run prettier:check && npm run build` |

## Harness Delta

None.

## Evidence

- Platform checks run after implementation.
