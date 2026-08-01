# LAUNCH — the last steps to a working store

## ✅ RESOLVED 2026-07-30 — the store is live and taking (test) payments

The blocker described below has been fixed. For the record, what was wrong:

> The live site's Buy buttons looked enabled but did nothing.
> `POST /api/checkout` returned `503 {"error":"Payments are not set up yet."}`
> because `.env.local` is gitignored and Vercel had never seen the Stripe keys.

**What was done:**

1. All three environment variables set in the Vercel project `merely/merely-rocks`
   via the Vercel CLI, across Production, Preview and Development. The two Stripe
   values were read directly out of `.env.local` and piped to the CLI — they were
   never displayed, logged, or pasted anywhere.
2. `NEXT_PUBLIC_SITE_URL` set to `https://merely-rocks.vercel.app` (deliberately
   *not* the localhost value from `.env.local`).
3. Redeployed to production (`vercel --prod`). Build clean, TypeScript clean,
   27 routes, aliased to https://merely-rocks.vercel.app.

**Verified after deploy:** `POST /api/checkout` now returns `200` with a real
`https://checkout.stripe.com/c/pay/...` session URL, for multiple products.

**The only thing left in test mode is you completing one fake purchase** — see
"Then: test a fake purchase" below. After that, the remaining work is switching
Stripe to live keys, which needs Nick's account verification.

---

<details>
<summary>Original instructions — kept for reference, and for when you switch to live keys</summary>

## Fix it — Vercel Environment Variables

Do this in **your** Vercel account (Vercel and GitHub are yours; Stripe is
Nick's).

1. Go to **https://vercel.com/dashboard** and open the **nick-site** project.
2. **Settings** → **Environment Variables**.
3. Add these three, one at a time. Set each to apply to **Production,
   Preview, and Development** (tick all three boxes).

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | the `sk_test_...` line from your `.env.local` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | the `pk_test_...` line from your `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | `https://merely-rocks.vercel.app` |

> **Copy the two Stripe values straight out of `.env.local`** (open it in
> Notepad). Do not paste them into this chat — not the test key, not the live
> one. If a key ever does end up in a chat window, revoke it in the Stripe
> Dashboard before doing anything else.

> **Note the third one is different from your local file.** `.env.local` has
> `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, which is correct for your
> machine. On Vercel it must be the real URL — otherwise Stripe will try to
> send buyers back to localhost after they pay, and they'll land on a dead page.
> Leave your local file as it is.

4. **Redeploy.** Environment variables only take effect on a new build.
   Vercel → **Deployments** tab → the most recent deployment → **⋯** menu →
   **Redeploy**. Roughly a minute.

5. Confirm `POST /api/checkout` returns a `checkout.stripe.com` URL, not a 503.

</details>

---

## Store is currently CLOSED on purpose

`storeEnabled = false` in `src/content/site.ts` (set 2026-07-31). Every Buy
button is greyed out and reads "Coming soon", and `/api/checkout` returns 503
regardless of what the browser sends. Done so the site could be shown to people
without anyone landing on a Stripe page stamped "TEST MODE".

**To reopen: change that one line to `true`, commit, push.** Nothing else. The
Stripe price IDs and the Vercel environment variables are untouched and still
correct — reopening does not require redoing any of the setup below.

The right moment to flip it is when Nick's Stripe account is verified and live
keys are in place. Reopening it while still in test mode just restores the
"TEST MODE" banner problem.

---

## Then: test a fake purchase (only while `storeEnabled = true`)

Once the redeploy is green, on the **live** site (not localhost):

1. Go to https://merely-rocks.vercel.app/store
2. Click **Buy** on any album — you should land on a Stripe Checkout page
3. Card: `4242 4242 4242 4242` · any future expiry · any CVC · any ZIP
4. Complete it — you should land back on the site's order-success page
5. Check **Nick's Stripe Dashboard** → Payments. The test payment should be
   listed, with the album name and product id in the order metadata

That metadata is how Nick knows which files to email. Digital delivery is manual
in V1 — that was a deliberate scope decision, not something that got missed.

---

## After that, you are launched

The site is genuinely done at that point. It's live, it plays, it sells (in test
mode), the policy pages are real, and the streaming links work.

Two things remain optional and can happen any time, in any order:

### Going live with real money — needs Nick

Order matters here; don't skip ahead.

1. **Nick** completes Stripe's account verification in his own dashboard —
   banking details and tax info. Neither of us can do this for him.
2. **Nick** generates a **live** secret key (same place he made the test one,
   with the dashboard toggled out of test mode).
3. **You** paste it into `.env.local` — into the file, never into chat.
4. **You** run, in PowerShell from the repo folder:

   ```powershell
   cd "C:\Users\Andrew\Desktop\Nick\Claude\nick-site"
   npm run stripe:setup -- --live
   ```

   The `--live` flag is mandatory; the script refuses live keys without it.
   This creates the 14 products again in live mode and writes the new price IDs
   into `site.ts`.

5. **You** commit and push the changed `site.ts`:

   ```powershell
   git add src/content/site.ts
   git commit -m "Switch to Stripe live-mode price IDs"
   git push
   ```

6. **You** update the two Stripe values in Vercel's Environment Variables to the
   live keys, then redeploy. Same screens as above.

7. Test once with a real card and a real $9.99, then refund yourself from the
   Stripe Dashboard.

> **One-way door:** Stripe prices are immutable. Once a product has a
> `stripePriceId`, editing `priceCents` in `site.ts` changes only the number
> displayed on the page — Stripe still charges the old amount. To genuinely
> change a price you create a *new* Price on the existing Stripe Product and
> swap the ID. Get the $9.99 right before you go live.

### A custom domain — optional, any time

The `.vercel.app` URL works fine and costs nothing. If you later buy a domain
(`merely.rocks`, `merelyrocks.com`), you add it in Vercel → Settings → Domains,
point the DNS as Vercel instructs, then change `NEXT_PUBLIC_SITE_URL` to the new
address and redeploy. Nothing needs rebuilding. Deferring this costs you nothing.

---

## Quick reference

| Thing | Where it lives |
|---|---|
| Live site | https://merely-rocks.vercel.app |
| Repo | `merelyrocks-sudo/nick-site` on GitHub |
| All editable content | `src/content/site.ts` — the only file you need to touch |
| Deploys | Automatic on every push to `main`. No separate deploy command. |
| Local secrets | `.env.local`, gitignored, never leaves your machine |
| Vercel secrets | Set separately in the dashboard. **They do not sync.** |
| Stripe account | Nick's (merelyrocks@gmail.com) — banking and tax |
| GitHub + Vercel | Yours — just plumbing |
