# Audio sources — which folder is which album

**Derived 2026-07-31 by comparing track counts, durations and ID3 tags.
Nothing here was assumed from a folder name alone.** This file exists because
that investigation is expensive to repeat and dangerous to guess at — sending a
paying customer the wrong album is worse than sending nothing.

All source folders live under `C:\Users\Andrew\Desktop\Nick\`.
They are **not** in the repo and never should be (size, and they're the product).

---

## Confirmed mapping

| Release id | Album | Tracks | Source folder | Format | Size |
|---|---|---|---|---|---|
| `thrilla-killa` | Thrilla Killa | 16 | `Nick CD 11 Thrilla Killa` | WAV | 713 MB |
| `merely-rocks-2` | Merely Rocks II | 15 | `Nick CD 10 Merely Rocks 2` | WAV | 567 MB |
| `merely-rocks` | Merely Rocks I | 15 | `Nick CD 9 Merely Rocks` | WAV | 657 MB |
| `daze` | Daze | 15 | `Nick CD 8 Daze` | WAV | 640 MB |
| `are-you-brutal` | Are You Brutal | 12 | `Nick CD 6 Are You Brutal 1` | WAV | 421 MB |
| `are-you-brutal-2` | Are You Brutal 2 | 12 | `Nick CD 7 Are You Brutal 2` | MP3 | 44 MB |
| `get-out` | Get Out | 12 | `NIck CD5 Get Out` | MP3 | 139 MB |
| `merely-lives` | Merely Lives | 11 | `Nick CD3 Merely Lives 1` | MP3 | 87 MB |
| `merely-lives-2` | Merely Lives 2 | 11 | `Nick CD4 Merely Lives 2` | MP3 | 77 MB |
| `already-dead` | Already Dead | 14 | `Nick CD1\Audio CD\Unknown artist\Unknown album (7-26-2026 6-41-02 PM)` | MP3 | 139 MB |
| `dig-this` | Dig This | 17 | **UNRESOLVED — see below** | — | — |

### Notes on specific entries

**`get-out`** — the folder holds **24 mp3s, which is the same 12 tracks ripped
twice** under two naming schemes (`01 Track01.mp3` and `Track 01.mp3`), plus one
stray `.wav` and one `.eml`. Use one set of 12. They are the same recordings.

**`already-dead`** — `Nick CD1\Audio CD\` contains two folders of 14 files:
`Songs` (97 MB) and `Unknown artist\Unknown album (...)` (139 MB). Confirmed the
**same 14 recordings** — track durations match to within one second across both
(271, 237, 402, 249, 229, 213, 213, 200, 241, 208, 371, 280, 299, 233). Different
rip bitrates only. **Use the 139 MB version**, it's the better rip.

---

## UNRESOLVED: Dig This

**Status: pulled from sale 2026-07-31.** `available: false` in `site.ts`.

The 17 preview clips currently served at `/audio/previews/dig-this/` were
generated from `Nick CD2\Tata Young\The Love of Tata Young`. They carry ID3 tags:

```
TAG:album  = The Love of Tata Young
TAG:artist = Tata Young
TAG:title  = Track 01
```

That folder was matched to Dig This on **track count alone** — it is the only
17-file audio folder on the machine, and Dig This is documented as 17 tracks.

**Two possibilities, and they need Nick's ears to separate:**

1. **Most likely — it IS Dig This, mis-tagged.** Windows Media Player looks up
   ripped CDs against an online database and guesses. A wrong match would produce
   exactly this: Nick's audio wearing a stranger's metadata. The 17-track
   coincidence supports this.
2. **It's genuinely a Tata Young CD** that was in the pile and got ripped along
   with Nick's discs. In which case the real Dig This source has not been found,
   and 17 tracks of someone else's copyrighted album were published on a public
   website.

**To resolve:** Nick plays the previews at `/music/dig-this` (or any file in that
folder) and says whether it's his. Thirty seconds.

- **If his:** strip and rewrite the ID3 tags to Merely, regenerate the previews
  from the retagged files, set `available: true`. The wrong tags are a problem
  regardless of ownership — they're embedded in files served from his domain.
- **If not his:** delete `public/audio/previews/dig-this/` immediately, remove
  the release from `site.ts`, and go looking for the real source. Also archive
  the live Stripe product for `album-dig-this` so it can't be reactivated by
  accident.

**Do not put Dig This back on sale on a hunch.**

---

## Audio quality — be careful what you advertise

Only **five** albums have lossless masters: Thrilla Killa, Merely Rocks I,
Merely Rocks II, Daze, Are You Brutal. Those can genuinely be delivered as
MP3 320 kbps.

The rest are **already lossy** and cannot be improved by transcoding:

- **Are You Brutal 2** — 44 MB for 12 tracks, roughly **128 kbps**. This is the
  weakest of the catalogue by a wide margin.
- **Merely Lives / Merely Lives 2 / Already Dead / Get Out** — MP3 only, mid
  bitrate.

Re-encoding a 128 kbps file to 320 kbps produces a **larger file with no extra
quality** — the information is already gone. If the store ever advertises
"320 kbps", that claim is untrue for six of eleven albums.

**Options, in order of honesty:** find better source discs; state the real
bitrate per album; or make no bitrate claim at all and say "high quality MP3".
Current store copy says "High quality files, yours to keep", which is defensible.
Do not upgrade that wording to a specific bitrate without checking this table.

---

## If you automate delivery later

The planned design (decided 2026-07-31, not yet built):

1. Convert each confirmed album to MP3 320 (where a lossless master exists), zip
   per album
2. Upload to Cloudflare R2 — 10 GB free, **zero egress fees**, so downloads never
   cost money
3. The order success page verifies the Stripe session server-side, then returns a
   short-lived signed R2 URL
4. No email service and no custom domain required — chosen deliberately, since a
   `.vercel.app` address cannot be verified as a sending domain

**Prerequisite: this mapping must be trusted first.** Automating an unverified
mapping means automatically sending the wrong album, at scale, without a human
ever seeing it. Dig This must be resolved before any of this is wired up.
