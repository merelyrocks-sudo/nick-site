import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import { artist, images, contact, allLinks } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${artist.name}. ${artist.genre}`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="The story" description={artist.genre} />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            {/* sticky keeps the portrait in view while the bio scrolls past it
                on tall screens. Falls back to normal flow on small screens. */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
                <Image
                  src={images.portrait}
                  alt={images.portraitAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              {/* Each string in artist.bio becomes its own paragraph. */}
              <div className="space-y-6">
                {artist.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    // The opening paragraph is set larger — it carries the most
                    // weight and most visitors read only this one.
                    className={
                      i === 0
                        ? 'text-lg leading-relaxed text-bone sm:text-xl'
                        : 'text-base leading-relaxed text-bone-dim'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-14 border-t border-line pt-10">
                <h2 className="eyebrow">Get in touch</h2>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button href={`mailto:${contact.email}`}>
                    {contact.email}
                  </Button>
                  <Button href="/music" variant="secondary">
                    Hear the music
                  </Button>
                </div>
              </div>

              {allLinks.length > 0 && (
                <div className="mt-12">
                  <h2 className="eyebrow">Elsewhere</h2>
                  <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    {allLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-bone-dim transition-colors hover:text-bone"
                        >
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
