# US-008 Dark Mode Foundation

## Status

implemented

## Lane

normal

## Product Contract

Visitors can switch between light and dark appearance on fuwhis.io.vn. The choice
persists across reloads, respects the system preference on first visit, and applies
consistently across homepage sections without hydration errors.

## Relevant Product Docs

- `docs/product/design-system.md`
- `docs/product/css-architecture.md`
- `docs/DESIGN.mdc`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0008-next-themes-dark-mode.md`

## Acceptance Criteria

- [x] Light and dark color tokens exist in `src/styles/base/tokens.css` and map
      through Tailwind `@theme inline`.
- [x] Root layout applies the active theme class/attribute without flash of wrong
      theme on first paint.
- [x] Default on first visit follows `prefers-color-scheme` when the user has not
      chosen a theme yet.
- [x] User-selected theme persists across page reloads.
- [x] Homepage sections (hero through contact) remain readable in both themes.
- [x] `prefers-reduced-motion` behavior for existing GSAP/CSS motion is unchanged.
- [x] No new console warnings or hydration errors related to theme switching.
- [x] Product docs updated to record dark mode as in-scope (`design-system.md`).

## Design Notes

- **Dependency:** `next-themes` via `src/components/theme/theme-provider.tsx`.
- **API for US-009:** `useTheme` re-exported from `src/lib/theme.ts`.
- **Out of scope:** Floating UI control (US-009), hero GSAP rewrites, reCAPTCHA
  theme wiring.

## Validation

| Layer       | Expected proof                                  |
| ----------- | ----------------------------------------------- |
| Unit        | Not required                                    |
| Integration | Not required                                    |
| E2E         | Not required                                    |
| Platform    | `npm run build`; manual light/dark check on `/` |
| Release     | Spot-check production after deploy              |

## Harness Delta

- Story registered and intake #6 recorded.
- Decision `0008-next-themes-dark-mode.md` added.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass.
- Theme toggle UI deferred to US-009; verify via DevTools:
  `document.documentElement.classList.toggle('dark')` or `localStorage` key
  `fuwhis-theme`.
