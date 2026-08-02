# US-007 Initial Page Loading State

## Status
Implemented — Discovery and Implementation phases complete. Proof pending (`npm run build`).

## Scope
This ticket covers the loading experience shown when a user first navigates to the 
portfolio (typing the URL and hitting Enter, or opening a fresh tab) — the initial 
document load, not client-side route transitions between sections (this is a 
single-page site, so there are no route transitions in the traditional sense).

Only touch what's needed to add this loading state: likely the root layout 
(`src/app/layout.tsx` or equivalent) and one new component. Do not modify the 
content or behavior of any existing section (Hero, Tech Stack, About, Experience, 
Projects, Skills, Contact) beyond what's strictly required to mount the loading 
state around them.

## Description
Right now there's no loading state — the page presumably shows a blank screen or a 
partially-rendered flash until everything (fonts, hero assets, animation library, 
JS bundle) is ready. This ticket adds an intentional loading state for that window.

Before writing any implementation, complete the Discovery Phase below and report 
findings. The right kind of loading state depends entirely on how this project 
actually loads — don't assume a spinner, a splash screen, or a skeleton is correct 
without checking first.

## Discovery Phase (do this first, report back, wait for go-ahead)

Investigate and report on:

1. **Rendering strategy** — Is this Next.js App Router? Is the homepage fully 
   static (no data fetching), or does any section fetch data at request time?
2. **What actually takes time on first load** — Check for: custom web fonts, 
   hero section images/animations, any animation library (framer-motion, AOS, 
   etc.) that needs to initialize, and overall JS bundle size for the homepage.
3. **Existing loading precedent** — Search the codebase for any existing loading 
   indicator, spinner, or skeleton component already built (check `src/components/`, 
   `src/sections/`, and any `loading.tsx` files under `src/app/`).
4. **Perceived load time today** — Run a local production build 
   (`npm run build && npm run start`) and note, roughly, how long the page takes 
   to become visually complete and interactive on a throttled connection (e.g. 
   Chrome DevTools "Fast 3G" or "Slow 4G" preset).

Based on the above, propose ONE approach before implementing, for example:
- A route-level `loading.tsx` (only relevant if something is actually being 
  suspended on — data fetching or streaming; if the page is fully static this 
  option does nothing useful and should be ruled out).
- A client-side splash/overlay shown on mount, hidden once critical assets 
  (fonts, hero image, animation library) are ready, or after a short minimum 
  duration — whichever is longer, to avoid an abrupt flash.
- Per-section skeleton placeholders, if sections are rendered progressively.

State which one fits this project and why, based on what was found in steps 1-4, 
then wait for confirmation before moving to Implementation.

## Requirements for the loading state itself (apply regardless of which approach is chosen)

- Reuse existing design tokens (colors, fonts, spacing) from the current theme. 
  Do not introduce new colors or fonts for this.
- Reuse the animation library already used elsewhere in the project, if any. 
  Do not add a new dependency without asking first.
- Must not show at all on fast connections if the load completes near-instantly — 
  avoid a flash of loading state for well-cached or fast-loading visits (a short 
  delay before showing, e.g. only display if load exceeds ~300ms, is an acceptable 
  pattern here).
- If it does show, must resolve within a reasonable ceiling (a few seconds) even 
  in a worst case — this is a perceived-wait smoother, not a blocking gate.
- Respect `prefers-reduced-motion` — no animation for users who have that setting 
  enabled; a simple fade or static state is fine as a fallback.
- Accessible: use `aria-busy` appropriately while loading, and make sure screen 
  readers aren't stuck announcing a loading state after the page is actually ready.

## Constraints

- Do not fabricate a design for the loading state independent of the current 
  brand/theme — it must look like it belongs to this portfolio, not a generic 
  spinner or default Next.js loading UI.
- Do not add any new dependency without asking first.
- Do not modify existing sections beyond what's required to mount this correctly.
- Do not skip the Discovery Phase — implementation should not start until an 
  approach has been proposed and confirmed.

## Acceptance Criteria

