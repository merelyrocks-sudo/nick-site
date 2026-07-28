'use client';

import { useEffect, useRef, useState } from 'react';
import {
  type Release,
  trackTitle,
  hasRealTitle,
  previewPath,
  trackNumbers,
} from '@/content/site';

/**
 * Album tracklist with 30-second preview playback.
 *
 * DESIGN NOTES
 * ------------
 * One shared <audio> element rather than one per track. Playing a new track
 * reuses it, which guarantees only one preview can ever play at a time and
 * keeps memory flat on a 25-track album.
 *
 * ACCESSIBILITY
 * -------------
 * Each row is a real <button> with an aria-label naming the track, so screen
 * reader users hear "Play Killer Diller" rather than "button". The currently
 * playing row is marked with aria-pressed. Progress is shown visually and also
 * announced politely so the state is not colour-only.
 */
export default function TrackList({ release }: { release: Release }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const indexes = trackNumbers(release);

  // Stop audio when navigating away, otherwise it keeps playing over the next page.
  useEffect(() => {
    const el = audioRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  function toggle(i: number) {
    const src = previewPath(release, i);
    if (!src) return;
    const el = audioRef.current;
    if (!el) return;

    if (playing === i) {
      el.pause();
      setPlaying(null);
      return;
    }
    el.src = src;
    setProgress(0);
    void el.play().then(() => setPlaying(i)).catch(() => setPlaying(null));
  }

  return (
    <div>
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) setProgress(el.currentTime / el.duration);
        }}
        onEnded={() => {
          setPlaying(null);
          setProgress(0);
        }}
      />

      <ol className="border-t border-line">
        {indexes.map((i) => {
          const src = previewPath(release, i);
          const isPlaying = playing === i;
          const title = trackTitle(release, i);
          const named = hasRealTitle(release, i);

          return (
            <li key={i} className="relative border-b border-line">
              {/* Progress fill sits behind the row content. */}
              {isPlaying && (
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 bg-accent/20 transition-[width] duration-200"
                  style={{ width: `${progress * 100}%` }}
                />
              )}

              <button
                type="button"
                onClick={() => toggle(i)}
                disabled={!src}
                aria-pressed={isPlaying}
                aria-label={
                  src
                    ? `${isPlaying ? 'Pause' : 'Play'} preview of ${title}`
                    : `${title} — no preview available`
                }
                className="relative flex w-full items-center gap-5 px-1 py-4 text-left transition-colors hover:bg-accent/5 disabled:cursor-default disabled:hover:bg-transparent"
              >
                <span className="w-7 shrink-0 text-xs tabular-nums text-bone-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="shrink-0" aria-hidden="true">
                  {src ? (
                    isPlaying ? (
                      // Pause glyph
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-accent">
                        <rect x="2" y="1" width="3.5" height="12" />
                        <rect x="8.5" y="1" width="3.5" height="12" />
                      </svg>
                    ) : (
                      // Play glyph
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-bone-dim">
                        <path d="M2 1l11 6-11 6z" />
                      </svg>
                    )
                  ) : (
                    <span className="block h-3.5 w-3.5" />
                  )}
                </span>

                <span
                  className={`flex-1 text-base ${
                    isPlaying ? 'text-accent' : named ? 'text-bone-dim' : 'text-bone-faint'
                  }`}
                >
                  {title}
                </span>

                {src && (
                  <span className="shrink-0 text-[0.6875rem] uppercase tracking-[0.2em] text-bone-faint">
                    {isPlaying ? 'Playing' : '30s'}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Announced to screen readers without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {playing !== null
          ? `Now previewing ${trackTitle(release, playing)}`
          : 'Preview stopped'}
      </p>
    </div>
  );
}
