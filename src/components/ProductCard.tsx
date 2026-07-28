'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { formatPrice, type Product } from '@/content/site';

/**
 * A single product: photo, name, price, description, size picker, Buy button.
 * Used on both the Merch page and the digital Store page.
 *
 * CHECKOUT STATUS
 * ---------------
 * The Buy button is deliberately inert until Phase 4 wires up Stripe.
 * A product with an empty `stripePriceId` renders a clearly disabled button
 * reading "Coming soon" — never a button that looks live and then fails.
 * As soon as you paste a real Stripe price ID into src/content/site.ts, the
 * button turns on by itself.
 *
 * SIZE PICKER ACCESSIBILITY
 * -------------------------
 * The sizes are real radio inputs inside a fieldset, visually restyled as
 * buttons. That means arrow keys move between sizes, the group is announced
 * properly by screen readers, and the selection survives without JavaScript.
 * Do not replace these with <div>s that only respond to clicks.
 */
export default function ProductCard({ product }: { product: Product }) {
  const groupId = useId();
  const hasSizes = product.kind === 'apparel' && !!product.sizes?.length;

  // Default to the middle size — usually the most likely choice, and it means
  // the buyer never lands on a card with nothing selected.
  const [size, setSize] = useState(
    hasSizes ? product.sizes![Math.floor(product.sizes!.length / 2)] : ''
  );

  const purchasable = product.stripePriceId !== '';

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-ink-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-2xl text-bone">{product.name}</h3>
          <p className="shrink-0 pt-1 text-sm text-bone-dim tabular-nums">
            {formatPrice(product.priceCents)}
          </p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-bone-dim">
          {product.description}
        </p>

        {product.kind === 'digital' && (
          <p className="mt-3 text-xs leading-relaxed text-bone-faint">
            Digital download. Files are sent to your email after purchase.
          </p>
        )}

        {hasSizes && (
          <fieldset className="mt-5">
            <legend className="text-[0.6875rem] uppercase tracking-[0.28em] text-bone-faint">
              Size
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes!.map((s) => {
                const id = `${groupId}-${s}`;
                const selected = size === s;
                return (
                  <span key={s}>
                    {/* sr-only, not hidden — hiding it would remove it from
                        the keyboard tab order and break the control. */}
                    <input
                      type="radio"
                      id={id}
                      name={`${groupId}-size`}
                      value={s}
                      checked={selected}
                      onChange={() => setSize(s)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className={`flex h-10 min-w-10 cursor-pointer items-center justify-center border px-3 text-xs uppercase tracking-[0.1em] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bone ${
                        selected
                          ? 'border-bone bg-bone text-ink-950'
                          : 'border-line-strong text-bone-dim hover:border-bone hover:text-bone'
                      }`}
                    >
                      {s}
                    </label>
                  </span>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* mt-auto pins the button to the bottom so buttons line up across a
            row even when descriptions are different lengths. */}
        <div className="mt-auto pt-6">
          <button
            type="button"
            disabled={!purchasable}
            className="w-full border border-line-strong px-8 py-4 text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink-950 disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-bone-faint disabled:hover:bg-transparent disabled:hover:text-bone-faint"
          >
            {purchasable ? 'Add to cart' : 'Coming soon'}
          </button>

          {!purchasable && (
            <p className="mt-3 text-center text-xs text-bone-faint">
              Checkout opens soon.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
