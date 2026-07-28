# SETUP-TASKS — Things only Andrew can do

Every account, key, and click that I cannot do for you.

**Security rule, no exceptions:** never paste a password, a secret key
(`sk_...`), bank details, or tax details into the chat. Secrets go into
`.env.local` on your computer, and I tell you the exact line.

---

## Status board

| # | Task | Needed by | Status |
|---|------|-----------|--------|
| 1 | Add social + streaming links | Anytime | ⬜ **Do this now — 2 minutes** |
| 2 | Add the real contact email | Anytime | ⬜ **Do this now — 30 seconds** |
| 3 | Set album prices | Before Stripe | ⬜ Waiting on you |
| 4 | Create a Stripe account | To take payment | ⬜ Not started |
| 5 | Paste Stripe **test** keys into `.env.local` | To take payment | ⬜ Not started |
| 6 | Run `npm run stripe:setup` | To take payment | ⬜ Not started |
| 7 | Test checkout with a fake card | To take payment | ⬜ Not started |
| 8 | Create a GitHub account | To go live | ⬜ Not started |
| 9 | Create a Vercel account | To go live | ⬜ Not started |
| 10 | Buy a domain name | To go live | ⬜ Not started |
| 11 | Activate Stripe live mode | To take real money | ⬜ Not started |
| 12 | Review policy text | Before launch | ⬜ Not started |

---

## 1. Add social + streaming links — *2 minutes*

Open **`src/content/site.ts`** in Notepad. Near the top you'll find two blocks.
Paste each full web address between the quote marks:

```ts
export const streaming = {
  spotify: '',        <-- paste between these quotes
  appleMusic: '',
  youtube: '',
  soundcloud: '',
  bandcamp: '',
};

export const social = {
  instagram: '',
  tiktok: '',
  twitter: '',
  facebook: '',
};
```

Example of a filled-in line:

```ts
  instagram: 'https://www.instagram.com/merelyband',
```

**Rules:**

- Include the `https://` — a link without it will not work
- No trailing slash needed, but harmless
- **Leave anything you don't have as `''`.** Empty links are hidden
  automatically — no dead buttons, no empty gaps

Save the file. The site updates instantly. Links appear in the footer, on the
home page, on About, and on Contact all at once.

---

## 2. Add the real contact email — *30 seconds*

Same file, a little further down:

```ts
export const contact = {
  email: 'hello@example.com',   <-- replace this
```

This address is **published publicly** and appears on four pages. Use one you
are happy to have scraped by spammers — a dedicated address is wise.

---

## 3. Set album prices — *before running Stripe setup*

Every album is currently **$9.99**. In `src/content/site.ts`, scroll to the
album products and change `priceCents`:

```
  priceCents: 999,    means $9.99
  priceCents: 1200,   means $12.00
  priceCents: 700,    means $7.00
```

Write the price **in cents, with no decimal point**.

Do this *before* step 6 — the setup script sends these prices to Stripe, and
changing a price afterwards means creating a new price in Stripe.

The merch items (t-shirt, hoodie, vinyl) are still placeholders. Either set
real names and prices, or set `available: false` to hide them.

---

## 4. Create a Stripe account

1. Go to **https://stripe.com** → **Sign up**
2. Use an email you will control long-term. This becomes the money account.
3. Verify your email address.
4. When Stripe asks you to "activate your account" with business and bank
   details — **skip it**. Test mode works without it. Activate only at step 11.
5. In the Dashboard, find the **Test mode** toggle at the top right and make
   sure it is **ON**.

---

## 5. Paste your test keys into `.env.local`

> **Never paste `sk_test_...` or `sk_live_...` into the chat.**

1. In the Stripe Dashboard, **Test mode ON**, go to **Developers → API keys**
2. Open `nick-site\.env.local` in Notepad
3. Copy the **Publishable key** (starts `pk_test_`) and paste it after the `=`
   on the line marked `[1]`
