# US-003 SEO Metadata

## Status

implemented

## Lane

normal

## Product Contract

Canonical site URL drives metadata, Open Graph, robots.txt, and sitemap.xml.

## Relevant Product Docs

- `docs/product/seo-and-metadata.md`

## Acceptance Criteria

- `metadataBase` and OG url use `siteUrl` from `src/lib/site.ts`.
- Open Graph / Twitter tags come only from the Metadata API (no manual OG/Twitter/`description` metas in `<head>`).
- `openGraph.images` / `twitter.images` use `/open-graph/og-thumb.jpeg` (not `/public/...`).
- `robots.ts` and `sitemap.ts` reference resolved canonical URL.
- Default fallback is `https://fuwhis.io.vn` when env is unset.

## Validation

| Layer    | Expected proof  |
| -------- | --------------- |
| Platform | `npm run build` |

## Evidence

- `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/site.ts`
