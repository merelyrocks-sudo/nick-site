import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { artist } from '@/content/site';

// NOTE ON FONTS
// We deliberately do NOT use `next/font/google`. The typefaces are installed as
// npm packages and imported in globals.css, so they are served from our own
// domain: faster first paint, no external request, no visitor data sent to Google.

export const metadata: Metadata = {
  title: {
    default: artist.seoTitle,
    // Sub-pages set their own title and it gets slotted in here.
    template: `%s — ${artist.name}`,
  },
  description: artist.seoDescription,
  openGraph: {
    title: artist.seoTitle,
    description: artist.seoDescription,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ink-950 text-bone">
        {/* Lets keyboard users jump straight past the nav. Visible on focus. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          Skip to content
        </a>

        <Header />

        {/* pt-20 clears the fixed header. Pages that want a full-bleed hero
            under the header cancel it with a negative margin. */}
        <main id="main" className="flex-1 pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
