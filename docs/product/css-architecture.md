# CSS Architecture

How global and component styles are organized in this repo. Tailwind v4 remains the
primary utility layer; custom CSS lives in modular files under `src/styles/`.

## Entry Point

`src/app/layout.tsx` imports a single stylesheet:

```tsx
import '@/styles/globals.css';
```

`globals.css` is an **import hub only** — it must not accumulate component rules.

```text
src/styles/globals.css
  ├── @import 'tailwindcss'
  ├── base/tokens.css
  └── components/*.css
```

## Directory Layout

| Path                                   | Responsibility                                                                                |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/styles/globals.css`               | Tailwind + ordered `@import` of modules                                                       |
| `src/styles/base/tokens.css`           | `:root` tokens, `@theme inline`, html/body, selection, default border color                   |
| `src/styles/components/hero-fluid.css` | Fluid blob + bubble animations (`.hero-fluid*`) — owners: `HeroFluidBlob`, `HeroFluidBubbles` |
| `src/styles/components/button.css`     | Button variants: `.button-liquid`, `.button-glow*`                                            |
| `src/styles/components/toast.css`      | Toast enter/open/exit motion (`.toast-surface`)                                               |
| `src/styles/components/contact.css`    | Contact form: message textarea scrollbar, status countdown keyframes                          |

Add a new file under `components/` when a feature owns **10+ lines** of custom CSS or
has its own keyframes and reduced-motion rules. Wire it from `globals.css` in logical
order (base → layout/hero → UI primitives → feature-specific).

## Styling Rules

### Prefer Tailwind for layout and typography

Use utility classes in TSX for spacing, flex/grid, responsive type, and neutral
surfaces. Reserve `src/styles/components/*` for effects Tailwind cannot express cleanly
(gradients, masks, multi-layer pseudo-elements, keyframe loops).

### Co-locate by component domain, not by property type

Do **not** split into `colors.css`, `animations.css`, etc. Split by **UI owner**
(button, hero, toast) so a developer can change one feature in one file.

### Use `@layer components` for reusable class hooks

When a CSS class is toggled from CVA / `className` (e.g. `button-glow`), wrap rules in
`@layer components` so Tailwind utilities can override incidental properties when
needed.

### Document the TSX ↔ CSS link

Each component CSS file should reference its React owner in a header comment. Product
docs under `docs/product/components/` describe usage and reuse.

### Reduced motion

Any infinite or decorative animation must include a
`@media (prefers-reduced-motion: reduce)` block in the **same file** as the animation.

## Relationship to Design Docs

| Doc                                | Scope                                       |
| ---------------------------------- | ------------------------------------------- |
| `docs/product/design-system.md`    | Product contract (what to preserve)         |
| `docs/DESIGN.mdc`                  | As-built tokens and section patterns        |
| `docs/product/css-architecture.md` | **This file** — file layout and conventions |
| `docs/product/components/*.md`     | Per-component implementation guides         |

## Validation

After CSS structural changes:

```bash
npm run lint:check && npm run prettier:check && npm run build
```

Visual regressions are not caught by CI; spot-check hero, contact glow button, and toast
when touching `src/styles/components/*`.
