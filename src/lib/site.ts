const DEFAULT_SITE_URL = 'https://fuwhis.io.vn'

function normalizeSiteUrl(rawUrl?: string): string {
  if (!rawUrl) {
    return DEFAULT_SITE_URL
  }

  return rawUrl.replace(/\/+$/, '')
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
