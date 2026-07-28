import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Button from '@/components/Button';
import TrackList from '@/components/TrackList';
import BuyButton from '@/components/BuyButton';
import {
  artist,
  releases,
  getRelease,
  digitalProducts,
  formatPrice,
} from '@/content/site';

type Params = { params: Promise<{ id: string }> };

// Pre-build a page for every album at deploy time — they load instantly and
// Google can index each one separately.
export function generateStaticParams() {
  return releases.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const release = getRelease(id);
  if (!release) return {};
  return {
    title: release.title,
    description: `${release.title} — ${release.type}${
      release.year ? ` (${release.year})` : ''
    } by ${artist.name}. Listen to previews and buy the album.`,
  };
}

export default async function AlbumPage({ params }: Params) {
  const { id } = await params;
  const release = getRelease(id);
  if (!release) notFound();

  // The digital product that sells this album, if one exists.
  const product = digitalProducts.find((p) => p.releaseId === release.id);

  const meta = [
    release.type,
    release.year,
    release.trackCount ? `${release.trackCount} tracks` : '',
  ].filter(Boolean);

  return (
    <>
      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <Link
            href="/music"
            className="text-xs uppercase tracking-[0.2em] text-bone-faint transition-colors hover:text-bone"
          >
            ← All music
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
            <div className="relative aspect-square overflow-hidden bg-ink-800">
              <Image
                src={release.artwork}
                alt={`Cover artwork for ${release.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-bone-faint">
                {meta.join(' · ')}
              </p>
              <h1 className="display mt-4 text-6xl text-bone sm:text-7xl">
                {release.title}
              </h1>

              {release.blurb && (
                <p className="mt-5 max-w-md text-base leading-relaxed text-bone-dim">
                  {release.blurb}
                </p>
              )}

              <div className="mt-auto pt-10">
                {product ? (
                  <>
                    <p className="text-2xl text-bone tabular-nums">
                      {formatPrice(product.priceCents)}
                    </p>
                    <div className="mt-5">
                      <BuyButton product={product} />
                    </div>
                    <p className="mt-4 max-w-sm text-xs leading-relaxed text-bone-faint">
                      Digital download. Files are emailed to you after purchase.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-bone-faint">
                    Not available to buy yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="eyebrow">Tracks</h2>
            {release.hasPreviews && (
              <p className="text-xs text-bone-faint">
                Tap any track to hear 30 seconds
              </p>
            )}
          </div>

          <div className="mt-8">
            <TrackList release={release} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-sm text-bone-dim">More from {artist.name}</p>
            <Button href="/music" variant="secondary">
              Full discography
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
