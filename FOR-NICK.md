# For Nick — what's still missing

The site is live: **https://merely-rocks.vercel.app**

Have a look. All eleven albums are on there with 30-second previews of every
track. Nothing below is urgent — the site works as-is, and every gap is handled
gracefully rather than showing something broken. But each item you fill in makes
it a bit better.

**Nothing here was guessed.** Where a title or a year is unknown, the site shows
a neutral placeholder instead of an invention. That's deliberate — it's your
music, and a wrong title is worse than no title.

---

## 1. Two albums have no cover art

**Are You Brutal (2019)** and **Are You Brutal 2 (2020)** are the only two
without artwork — nothing was found in the source files. They currently show a
plain placeholder panel.

Any decent image works: a photo of the physical CD sleeve taken straight-on in
good light is completely fine. Square, and as large as you have.

## 2. One cover is too small

**Get Out (2021)** — the only file found is 281×281 pixels, which looks soft
and blurry when the page displays it larger. If a bigger scan or the original
art file exists anywhere, that'd fix it.

## 3. Missing release years

These four show no year at all on the site:

- Merely Lives
- Merely Lives 2
- Dig This
- Already Dead

Roughly right is fine — a year is better than a blank.

## 4. Missing track titles

Four albums have their audio and previews working, but the tracks display as
"Track 1", "Track 2" and so on because no titles were ever documented:

- **Thrilla Killa** — 16 tracks
- **Merely Rocks I** — 15 tracks
- **Merely Rocks II** — 15 tracks
- **Are You Brutal** — 12 tracks
- **Are You Brutal 2** — 12 tracks

A plain numbered list, in album order, is all that's needed.

## 5. Two things that need your ears

Genuine ambiguities in the source material. Both were flagged rather than
resolved by guessing:

- **Already Dead** — the CD rip has **14** recordings, but your document and the
  old YouTube listing both name only **12**. Tracks 13 and 14 are unnamed. Are
  they bonus tracks, alternate takes, or should they not be there?

- **Merely Rocks** — your document lists **26** tracks, but the audio folder has
  **30** files. Four extra files, unaccounted for. Which are they?

## 6. Your bio

The About page currently has a short, deliberately plain description. It's
honest but generic — it contains no invented facts, no made-up cities, no fake
credits. That was on purpose, so it wouldn't say anything untrue about you until
you wrote the real thing.

A few paragraphs in your own words would be a real improvement. How it started,
what you're making, whatever you'd want someone finding the site to know.

## 7. Merch — if you want it

Three placeholder items exist in the code (t-shirt, hoodie, vinyl) but are
switched off, so the Merch page doesn't advertise anything that isn't real.

To switch them on, each needs: the actual product, a price, a description, a
photo, and available sizes. If merch isn't happening yet, leaving them off is
the right call.

## 8. Streaming links still to come

Live and working already: **Spotify, Apple Music, YouTube, Instagram, TikTok, X.**

Still hidden because you confirmed they don't exist yet: **SoundCloud,
Bandcamp, Facebook Page.** They'll stay hidden — no dead buttons, no empty gaps.
Just say the word if any of them ever appear.

---

## About buying music on the site

Buyers pay through Stripe, on your own account, and the money goes to your bank.
No middleman, no distributor taking a cut.

**Delivery is manual for now** — this is by design, not an oversight. When
someone buys an album, Stripe emails you the order with the album name attached,
and you email them the files. It's a few minutes per sale. Automating it is a
later job, and only worth doing once sales justify it.

Right now the store is in **test mode** — it takes fake cards only, so the whole
flow can be proven safely before real money is involved. Switching it on for
real needs you to finish Stripe's account verification (they'll ask for banking
and tax details — standard, they have to). Andrew handles everything after that.
