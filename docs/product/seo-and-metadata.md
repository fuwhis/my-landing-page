# SEO and Metadata

## Canonical URL

- Env: `NEXT_PUBLIC_SITE_URL` (optional locally).
- Resolver: `src/lib/site.ts` — strips trailing slashes; defaults to `https://fuwhis.io.vn`.

## Metadata Contract

Defined in `src/app/layout.tsx`:

- `metadataBase` uses resolved `siteUrl`.
- Title template: `%s | Nguyen Phu Quy`.
- Default title and description reflect frontend engineering portfolio positioning.
- Open Graph / Twitter: defined only via the Metadata API (no manual `<meta>` tags in `<head>`).
- Open Graph: title, description, url, siteName, locale, images.
- Social image: `/favicon/android-chrome-512x512.png` (resolved via `metadataBase`).
- Icons and web manifest linked from `public/`.

## Discoverability Routes

- `src/app/robots.ts` — allow crawl; sitemap reference uses `siteUrl`.
- `src/app/sitemap.ts` — homepage entry with `siteUrl`.

## Environment Rules

- CI sets `NEXT_PUBLIC_SITE_URL=https://fuwhis.io.vn` for consistent build metadata.
- Production Vercel env must match the canonical domain.

## Validation

- `npm run build` must succeed with metadata routes.
- Post-deploy: verify `robots.txt`, `sitemap.xml`, and Open Graph preview (see `docs/product/deployment.md`).
