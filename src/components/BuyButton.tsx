'use client';

import { useState } from 'react';
import type { Product } from '@/content/site';

/**
 * Sends the buyer to Stripe Checkout.
 *
 * Only the product id and size are sent — the price is decided by the server
 * and by Stripe, so it cannot be tampered with from the browser.
 *
 * A product with no Stripe price id renders as a clearly disabled button
 * rather than one that looks live and then fails.
 */
export default function BuyButton({
  product,
  size,
  className = '',
}: {
  product: Product;
  size?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = product.stripePriceId !== '';

  async function buy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, size }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      // Full page navigation — Stripe Checkout is hosted on their domain.
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={buy}
        disabled={!ready || loading}
        className="w-full border border-line-strong px-8 py-4 text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink-950 disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-bone-faint disabled:hover:bg-transparent disabled:hover:text-bone-faint"
      >
        {!ready ? 'Coming soon' : loading ? 'Opening checkout…' : 'Buy'}
      </button>

      {!ready && (
        <p className="mt-3 text-center text-xs text-bone-faint">
          Checkout opens soon.
        </p>
      )}

      {/* role=alert so screen readers announce failures immediately. */}
      {error && (
        <p role="alert" className="mt-3 text-center text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
