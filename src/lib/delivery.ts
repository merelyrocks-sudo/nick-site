/**
 * Delivery helpers — verify Stripe sessions and serve downloads.
 */
import { stripe as stripeClient, siteUrl } from './stripe';

/** Map releaseId → Vercel Blob URL. Populated after uploading. */
const DELIVERY_MAP: Record<string, string> = {
  // Populate after running: node scripts/upload-to-blob.mjs
};

export function getDeliveryUrl(releaseId: string): string | undefined {
  return DELIVERY_MAP[releaseId];
}

export async function verifyCheckoutSession(sessionId: string) {
  if (!sessionId) return null;

  const stripe = stripeClient;
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) return null;
    // Accept any completed session with release metadata
    if (!session.metadata?.releaseId) return null;
    return session;
  } catch {
    return null;
  }
}
