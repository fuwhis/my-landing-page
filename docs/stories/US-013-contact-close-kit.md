# US-013 Contact Close Kit

## Status

implemented

## Lane

normal

## Product Contract

The Contact card fills its desktop right column (~400px) with a Close kit aside:
direct channels, a 24-hour reply contract, and Ask-me-about hooks sourced from
shipped project outcomes. Copy lives in `src/data/contact-panel.ts`. On small
screens the kit stacks above the form. The kit does not include a faster-reply
checklist or a timezone row.

## Relevant Product Docs

- `docs/product/sections.md`
- `docs/product/design-system.md`

## Acceptance Criteria

- `#contact-form` is a two-column grid on large screens: form column
  `minmax(0,36rem)`, Close kit `minmax(16rem,1fr)`.
- Mobile (single column) order is form intro, Close kit, then the form.
- Close kit content is read from `src/data/contact-panel.ts` plus
  `profile.email` and the LinkedIn item in `profile.socialLinks`.
- Email copy writes the address to the clipboard and confirms via toast.
- Close kit does not render a faster-reply checklist, recruiter-template hint, or timezone.
- Ask-me-about hooks insert `messagePrompt` into the contact message field
  (append when the field already has text) and focus the textarea.
- No second Hero-style social button row. No new motion, providers, or API
  routes.
- `prefers-reduced-motion` is unchanged (no new animation).
- `npm run lint:check && npm run prettier:check && npm run build` pass.

## Design Notes

- UI surfaces: Contact card (`src/sections/contact/contact-card.tsx`)
- Data: `src/data/contact-panel.ts`
- Form seeding: `mergeContactMessage` in `src/lib/contact-form.ts`
- Message textarea shows a ghost `Clear message` control (top-right) only when it has characters; hidden when empty, disabled while sending or loading the recruiter template
- `Message is required.` appears only after Send with an empty message; typing or clearing dismisses it
- `Minimum 20 characters.` is a hint shown when `message.length < 20` (raw length, including special characters) and hidden at 20+
- Message textarea scrollbar: invisible track, no buttons, 6px rounded thumb
- Desktop column rule uses a left border on the aside, not a nested card

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-013 --unit 0 --integration 0 --e2e 0 --platform 1`.

| Layer       | Expected proof                                                  |
| ----------- | --------------------------------------------------------------- |
| Unit        | no                                                              |
| Integration | no                                                              |
| E2E         | no                                                              |
| Platform    | `npm run lint:check && npm run prettier:check && npm run build` |
| Release     | CI workflow                                                     |

## Harness Delta

None.

## Evidence

- `npm run lint:check && npm run prettier:check && npm run build` (2026-08-24); timezone removed; message clear control; message validation and scrollbar polish
