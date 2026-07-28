# PROGRESS — Nick Artist Site (Version 1)

**Project folder:** `Desktop\Nick\Claude\nick-site`
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Stripe Checkout · GitHub · Vercel
**Last updated:** Phase 1 complete

---

## Where we are

| Phase | What it is | Status |
|-------|-----------|--------|
| 0 | Branding & content questions | ✅ Done (answers pending, placeholders in use) |
| 1 | Scaffold project, Git, tracking docs | ✅ **Done** |
| 2 | Visual design system + home page | ⬜ Next — waiting on your approval |
| 3 | Music, merch, about, contact pages | ⬜ Not started |
| 4 | Stripe Checkout (test mode) | ⬜ Not started |
| 5 | Deploy staging site to Vercel | ⬜ Not started |
| 6 | Launch: domain, Stripe live mode, policies, testing | ⬜ Not started |

---

## Phase 1 — Complete ✅

- [x] Next.js 16 + TypeScript + Tailwind v4 + ESLint scaffolded (App Router, `src/` layout)
- [x] Dependencies installed and verified
- [x] `.env.local` created for real secrets — **gitignored, never uploaded**
- [x] `.env.example` created as the committed template
- [x] `.gitignore` adjusted so `.env.example` is committed but `.env.local` never is
- [x] `src/content/site.ts` created — the single file that controls all site content
- [x] Git repository initialized, first commit made
- [x] Production build passes with zero errors

---

## Phase 2 — Next up (needs your approval to start)

- [ ] Dark cinematic design system: colour tokens, typography scale, spacing
- [ ] Site shell: sticky header, mobile nav, footer with policy links
- [ ] Home page hero: artist name, tagline, featured image, listen CTA
- [ ] Home page sections: featured music, short about, social/streaming strip, contact
- [ ] Placeholder artwork generated at correct dimensions
- [ ] Responsive at phone / tablet / desktop
- [ ] Accessibility pass: keyboard navigation, focus rings, alt text, colour contrast

## Phase 3

- [ ] `/music` — full release list with artwork, audio player placeholders, streaming links
- [ ] `/merch` — apparel + physical product cards with size selection
- [ ] `/store` — digital music products
- [ ] `/about` — full bio
- [ ] `/contact` — contact details and form (mailto-based in V1, no backend)
- [ ] Policy pages: Privacy, Terms, Refund, Shipping (placeholder text)

## Phase 4

- [ ] Stripe SDK installed
- [ ] `/api/checkout` route that creates a Checkout Session
- [ ] Buy buttons wired, size passed through as line-item metadata
- [ ] Success and cancel pages
- [ ] Products with no Stripe price ID show a disabled button, not a broken one
- [ ] Tested end-to-end with Stripe test card `4242 4242 4242 4242`

## Phase 5

- [ ] Push to GitHub
- [ ] Import to Vercel, add environment variables
- [ ] Staging URL live and tested on a real phone

## Phase 6

- [ ] Custom domain connected
- [ ] Stripe live mode keys swapped in
- [ ] Real policy text reviewed
- [ ] Full pre-launch test pass

---

## Explicitly NOT in Version 1

These come in V2, after V1 is live and proven:

- Admin dashboard
- Database
- Customer login / accounts
- Inventory tracking
- **Automatic digital music delivery** — in V1 you email files to buyers manually
- Email newsletter capture
- Tour date management

---

## Known decisions

| Decision | Choice | Why |
|---|---|---|
| Visual direction | Dark & cinematic | Chosen in Phase 0 |
| Product management | Stripe Dashboard only | No database needed in V1 |
| Digital delivery | Manual email | Keeps V1 shippable; automated in V2 |
| `node_modules` location | Not committed | Standard; you install it locally with one command |
| Content editing | Single file `src/content/site.ts` | So you can update the site without touching code |
