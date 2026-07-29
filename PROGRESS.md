# PROGRESS — Merely Artist Site (Version 1)

**Project folder:** `Desktop\Nick\Claude\nick-site`
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Stripe Checkout · GitHub · Vercel
**Artist:** Merely
**Last updated:** Dark-but-warm home page redesign built, awaiting your review

---

## Where we are

| Phase | What it is | Status |
|-------|-----------|--------|
| 0 | Branding & content questions | ✅ Done |
| 1 | Scaffold project, Git, tracking docs | ✅ Done |
| 2 | Visual design system + home page | ✅ Done |
| 3 | Music, merch, about, contact pages | ✅ Done |
| 4 | Stripe Checkout (test mode) | ✅ Built — needs Nick's Stripe account |
| 4b | **Redesign: dark-but-warm home page** | ✅ **Built — REVIEW at localhost:3000** |
| 4c | Roll the warm design out to inner pages | ⬜ After your approval |
| 5 | Deploy staging site to Vercel | ⬜ Next (previous attempt failed — will diagnose via Vercel CLI) |
| 6 | Launch: domain, Stripe live mode, policies, testing | ⬜ Not started |

## What changed in the redesign (4b)

- **Palette:** cold chrome/blood red replaced with warm amber (#c4631f) on
  brown-warmed blacks. Amber passes WCAG AA at ~4.8:1; buttons are amber
  with dark ink text.
- **Type:** Bebas Neue replaced with Anton (self-hosted woff2, 18 KB).
- **Home hero:** full-screen rabbit artwork, staggered load-in, massive
  ember-gradient name, Thrilla Killa announcement card with real cover art,
  Stream Now / Buy CTAs.
- **Streaming hub:** 8-service grid — live tiles for real links (YouTube
  today), dimmed "soon" tiles for the rest; a Spotify embed appears
  automatically once a Spotify artist URL exists in site.ts.
- **Floating player:** bottom-left chip previews the newest release's
  first track on every page.
- **Header:** MERELY wordmark with amber full stop, social icon row, and a
  Subscribe button that appears when a newsletter URL is set in site.ts.
- **Brand panel:** the rejected barbed-wire banner was replaced with a
  pure-typography poster component (BrandPanel.tsx) — sharp at any size.
- **Removed per feedback:** tour dates section, all booking references.
- **Copy truthfulness:** tagline is now "Thrilla Killa — out now"; genre and
  bio no longer claim "first releases coming" next to 11 albums.

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
