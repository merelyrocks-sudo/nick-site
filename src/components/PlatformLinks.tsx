import BrandIcon, { type BrandKey } from './BrandIcon';
import { streaming, social } from '@/content/site';

/**
 * Streaming and social links rendered with their official brand marks.
 *
 * Anything left blank in site.ts simply does not appear — no dead links,
 * no empty icons.
 *
 * ACCESSIBILITY: the icons are aria-hidden and every link carries visible or
 * screen-reader text naming the platform, so nobody has to interpret a glyph.
 */

type Entry = { key: BrandKey; label: string; href: string };

const STREAMING: Entry[] = [
  { key: 'spotify', label: 'Spotify', href: streaming.spotify },
  { key: 'appleMusic', label: 'Apple Music', href: streaming.appleMusic },
  { key: 'youtube', label: 'YouTube', href: streaming.youtube },
  { key: 'youtubeMusic', label: 'YouTube Music', href: streaming.youtubeMusic },
  { key: 'soundcloud', label: 'SoundCloud', href: streaming.soundcloud },
  { key: 'bandcamp', label: 'Bandcamp', href: streaming.bandcamp },
  { key: 'tidal', label: 'Tidal', href: streaming.tidal },
  { key: 'amazonMusic', label: 'Amazon Music', href: streaming.amazonMusic },
];

const SOCIAL: Entry[] = [
  { key: 'instagram', label: 'Instagram', href: social.instagram },
  { key: 'tiktok', label: 'TikTok', href: social.tiktok },
  { key: 'twitter', label: 'X', href: social.twitter },
  { key: 'youtube', label: 'YouTube', href: streaming.youtube },
  { key: 'facebook', label: 'Facebook', href: social.facebook },
];

/** Big labelled buttons. Used in the "Listen" section. */
export function StreamingBar({ className = '' }: { className?: string }) {
  const items = STREAMING.filter((i) => i.href);
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 border border-line-strong px-6 py-4 text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-ink-950"
          >
            <BrandIcon name={item.key} className="h-5 w-5" />
            {item.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Compact icon row. Used in the footer and the socials strip. */
export function SocialRow({
  className = '',
  size = 'h-5 w-5',
}: {
  className?: string;
  size?: string;
}) {
  const items = SOCIAL.filter((i) => i.href);
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-5 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            // Generous hit area: 44px is the accessibility minimum for touch.
            className="flex h-11 w-11 items-center justify-center text-bone-dim transition-colors duration-200 hover:text-accent-bright"
          >
            <BrandIcon name={item.key} className={size} />
            <span className="sr-only">{item.label} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
