import Stripe from 'stripe';

/**
 * The Stripe client, created once and shared.
 *
 * This file is SERVER ONLY. The secret key must never reach the browser.
 * Next.js enforces that by refusing to bundle a non-NEXT_PUBLIC_ environment
 * variable into client code, but the rule matters: never import this from a
 * file that has 'use client' at the top.
 */

const key = process.env.STRIPE_SECRET_KEY;

/** True when a Stripe secret key is configured. */
export const stripeConfigured = !!key && key.trim() !== '';

// No apiVersion pinned — the installed SDK version decides it, so this cannot
// drift out of sync when the package is updated.
export const stripe = stripeConfigured ? new Stripe(key!) : null;

/**
 * The address Stripe sends buyers back to.
 * Falls back to localhost so checkout works during development without setup.
 */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'http://localhost:3000'
  );
}

/** True when the configured key is a test key, not a live one. */
export function isTestMode(): boolean {
  return !!key?.startsWith('sk_test_');
}
