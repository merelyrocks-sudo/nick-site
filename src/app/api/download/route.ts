/**
 * POST /api/download
 *
 * Verifies the Stripe checkout session, then redirects to the public
 * GitHub Release download URL for the matching delivery zip.
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyCheckoutSession } from '@/lib/delivery';
import { getProduct } from '@/content/site';

const DL = 'https://github.com/merelyrocks-sudo/nick-site/releases/download/delivery-v1';

export async function POST(request: NextRequest) {
  let body: { sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  if (!body.sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  const session = await verifyCheckoutSession(body.sessionId);
  if (!session) {
    return NextResponse.json({ error: 'Invalid or unpaid session' }, { status: 403 });
  }

  const releaseId = session.metadata?.releaseId;
  if (!releaseId) {
    return NextResponse.json({ error: 'No download for this order' }, { status: 404 });
  }

  const product = getProduct(releaseId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Return public download URL (repo is public now)
  const url = `${DL}/Merely.-.${product.name.replace(/\s+/g, '.')}.zip`;
  return NextResponse.json({ url });
}
