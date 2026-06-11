# US-002 Hero Reduced Motion

## Status

implemented

## Lane

normal

## Product Contract

Hero fluid backdrop (blob + bubbles) disables animation under `prefers-reduced-motion: reduce`.

## Relevant Product Docs

- `docs/product/design-system.md`
- `docs/DESIGN.mdc` section 6

## Acceptance Criteria

- Blob animation disabled when reduced motion is preferred.
- Bubble animation disabled and bubbles hidden when reduced motion is preferred.
- Hero remains readable without motion.

## Design Notes

- Component: `src/sections/hero/hero-fluid-backdrop.tsx`
- CSS media query: `prefers-reduced-motion: reduce`

## Validation

| Layer    | Expected proof  |
| -------- | --------------- |
| Platform | `npm run build` |

## Evidence

- CSS rules in hero backdrop and globals; manual a11y check recommended on deploy.
