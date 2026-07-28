# SETUP-TASKS — Things only Andrew can do

Every account, key, and click that I cannot do for you. Nothing here is urgent
until the phase listed in the **Needed by** column.

**Security rule, no exceptions:** never paste a password, a secret key
(`sk_...`), bank details, or tax details into the chat. Secrets go into
`.env.local` on your computer, and I will tell you the exact line number.

---

## Status board

| # | Task | Needed by | Status |
|---|------|-----------|--------|
| 0 | Install Node.js, then run `npm install` | **Now** — to view the site | ⬜ Do this first |
| 1 | Send me Merely's real content (name, tagline, bio, links) | Phase 2 | ⬜ Waiting on you |
| 2 | Send me real photos and cover artwork | Phase 2–3 | ⬜ Waiting on you |
| 3 | Create a Stripe account | Phase 4 | ⬜ Not started |
| 4 | Create products in Stripe test mode | Phase 4 | ⬜ Not started |
| 5 | Paste Stripe **test** keys into `.env.local` | Phase 4 | ⬜ Not started |
| 6 | Create a GitHub account | Phase 5 | ⬜ Not started |
| 7 | Create a Vercel account and import the repo | Phase 5 | ⬜ Not started |
| 8 | Buy a domain name | Phase 6 | ⬜ Not started |
| 9 | Activate Stripe live mode (business + bank details) | Phase 6 | ⬜ Not started |
| 10 | Review policy text before launch | Phase 6 | ⬜ Not started |

---

## 0. Install Node.js and run `npm install` — *do this now*

This is what lets you actually open the site on your own screen. Full
step-by-step instructions are in `README.md`, section "Running the site on your
own computer". Short version:

1. Install the **LTS** version from **https://nodejs.org**
2. Open the `nick-site` folder, type `cmd` in the address bar, press Enter
3. Run `npm install`, then `npm run dev`
4. Open **http://localhost:3000**

I already verified the project builds cleanly, so if something fails here it is
an environment issue on your machine — tell me the error text and I will fix it.

---

## 1. Send me Merely's real content — *needed for Phase 2*

Reply in the chat with whatever you have. Missing items stay as visible
placeholders and can be filled in any time later — this does not block me.

- Artist name, exactly as it should be displayed
- Tagline — one short line, 3–8 words
- Genre / one-sentence description of the sound
- Bio — a paragraph or two. Rough notes are fine, I will polish them.
- Contact email to publish on the site
- Every social and streaming link that already exists (you mentioned some are done)
- Release list: title, type (Album/EP/Single), year
- Product list: name, price, and type. Example:
  - `Logo Tee — $30 — apparel (S–XXL)`
  - `Debut Album — Vinyl — $28 — physical`
  - `Debut Album — Digital — $10 — digital`

## 2. Send me photos and artwork — *needed for Phase 2–3*

Drop the files into the chat, or into a folder and tell me the name.
Until then I use grey placeholders at the correct sizes, so the layout is
already correct and swapping images later is a drop-in.

| What | Ideal size | Notes |
|---|---|---|
| Hero photo | 2400 × 1600 px, landscape | The big image at the top of the home page. Should look good with text over it. |
| Artist portrait | 1200 × 1500 px, portrait | For the About section |
| Release cover art | 1000 × 1000 px, square | One per release |
| Product photos | 1200 × 1200 px, square | One per product |

JPG or PNG both fine. Send the largest version you have — I will compress them.

---

## 3. Create a Stripe account — *Phase 4*

> Do not start this until I tell you Phase 4 is ready.

1. Go to **https://stripe.com** and click **Sign up**.
2. Use an email you control long-term. This becomes the money account.
3. Verify your email address.
4. When Stripe asks you to "activate your account" with business and bank
   details — **skip it for now**. Test mode works without it. We only activate
   in Phase 6, right before launch.
5. In the Stripe Dashboard, find the **Test mode** toggle in the top right and
   make sure it is **ON**. Everything in Phase 4 happens in test mode.

## 4. Create products in Stripe test mode — *Phase 4*

Exact click-by-click steps will be given in Phase 4. In short: for each product
you create a Product with a Price, then copy its **Price ID** (looks like
`price_1AbCdEfGhIjK`). Price IDs are **not secret** — it is fine to paste those
in the chat, and I will put them in the right place in the code.

## 5. Paste Stripe test keys into `.env.local` — *Phase 4*

> **Never paste `sk_test_...` or `sk_live_...` into the chat.**

1. In the Stripe Dashboard with **Test mode ON**, go to **Developers → API keys**.
2. Open the file `Desktop\Nick\Claude\nick-site\.env.local` in Notepad.
3. Copy the **Publishable key** (starts `pk_test_`) and paste it directly after
   the `=` on the line marked `[1]`.
4. Click **Reveal test key** for the **Secret key** (starts `sk_test_`) and paste
   it directly after the `=` on the line marked `[2]`.
5. Save the file. Do not add quote marks or spaces.
6. Tell me "keys are in" — I will verify they work without ever seeing them.

---

## 6. Create a GitHub account — *Phase 5*

1. Go to **https://github.com** → **Sign up**.
2. Pick any username. Free plan is all we need.
3. Verify your email.
4. Tell me your username. That is not secret.
5. I will give you the exact commands to upload the code.

## 7. Create a Vercel account — *Phase 5*

1. Go to **https://vercel.com** → **Sign Up**.
2. Choose **Continue with GitHub** — this links the two automatically.
3. Approve the permissions GitHub asks for.
4. Free "Hobby" plan is enough. Do not add a payment method.
5. I will then give you the exact import steps and the environment variables to paste.

---

## 8. Buy a domain name — *Phase 6*

- Cost is roughly **$10–20 per year** for a `.com`.
- Recommended registrars: **Cloudflare** (cheapest, no upselling) or **Namecheap**.
- Buy the domain only — decline hosting, email, SSL, and privacy upsells.
  Vercel provides hosting and SSL free, and privacy is included at both registrars.
- Tell me the domain once purchased and I will give you the exact DNS records.

## 9. Activate Stripe live mode — *Phase 6*

This is the step where Stripe legally must collect real information from you.
It will ask for business details, your bank account, and tax information.

- **Enter these on the Stripe website only.** Never in this chat.
- Expect it to take 10–20 minutes.
- Payouts typically start 2–7 days after your first live sale.

## 10. Review policy text — *Phase 6*

I will write plain-English Privacy, Terms, Refund, and Shipping policies as a
starting point. You must read them and adjust to match what you will actually
do — especially the refund window and shipping times.

I am not a lawyer and these are templates, not legal advice. For a small merch
store they are usually adequate, but if you expect significant volume or sell
into the EU/UK, have a professional look at them.
