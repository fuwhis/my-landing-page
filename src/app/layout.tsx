import { siteUrl } from '@/lib/site';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

import { InitialPageLoading } from '@/components/loading/initial-page-loading';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SpeedDialFab } from '@/components/ui/speed-dial-fab';
import { ToastProvider } from '@/components/ui/toast';
import { ScrollResetOnReload } from './scroll-reset-on-reload';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteTitle = 'Nguyen Phu Quy | Software Engineer';
const siteDescription =
  'Portfolio and CV of Nguyen Phu Quy, a Frontend Engineer with 4+ years delivering scalable, high-performance web products.';
const socialDescription =
  'Portfolio and CV showcasing product-focused frontend engineering work, experience, and selected projects.';
const ogImage = {
  // Absolute URL avoids host redirects (apex → www) that break Facebook image fetch.
  url: `${siteUrl}/open-graph/og-preview-thumbnail.png`,
  width: 2048,
  height: 1152,
  alt: siteTitle,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/favicon/apple-touch-icon.png', type: 'image/png' }],
  },
  title: {
    default: siteTitle,
    template: '%s | Nguyen Phu Quy',
  },
  description: siteDescription,
  keywords: [
    'Frontend Engineer',
    'React',
    'Next.js',
    'Vue',
    'Nuxt',
    'TypeScript',
    'Tailwind CSS',
    'Portfolio',
    'CV',
  ],
  openGraph: {
    title: siteTitle,
    description: socialDescription,
    url: siteUrl,
    siteName: 'Nguyen Phu Quy Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: socialDescription,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="scroll-restoration-manual" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }`}
        </Script>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID!}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <ScrollResetOnReload />
          <InitialPageLoading />
          <ToastProvider>{children}</ToastProvider>
          <SpeedDialFab />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
