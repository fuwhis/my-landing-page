# Test Matrix

Behavior-to-proof map for `my-landing-page`. Durable status: `scripts/bin/harness-cli query matrix`.

## Status Values

| Status      | Meaning                                       |
| ----------- | --------------------------------------------- |
| planned     | Accepted, not implemented                     |
| in_progress | Actively being built                          |
| implemented | Implemented and proof exists                  |
| changed     | Contract changed after earlier implementation |
| retired     | No longer part of the product contract        |

## Matrix

| Story  | Contract                     | Unit | Integration | E2E | Platform | Status      | Evidence                   |
| ------ | ---------------------------- | ---- | ----------- | --- | -------- | ----------- | -------------------------- |
| US-001 | Homepage section order       | no   | no          | no  | yes      | implemented | CI build                   |
| US-002 | Hero reduced-motion fallback | no   | no          | no  | yes      | implemented | CI build                   |
| US-003 | SEO metadata and sitemap     | no   | no          | no  | yes      | implemented | CI build                   |
| US-004 | Lint, prettier, build gate   | no   | no          | no  | yes      | implemented | `.github/workflows/ci.yml` |
| US-005 | Post-deploy verification     | no   | no          | no  | no       | planned     | DEPLOYMENT_CHECKLIST.md    |

## Default Verify Command

```bash
npm run lint:check && npm run prettier:check && npm run build
```

## Evidence Rules

- Platform proof: CI commands and production build compile.
- E2E deferred until Playwright or equivalent is added.
- Unit/integration not required for static marketing site v1.
