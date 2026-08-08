# 0008 next-themes for Dark Mode

Date: 2026-08-08

## Status

Accepted

## Context

US-008 requires light/dark appearance with system-default on first visit, persisted
user choice, and no flash of wrong theme on first paint. The site had no theme
provider and only light CSS tokens in `src/styles/base/tokens.css`.

## Decision

Adopt `next-themes` as the theme provider for the portfolio:

- `attribute="class"` on `<html>` with `.dark` token overrides in CSS.
- `defaultTheme="system"` and `enableSystem` for `prefers-color-scheme`.
- `storageKey="fuwhis-theme"` for persistence across reloads.
- Semantic color tokens (`background`, `foreground`, `surface`, `border`, `muted`)
  drive Tailwind utilities; homepage surfaces use those tokens instead of hard-coded
  neutral light utilities.

Visitor-facing toggle UI is deferred to US-009; this story delivers the provider
and token layer only.

## Alternatives Considered

1. **Custom `localStorage` + `matchMedia` hook** — fewer dependencies but reinvents
   flash prevention, SSR hydration guards, and system sync that `next-themes` already
   handles.
2. **CSS-only `prefers-color-scheme`** — no persisted manual override without JS;
   does not satisfy US-008 persistence requirement.

## Consequences

Positive:

- Standard App Router pattern with `suppressHydrationWarning` on `<html>`.
- US-009 can call `useTheme()` without a bespoke API.
- Dark palette stays centralized in `tokens.css`.

Tradeoffs:

- New runtime dependency (~small bundle).
- Homepage components needed a one-time refactor from `bg-white` / `text-neutral-*`
  to semantic utilities.

## Follow-Up

- US-009: Speed Dial FAB calls `setTheme` via `useTheme`.
- Spot-check hero blob contrast in dark mode after deploy.
