import Image from 'next/image';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ReleaseCard from '@/components/ReleaseCard';
import {
  artist,
  images,
  contact,
  releases,
  streamingLinks,
  socialLinks,
  allLinks,
} from '@/content/site';

export default function Home() {
  // Show at most three releases on the home page; the rest live on /music.
  const featured = releases.slice(0, 3);

  return (
    // -mt-20 pulls the hero up under the fixed header so the image runs
    // edge to edge behind it. The header is transparent until you scroll.
    <>
      {/* ================= HERO ================= */}
      <section className="relative -mt-20 flex min-h-[88svh] items-end overflow-hidden">
        <Image
          src={images.hero}
          alt={images.heroAlt}
          fill
          // The hero is the largest element visible on load, so we tell the
          // browser to fetch it first. This is the single biggest thing you
          // can do for perceived load speed.
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Layered overlays, back to front:
            1. vertical fade so text at the bottom stays readable
            2. a magenta wash that ties the photo to the palette
            3. a slow-drifting bloom so the hero is never completely still */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-color bg-gradient-to-tr from-accent/45 via-transparent to-accent-deep/35"
        />
        <div
          aria-hidden="true"
          className="glow-bloom animate-drift left-[-10%] top-[-15%] h-[55vh] w-[55vh]"
        />

        <Container wide className="relative pb-20 pt-40 sm:pb-24">
          <div className="animate-rise max-w-4xl">
            {/* Condensed face, so this runs very large before it feels big. */}
            <h1 className="display display-hot text-[clamp(4.5rem,19vw,15rem)]">
              {artist.name}
            </h1>
            <p className="mt-6 max-w-lg text-sm uppercase tracking-[0.22em] text-bone-dim sm:text-base">
              <span className="mr-3 inline-block h-2 w-2 translate-y-[-2px] bg-accent" />
              {artist.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {streamingLinks.length > 0 ? (
                <Button href={streamingLinks[0].href} external>
                  Listen on {streamingLinks[0].label}
                </Button>
              ) : (
                <Button href="/music">Listen</Button>
              )}
              <Button href="/merch" variant="secondary">
                Shop merch
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= FEATURED MUSIC ================= */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="glow-bloom right-[-15%] top-[10%] h-[45vh] w-[45vh] opacity-30" />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Music"
              title="Latest releases"
              description={artist.genre}
            />
            <Button href="/music" variant="ghost">
              All music →
            </Button>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 py-24 sm:py-32">
        <div aria-hidden="true" className="glow-bloom left-[35%] top-[-20%] h-[50vh] w-[50vh] opacity-25" />
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-ink-800">
              <Image
                src={images.portrait}
                alt={images.portraitAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <SectionHeading eyebrow="About" title="The story" />
              {/* Only the opening paragraph here — the full bio is on /about. */}
              <p className="mt-6 text-base leading-relaxed text-bone-dim">
                {artist.bio[0]}
              </p>
              <div className="mt-9">
                <Button href="/about" variant="secondary">
                  Read the full story
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= LISTEN & FOLLOW ================= */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="glow-bloom left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 opacity-25" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Everywhere"
            title="Listen &amp; follow"
            description="New music, and everything in between."
            align="center"
          />

          {allLinks.length > 0 ? (
            <div className="mx-auto mt-14 max-w-4xl">
              {streamingLinks.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-3">
                  {streamingLinks.map((link) => (
                    <li key={link.label}>
                      <Button href={link.href} external variant="secondary">
                        {link.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {socialLinks.length > 0 && (
                <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm tracking-wide text-bone-dim transition-colors hover:text-accent"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-bone-faint">
              Streaming and social links will appear here once they are added in{' '}
              <code className="text-bone-dim">src/content/site.ts</code>.
            </p>
          )}
        </Container>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="relative overflow-hidden border-t border-line bg-gradient-to-br from-accent-deep/25 via-ink-950 to-ink-950 py-24 sm:py-32">
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Contact"
              title="Get in touch"
              description="Bookings, press, features, or anything else."
              align="center"
            />
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={`mailto:${contact.email}`}>{contact.email}</Button>
              <Button href="/contact" variant="secondary">
                Contact page
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
