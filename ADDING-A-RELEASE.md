# Adding a New Release — step by step

For when Nick finishes a new album and it needs to go on the site. No coding
knowledge needed — steps 1–2 are things you gather, step 3 is a message you
paste to Claude, done.

---

## 1. Gather these from Nick before you start

| Item | Details |
|---|---|
| **Audio files** | The finished tracks, in order. WAV or MP3, doesn't matter — highest quality version you have. |
| **Cover art** | One square image. 1000×1000px or larger. JPG or PNG. |
| **Track titles** | In order. If some are still unnamed, that's fine — say so and the site will show "Track 1", "Track 2" honestly instead of a guess. |
| **Release year** | If unknown, leave it out — the site hides the year rather than showing a wrong one. |
| **Album or EP or Single** | Just so the site labels it correctly. |
| **Price** | Every album so far is $9.99. Keep that unless you want this one different. |

---

## 2. Save the files in the right place

Open the project folder (`nick-site`) and find these two folders:

```
public/images/releases/
public/audio/previews/
```

**First, pick an id for the release** — lowercase, words separated by
hyphens, no spaces or punctuation. Example: an album called "Midnight Run"
becomes `midnight-run`. You'll use this same id everywhere below.

**Cover art:** save it into `public/images/releases/` named
`<id>.jpg` — e.g. `public/images/releases/midnight-run.jpg`

**Audio:** put the raw track files into a new folder anywhere convenient,
named clearly, e.g. `Midnight Run Masters/01 Track Name.wav` — Claude will
turn these into the 30-second previews in step 3, you don't need to trim
anything yourself.

---

## 3. Paste this to Claude

Once the files above exist, open Claude Code in the project folder and paste
this, filling in the bracketed parts:

```
I'm adding a new release to the site. Here's what I have:

- Release id: [midnight-run]
- Title: [Midnight Run]
- Type: [Album / EP / Single]
- Year: [2027, or "unknown"]
- Track titles in order: [paste the list, or say "unknown, use placeholders"]
- Cover art: already saved at public/images/releases/[midnight-run].jpg
- Raw audio files: at [path to the folder of raw tracks]
- Price: [$9.99, or a different price]

Please:
1. Add this release to the top of the `releases` array in src/content/site.ts
   (newest releases go first — this one is now the newest).
2. Add a matching digital product to the `products` array so it's sold on
   the Store page, same pattern as the other albums.
3. Generate 30-second preview clips from the raw audio files into
   public/audio/previews/[midnight-run]/01.mp3, 02.mp3, etc. — mono, 96kbps,
   starting about 25% into each track, with a 1-second fade in and out.
   Use -nostdin on ffmpeg so it doesn't silently skip tracks, and skip any
   source file under 1KB (those are corrupt).
4. Run `npx tsc --noEmit` and `npm run build` to confirm nothing broke.
5. Run `npm run stripe:setup` if my Stripe keys are already in .env.local —
   it only creates a price for the new album, it won't touch the others.
6. Show me the new release on localhost so I can check it before we go live.

Don't invent any track titles, years, or facts I haven't given you above.
```

Claude will do the file editing, the audio processing, and the testing.
It will NOT commit or push without telling you first — check the album page
locally, then say "looks good, push it."

---

## 4. What happens automatically

- **The home page** always shows the top 3 releases and previews the
  newest one in the floating player chip — nothing to configure, it reads
  straight off the top of the list.
- **Stripe pricing** — `npm run stripe:setup` only creates what's missing,
  so re-running it after adding one album is safe and won't duplicate or
  change the others.
- **The site deploys itself** — once it's pushed to GitHub, Vercel rebuilds
  and the live site updates within a minute or two.

---

## 5. If something looks wrong

| Symptom | Likely cause |
|---|---|
| Tracks show as "Track 1", "Track 2"... | No titles were given — this is intentional, not a bug. Send the real titles whenever you get them and ask Claude to fill them in. |
| Cover shows "artwork coming soon" | The file wasn't saved at the exact path `public/images/releases/<id>.jpg`, or wasn't provided yet. |
| Buy button says "Coming soon" and won't click | The Stripe price wasn't created yet — check `.env.local` has your Stripe keys, then re-run `npm run stripe:setup`. |
| No preview plays | Check `public/audio/previews/<id>/` has `01.mp3`, `02.mp3` etc. — ask Claude to check the ffmpeg step ran without errors. |

---

## Quick reference — the release id rule

Whatever id you choose gets used in **three** places, and they must match
exactly:

```
public/images/releases/<id>.jpg
public/audio/previews/<id>/01.mp3
site.ts → releases: [{ id: '<id>', ... }]
site.ts → products: [{ id: 'album-<id>', releaseId: '<id>', ... }]
```

If a page ever shows the wrong cover or no preview, this is the first thing
to check — a typo in the id in just one of those four places is almost
always the cause.