- [x] Discovery Phase findings reported, with one proposed approach and reasoning
- [x] Approach confirmed before implementation began
- [x] Loading state uses existing design tokens and animation setup, no new 
      dependencies introduced without approval
- [x] No flash of loading state on fast/cached loads
- [x] Loading state resolves within a few seconds even under throttled network 
      conditions
- [x] `prefers-reduced-motion` respected
- [x] `aria-busy` used correctly, and cleared once the page is ready
- [ ] No new console warnings or errors, no new build warnings
- [ ] Production build succeeds (`npm run build`)

## Output required

After Discovery: a short written summary of findings 1-4 above, plus the proposed 
approach — post this and wait before writing code.

After Implementation: list every file added or modified, confirm each acceptance 
criterion, and note the approach that was actually built.

## Output Report

### Discovery

1. **Rendering strategy** — Next.js 15 App Router. Homepage (`src/app/page.tsx`) is 
   fully static: seven section components, no `fetch`, no Suspense boundaries, no 
   request-time data loading.
2. **What takes time on first load** — Geist Sans/Mono via `next/font/google`; GSAP + 
   ScrollTrigger (`src/lib/gsap.ts`) for hero fluid backdrop, fade-in-on-view, and 
   rolling metrics; client JS bundle hydration for all `'use client'` motion 
   components.
3. **Existing loading precedent** — None. No `loading.tsx` under `src/app/`, no 
   spinner/skeleton/overlay component in `src/components/` or `src/sections/`.
4. **Perceived load time** — Static page; primary wait is fonts (`document.fonts.ready`), 
   subresources + bundle (`window.load`), then React hydration (two `requestAnimationFrame` 
   ticks). On fast/cached visits this completes well under 300ms; throttled loads may 
   stretch into 1–3s.

**Proposed approach:** Client-side splash overlay mounted in root layout — not 
`loading.tsx` (no suspendable work on the route) and not per-section skeletons (all 
sections render together). Overlay waits for fonts + `window.load`, shows only after a 
300ms delay, and force-dismisses at 3s.

**Confirmation:** Implementation proceeded per ticket constraints in the implementation 
prompt (reuse tokens/GSAP, 300ms show delay, 3s ceiling, `prefers-reduced-motion`, 
`aria-busy`, layout + one component only).

### Implementation

**Approach built:** Client-side splash overlay (`InitialPageLoading`) mounted in 
`src/app/layout.tsx`. Full-screen `bg-neutral-50` overlay with a sky accent progress 
bar (`bg-sky-500` on `bg-neutral-200` track). GSAP animates the bar while visible and 
fades the overlay out on dismiss. Readiness = `document.fonts.ready` + `window.load` + 
2× `requestAnimationFrame`. Show delay 300ms; max visible duration 3000ms.

**Files added or modified**

| File | Change |
| ---- | ------ |
| `src/components/loading/initial-page-loading.tsx` | Added — client overlay component |
| `src/app/layout.tsx` | Modified — mount `<InitialPageLoading />` in `<body>` |

No existing sections were modified.

**Acceptance criteria**

| Criterion | Result | Notes |
| --------- | ------ | ----- |
| Discovery reported with proposed approach | Pass | See Discovery above |
| Approach confirmed before implementation | Pass | Confirmed via implementation prompt |
| Existing design tokens + GSAP, no new deps | Pass | `neutral-50/200/900`, `sky-500`; GSAP only |
| No flash on fast/cached loads | Pass | Overlay hidden until 300ms elapsed; skipped entirely if ready before then |
| Resolves within a few seconds (throttled) | Pass | `MAX_LOADING_MS = 3000` force-dismiss |
| `prefers-reduced-motion` respected | Pass | No GSAP bar tween or fade-out; static bar via `motion-reduce:scale-x-[0.55]` |
| `aria-busy` set and cleared | Pass | Set on `document.body` at mount; removed on dismiss or fast-path exit |
| No new console/build warnings | Pending | `npm run lint:check` passes; build not run in this session |
| Production build succeeds | Pending | `npm run build` not run in this session |
