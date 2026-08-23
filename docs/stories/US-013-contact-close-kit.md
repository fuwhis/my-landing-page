# US-013 Contact Close Kit

## Status

implemented

## Lane

normal

## Product Contract

The Contact card fills its desktop right column (~400px) with a Close kit aside:
direct line (email copy), a 24-hour reply contract, and profile CTAs from
`profile.socialLinks` (GitHub, LinkedIn, View my CV, Credly Badge). Copy lives in
`src/data/contact-panel.ts`. On small screens the kit stacks above the form.
Hero does not render the same CTA row. Ask-me-about hooks and Contact me are
kept commented, not deleted.

## Relevant Product Docs

- `docs/product/sections.md`
- `docs/product/design-system.md`

## Acceptance Criteria

- `#contact-form` is a two-column grid on large screens: form column
  `minmax(0,36rem)`, Close kit `minmax(16rem,1fr)`.
- Mobile (single column) order is form intro, Close kit, then the form.
- Close kit content is read from `src/data/contact-panel.ts` plus
  `profile.email` and `profile.socialLinks`.
- Email copy writes the address to the clipboard and confirms via toast.
- Close kit renders visible `profile.socialLinks` as compact outline CTAs with
  icons. Each link has a `visible` prop. Credly Badge is present with
  `visible: false`. Contact me remains commented in `src/data/profile.ts`.
- Hero does not render the social CTA row (code commented in `hero-section.tsx`).
- Close kit does not render Ask-me-about hooks, a faster-reply checklist,
  recruiter-template hint, or timezone.
- No new motion, providers, or API routes.
- `prefers-reduced-motion` is unchanged (no new animation).
- `npm run lint:check && npm run prettier:check && npm run build` pass.

## Design Notes

- UI surfaces: Contact card (`src/sections/contact/contact-card.tsx`)
- Data: `src/data/contact-panel.ts`, `src/data/profile.ts` `socialLinks`
- Profile CTAs: `size="sm"` (`h-7`) outline pills with icons (`SocialLinkGlyph`),
  `hover:bg-muted` plus light `hover:shadow-sm`. `visible: false` hides a link
  without deleting it. GitHub/Credly use simple-icons; LinkedIn uses an inline
  glyph (Lucide dropped brand icons).
- Ask-me-about seeding remains on `ContactForm` (`seedMessage`) but is unwired
  from `ContactCard`
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

- `npm run lint:check && npm run prettier:check && npm run build` (2026-08-24); compact profile CTAs with icons, hover fill/shadow, Credly hidden via `visible: false`
