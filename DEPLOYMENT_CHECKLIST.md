# Deployment Checklist

## 1) Repository and Branches
- [x] Protect `main` branch (require pull request + required CI checks).
- [x] Use short-lived branches named `feature/<topic>`.
- [x] Enable GitHub Actions in the repository.

## 2) Hosting (Recommended: Vercel)
- [x] Import this repository into Vercel.
- [x] Confirm framework detected as Next.js.
- [x] Set production branch to `main`.
- [x] Enable Preview Deployments for pull requests.

## 3) Environment Variables
- [x] Add `NEXT_PUBLIC_SITE_URL` in Vercel:
  - Preview: preview domain (optional).
  - Production: your final canonical domain (for example `https://example.com`).
- [x] Keep secrets out of source code and only in GitHub/Vercel secret stores.

## 4) Domain and DNS
- [x] Decide canonical domain (`example.com` or `www.example.com`).
- [x] Add both root and `www` in Vercel project domains.
- [x] Configure DNS records at your domain provider as instructed by Vercel.
- [x] Configure redirect from non-canonical domain to canonical domain.

## 5) CI Rules
- [ ] Ensure `.github/workflows/ci.yml` passes on PRs.
- [ ] Mark CI check as required before merge.
- [ ] Do not merge when lint/build fails.

## 6) Production Readiness
- [x] Update metadata URLs via `NEXT_PUBLIC_SITE_URL`.
- [x] Validate `robots.txt` and `sitemap.xml` in production.
- [ ] Check Lighthouse (performance/accessibility/SEO) on production URL.
- [ ] Verify HTTPS lock icon and certificate validity.

## 7) Post-Deploy Verification
- [ ] Homepage loads without console errors.
- [ ] Navigation/scroll/animations work on desktop and mobile.
- [ ] OpenGraph preview works for shared links.
- [ ] Rollback procedure confirmed (redeploy previous successful build).
