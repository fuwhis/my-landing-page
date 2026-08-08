# US-009 Speed Dial FAB for Theme Toggle

## Status

implemented

## Lane

normal

## Product Contract

A floating settings control fixed to the viewport (default bottom-right) lets
visitors open a vertical speed-dial menu and toggle light/dark mode using the
theme system delivered in US-008.

## Relevant Product Docs

- `docs/product/design-system.md`
- `docs/product/css-architecture.md`
- `docs/DESIGN.mdc`
- `docs/ARCHITECTURE.md`
- `docs/stories/US-008-dark-mode-foundation.md`

## Acceptance Criteria

- [x] `SpeedDialFab` at `src/components/ui/speed-dial-fab.tsx`, mounted from
      `src/app/layout.tsx`.
- [x] Upward speed dial with theme toggle sub-action above main FAB.
- [x] Open/close via main FAB click, click outside, and Escape.
- [x] CSS transitions for motion (`src/styles/components/speed-dial-fab.css`).
- [x] `prefers-reduced-motion` minimizes animation; visibility still toggles.
- [x] Theme sub-action uses `useTheme` from US-008 only.
- [x] Safe-area insets on mobile positioning.
- [x] Accessibility: `aria-expanded`, `aria-haspopup`, English labels, tab order
      when open/closed.
- [x] No hydration warnings from client theme + FAB state.
- [x] Component CSS in `speed-dial-fab.css`, imported from `globals.css`.

## Design Notes

- Main FAB: `Plus` icon rotates 45° when open.
- Theme sub-action: Sun/Moon crossfade via CSS.
- Click-outside handler colocated in component (no shared hook yet).

## Validation

| Layer       | Expected proof                                           |
| ----------- | -------------------------------------------------------- |
| Unit        | Not required                                             |
| Integration | Not required                                             |
| E2E         | Not required                                             |
| Platform    | `npm run build`; keyboard + mobile viewport manual check |
| Release     | Spot-check production FAB + theme toggle                 |

## Harness Delta

- Story registered; intake #7 recorded.
- `docs/product/design-system.md` updated with Speed Dial FAB primitive.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass.
- Manual: open FAB → toggle theme → reload persists choice; Escape/outside close.
