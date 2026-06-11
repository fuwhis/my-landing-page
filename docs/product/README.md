# Product Docs

Living product contract for `my-landing-page`, derived from brownfield spec intake
(`docs/spec-intake/2026-06-08-my-landing-page.md`).

| File                  | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `overview.md`         | Goal, audience, scope, non-goals                         |
| `sections.md`         | Homepage section order and data sources                  |
| `design-system.md`    | Visual and motion contract (detail in `docs/DESIGN.mdc`) |
| `seo-and-metadata.md` | Canonical URL, OG, robots, sitemap                       |
| `deployment.md`       | Vercel, CI, post-deploy checks                           |

## Update Rule

When behavior changes:

1. Update the affected product doc.
2. Update or create the story packet.
3. Update durable proof status with `scripts/bin/harness-cli story add` or
   `scripts/bin/harness-cli story update`.
4. Record a decision if the change affects architecture, scope, risk, or a
   previously settled product rule.
