const DEFAULT_SITE_URL = 'https://www.fuwhis.io.vn';
const CANONICAL_HOST = 'www.fuwhis.io.vn';

function normalizeSiteUrl(rawUrl?: string): string {
  const candidate = (rawUrl ?? DEFAULT_SITE_URL).trim();

  let parsed: URL;
  try {
    parsed = new URL(
      candidate.includes('://') ? candidate : `https://${candidate}`,
    );
  } catch {
    return DEFAULT_SITE_URL;
  }

  parsed.protocol = 'https:';
  parsed.hash = '';
  parsed.search = '';

  // Match Vercel apex → www redirect so og:url / og:image never need a hop.
  if (
    parsed.hostname === 'fuwhis.io.vn' ||
    parsed.hostname === 'www.fuwhis.io.vn'
  ) {
    parsed.hostname = CANONICAL_HOST;
  }

  const pathname = parsed.pathname.replace(/\/+$/, '');
  const normalizedPath = pathname === '/' ? '' : pathname;

  return `${parsed.origin}${normalizedPath}`;
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
