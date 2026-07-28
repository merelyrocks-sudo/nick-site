# PROGRESS — Merely Artist Site (Version 1)

**Project folder:** `Desktop\Nick\Claude\nick-site`
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Stripe Checkout · GitHub · Vercel
**Artist:** Merely
**Last updated:** Phase 4 complete — Stripe wired, awaiting your keys

---

## Where we are

| Phase | What it is | Status |
|-------|-----------|--------|
| 0 | Branding & content questions | ✅ Done (answers pending, placeholders in use) |
| 1 | Scaffold project, Git, tracking docs | ✅ Done |
| 2 | Visual design system + home page | ✅ Done |
| 3 | Music, merch, about, contact pages | ✅ **Done** |
| 4 | Stripe Checkout (test mode) | ✅ **Built — needs your Stripe account** |
| 5 | Deploy staging site to Vercel | ⬜ Next |
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

## Phase 2 — Complete ✅

- [x] Dark cinematic design system — all tokens in `globals.css`
- [x] Self-hosted typefaces (Instrument Serif + Inter) installed via npm, **not** Google Fonts
- [x] Site shell: sticky header that fades in on scroll, accessible mobile menu, full footer
- [x] Home page hero: full-bleed image, artist name, tagline, listen + shop actions
- [x] Home page sections: featured music, about preview, listen/follow strip, contact
- [x] Placeholder PNGs generated at exact target dimensions
- [x] Stub pages for every nav and footer link, so nothing 404s mid-build
- [x] Responsive at phone / tablet / desktop
- [x] Accessibility: skip link, one `h1`, ordered headings, alt text on every image,
      `aria-expanded` on the menu, `aria-current` on the active page, visible focus rings,
      `prefers-reduced-motion` respected
- [x] Colour contrast measured against WCAG AA — `bone-faint` was failing at 3.6:1
      and was lightened to 4.96:1

## Phase 3 — Complete ✅

- [x] `/music` — full release grid with artwork and per-release streaming links
- [x] `/merch` — apparel and physical products, with keyboard-accessible size picker
- [x] `/store` — digital downloads, with the manual-delivery expectation set clearly
- [x] `/about` — full bio, sticky portrait on desktop
- [x] `/contact` — email-first, no form (see note below)
- [x] `PageHeader` component so every inner page shares one masthead and one `h1`
- [x] `ProductCard` component with a Buy button that stays disabled until a real
      Stripe price ID exists — never a live-looking button that fails
- [x] Empty states everywhere: no releases, no products, no links all render
      deliberate copy instead of blank gaps
- [x] Verified: 10 routes, all 200, exactly one `h1` each, zero images missing alt

**Why there is no contact form:** a form needs a server to receive it, spam
filtering, and somewhere to store or forward messages — all Version 2 work. A
plain email address arrives reliably, works everywhere, and gives the sender
their own copy. The form gets built when there is a reason for it.

Policy pages (Privacy, Terms, Refunds, Shipping) remain placeholders until
Phase 6, as planned.

## Phase 3.5 — Real catalogue + audio previews ✅

- [x] 11 albums imported with real cover art
- [x] 150 preview clips generated from Nick's masters (30s, 53MB)
- [x] Real track listings recovered from Nick's own Google Docs for 6 albums
- [x] `/music/[id]` album page per release, statically pre-rendered
- [x] `TrackList` player: one shared audio element, keyboard accessible
- [x] Are You Mental removed — no audio, nothing to play or sell
- [x] No song titles invented; unknown tracks show "Track N"

## Phase 4 — Stripe Checkout ✅ (needs your account to switch on)

- [x] Stripe SDK installed
- [x] `/api/checkout` creates a Checkout Session
- [x] Price comes from Stripe, never from the browser — cannot be tampered with
- [x] Size validated against the product's real size list
- [x] Shipping address collected for physical goods only
- [x] Buy buttons wired across album pages, store, and merch
- [x] Order success and cancelled pages
- [x] Products with no Stripe price ID show a disabled button, never a broken one
- [x] `npm run stripe:setup` creates all 14 products and writes the price IDs
      back automatically; refuses live keys, safe to run twice
- [ ] **You:** create Stripe account, paste test keys, run the setup script
- [ ] **You:** test with card `4242 4242 4242 4242`

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
