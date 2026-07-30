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

Built and passing (`npx tsc --noEmit`, `npm run build`, 27 routes) as of the last commit:

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

- **Stripe products not yet created.** Every `stripePriceId` in `site.ts` is `''`. All Buy buttons currently render "Coming soon" (disabled). Nick needs his own Stripe account before this can move.
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
- Discography (11 albums, newest first) — IN REPO: Thrilla Killa (2026), Merely Rocks 2 (2025), Merely Rocks (2024), Daze (2023, full 15 titles), Are You Brutal 2 (2020), Are You Brutal (2019), Get Out (2017, full 12 titles), Merely Lives 2, Merely Lives (full 11 titles), Dig This (full 17 titles), Already Dead (12 of 14 titled — see gap below)
- **Not in repo / still needed from Nick:**
  - Spotify, Apple Music, SoundCloud, Bandcamp, TikTok, X, Facebook links — all currently `''` (hidden)
  - Track titles for Thrilla Killa, Merely Rocks, Merely Rocks 2, Are You Brutal, Are You Brutal 2
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

- **Blocker:** Nick has not yet created his own Stripe account. Nothing in §"Stripe" can proceed until he does (see SETUP-TASKS.md for the exact non-technical steps already written for him).
- **Blocker/unconfirmed:** Vercel deployment success was never confirmed after the GitHub account-mismatch fix. Verify before doing more design work on top of it.
- **Unpushed commits:** the two most recent commits (magenta redesign, then red/chrome redesign) are local-only. Push to `origin/main` and confirm Vercel picks them up.
- **Design not yet approved:** the black/red/chrome redesign was just shipped in response to feedback but has not been reviewed by the user yet. Don't treat it as final.
- **Merely Rocks track count mismatch** (26 documented vs. 30 audio files) needs Nick to listen and clarify — don't guess which 4 files are extras/alternates.
- **Already Dead tracks 13–14** are unidentified audio with no documented titles — same, needs Nick.
- Whether Nick wants the old CD Baby playlists linked back in at all, given the royalty-crediting issue, is still an open call for him — currently resolved by omission, not by an explicit final decision.

## 5. Planned next steps, Phases 4–6

(Numbering follows the project's own phase structure referenced in PROGRESS.md / SETUP-TASKS.md.)

**Phase 4 — Stripe (blocked on Nick):**
1. Nick creates a Stripe account under merelyrocks@gmail.com.
2. Andrew pastes Nick's **test** secret key into `.env.local` (never into chat).
3. Run `npm run stripe:setup` to create all 11 digital album products in Stripe test mode and auto-write `stripePriceId` values into `site.ts`.
4. Test a full purchase with Stripe's test card `4242 4242 4242 4242`.
5. Once verified, repeat with live keys (`--live` flag required) only after Nick has completed Stripe's account verification (banking/tax).

**Phase 5 — Deployment confirmation + domain:**
1. Push the two pending local commits.
2. Confirm the Vercel deploy is green and the live `.vercel.app` URL matches local.
3. Re-run the Stripe test-mode purchase flow against the live deployed URL, not just localhost.
4. Once confirmed stable, revisit domain purchase (deferred, see §3) and connect it in Vercel.

**Phase 6 — Content completion + polish:**
1. Fill remaining content gaps listed in §2 as Nick supplies them (track titles, years, cover art, streaming links, real bio, real merch).
2. Write real legal text for `/privacy`, `/terms`, `/refunds`, `/shipping` (currently placeholder routes).
3. Get user sign-off on the current red/chrome design or iterate again.
4. Build the Tour/Shows section (in original spec, not yet built): list of dates or "No shows currently — stay tuned."
5. Add an embedded Spotify/Bandcamp player once a real Spotify artist URL exists.
6. Enable the 3 merch products (set `available: true`) once real product details and Stripe entries exist for them.
7. Reconcile the Merely Rocks and Already Dead track-count gaps with Nick directly, then update `site.ts`.
