'use client';

import { useEffect, useRef, useState } from 'react';
import { releases, previewPath, trackTitle } from '@/content/site';

/**
 * FLOATING PLAYER (Peggy-Gou style)
 * ---------------------------------
 * A small chip pinned to the bottom-left of every page, previewing the first
 * track of the newest release. The release comes straight from the top of the
 * releases list in site.ts, so when a new album is added this chip starts
 * previewing it automatically.
 *
 * ACCESSIBILITY
 * -------------
 * One real <button> with an aria-label naming the action and track, progress
 * announced politely, and the audio element pauses when the component
 * unmounts so sound never leaks across pages.
 */
export default function PlayerChip() {
  const latest = releases[0];
  const src = latest ? previewPath(latest, 0) : null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Stop audio when navigating away, otherwise it keeps playing.
  useEffect(() => {
    const el = audioRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  // No release or no previews — render nothing rather than a dead chip.
  if (!latest || !src) return null;

  const title = trackTitle(latest, 0);

  function toggle() {
    const el = audioRef.current;
    if (!el || !src) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) setProgress(el.currentTime / el.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
      />

      <div className="flex items-center gap-3 border border-line bg-ink-900/95 py-2 pl-2 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={`${playing ? 'Pause' : 'Play'} preview of ${title} from ${latest.title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-ink-950 transition-colors duration-200 hover:bg-accent-bright"
        >
          {playing ? (
            // Pause glyph
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1" width="3.5" height="12" />
              <rect x="8.5" y="1" width="3.5" height="12" />
            </svg>
          ) : (
            // Play glyph
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M2 1l11 6-11 6z" />
            </svg>
          )}
        </button>

        <div className="min-w-0">
          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-bone-faint">
            {playing ? 'Now previewing' : 'Latest release'}
          </p>
          <p className="max-w-[10rem] truncate text-xs font-medium text-bone sm:max-w-[14rem]">
            {latest.title} — {title}
          </p>
          {/* Progress hairline. Visual only; state is announced below. */}
          <div aria-hidden="true" className="mt-1 h-px w-full bg-line">
            <div
              className="h-px bg-accent transition-[width] duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Announced to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {playing ? `Now previewing ${title}` : 'Preview stopped'}
      </p>
    </div>
  );
}
