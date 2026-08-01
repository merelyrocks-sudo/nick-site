# When someone buys an album

**The store is LIVE. Real cards, real money, into Nick's bank account.**

Delivery is manual. Stripe takes the payment; a human sends the files. If nobody
is watching the inbox, a customer pays and hears nothing. **That is the single
biggest risk to this site right now.**

This page is written so anyone can fill an order without asking anyone else.

---

## The 2-minute version

> [!important] Every album is already built and ready to send
> **`C:\Users\Andrew\Desktop\Nick\_delivery\`** holds all 11 albums as finished
> zips — MP3 320 where a lossless master existed, correctly named
> `01 - Title.mp3`, tagged Merely, burn-filler tracks excluded.
> **You do not need to convert anything.** Just grab the right zip.

1. **A sale email arrives** at `merelyrocks@gmail.com` from Stripe.
2. **Open the Stripe Dashboard** → **Payments** → click the newest payment.
3. **Scroll to Metadata.** It tells you exactly what was bought:
   - `productName` — e.g. `Thrilla Killa (2026)`
   - `releaseId` — e.g. `thrilla-killa`
4. **Get the buyer's email** — same page, under Customer.
5. **Grab the matching zip** from `_delivery\`:

| Bought | Send |
|---|---|
| Thrilla Killa | `Merely - Thrilla Killa.zip` (160 MB) |
| Merely Rocks I | `Merely - Merely Rocks I.zip` (129 MB) |
| Merely Rocks II | `Merely - Merely Rocks II.zip` (109 MB) |
| Daze | `Merely - Daze.zip` (143 MB) |
| Are You Mental? I | `Merely - Are You Mental I.zip` (87 MB) |
| Are You Mental? II | `Merely - Are You Mental II.zip` (43 MB) |
| Get Out | `Merely - Get Out.zip` (39 MB) |
| Merely Lives | `Merely - Merely Lives.zip` (83 MB) |
| Merely Lives 2 | `Merely - Merely Lives 2.zip` (77 MB) |
| Dig This | `Merely - Dig This.zip` (114 MB) |
| Already Dead | `Merely - Already Dead.zip` (106 MB) |

6. **Send it.** All of these are too big to email as attachments — upload to
   Google Drive, Dropbox or WeTransfer and send the link.
7. **Reply to the buyer** using the template below.

> [!note] Rebuilding
> If a tracklist ever changes, delete the affected zip and run
> `powershell -ExecutionPolicy Bypass -File .\scripts\build-delivery.ps1`.
> It skips anything already built, so it only redoes what's missing. Titles come
> straight out of `site.ts`, so the zips can never disagree with the website.

**Aim to do this within 24 hours.** Most people are fine waiting a day if the
site was honest that delivery isn't instant. They are not fine with silence.

---

## Email template

> Subject: Your Merely download — [ALBUM NAME]
>
> Hi [NAME],
>
> Thanks for buying [ALBUM NAME] directly — it means a lot more than a stream does.
>
> Here are your files: [LINK, or see attached]
>
> They're yours to keep. If the link stops working or anything won't play, just
> reply to this email and I'll sort it out.
>
> — Nick / Merely

---

## Which files to send

Full mapping is in **`AUDIO-SOURCES.md`** — read it, don't guess. Two traps:

- **Get Out** — the folder holds the same 12 tracks ripped twice. Send one set of
  12, not 24 files.
- **Already Dead** — two folders of 14 in `Nick CD1\Audio CD\`. Send the one at
  `Unknown artist\Unknown album (...)`, 139 MB. It's the better rip.

**Dig This is not for sale** and shows "Coming soon". If someone somehow pays for
it, refund them — the source audio is unconfirmed and may not be Nick's music.
See `AUDIO-SOURCES.md`.

The WAV masters are 400–700 MB per album. Convert to MP3 before sending unless
the buyer specifically asks for lossless — nobody wants a 700 MB download.

```powershell
# Convert one album's WAVs to MP3 320 into a new folder
$src = "C:\Users\Andrew\Desktop\Nick\Nick CD 8 Daze"
$out = "$env:USERPROFILE\Desktop\daze-mp3"
New-Item -ItemType Directory -Force -Path $out | Out-Null
Get-ChildItem $src -Filter *.wav | ForEach-Object {
    ffmpeg -i $_.FullName -codec:a libmp3lame -b:a 320k `
        (Join-Path $out ($_.BaseName + ".mp3")) -y
}
Compress-Archive -Path "$out\*" -DestinationPath "$out.zip" -Force
```

ffmpeg is already installed on Andrew's machine.

---

## Refunds

Stripe Dashboard → Payments → the payment → **Refund**. Full or partial, no fee
to Nick beyond losing the original processing fee. The published refund policy is
at `/refunds` on the site — read it before promising anything.

Refund immediately, without arguing, if: the files were never sent, the wrong
album went out, or the buyer can't play them and a resend doesn't fix it. A
refund costs ~$0.60 in fees. A public complaint about an artist taking money and
going quiet costs far more.

---

## Turning the store off in a hurry

If something is wrong — bad audio, wrong prices, no one available to fulfil —
close the store rather than let orders pile up unfilled.

Edit `src/content/site.ts`:

```ts
export const storeEnabled = false;
```

Then commit and push. Vercel redeploys automatically, roughly a minute. Every Buy
button goes grey and reads "Coming soon", and the checkout API refuses server-side
even if someone crafts the request by hand.

Set it back to `true` the same way. Nothing else is affected — Stripe keys and
price IDs are untouched.

---

## Making this automatic

The design is written up at the end of `AUDIO-SOURCES.md`. Short version: convert
and zip each album, host on Cloudflare R2, and have the order-success page hand
back a signed expiring link after verifying the Stripe session.

**Do not build it until the Dig This question is settled.** Automated delivery of
an unverified mapping means sending the wrong album to everyone, silently.
