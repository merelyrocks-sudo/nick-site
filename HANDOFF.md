# Handoff — Merely (artist site)

Next.js 16 (App Router) + TypeScript + Tailwind CSS. Stripe Checkout (test mode). Deployed via Vercel, connected to GitHub repo `merelyrocks-sudo/nick-site`.

## 1. Current state

**Working tree is clean and fully in sync with `origin/main` (verified 2026-07-30) — nothing unpushed.**

Site is live at **https://merely-rocks.vercel.app** (see PROGRESS.md Phase 5).
Home page and inner pages were redesigned since this doc was last accurate:
warm amber/brown palette (not the black/red/chrome described further below —
see PROGRESS.md §"What changed in the redesign (4b)" for the current look).
Spotify, Apple Music, YouTube, Instagram, TikTok, and X links are live in
`site.ts`. Soundcloud, Bandcamp, and a Facebook Page are still genuinely
TODO — Nick confirmed (2026-07-30) none of those three exist yet, so they
stay hidden until he has them; don't ask again until he brings it up.
Real Privacy/Terms/Refunds/Shipping policy text has been written (was
placeholder as of the section below).

**Stripe test-mode products now exist.** All 14 products (11 digital albums +
3 merch placeholders) have real `stripePriceId` values in `site.ts` — verified
2026-07-30, zero empty. `npm run stripe:setup` has already been run against a
test key. The §"Not done" bullet below claiming otherwise is obsolete.

