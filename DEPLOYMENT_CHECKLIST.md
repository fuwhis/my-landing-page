# Deployment Checklist

## 1) Repository and Branches
- [ ] Protect `main` branch (require pull request + required CI checks).
- [x] Use short-lived branches named `feature/<topic>`.
- [ ] Enable GitHub Actions in the repository.

## 2) Hosting (Recommended: Vercel)
- [ ] Import this repository into Vercel.
- [ ] Confirm framework detected as Next.js.
- [ ] Set production branch to `main`.
- [ ] Enable Preview Deployments for pull requests.

## 3) Environment Variables
- [ ] Add `NEXT_PUBLIC_SITE_URL` in Vercel:
  - Preview: preview domain (optional).
  - Production: your final canonical domain (for example `https://example.com`).
- [ ] Keep secrets out of source code and only in GitHub/Vercel secret stores.

## 4) Domain and DNS
- [ ] Decide canonical domain (`example.com` or `www.example.com`).
- [ ] Add both root and `www` in Vercel project domains.
- [ ] Configure DNS records at your domain provider as instructed by Vercel.
- [ ] Configure redirect from non-canonical domain to canonical domain.

## 5) CI Rules
- [ ] Ensure `.github/workflows/ci.yml` passes on PRs.
- [ ] Mark CI check as required before merge.
- [ ] Do not merge when lint/build fails.

## 6) Production Readiness
- [ ] Update metadata URLs via `NEXT_PUBLIC_SITE_URL`.
- [ ] Validate `robots.txt` and `sitemap.xml` in production.
- [ ] Check Lighthouse (performance/accessibility/SEO) on production URL.
- [ ] Verify HTTPS lock icon and certificate validity.

## 7) Post-Deploy Verification
- [ ] Homepage loads without console errors.
- [ ] Navigation/scroll/animations work on desktop and mobile.
- [ ] OpenGraph preview works for shared links.
- [ ] Rollback procedure confirmed (redeploy previous successful build).
