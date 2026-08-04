/**
 * POST /api/download
 *
 * Verifies the Stripe checkout session, checks payment status and metadata,
 * then streams the matching delivery zip.
 *
 * In development, reads from the local _delivery folder.
 * In production (Vercel), reads from Vercel Blob Storage.
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyCheckoutSession } from '@/lib/delivery';
import { getProduct } from '@/content/site';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// GitHub Release download URLs (from https://github.com/merelyrocks-sudo/nick-site/releases/tag/delivery-v1)
const DL_BASE = 'https://github.com/merelyrocks-sudo/nick-site/releases/download/delivery-v1';
const GITHUB_URLS: Record<string, string> = {
  'thrilla-killa': `${DL_BASE}/Merely.-.Thrilla.Killa.zip`,
  'merely-rocks': `${DL_BASE}/Merely.-.Merely.Rocks.I.zip`,
  'merely-rocks-2': `${DL_BASE}/Merely.-.Merely.Rocks.II.zip`,
  'daze': `${DL_BASE}/Merely.-.Daze.zip`,
  'are-you-mental-1': `${DL_BASE}/Merely.-.Are.You.Mental.I.zip`,
  'are-you-mental-2': `${DL_BASE}/Merely.-.Are.You.Mental.II.zip`,
  'get-out': `${DL_BASE}/Merely.-.Get.Out.zip`,
  'merely-lives': `${DL_BASE}/Merely.-.Merely.Lives.zip`,
  'merely-lives-2': `${DL_BASE}/Merely.-.Merely.Lives.2.zip`,
  'dig-this': `${DL_BASE}/Merely.-.Dig.This.zip`,
  'already-dead': `${DL_BASE}/Merely.-.Already.Dead.zip`,
};

const DELIVERY_DIR = 'C:/Users/Andrew/Desktop/Nick/_delivery';

function getLocalPath(releaseId: string): string | null {
  const map: Record<string, string> = {
    'thrilla-killa': 'Merely - Thrilla Killa.zip',
    'merely-rocks': 'Merely - Merely Rocks I.zip',
    'merely-rocks-2': 'Merely - Merely Rocks II.zip',
    'daze': 'Merely - Daze.zip',
    'are-you-mental-1': 'Merely - Are You Mental I.zip',
    'are-you-mental-2': 'Merely - Are You Mental II.zip',
    'get-out': 'Merely - Get Out.zip',
    'merely-lives': 'Merely - Merely Lives.zip',
    'merely-lives-2': 'Merely - Merely Lives 2.zip',
    'dig-this': 'Merely - Dig This.zip',
    'already-dead': 'Merely - Already Dead.zip',
  };
  const file = map[releaseId];
  if (!file) return null;
  const path = join(DELIVERY_DIR, file);
  return existsSync(path) ? path : null;
}

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
    return NextResponse.json(
      { error: 'Invalid or unpaid session' },
      { status: 403 }
    );
  }

  const releaseId = session.metadata?.releaseId;
  if (!releaseId) {
    return NextResponse.json(
      { error: 'No download for this order' },
      { status: 404 }
    );
  }

  // Verify the product still exists (not removed after purchase)
  const product = getProduct(releaseId);
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  // Return GitHub download URL directly (redirects through fetch break in browser)
  const ghUrl = GITHUB_URLS[releaseId];
  if (ghUrl) {
    return NextResponse.json({ url: ghUrl });
  }

  const localPath = getLocalPath(releaseId);
  if (localPath) {
    const buf = readFileSync(localPath);
    const fileName = `${product.name.replace(/\s+/g, '_')}.zip`;
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': String(buf.length),
      },
    });
  }

  return NextResponse.json(
    { error: 'Download not available yet — check back soon' },
    { status: 503 }
  );
}
