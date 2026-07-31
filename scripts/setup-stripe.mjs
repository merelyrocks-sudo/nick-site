/**
 * Creates every product from src/content/site.ts in Stripe, then writes the
 * resulting price IDs back into that file automatically.
 *
 * WHY THIS EXISTS
 * ---------------
 * There are more than a dozen products. Creating each one by hand in the
 * Stripe Dashboard and copying its price ID across is slow and easy to get
 * wrong — one mismatched ID means a customer is charged the wrong amount.
 * This does it in one command and cannot mistype.
 *
 * HOW TO RUN
 *   npm run stripe:setup
 *
 * SAFETY
 * ------
 *  - Reads your secret key from .env.local. The key is never printed and
 *    never leaves your computer.
 *  - Refuses to run with a live key unless you pass --live, so you cannot
 *    accidentally create real products while testing.
 *  - Skips any product that already has a price ID, so running it twice is
 *    harmless and will not create duplicates.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Stripe from 'stripe';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const SITE = path.join(root, 'src/content/site.ts');

// --- read the key from .env.local without needing an extra dependency ------
function readEnvLocal() {
  const p = path.join(root, '.env.local');
  if (!fs.existsSync(p)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(p, 'utf8')
      .split('\n')
      .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('='))
      .map((l) => {
        const i = l.indexOf('=');
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      })
  );
}

const env = readEnvLocal();
const key = env.STRIPE_SECRET_KEY;
const live = process.argv.includes('--live');

if (!key) {
  console.error(`
  No STRIPE_SECRET_KEY found in .env.local

  Open the file .env.local in this folder and paste your Stripe secret key
  after the "=" on the line marked [2]. It starts with sk_test_ (or
  rk_test_ if you were invited as a team member with a restricted key).
`);
  process.exit(1);
}

// Stripe issues two kinds of secret-style key: a full "sk_" secret key (the
// account owner sees this), and a "rk_" restricted key (what an invited
// team member gets — scoped to their own permissions). Both come in test
// and live flavors, and both must be blocked here if they're live.
const isLive = key.startsWith('sk_live_') || key.startsWith('rk_live_');
const isTest = key.startsWith('sk_test_') || key.startsWith('rk_test_');

if (isLive && !live) {
  console.error(`
  That is a LIVE key (${key.startsWith('rk_') ? 'restricted key' : 'secret key'}).
  This would create real products customers can buy with real money.

  In the Stripe Dashboard, toggle to Test mode (top right) before copying
  the key. A test key starts with sk_test_ or rk_test_.

  If you really mean to do this on the live account, run:
    npm run stripe:setup -- --live
`);
  process.exit(1);
}

const stripe = new Stripe(key);
const mode = isTest ? 'TEST' : isLive ? 'LIVE' : 'UNKNOWN';

// --- pull the products straight out of site.ts ----------------------------
const source = fs.readFileSync(SITE, 'utf8');
const blocks = [...source.matchAll(/\{\s*\n\s*id: '([\w-]+)',[\s\S]*?\n  \},/g)]
  .map((m) => ({ block: m[0], id: m[1] }))
  .filter((b) => /priceCents:/.test(b.block));

function field(block, name) {
  const m = block.match(new RegExp(`${name}: '((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1].replace(/\\'/g, "'") : '';
}
function num(block, name) {
  const m = block.match(new RegExp(`${name}: (\\d+)`));
  return m ? Number(m[1]) : 0;
}

console.log(`\n  Stripe ${mode} mode — ${blocks.length} products found\n`);

let created = 0;
let skipped = 0;
let updated = source;

for (const { block, id } of blocks) {
  const existing = field(block, 'stripePriceId');
  if (existing) {
    console.log(`  · ${id} — already has a price, skipped`);
    skipped++;
    continue;
  }

  const name = field(block, 'name');
  const description = field(block, 'description');
  const priceCents = num(block, 'priceCents');

  if (!priceCents) {
    console.log(`  ! ${id} — no price set, skipped`);
    skipped++;
    continue;
  }

  let product, price;
  try {
    product = await stripe.products.create({
      name,
      description: description || undefined,
      metadata: { siteProductId: id },
    });

    price = await stripe.prices.create({
      product: product.id,
      unit_amount: priceCents,
      currency: 'usd',
    });
  } catch (err) {
    // Save whatever succeeded before stopping, so a failure halfway through
    // does not lose the price IDs already created.
    if (created > 0) fs.writeFileSync(SITE, updated, 'utf8');

    const msg = err?.raw?.message ?? err?.message ?? String(err);
    if (err?.type === 'StripeAuthenticationError') {
      console.error(`
  Stripe rejected the key.

  Check that STRIPE_SECRET_KEY in .env.local is copied in full, with no
  quote marks and no spaces around the "=". It should start with sk_test_
  or rk_test_ (a restricted key, if you were invited as a team member).
`);
    } else {
      console.error(`\n  Stripe error while creating "${name}":\n  ${msg}\n`);
    }
    console.error(`  ${created} product(s) were created and saved before this failed.\n`);
    process.exit(1);
  }

  // Write the new price ID back into that product's own block only.
  const patched = block.replace(/stripePriceId: ''/, `stripePriceId: '${price.id}'`);
  updated = updated.replace(block, patched);

  console.log(
    `  + ${id.padEnd(26)} $${(priceCents / 100).toFixed(2).padStart(6)}  ${price.id}`
  );
  created++;
}

if (created > 0) {
  fs.writeFileSync(SITE, updated, 'utf8');
}

console.log(`
  Done. ${created} created, ${skipped} skipped.
  ${created > 0 ? 'Price IDs were written into src/content/site.ts automatically.' : ''}
  ${created > 0 ? 'Restart the dev server to see the Buy buttons turn on.' : ''}
`);