4. Click **Reveal test key** next to the **Secret key** (starts `sk_test_`) and
   paste it after the `=` on the line marked `[2]`
5. Save

**Format matters.** No quote marks, no spaces around the `=`:

```
STRIPE_SECRET_KEY=sk_test_51Abc...
```

Not:

```
STRIPE_SECRET_KEY = "sk_test_51Abc..."
```

---

## 6. Run the setup script — *one command*

There are 14 products. Rather than create each one by hand in the Dashboard
and copy 14 IDs across without a typo, one command does it:

```
npm run stripe:setup
```

It creates every product and price in Stripe, then writes the price IDs back
into `src/content/site.ts` automatically. You should see something like:

```
  Stripe TEST mode — 14 products found

  + album-thrilla-killa        $ 9.99  price_1AbCdEf...
  + album-merely-rocks-2       $ 9.99  price_1GhIjKl...
  ...
  Done. 14 created, 0 skipped.
```

**It is safe to run twice** — anything already created is skipped, not
duplicated. **It refuses to run with a live key** unless you explicitly force
it, so you cannot create real products by accident.

Then stop the dev server (`Ctrl + C`) and run `npm run dev` again. The Buy
buttons will be live.

---

## 7. Test checkout with a fake card

1. Go to any album page and click **Buy**
2. Stripe's checkout page opens
3. Use these **test card** details — they are not real and charge nothing:

   | Field | Value |
   |---|---|
   | Card number | `4242 4242 4242 4242` |
   | Expiry | any future date, e.g. `12/34` |
   | CVC | any 3 digits, e.g. `123` |
   | Name / address | anything |

4. Complete the purchase → you should land on the **Thank you** page
5. Check **Payments** in the Stripe Dashboard — the order appears, with the
   album name and product id attached

Tell me once this works and I'll move to deployment.

**Also worth testing:** click Buy, then hit back / close checkout. You should
land on the **No charge made** page.

---

## 8. Create a GitHub account — *to go live*

1. **https://github.com** → **Sign up**. Any username. Free plan is fine.
2. Verify your email.
3. Tell me your username — that is not secret.

## 9. Create a Vercel account

1. **https://vercel.com** → **Sign Up**
2. Choose **Continue with GitHub** — this links them automatically
3. Free "Hobby" plan. Do not add a payment method.

## 10. Buy a domain name

- Roughly **$10–20 per year** for a `.com`
- **Cloudflare** (cheapest, no upselling) or **Namecheap**
- Buy the domain only — decline hosting, email, SSL and privacy upsells.
  Vercel gives you hosting and SSL free; privacy is included at both.

## 11. Activate Stripe live mode

Stripe must legally collect real information: business details, bank account,
tax details.

- **Enter these on the Stripe website only.** Never in this chat.
- Takes 10–20 minutes.
- Payouts typically start 2–7 days after the first live sale.
- Then repeat steps 5 and 6 with the **live** keys.

## 12. Review policy text

I'll write plain-English Privacy, Terms, Refund and Shipping policies. You must
read them and adjust to match what you'll actually do — especially the refund
window and shipping times.

I am not a lawyer and these are templates, not legal advice. For a small store
they're usually adequate; if you expect real volume or sell into the EU/UK, have
a professional look.

---

## Still outstanding on content

| Item | Status |
|---|---|
| Track titles for Thrilla Killa, Merely Rocks, Merely Rocks 2, Are You Brutal 1 & 2 | Showing "Track 1…N" |
| Years for Merely Lives, Merely Lives 2, Dig This, Already Dead | Hidden until known |
| Cover art for Are You Brutal 1 & 2 | Showing "artwork coming soon" |
| Better scan of the Get Out cover | Currently 281px, looks soft |
| Already Dead tracks 13 and 14 | Unnamed — the document lists only 12 |
| Merely Rocks tracklist mismatch | Document has 26 titles, folders have 30 files |
| Real merch products | T-shirt/hoodie/vinyl are placeholders |
