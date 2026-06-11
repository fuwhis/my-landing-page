# Deployment

## Platform

- **Host:** Vercel (Next.js detected automatically).
- **Production branch:** `main`.
- **Preview branch:** `feature/preview` (and PR previews).

## Environment Variables

| Variable               | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, robots, sitemap |

Keep secrets out of source; configure in Vercel and GitHub only.

## CI Quality Gate

GitHub Actions (`.github/workflows/ci.yml`) on push/PR to `main` and `feature/preview`:

1. `npm ci`
2. `npm run lint:check`
3. `npm run prettier:check`
4. `npm run build`

This is the default `verify_command` for implemented harness stories.

## Post-Deploy Verification

See root `DEPLOYMENT_CHECKLIST.md`. Remaining open items:

- Lighthouse on production URL.
- HTTPS certificate check.
- Homepage console-error check on desktop and mobile.
- OpenGraph share preview.
- Rollback procedure confirmation.

## Rollback

Redeploy previous successful Vercel build if a production regression ships.
