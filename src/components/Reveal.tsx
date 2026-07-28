'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades and lifts its children into view as they enter the viewport.
 *
 * Uses IntersectionObserver, which the browser handles off the main thread —
 * far cheaper than listening to scroll events, and no animation library.
 *
 * FAILURE BEHAVIOUR (important):
 * If IntersectionObserver is unsupported, the content is shown immediately.
 * A decorative animation must never be able to permanently hide real content.
 * The same applies to anyone with "reduce motion" set — see globals.css.
 */
export default function Reveal({
  children,
  className = '',
  /** Stagger in seconds, for revealing items one after another. */
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Reveal once, then stop watching — nothing re-hides on scroll up.
          observer.disconnect();
        }
      },
      // Trigger slightly before the element reaches the bottom edge.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
