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
| `dig-this` | Dig This | 17 | `Nick CD2\Tata Young\The Love of Tata Young` | MP3 | 115 MB |

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

## RESOLVED: the Dig This / "Tata Young" scare

**Outcome: it is Nick's music. Fixed and back on sale 2026-07-31.**

The folder is still named `Nick CD2\Tata Young\The Love of Tata Young` — that
name is wrong and is left only so this document matches what's on disk. The files
inside are Dig This.

### What happened

Windows Media Player ripped Nick's CD2 and identified it as Tata Young's album
*The Love of Tata Young*, writing that artist and album into all 17 files. Those
tags then travelled into the site's preview clips, so a public website was
serving audio credited to another artist.

### How it was proven to be Nick's

The old CDDB/freedb disc fingerprint is a **weak hash built from track count and
total disc length** — not individual track times. Both discs have 17 tracks, and
their total runtimes are 4288s vs 4297s — **nine seconds apart**. That is a
textbook disc-ID collision, and WMP returned the first database match.

Comparing per-track durations against the real release (MusicBrainz, TH 2009,
17 tracks) settles it — a CD rip is exact, so a genuine match would agree within
a second on every track:

| # | Real Tata Young | Nick's disc | Diff |
|---|---|---|---|
| 1 | 276s | 340s | +64 |
| 2 | 260s | 262s | +2 |
| 3 | 326s | 279s | −47 |
| 4 | 201s | 247s | +46 |
| 5 | 237s | 219s | −18 |
| 6 | 245s | 192s | −53 |
| 7 | 269s | 230s | −39 |
| 8 | 257s | 330s | +73 |
| 9 | 285s | 224s | −61 |
| 10 | 237s | 295s | +58 |
| 11 | 203s | 192s | −11 |
| 12 | 259s | 210s | −49 |
| 13 | 186s | 322s | +136 |
| 14 | 284s | 194s | −90 |
| 15 | 231s | 195s | −36 |
| 16 | 237s | 290s | +53 |
| 17 | 304s | 267s | −37 |

Sixteen of seventeen diverge by 11–136 seconds. Nick then confirmed by listening.

### What was done

`scripts/fix-dig-this.ps1` (kept in the repo, safe to re-run):

1. Backed up all 17 originals to `Nick CD2\_backup-original-tags\`
2. Rewrote ID3 tags to **Merely / Dig This** with the real track titles from
   `site.ts`, using `-c:a copy` — **the audio stream was never re-encoded**, so
   there is no generation loss
3. Regenerated all 17 preview clips from the corrected files, matching the site
   spec: 30s, mono, 44.1kHz, 96kbps, 2s fade in and out, clipped from 25% into
   each track

Verified afterwards: **zero files** — source or preview — contain the string
"Tata" in any tag.

### Lesson worth keeping

Every other album here was matched to its folder by name. This one was matched on
**track count alone**, and that was almost enough to sell a stranger's album.
Before automating delivery, confirm each mapping by something stronger than a
count — durations, tags, or a listen.

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
