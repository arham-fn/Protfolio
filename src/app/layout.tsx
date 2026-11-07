import type { Metadata } from 'next';
import './globals.css';

/* ═══════════════════════════════════════════
   Metadata + SEO (No meta keywords tag)
   ═══════════════════════════════════════════ */
export const metadata: Metadata = {
  metadataBase: new URL('https://personal-tech-journey-tracker.vercel.app'),
  title: 'Arham — AI-Powered Apps & Hardware Tinkerer',
  description:
    'I build AI-powered apps, and I can fix the laptop you run them on. Full-stack developer, mobile builder, and hardware diagnostic specialist.',
  authors: [{ name: 'Arham' }],
  openGraph: {
    title: 'Arham — AI-Powered Apps & Hardware Tinkerer',
    description:
      'I build AI-powered apps, and I can fix the laptop you run them on.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Arham OS — AI Apps & Hardware Tinkerer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arham — AI-Powered Apps & Hardware Tinkerer',
    description:
      'I build AI-powered apps, and I can fix the laptop you run them on.',
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ═══════════════════════════════════════════
   Root Layout
   ═══════════════════════════════════════════ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Preconnect & Google Fonts link for Bricolage Grotesque and IBM Plex Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800;12..96,900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* JSON-LD Person schema — strictly personal, no worksFor field */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Arham',
              jobTitle: 'Full-Stack & Mobile Developer',
              description:
                'AI-integrated full-stack and mobile developer, self-taught builder, and hardware tinkerer.',
              knowsAbout: [
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'React Native',
                'Node.js',
                'Python',
                'AI Integration',
                'Hardware Repair',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Faisalabad',
                addressCountry: 'PK',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