**Live checkout works (fixed 2026-07-30).** The Vercel project previously had no
Stripe environment variables, so deployed Buy buttons rendered enabled but
`POST /api/checkout` returned `503 {"error":"Payments are not set up yet."}` —
`.env.local` is gitignored and never reaches Vercel. Resolved: all three vars
(`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
`NEXT_PUBLIC_SITE_URL=https://merely-rocks.vercel.app`) set on the Vercel project
`merely/merely-rocks` across Production/Preview/Development via the Vercel CLI,
then redeployed. Verified: `/api/checkout` returns `200` with a real
`checkout.stripe.com/c/pay/...` session URL.

**Store deliberately closed (2026-07-31).** `storeEnabled = false` in
`src/content/site.ts`. Buy buttons render greyed "Coming soon" and
`/api/checkout` returns `503 The store is not open yet` before it reaches
Stripe — checked server-side as well as in the UI, so a disabled button isn't
the only thing stopping a purchase. Reason: the site is being shown to real
people while Stripe is still in test mode, and a visitor reaching a Stripe page
stamped "TEST MODE" looks broken. **This is a one-line reversal** — set it to
`true`, commit, push. Price IDs and Vercel env vars are unaffected. Do NOT
interpret a greyed-out Buy button as the Stripe integration being broken; it
was verified working before being switched off.

**Standing gotcha:** these Vercel vars do not sync with `.env.local`. Any time
the keys change locally — notably the test→live switch — they must be updated in
Vercel separately and the project redeployed, or checkout breaks live while
still working on localhost.

Built and passing (`npx tsc --noEmit` clean, `npm run build`, 27 routes) as of the last commit:

- Pages: home, `/music`, `/music/[id]` (11 album detail pages, `generateStaticParams`), `/store`, `/merch`, `/about`, `/contact`. Policy pages (`/privacy`, `/terms`, `/refunds`, `/shipping`) exist as routes but have placeholder/no real legal text yet.
- Content-as-code: all site text/data lives in `src/content/site.ts`, the only file meant for non-developer edits.
- 11 real albums imported with cover art; 3 have full real track listings, rest fall back to "Track N" placeholders (never invented titles).
- 131 audio preview clips generated (30s, mono, 96kbps, fade in/out) at `public/audio/previews/<release-id>/NN.mp3`.
- Stripe Checkout wired end-to-end: `src/lib/stripe.ts`, `src/app/api/checkout/route.ts` (server-side price lookup, never trusts client price), `src/components/BuyButton.tsx`, `src/components/TrackList.tsx` (single shared `<audio>` element, accessible).
- `scripts/setup-stripe.mjs` (`npm run stripe:setup`) — idempotent script that reads `STRIPE_SECRET_KEY` from `.env.local`, creates a Stripe Product+Price for every product in `site.ts` missing a `stripePriceId`, writes the IDs back into `site.ts`. Refuses to run with a live key unless `--live` is passed.
- Design: black/deep-red/chrome palette (see §3). Official brand icons (Spotify, Apple Music, YouTube, YouTube Music, SoundCloud, Bandcamp, Instagram, TikTok, X, Facebook) baked into `src/components/BrandIcon.tsx` as static SVG path data — extracted from `simple-icons` at build time, package then uninstalled, zero runtime dependency.
- Scroll-reveal animations (`src/components/Reveal.tsx`) with explicit graceful degradation: if `IntersectionObserver` is unsupported or the user has `prefers-reduced-motion`, content shows immediately — a decorative animation must never be able to permanently hide real content.
- Fonts self-hosted as raw `.woff2` in `public/fonts/` with plain `@font-face` (not npm font packages — that broke builds repeatedly, see §4 lessons).
- `.env.local` (gitignored) has placeholder lines for Stripe keys; `.env.example` is the committed template.

**Not done:**

- ~~**Stripe products not yet created.** Every `stripePriceId` in `site.ts` is `''`.~~ — **resolved 2026-07-30**: all 14 products created in Stripe **test mode**, price IDs written into `site.ts`, Buy buttons enabled. Still test mode — no real money. Live mode is blocked on Nick completing Stripe's banking/tax verification.
- ~~**Vercel env vars not set**~~ — **resolved 2026-07-30**, see §1. Live checkout now reaches Stripe successfully.
- ~~Vercel deployment status unconfirmed~~ — **resolved**: live and confirmed at https://merely-rocks.vercel.app, auto-deploy on every push to `main` (see PROGRESS.md).
- No domain purchased yet (deferred intentionally, see §3).
- No Tour/Shows section (was in the user's design spec, never built).
- No embedded Spotify/Bandcamp player (needs a real Spotify artist URL, which doesn't exist yet).
- Real merch products (shirt, hoodie, vinyl) exist in `site.ts` but are `available: false` — placeholders only, per instruction not to create fake Stripe products.

## 2. Real content given in chat, not yet (or only partly) in the repo

**Everything below marked "IN REPO" is already in `src/content/site.ts`. Anything else is real content mentioned in conversation but not yet added anywhere — check chat history/uploaded files before inventing a replacement.**

- Artist name: **Merely** — IN REPO
- Contact email: **merelyrocks@gmail.com** — IN REPO (public, in footer/contact page)
- Instagram: **https://www.instagram.com/merelyrocks/** — IN REPO
- YouTube (real channel, not the CD Baby auto-generated one): **https://www.youtube.com/channel/UCCbGnstwWpe-dT4TEoR3nig** — IN REPO
- Digital album price: **$9.99 (999 cents) per album**, confirmed explicitly by the user ("9.99 is fine") — IN REPO on all 11 digital products
- Old CD Baby playlists (kept in code comments, deliberately not linked live — see §3): `Already Dead` — `https://www.youtube.com/playlist?list=OLAK5uy_nSBOnip5qMbuWOP4q8mSZKi45-3eB1GCY`; `Dig This` — `https://www.youtube.com/playlist?list=OLAK5uy_n6PI_9PPFRQIK6Mt5rKzfE-kqVTe6Dr6Y`
- GitHub account in use: **merelyrocks-sudo** (not VampVFX115 — that account's remote was deliberately removed)
- Discography (11 albums, newest first) — IN REPO: Thrilla Killa (2026), Merely Rocks II (2025), Merely Rocks I (2024), Daze (2023, full 15 titles), Are You Brutal 2 (2020), Are You Brutal (2019), Get Out (2021 — Nick confirmed 2026-07-30: recorded 2021, released 2022, but display 2021; full 12 titles), Merely Lives 2, Merely Lives (full 11 titles), Dig This (full 17 titles), Already Dead (12 of 14 titled — see gap below)
- **Naming note (Nick, 2026-07-30):** the two-part albums use Roman numerals — "Merely Rocks I" / "Merely Rocks II" — not "Part One/Two" or a bare "2". Apply the same convention to any other multi-part release (e.g. Are You Brutal / Are You Brutal 2 → "Are You Brutal I" / "Are You Brutal II") once Nick confirms he wants that one changed too — he hasn't said so explicitly yet, only spoke to the Merely Rocks pair.
- **Not in repo / still needed from Nick:**
  - Spotify, Apple Music, SoundCloud, Bandcamp, TikTok, X, Facebook links — all currently `''` (hidden)
  - Track titles for Thrilla Killa, Merely Rocks I, Merely Rocks II, Are You Brutal, Are You Brutal 2
  - Release years for Merely Lives, Merely Lives 2, Dig This, Already Dead
  - Cover art for Are You Brutal and Are You Brutal 2 (none found in source files)
  - A larger scan of the Get Out cover (current source is only 281×281px)
  - Track titles 13–14 of Already Dead (source file has 14 tracks, only 12 titles were ever documented)
  - Merely Rocks tracklist count mismatch: Nick's document lists 26 tracks, the audio folder has 30 files — unresolved, flagged not guessed
  - Real merch product details: names, prices, descriptions, photos for the T-shirt/hoodie/vinyl (currently `available: false` placeholders)
  - Any bio/story facts beyond the deliberately-generic placeholder bio currently in `site.ts` (the bio was written to contain zero invented facts — no fake cities, credits, or history — specifically so it reads honestly until Nick supplies the real story)
  - Booking email / location (both optional fields, currently blank)

## 3. Design and content decisions made — including what was rejected

- **Rejected: "dark cinematic" v1 design** → user asked for harder/colder.
- **Rejected: black/white monochrome, Bebas Neue-only look** → user called it "trash," asked for "moody but lively."
- **Rejected: charcoal + hot magenta palette** ("Bold and loud" per AskUserQuestion) → user said "rough, not what I'm looking for."
- **Current, approved-in-progress design: black / deep-red / chrome**, built directly from a detailed rock-musician website spec the user pasted (explicit brief: black/deep-red/chrome palette, official brand icons via simple-icons, specific section structure, accessibility/responsive requirements). This is the current live design — not yet confirmed by the user as final.
- **Accessibility decision:** red-on-black measures 3.4:1 contrast, which fails WCAG AA for body text. Decision made unilaterally (not user-specified) to restrict red to fills/rules/large display text only; body text uses off-white/silver tones (bone/bone-dim/bone-faint, 17.4:1 / 9.1:1 / 5.6:1); red buttons use white text (5.9:1) rather than red text on a dark button.
- **CD Baby / royalty issue:** the old auto-generated "Merely - Topic" YouTube channel and its playlists are tied to a CD Baby distribution account Nick no longer controls — plays through those links credit someone else's account. User decision: "keep cd baby and work with it and around it," then later explicitly: "no I want them to be previewed and bought off the site through stripe." Resolution: old playlist links removed from the live site (preserved only in code comments), replaced with a fully self-hosted preview-and-buy model with no dependency on the old distributor account.
- **No admin dashboard, database, login, inventory tracking, or automated digital delivery in V1** — explicit original scope decision. Digital delivery in V1 is manual (Stripe sends a receipt/customer record; Nick fulfills). This is a deliberate V2 deferral, not an oversight.
- **No contact form in V1** — decision documented in code comments in `src/app/contact/page.tsx`: a form needs a server, spam filtering, and storage, which is V2 scope; a plain mailto link is more reliable for now.
- **Track titles never invented.** Any unknown title renders as "Track N" rather than a guess — this rule is enforced in `trackTitle()` in `site.ts` and should not be changed to "helpfully" fill gaps.
- **Placeholder merch hidden, not deleted** (`available: false`) specifically so no fake Stripe products get created by the setup script until real merch exists.
- **Domain purchase deliberately deferred** until Stripe is tested end-to-end on the free `.vercel.app` URL — user was leaning toward this on my recommendation, not yet decided.
- **Account ownership split, explicitly clarified by the user:** GitHub and Vercel are Andrew's own accounts (just plumbing/hosting); **Stripe must be Nick's own account** (merelyrocks@gmail.com) because it involves real banking and tax information.

## 4. Open questions / blockers

- ~~**ACTIVE BLOCKER — Vercel environment variables**~~ — **resolved
  2026-07-30.** All three vars set across all environments, redeployed, live
  checkout verified reaching Stripe. Note `NEXT_PUBLIC_SITE_URL` is
  intentionally different from `.env.local`'s localhost value — using localhost
  in Vercel would send paying customers to a dead page after checkout.
- **Next action (small):** complete one test purchase on the live URL with card
  `4242 4242 4242 4242` and confirm it lands in Nick's Stripe Dashboard with the
  album name in the order metadata. Nothing blocks this.
- **Blocker (live payments only):** Nick has a Stripe account and test keys
  work, but has not completed Stripe's account verification (banking/tax).
  Until then the store is test-mode only. Test mode is fully functional.
- ~~Nick has not yet created his own Stripe account~~ — resolved.
- ~~Vercel deployment success was never confirmed~~ — resolved: live and
  confirmed serving current content at https://merely-rocks.vercel.app.
- ~~Unpushed commits~~ — resolved: working tree clean, `main` in sync with
  `origin/main` (verified 2026-07-30).
- **Design:** the current live look is the warm amber/brown palette, not the
  black/red/chrome described in §3 — §3 is a historical record of the decision
  trail and has not been rewritten. Still not explicitly signed off by the user.
- **Merely Rocks track count mismatch** (26 documented vs. 30 audio files) needs Nick to listen and clarify — don't guess which 4 files are extras/alternates.
- **Already Dead tracks 13–14** are unidentified audio with no documented titles — same, needs Nick.
- Whether Nick wants the old CD Baby playlists linked back in at all, given the royalty-crediting issue, is still an open call for him — currently resolved by omission, not by an explicit final decision.

## 5. Planned next steps, Phases 4–6

(Numbering follows the project's own phase structure referenced in PROGRESS.md / SETUP-TASKS.md.)

**See LAUNCH.md for the operational version of this. Summary:**

**Phase 4 — Stripe test mode ✅ done:**
1. ~~Nick creates a Stripe account~~ ✅
2. ~~Test secret key into `.env.local`~~ ✅
3. ~~Run `npm run stripe:setup`~~ ✅ — 14 products created, price IDs written
4. Test purchase with `4242 4242 4242 4242` — **pending**, blocked on the Vercel
   env var fix below (must be tested against the live URL, not just localhost)

**Phase 5 — make the live site actually transact (the current work):**
1. Add the three env vars in Vercel, applied to all environments.
2. Redeploy (env vars only take effect on a new build).
3. Confirm `POST /api/checkout` returns a `checkout.stripe.com` URL, not a 503.
4. Complete a test purchase on the live URL; confirm it appears in Nick's Stripe
   Dashboard with the album name in the order metadata.

**Phase 6 — real money + domain (both optional, any order):**
1. Nick finishes Stripe verification → live key → `npm run stripe:setup -- --live`
   → commit the new price IDs → swap the keys in Vercel → redeploy.
   Remember Stripe prices are immutable: get $9.99 right before going live.
2. Domain purchase remains deliberately deferred. `.vercel.app` is fine; adding
   a domain later requires only a DNS change and a `NEXT_PUBLIC_SITE_URL` update.

**Phase 6 — Content completion + polish:**
1. Fill remaining content gaps listed in §2 as Nick supplies them (track titles, years, cover art, streaming links, real bio, real merch).
2. Write real legal text for `/privacy`, `/terms`, `/refunds`, `/shipping` (currently placeholder routes).
3. Get user sign-off on the current red/chrome design or iterate again.
4. Build the Tour/Shows section (in original spec, not yet built): list of dates or "No shows currently — stay tuned."
5. Add an embedded Spotify/Bandcamp player once a real Spotify artist URL exists.
6. Enable the 3 merch products (set `available: true`) once real product details and Stripe entries exist for them.
7. Reconcile the Merely Rocks and Already Dead track-count gaps with Nick directly, then update `site.ts`.
