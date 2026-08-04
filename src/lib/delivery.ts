import { stripe as stripeClient } from './stripe';

export async function verifyCheckoutSession(sessionId: string): Promise<{
  session: any;
  error: string;
}> {
  if (!sessionId) return { session: null, error: 'no sessionId' };
  const stripe = stripeClient;
  if (!stripe) return { session: null, error: 'no stripe client (missing STRIPE_SECRET_KEY)' };
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) return { session: null, error: 'session null from API' };
    if (!session.metadata?.releaseId) return { session: null, error: 'no releaseId in metadata' };
    return { session, error: '' };
  } catch (e: any) {
    return { session: null, error: e?.message || String(e) };
  }
}
