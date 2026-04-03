import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.example.com'),
  title: {
    default: 'Alex Nguyen | Senior Frontend Engineer',
    template: '%s | Alex Nguyen',
  },
  description:
    'Premium portfolio and CV of Alex Nguyen, a Frontend Engineer with 4+ years delivering scalable, high-performance web products.',
  keywords: [
    'Frontend Engineer',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Portfolio',
    'CV',
  ],
  openGraph: {
    title: 'Alex Nguyen | Senior Frontend Engineer',
    description:
      'Portfolio and CV showcasing product-focused frontend engineering work, experience, and selected projects.',
    url: 'https://portfolio.example.com',
    siteName: 'Alex Nguyen Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Nguyen | Senior Frontend Engineer',
    description:
      'Portfolio and CV showcasing product-focused frontend engineering work, experience, and selected projects.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-50 text-neutral-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
