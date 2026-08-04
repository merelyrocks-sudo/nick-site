import type { Stripe } from 'stripe';
import { stripe as stripeClient } from './stripe';

type VerifyResult = { session: Stripe.Checkout.Session; error?: undefined } | { session: null; error: string };

export async function verifyCheckoutSession(sessionId: string): Promise<VerifyResult> {
  if (!sessionId) return { session: null, error: 'no sessionId' };
  const stripe = stripeClient;
  if (!stripe) return { session: null, error: 'no stripe client (missing STRIPE_SECRET_KEY)' };
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) return { session: null, error: 'session null from API' };
    if (!session.metadata?.releaseId) return { session: null, error: 'no releaseId in metadata' };
    return { session };
  } catch (e: any) {
    return { session: null, error: e?.message || String(e) };
  }
}
