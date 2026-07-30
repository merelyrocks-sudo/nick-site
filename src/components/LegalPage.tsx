import { ReactNode } from 'react';
import Container from './Container';
import PageHeader from './PageHeader';

/**
 * Shared layout for the four policy pages (Privacy, Terms, Refunds,
 * Shipping). Keeps them looking like one consistent legal section instead
 * of four one-off pages.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  /** e.g. "30 July 2026" — shown so a reader knows how current this is. */
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow">Last updated {updated}</p>
            <div className="mt-8 space-y-8 text-base leading-relaxed text-bone-dim [&_h2]:display [&_h2]:text-2xl [&_h2]:text-bone [&_h2]:mb-3 [&_p+p]:mt-3 [&_a]:text-accent-bright [&_a]:underline [&_a]:underline-offset-2">
              {children}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
