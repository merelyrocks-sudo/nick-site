import Image from 'next/image';
import Link from 'next/link';
import type { Release } from '@/content/site';

/**
 * A single release: square artwork, title, meta, and streaming buttons.
 * Used on the home page and on the full Music page.
 *
 * The audio player is a Version 2 feature. For now the card links out to the
 * streaming services, which is what most artist sites do anyway — it sends
 * plays to platforms where they count towards charts and royalties.
 */
export default function ReleaseCard({ release }: { release: Release }) {
  const listenLinks = [
    { label: 'Spotify', href: release.links.spotify },
    { label: 'Apple Music', href: release.links.appleMusic },
    { label: 'YouTube', href: release.links.youtube },
    { label: 'SoundCloud', href: release.links.soundcloud },
  ].filter((l) => l.href);

  // Build the meta line from whatever is actually known. A missing year or
  // track count disappears cleanly instead of leaving a stray separator.
  const meta = [
    release.type,
    release.year,
    release.trackCount ? `${release.trackCount} tracks` : '',
  ].filter(Boolean);

  return (
    <article className="group">
      <Link href={`/music/${release.id}`} className="block">
        <div className="card-lift relative aspect-square overflow-hidden rounded-none bg-ink-800">
        <Image
          src={release.artwork}
          alt={`Cover artwork for ${release.title}`}
          fill
          // Tells the browser how wide this image renders so it downloads the
          // right size instead of the full-resolution file on phones.
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="mt-5">
        <p className="text-[0.6875rem] uppercase tracking-[0.28em] text-bone-faint">
          {meta.join(' · ')}
        </p>
        <h3 className="display mt-3 text-3xl text-bone">
          <Link href={`/music/${release.id}`} className="transition-colors hover:text-bone-dim">
            {release.title}
          </Link>
        </h3>
        {release.blurb && (
          <p className="mt-2 text-sm leading-relaxed text-bone-dim">
            {release.blurb}
          </p>
        )}

        {listenLinks.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {listenLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.14em] text-bone-dim underline-offset-4 transition-colors hover:text-accent-bright hover:underline"
                >
                  {link.label}
                  <span className="sr-only">
                    {' '}
                    — listen to {release.title} (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-bone-faint">Preview and buy →</p>
        )}
      </div>
    </article>
  );
}
