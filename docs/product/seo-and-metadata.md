# SEO and Metadata

## Canonical URL

- Env: `NEXT_PUBLIC_SITE_URL` (optional locally; **build-time** on Vercel — change requires redeploy).
- Resolver: `src/lib/site.ts` — forces `https`, strips trailing slashes, maps apex `fuwhis.io.vn` → `www.fuwhis.io.vn`.
- Default: `https://www.fuwhis.io.vn`.

## Metadata Contract

Defined in `src/app/layout.tsx`:

- `metadataBase` uses resolved `siteUrl`.
- Title template: `%s | Nguyen Phu Quy`.
- Default title and description reflect frontend engineering portfolio positioning.
- Open Graph / Twitter: defined only via the Metadata API (no manual `<meta>` tags in `<head>`).
- Open Graph: title, description, url, siteName, locale, images.
- Social image: absolute URL `${siteUrl}/open-graph/og-preview-thumbnail.png` (file lives at `public/open-graph/og-preview-thumbnail.png`; never prefix with `/public`). Width/height must match the file so crawlers do not reject the image.
- Icons and web manifest linked from `public/`.
- `fb:app_id` is optional (Facebook Insights only). Not required for link preview title/description/image.

## Discoverability Routes

- `src/app/robots.ts` — allow crawl; sitemap reference uses `siteUrl`.
- `src/app/sitemap.ts` — homepage entry with `siteUrl`.

## Environment Rules

- CI sets `NEXT_PUBLIC_SITE_URL=https://www.fuwhis.io.vn` for consistent build metadata.
- Production Vercel env must be `https://www.fuwhis.io.vn`, then **Redeploy** so the value is baked into the build.

## Validation

- `npm run build` must succeed with metadata routes.
- Post-deploy: verify `robots.txt`, `sitemap.xml`, and Open Graph preview (see `docs/product/deployment.md`).
- Facebook Sharing Debugger: `og:url` and `og:image` must be `https://www.fuwhis.io.vn/...` with no redirect hops.
