import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

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
    default: 'Nguyen Phu Quy | Senior Frontend Engineer',
    template: '%s | Nguyen Phu Quy',
  },
  description:
    'Premium portfolio and CV of Nguyen Phu Quy, a Frontend Engineer with 4+ years delivering scalable, high-performance web products.',
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
    title: 'Nguyen Phu Quy | Senior Frontend Engineer',
    description:
      'Portfolio and CV showcasing product-focused frontend engineering work, experience, and selected projects.',
    url: 'https://portfolio.example.com',
    siteName: 'Nguyen Phu Quy Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nguyen Phu Quy | Senior Frontend Engineer',
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
