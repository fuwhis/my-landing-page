# Button Component

Implementation guide for `src/components/ui/button.tsx` and related styles.

## Files

| File                                   | Role                                                          |
| -------------------------------------- | ------------------------------------------------------------- |
| `src/components/ui/button.tsx`         | Client component; `glow` DOM structure + GSAP pointer handler |
| `src/components/ui/button-variants.ts` | CVA variants (`default`, `outline`, `ghost`, `liquid`, sizes) |
| `src/styles/components/button.css`     | `.button-liquid`, `.button-glow*` styles and keyframes        |

## Variants (CVA)

| Prop                             | Class / behavior                              |
| -------------------------------- | --------------------------------------------- |
| `variant="default"`              | Neutral filled pill                           |
| `variant="outline"`              | Neutral border pill                           |
| `variant="ghost"`                | Text-only pill                                |
| `variant="liquid"`               | Sky gradient surface (static; no GSAP)        |
| `size="default" \| "lg" \| "sm"` | Height / padding; `sm` is `h-7` compact pills |
| `glow`                           | GSAP edge-shine button (see below)            |

Shape is always **`rounded-full`** (project button contract).

## Glow Button (`glow`)

Opt-in emphasis control. Pattern adapted from `example/glow-button-gsap/` with sky
brand colors and pill shape.

### Usage

```tsx
<Button glow className="h-9 gap-1.5 px-4 text-xs">
  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
  Use recruiter template
</Button>
```

Current production usage: **contact form** recruiter template action
(`src/sections/contact/contact-form.tsx`).

### DOM structure (when `glow`)

```html
<button class="button-glow rounded-full …">
  <span class="button-glow__gradient" aria-hidden="true"></span>
  <span class="button-glow__surface …">{children}</span>
</button>
```

- **`__gradient`** — rotating linear-gradient disc; edge shine visible around the pill.
- **`__surface`** — opaque/gradient fill masking the center; `margin: ~1px` exposes the
  shine ring.

### Motion

| Layer             | Trigger                        | Implementation                                                                                         |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Edge shine        | Always (unless reduced motion) | CSS `button-glow-rotate` 2s linear infinite on `__gradient::before`                                    |
| Pointer spotlight | `:hover` + `pointermove`       | GSAP sets `--pointer-x`, `--pointer-y`, `--button-glow` on the button; CSS blur on `__surface::before` |

Pointer color mix: `mixSkyColor()` in `button.tsx` interpolates **sky-600 → sky-400**
(no chroma-js dependency).

### CSS custom properties (override for theming)

Defined on `.button-glow` in `button.css`:

| Variable                                       | Default role                           |
| ---------------------------------------------- | -------------------------------------- |
| `--button-background`                          | Surface fill gradient                  |
| `--button-color`                               | Label color (`sky-900` tone)           |
| `--button-shadow`                              | Outer drop shadow                      |
| `--button-shine-left` / `--button-shine-right` | Edge disc gradient                     |
| `--button-glow-start` / `--button-glow-end`    | Pointer mix endpoints                  |
| `--button-glow-opacity`                        | Spotlight visibility (0 idle, 1 hover) |

### Accessibility

- Decorative layers: `pointer-events: none`, `aria-hidden` on gradient span.
- `prefers-reduced-motion: reduce`: edge rotation stops at a fixed angle; pointer
  spotlight disabled on hover.
- Focus: standard `focus-visible:ring-2 focus-visible:ring-sky-400` on the button.

### When to use `glow` vs `liquid`

| Use                   | Reason                                                             |
| --------------------- | ------------------------------------------------------------------ |
| `glow`                | Primary micro-CTA that should draw attention (one per section max) |
| `liquid`              | Static premium surface without continuous edge animation           |
| `default` / `outline` | Standard actions (submit, navigation)                              |

Do not combine `glow` with `variant="liquid"` — `glow` renders its own surface stack.

## Adding a New Button Emphasis

1. Prefer an existing variant before inventing a new one.
2. If new CSS is required, extend `src/styles/components/button.css` (or split a new
   file only if the block is large and unrelated).
3. Update this doc and `docs/product/design-system.md`.
4. Run proof commands from `docs/product/css-architecture.md`.

## Reference

- Example prototype: `example/glow-button-gsap/`
- Design contract: `docs/product/design-system.md`
- CSS layout: `docs/product/css-architecture.md`
