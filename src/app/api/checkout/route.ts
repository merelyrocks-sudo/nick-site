import { NextResponse } from 'next/server';
import { stripe, stripeConfigured, siteUrl } from '@/lib/stripe';
import { getProduct, storeEnabled } from '@/content/site';

/**
 * Creates a Stripe Checkout Session and returns the URL to send the buyer to.
 *
 * SECURITY — why this route only accepts a product id
 * ---------------------------------------------------
 * The browser sends nothing but an id and an optional size. The price comes
 * from our own product list and from Stripe, never from the request body.
 * If the browser could send a price, anyone could buy a $65 hoodie for $0.01
 * by editing the request. This is the single most important rule in the file:
 * NEVER trust a price, quantity, or currency that arrived from the client.
 */
export async function POST(request: Request) {
  // Store switched off in site.ts. Checked here as well as in the UI so the
  // store is genuinely closed — a disabled button alone stops nobody who can
  // open devtools.
  if (!storeEnabled) {
    return NextResponse.json(
      { error: 'The store is not open yet.' },
      { status: 503 }
    );
  }

  if (!stripeConfigured || !stripe) {
    return NextResponse.json(
      { error: 'Payments are not set up yet.' },
      { status: 503 }
    );
  }

  let body: { productId?: string; size?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  const product = body.productId ? getProduct(body.productId) : undefined;

  if (!product || !product.available) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  if (!product.stripePriceId) {
    return NextResponse.json(
      { error: 'This item is not on sale yet.' },
      { status: 409 }
    );
  }

  // Only accept a size that this product actually offers.
  let size: string | undefined;
  if (product.kind === 'apparel' && product.sizes?.length) {
    if (!body.size || !product.sizes.includes(body.size)) {
      return NextResponse.json(
        { error: 'Please choose a size.' },
        { status: 400 }
      );
    }
    size = body.size;
  }

  const needsShipping = product.kind !== 'digital';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      success_url: `${siteUrl()}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/order/cancelled`,
      // Needed so digital downloads can be emailed to the buyer.
      customer_creation: 'always',
      ...(needsShipping
        ? { shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'IE', 'NZ'] } }
        : {}),
      // Shown on the order in the Stripe Dashboard, so fulfilment is unambiguous.
      metadata: {
        productId: product.id,
        productName: product.name,
        kind: product.kind,
        ...(size ? { size } : {}),
        ...(product.releaseId ? { releaseId: product.releaseId } : {}),
      },
    });

    if (!session.url) throw new Error('Stripe returned no checkout URL');
    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Log the real reason server-side; show the buyer something human.
    console.error('[checkout] Stripe session failed:', err);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 }
    );
  }
}
