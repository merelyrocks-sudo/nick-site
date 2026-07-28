import type { Metadata } from "next";
import "./globals.css";
import { artist } from "@/content/site";

// NOTE ON FONTS
// We deliberately do NOT use `next/font/google`. Fetching fonts from Google at
// build time adds an external dependency, slows the first page load, and sends
// visitor data to Google. Phase 2 installs the real typeface as a package so it
// is served from our own domain. For now the site uses the visitor's system
// font, which is fast and looks clean everywhere.

export const metadata: Metadata = {
  title: artist.seoTitle,
  description: artist.seoDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
