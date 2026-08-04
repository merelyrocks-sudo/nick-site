/**
 * POST /api/download
 *
 * Verifies the Stripe checkout session, then proxies the matching delivery
 * zip from the private GitHub repo's release assets (authenticated).
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyCheckoutSession } from '@/lib/delivery';
import { getProduct } from '@/content/site';

// GitHub Release asset IDs (from delivery-v1 tag, private repo)
const ASSET_IDS: Record<string, string> = {
  'thrilla-killa': '501504451',
  'merely-rocks': '501503932',
  'merely-rocks-2': '501504072',
  'daze': '501503161',
  'are-you-mental-1': '501502981',
  'are-you-mental-2': '501503103',
  'get-out': '501503556',
  'merely-lives': '501503809',
  'merely-lives-2': '501503661',
  'dig-this': '501503396',
  'already-dead': '501502859',
};

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

  const assetId = ASSET_IDS[releaseId];
  if (!assetId) {
    return NextResponse.json({ error: 'Download not available' }, { status: 503 });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  // Download the release asset from GitHub API (authenticated for private repo)
  const assetUrl = `https://api.github.com/repos/merelyrocks-sudo/nick-site/releases/assets/${assetId}`;
  const ghRes = await fetch(assetUrl, {
    headers: {
      Accept: 'application/octet-stream',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!ghRes.ok) {
    console.error('[download] GitHub asset fetch failed:', ghRes.status);
    return NextResponse.json({ error: 'Download unavailable' }, { status: 503 });
  }

  const buf = await ghRes.arrayBuffer();
  const fileName = `${product.name.replace(/\s+/g, '_')}.zip`;
  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': String(buf.byteLength),
    },
  });
}
