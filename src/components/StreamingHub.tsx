import BrandIcon, { type BrandKey } from './BrandIcon';
import { streaming } from '@/content/site';

/**
 * THE STREAMING HUB
 * -----------------
 * Every major service in one grid. Services with a URL in site.ts are live
 * links; the rest render as dimmed "soon" tiles so the grid shows intent
 * and fills itself in as links are added — no code change needed.
 *
 * SPOTIFY EMBED: the moment a real Spotify artist URL exists in site.ts,
 * an embedded player for the artist appears above the grid automatically.
 * Until then the section is just the grid — no broken iframe, no placeholder.
 */

type HubEntry = { key: BrandKey; label: string; href: string };

// The full roster, in display order. URLs come from site.ts — the single
// source of truth; this list only decides label, icon, and order.
const ROSTER: HubEntry[] = [
  { key: 'spotify', label: 'Spotify', href: streaming.spotify },
  { key: 'appleMusic', label: 'Apple Music', href: streaming.appleMusic },
  { key: 'youtube', label: 'YouTube', href: streaming.youtube },
  { key: 'youtubeMusic', label: 'YouTube Music', href: streaming.youtubeMusic },
  { key: 'soundcloud', label: 'SoundCloud', href: streaming.soundcloud },
  { key: 'bandcamp', label: 'Bandcamp', href: streaming.bandcamp },
  { key: 'tidal', label: 'Tidal', href: streaming.tidal },
  { key: 'amazonMusic', label: 'Amazon Music', href: streaming.amazonMusic },
];

/** Turns https://open.spotify.com/artist/4XYZ into an embed URL, or null. */
function spotifyEmbedUrl(artistUrl: string): string | null {
  const match = artistUrl.match(/open\.spotify\.com\/artist\/([A-Za-z0-9]+)/);
  return match ? `https://open.spotify.com/embed/artist/${match[1]}` : null;
}

export default function StreamingHub() {
  const embed = spotifyEmbedUrl(streaming.spotify);

  return (
    <div>
      {embed && (
        // Appears automatically once a Spotify artist URL exists in site.ts.
        <div className="mx-auto mb-12 max-w-2xl">
          <iframe
            src={embed}
            title="Listen on Spotify"
            // 352 is Spotify's standard artist-embed height.
            height={352}
            className="w-full border-0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      )}

      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ROSTER.map((item) =>
          item.href ? (
            // Live service.
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center justify-center gap-3 border border-line bg-ink-900 px-4 py-6 text-center transition-colors duration-200 hover:border-accent hover:bg-ink-800"
              >
                <BrandIcon
                  name={item.key}
                  className="h-7 w-7 text-bone-dim transition-colors duration-200 group-hover:text-accent-bright"
                />
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-bone">
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ) : (
            // Not on this service yet — visible but deliberately muted.
            <li key={item.label}>
              <div
                aria-disabled="true"
                className="flex h-full flex-col items-center justify-center gap-3 border border-line/50 px-4 py-6 text-center opacity-40"
              >
                <BrandIcon name={item.key} className="h-7 w-7 text-bone-faint" />
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-bone-faint">
                  {item.label}
                </span>
                <span className="text-[0.625rem] uppercase tracking-[0.2em] text-bone-faint">
                  Soon
                </span>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
