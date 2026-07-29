import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ReleaseCard from '@/components/ReleaseCard';
import Reveal from '@/components/Reveal';
import StreamingHub from '@/components/StreamingHub';
import {
  artist,
  images,
  contact,
  releases,
} from '@/content/site';

export default function Home() {
  // The newest release drives the hero announcement and the featured grid.
  const latest = releases[0];
  const featured = releases.slice(0, 3);

  return (
    // -mt-20 pulls the hero up under the fixed header so the artwork runs
    // edge to edge behind it. The header is transparent until you scroll.
    <>
      {/* ================= HERO ================= */}
      {/* Full-screen rabbit artwork, warm light, massive Anton name, and a
          staggered load-in (.hero-reveal reads --reveal-delay per child). */}
      <section className="relative -mt-20 flex min-h-svh items-end overflow-hidden">
        <Image
          src={images.portrait}
          alt={images.portraitAlt}
          fill
          // The hero is the largest element visible on load, so we tell the
          // browser to fetch it first — the biggest perceived-speed win here.
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Layered overlays, back to front:
            1. vertical fade so text at the bottom stays readable
            2. a warm amber wash that ties the artwork to the palette
            3. a slow-drifting bloom so the hero is never completely still */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-color bg-gradient-to-tr from-accent/25 via-transparent to-accent-deep/35"
        />
        <div
          aria-hidden="true"
          className="haze animate-drift left-[-10%] top-[-15%] h-[55vh] w-[55vh]"
        />

        <Container wide className="relative pb-24 pt-40 sm:pb-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
            {/* Name, tagline, actions — staggered in on load. */}
            <div className="max-w-4xl">
              <h1
                className="hero-reveal display display-ember text-[clamp(4.5rem,18vw,14rem)]"
                style={{ ['--reveal-delay' as string]: '0.05s' }}
              >
                {artist.name}
              </h1>
              <p
                className="hero-reveal mt-6 max-w-lg text-sm uppercase tracking-[0.22em] text-bone-dim sm:text-base"
                style={{ ['--reveal-delay' as string]: '0.2s' }}
              >
                {artist.tagline}
              </p>

              <div
                className="hero-reveal mt-10 flex flex-wrap gap-4"
                style={{ ['--reveal-delay' as string]: '0.35s' }}
              >
                <Button href="#listen">Stream now</Button>
                <Button href="/store" variant="secondary">
                  Buy
                </Button>
                <Button href="#tour" variant="ghost">
                  Tour dates
                </Button>
              </div>
            </div>

            {/* Latest-release announcement, artwork front and center. */}
            {latest && (
              <Link
                href={`/music/${latest.id}`}
                className="hero-reveal group block w-56 sm:w-64"
                style={{ ['--reveal-delay' as string]: '0.5s' }}
                aria-label={`Latest release: ${latest.title}${latest.year ? `, ${latest.year}` : ''}`}
              >
                <div className="card-lift relative aspect-square overflow-hidden border border-line-strong shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
                  <Image
                    src={latest.artwork}
                    alt={`${latest.title} cover art`}
                    fill
                    sizes="(min-width: 1024px) 16rem, 14rem"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-[0.625rem] uppercase tracking-[0.28em] text-bone-faint">
                  Latest {latest.type.toLowerCase()}
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-bone transition-colors group-hover:text-accent-bright">
                  {latest.title}
                  {latest.year ? ` — ${latest.year}` : ''}
                </p>
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* ================= STREAMING HUB ================= */}
      <section id="listen" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="haze left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 opacity-25" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Listen"
            title="Stream everywhere"
            description="However you listen, it is there — or landing soon."
            align="center"
          />
          <div className="mt-14">
            <Reveal>
              <StreamingHub />
            </Reveal>
          </div>

          {/* Buying direct supports the artist far more than a stream does. */}
          <Reveal delay={0.1}>
            <div className="mt-14 text-center">
              <p className="text-sm text-bone-dim">
                Streams pay pennies. Buying direct pays rent.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button href="/store" variant="secondary">
                  Buy the music
                </Button>
                <Button href="/merch" variant="ghost">
                  Merch →
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= FEATURED MUSIC ================= */}
      <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 py-24 sm:py-32">
        <div aria-hidden="true" className="haze right-[-15%] top-[10%] h-[45vh] w-[45vh] opacity-30" />
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
            {featured.map((release, i) => (
              <Reveal key={release.id} delay={i * 0.08}>
                <ReleaseCard release={release} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= TOUR ================= */}
      {/* Real dates land here when they exist. Until then the section says so
          plainly rather than pretending — and points at Instagram, which is
          where announcements will actually happen first. */}
      <section id="tour" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
        <div aria-hidden="true" className="haze left-[35%] top-[-20%] h-[50vh] w-[50vh] opacity-25" />
        <Container className="relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <SectionHeading
                eyebrow="Live"
                title="Tour dates"
                align="center"
              />
              <p className="mt-6 text-base leading-relaxed text-bone-dim">
                No shows currently — stay tuned. When something is booked,
                this is where it appears first.
              </p>
              <div className="mt-9">
                <Button href="/contact" variant="secondary">
                  Book Merely
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ================= ABOUT ================= */}
      {/* The barbed-wire banner lives here — the rabbit owns the hero. */}
      <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-ink-900 via-ink-950 to-ink-900 py-24 sm:py-32">
        <div aria-hidden="true" className="haze left-[-10%] bottom-[-20%] h-[50vh] w-[50vh] opacity-25" />
        <Container>
          <Reveal>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-ink-800">
              <Image
                src={images.hero}
                alt={images.heroAlt}
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
          </Reveal>
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
