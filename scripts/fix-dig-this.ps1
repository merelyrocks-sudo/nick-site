# ---------------------------------------------------------------------------
#  fix-dig-this.ps1
# ---------------------------------------------------------------------------
#  The Dig This source files were ripped by Windows Media Player, which
#  mis-identified the disc as "The Love of Tata Young" via a CDDB disc-ID
#  collision (same 17 track count, total runtime within 9 seconds). The audio
#  is Nick's — confirmed by comparing per-track durations against the real
#  Tata Young release, where 16 of 17 tracks differ by 11-136 seconds.
#
#  This script:
#    1. Backs up the 17 source files
#    2. Rewrites the ID3 tags to Merely / Dig This with the real track titles
#       (audio stream is COPIED, never re-encoded - zero quality loss)
#    3. Regenerates the 17 site preview clips from the corrected files
#
#  Run:  powershell -ExecutionPolicy Bypass -File .\scripts\fix-dig-this.ps1
# ---------------------------------------------------------------------------

$ErrorActionPreference = 'Stop'

$src      = 'C:\Users\Andrew\Desktop\Nick\Nick CD2\Tata Young\The Love of Tata Young'
$backup   = 'C:\Users\Andrew\Desktop\Nick\Nick CD2\_backup-original-tags'
$previews = 'C:\Users\Andrew\Desktop\Nick\Claude\nick-site\public\audio\previews\dig-this'
$tmp      = Join-Path $env:TEMP 'dig-this-retag'

# Track titles exactly as they appear in src/content/site.ts
$titles = @(
    'Excuse The Hell Outta Me',
    'Like I Care',
    'Dig This',
    'Me? I Feel Fine',
    'Where The Hell Have You Been?',
    'Mud Diver',
    'I''ll Do It Anyway',
    'Dig Me That Hole',
    'Pisces',
    'I Feel Fine, In My Mind',
    'Had It All',
    'I Love You Madly',
    'Crayzee For You',
    'Hey Man, What''s The Plan?',
    'Like I Do',
    'Who Do I Serve?',
    'Eat Crow'
)

if (-not (Test-Path $src)) { Write-Host "Source folder not found: $src" -ForegroundColor Red; exit 1 }

$files = Get-ChildItem $src -File -Filter *.mp3 | Sort-Object Name
if ($files.Count -ne 17) { Write-Host "Expected 17 mp3s, found $($files.Count). Stopping." -ForegroundColor Red; exit 1 }
if ($titles.Count -ne 17) { Write-Host "Expected 17 titles, have $($titles.Count). Stopping." -ForegroundColor Red; exit 1 }

# --- 1. back up -------------------------------------------------------------
if (-not (Test-Path $backup)) { New-Item -ItemType Directory -Force -Path $backup | Out-Null }
Write-Host "Backing up originals to $backup" -ForegroundColor Cyan
foreach ($f in $files) { Copy-Item $f.FullName (Join-Path $backup $f.Name) -Force }

# --- 2. retag (audio copied, not re-encoded) --------------------------------
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

Write-Host ''
Write-Host 'Rewriting tags to Merely / Dig This' -ForegroundColor Cyan
for ($i = 0; $i -lt 17; $i++) {
    $f     = $files[$i]
    $title = $titles[$i]
    $n     = $i + 1
    $out   = Join-Path $tmp $f.Name

    ffmpeg -hide_banner -loglevel error -i $f.FullName `
        -map 0:a -c:a copy -map_metadata -1 -write_id3v1 1 `
        -metadata ("title="  + $title) `
        -metadata "artist=Merely" `
        -metadata "album_artist=Merely" `
        -metadata "album=Dig This" `
        -metadata "genre=Rock" `
        -metadata ("track=" + $n + "/17") `
        $out -y

    if ($LASTEXITCODE -ne 0) { Write-Host "  FAILED on $($f.Name)" -ForegroundColor Red; exit 1 }
    Write-Host ("  {0,2}. {1}" -f $n, $title)
}

# Swap the retagged files in
foreach ($f in $files) { Copy-Item (Join-Path $tmp $f.Name) $f.FullName -Force }
Write-Host 'Source files retagged.' -ForegroundColor Green

# --- 3. regenerate previews -------------------------------------------------
# Matches the rest of the site: 30s, mono, 44.1kHz, 96kbps, 2s fade in/out.
# Clip starts 25% into each track so previews land in the song rather than on
# an intro or a count-in.
Write-Host ''
Write-Host 'Regenerating preview clips' -ForegroundColor Cyan
if (-not (Test-Path $previews)) { New-Item -ItemType Directory -Force -Path $previews | Out-Null }

$files = Get-ChildItem $src -File -Filter *.mp3 | Sort-Object Name
for ($i = 0; $i -lt 17; $i++) {
    $f   = $files[$i]
    $n   = $i + 1
    $dst = Join-Path $previews ("{0:D2}.mp3" -f $n)

    $dur = [double](ffprobe -v quiet -show_entries format=duration -of default=nw=1:nk=1 $f.FullName)
    $offset = [math]::Round($dur * 0.25)
    if ($offset -lt 10) { $offset = 10 }
    if ($offset -gt ($dur - 32)) { $offset = [math]::Max(0, $dur - 32) }

    ffmpeg -hide_banner -loglevel error -ss $offset -t 30 -i $f.FullName `
        -ac 1 -ar 44100 -b:a 96k `
        -af "afade=t=in:st=0:d=2,afade=t=out:st=28:d=2" `
        -map_metadata -1 `
        -metadata ("title=" + $titles[$i]) `
        -metadata "artist=Merely" `
        -metadata "album=Dig This" `
        $dst -y

    if ($LASTEXITCODE -ne 0) { Write-Host "  FAILED on preview $n" -ForegroundColor Red; exit 1 }
    Write-Host ("  {0:D2}.mp3  from {1}s" -f $n, $offset)
}

Remove-Item $tmp -Recurse -Force

Write-Host ''
Write-Host 'Done.' -ForegroundColor Green
Write-Host "Originals preserved at: $backup"
