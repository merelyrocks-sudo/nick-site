'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { artist, nav } from '@/content/site';

/**
 * Sticky site header.
 *
 * Accessibility notes — please keep these if you edit this file:
 *  - The mobile menu button reports its open/closed state via aria-expanded.
 *  - Escape closes the menu, and focus is not trapped away from the toggle.
 *  - The current page is marked with aria-current so screen readers announce it.
 *  - Body scroll locks while the menu is open so the page behind cannot drift.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes, otherwise it stays open
  // covering the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Solid background once scrolled, transparent over the hero at the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape to close, and prevent the page behind scrolling while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-line bg-ink-950/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="display text-2xl text-bone sm:text-3xl"
        >
          {artist.name}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                      active ? 'text-accent' : 'text-bone-dim hover:text-accent'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">
            {open ? 'Close menu' : 'Open menu'}
          </span>
          {/* Two bars that cross into an X when open. */}
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-bone transition-transform duration-300 ${
                open ? 'top-2 rotate-45' : 'top-0.5'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-bone transition-transform duration-300 ${
                open ? 'top-2 -rotate-45' : 'top-3.5'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-ink-950 md:hidden"
      >
        <nav aria-label="Main (mobile)" className="px-6 py-6 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`display block border-b border-line py-4 text-3xl ${
                      active ? 'text-accent' : 'text-bone-dim'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
