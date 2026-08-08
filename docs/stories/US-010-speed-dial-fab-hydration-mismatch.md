# US-010 Speed Dial FAB Hydration Mismatch

## Status

implemented

## Lane

tiny

## Product Contract

`SpeedDialFab` must not emit React hydration warnings on first load, regardless of
the theme stored in `localStorage` (`fuwhis-theme`), system preference, or
`defaultTheme="system"`. After client mount, theme radio buttons must reflect the
resolved theme correctly.

## Relevant Product Docs

- `docs/stories/US-008-dark-mode-foundation.md`
- `docs/stories/US-009-speed-dial-fab-theme-toggle.md`
- `docs/decisions/0008-next-themes-dark-mode.md`

## Acceptance Criteria

- [x] Reload with `localStorage["fuwhis-theme"] = "dark"` — no hydration warning.
- [x] Reload with `localStorage["fuwhis-theme"] = "light"` — no hydration warning.
- [x] First visit with system preference only (no stored key) — no hydration warning.
- [x] After mount, `aria-checked` and selected styles match the resolved theme.
- [x] `suppressHydrationWarning` on `<html>` unchanged.
- [x] No other `useTheme()` consumers in `src/` required the same fix (grep confirmed).

## Design Notes

- **Root cause:** `aria-checked` and `speed-dial-fab__theme-option--selected` were
  derived from `resolvedTheme` during SSR/first paint, while `next-themes` resolves
  the real theme only on the client.
- **Fix:** Mounted guard — omit theme-dependent `aria-checked` and selected
  classes until `useEffect` sets `mounted=true` (standard `next-themes` pattern).
- **Scope:** `src/components/ui/speed-dial-fab.tsx` only.
- **Commands:** `npm run lint:check && npm run prettier:check && npm run build`

## Validation

| Layer    | Expected proof                                  |
| -------- | ----------------------------------------------- |
| Platform | `npm run build`; manual console check on reload |

## Harness Delta

- Intake recorded as `change_request`, lane `tiny`.
- Story `US-010` added to backlog.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass.
- Manual: reload with saved dark/light theme — no hydration mismatch in console.
