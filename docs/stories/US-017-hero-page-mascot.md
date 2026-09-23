# US-017 Hero page-mascot beside fullName

## Status

implemented — awaiting visual review

## Lane

normal

## Product Contract

Hero places an interactive `page-mascot` character beside the visible `h1`
(`profile.fullName`). Uses the packaged dependency `page-mascot` and existing
otter sprite sheets served from `public/mascots/`.

Cursor tracking and click reactions come from the library. Tracking is off
without a fine pointer; click squash honours `prefers-reduced-motion`.

## Relevant Product Docs

- `docs/product/sections.md`
- `docs/product/design-system.md`

## Acceptance Criteria

- [ ] `page-mascot` is a project dependency in `package.json` (no global skill install required for this story).
- [ ] Otter `directions` + `reactions` sheets live under `public/mascots/`.
- [ ] Client wrapper `src/components/motion/page-mascot.tsx` renders `Mascot` for App Router.
- [ ] Hero shows mascot beside `profile.fullName`; `h1` copy unchanged.
- [ ] No horizontal overflow on mobile.
- [ ] Product docs updated (sections + design-system Motion).
- [ ] `npm run lint:check && npm run prettier:check && npm run build` pass.

## Design Notes

- UI surfaces: Hero brand row (mascot + full name).
- Domain rules: swap character by replacing the two webp files / paths; keep paths in the hero (or a tiny data constant if more than one call site appears).
- Commands / queries / API / tables: none.

## Validation

| Layer       | Expected proof                                                  |
| ----------- | --------------------------------------------------------------- |
| Unit        | n/a                                                             |
| Integration | n/a                                                             |
| E2E         | n/a                                                             |
| Platform    | `npm run lint:check && npm run prettier:check && npm run build` |
| Release     | Visual review before merge                                      |

## Harness Delta

Story matrix row US-017.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` — pass
- Dependency: `page-mascot@0.1.0` in `package.json`
- Assets: `public/mascots/otter-directions.webp`, `public/mascots/otter-reactions.webp`
- Hero brand row: `PageMascot` beside `h1` (`profile.fullName`)
