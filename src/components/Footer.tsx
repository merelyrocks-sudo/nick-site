import Link from 'next/link';
import Container from './Container';
import { SocialRow } from './PlatformLinks';
import { artist, contact, policyLinks, allLinks, nav } from '@/content/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-ink-950">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="lg:col-span-2">
            <p className="display text-4xl text-bone">{artist.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-faint">
              {artist.tagline}
            </p>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="mt-6 inline-block text-sm text-bone-dim transition-colors hover:text-accent-bright"
              >
                {contact.email}
              </a>
            )}
          </div>

          {/* Site pages */}
          <div>
            <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-bone-faint">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bone-dim transition-colors hover:text-accent-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External links — only rendered if any exist */}
          <div>
            <h2 className="text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-bone-faint">
              Listen &amp; Follow
            </h2>
            {allLinks.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {allLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-bone-dim transition-colors hover:text-accent-bright"
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-bone-faint">Links coming soon.</p>
            )}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <p className="text-xs text-bone-faint">
              © {year} {artist.name}. All rights reserved.
            </p>
            <SocialRow size="h-[18px] w-[18px]" className="-ml-3 gap-1" />
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-bone-faint transition-colors hover:text-bone-dim"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
