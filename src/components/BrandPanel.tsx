import { artist, releases } from '@/content/site';

/**
 * THE BRAND PANEL
 * ---------------
 * A typographic poster built in pure code — no image file, so it is razor
 * sharp at every size and always matches the site's real fonts and palette.
 * Used where a big brand moment is needed (currently the home About section).
 *
 * It replaced an AI-generated barbed-wire banner that looked homemade.
 * Restraint is the point: one wordmark, one rule, one fact.
 */
export default function BrandPanel() {
  const albumCount = releases.length;
  const years = releases
    .map((r) => Number(r.year))
    .filter((y) => Number.isFinite(y) && y > 0);
  const firstYear = years.length ? Math.min(...years) : null;

  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-line bg-ink-900">
      {/* Warm bloom behind the wordmark — stage light, low and slow. */}
      <div
        aria-hidden="true"
        className="haze animate-drift left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-30"
      />

      {/* Inset frame, like the border on a tour poster. */}
      <div
        aria-hidden="true"
        className="absolute inset-4 border border-line-strong sm:inset-6"
      />

      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <p className="eyebrow">{artist.genre.split('.')[0]}</p>

        <p className="display display-ember mt-6 text-[clamp(3.5rem,9vw,6.5rem)] leading-none">
          {artist.name}
        </p>

        {/* One amber rule, then one line of plain facts. */}
        <div aria-hidden="true" className="mt-8 h-px w-24 bg-accent" />
        <p className="mt-6 text-[0.625rem] uppercase tracking-[0.3em] text-bone-faint">
          {albumCount} albums
          {firstYear ? ` · since ${firstYear}` : ''}
        </p>
      </div>
    </div>
  );
}
