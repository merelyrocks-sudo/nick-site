# ---------------------------------------------------------------------------
#  build-delivery.ps1 - pre-build every album as a ready-to-send zip
# ---------------------------------------------------------------------------
#  Delivery is manual: Stripe takes the payment, a human emails the files.
#  This builds all 11 albums ONCE, so filling an order is "attach this zip"
#  instead of running ffmpeg while a customer waits.
#
#  - WAV masters are encoded to MP3 320. Sources already MP3 are copied as-is
#    (re-encoding a lossy file just makes it bigger, never better).
#  - Tracks are named "01 - Title.mp3" using the titles from site.ts.
#  - ID3 tags are written: artist Merely, correct album, correct title.
#  - Burn-filler tracks are EXCLUDED. See AUDIO-SOURCES.md.
#
#  Output: C:\Users\Andrew\Desktop\Nick\_delivery\<album>.zip
#  Run:    powershell -ExecutionPolicy Bypass -File .\scripts\build-delivery.ps1
# ---------------------------------------------------------------------------

$ErrorActionPreference = 'Stop'

# NOTE: PowerShell variable names are CASE-INSENSITIVE. The base path must not
# be called $N, because the per-track counter $n inside the loop silently
# overwrites it and every folder lookup then fails. Cost one full run.
$Root = 'C:\Users\Andrew\Desktop\Nick'
$OUT  = "$Root\_delivery"
New-Item -ItemType Directory -Force -Path $OUT | Out-Null

# album => @{ folder; take = 0-based indices to use (empty = all); album name }
$albums = @(
  @{ id='thrilla-killa';    folder='Nick CD 11 Thrilla Killa';  name='Thrilla Killa';      take=@() }
  @{ id='merely-rocks';     folder='Nick CD 9 Merely Rocks';    name='Merely Rocks I';     take=@(0..12) }
  @{ id='merely-rocks-2';   folder='Nick CD 10 Merely Rocks 2'; name='Merely Rocks II';    take=@(0..12) }
  @{ id='daze';             folder='Nick CD 8 Daze';            name='Daze';               take=@() }
  @{ id='are-you-mental-1'; folder='Nick CD 6 Are You Brutal 1';name='Are You Mental? I';  take=@() }
  @{ id='are-you-mental-2'; folder='Nick CD 7 Are You Brutal 2';name='Are You Mental? II'; take=@() }
  @{ id='get-out';          folder='NIck CD5 Get Out';          name='Get Out';            take=@(); filter='^\d\d Track\d\d\.mp3$' }
  @{ id='merely-lives';     folder='Nick CD3 Merely Lives 1';   name='Merely Lives';       take=@() }
  @{ id='merely-lives-2';   folder='Nick CD4 Merely Lives 2';   name='Merely Lives 2';     take=@() }
  @{ id='dig-this';         folder='Nick CD2\Tata Young\The Love of Tata Young'; name='Dig This'; take=@() }
  @{ id='already-dead';     folder='Nick CD1\Audio CD\Unknown artist\Unknown album (7-26-2026 6-41-02 PM)'; name='Already Dead'; take=@(0,1,2,3,4,5,7,8,10,11,12,13) }
)

# Track titles, pulled out of site.ts so this file never disagrees with the site
$siteTs = Get-Content "$Root\Claude\nick-site\src\content\site.ts" -Raw
function Get-Titles([string]$rid) {
  $m = [regex]::Match($siteTs, "id: '$([regex]::Escape($rid))',(?:.|\n)*?tracks: \[((?:.|\n)*?)\n    \]")
  if (-not $m.Success) { return @() }
  $out = @()
  foreach ($line in $m.Groups[1].Value -split "`n") {
    $t = $line.Trim()
    $mm = [regex]::Match($t, "^['`"](.*)['`"],$")
    if ($mm.Success) { $out += $mm.Groups[1].Value }
  }
  return $out
}

function Clean([string]$s) {
  # strip characters Windows will not allow in a filename
  ($s -replace '[\\/:*?"<>|]', '') -replace '\s+', ' '
}

$audioExt = @('.wav','.mp3','.flac','.aiff')
$summary = @()

foreach ($a in $albums) {
  $src = Join-Path $Root $a.folder
  if (-not (Test-Path $src)) { Write-Host "MISSING FOLDER: $src" -ForegroundColor Red; continue }

  $files = Get-ChildItem $src -File | Where-Object { $audioExt -contains $_.Extension.ToLower() }
  if ($a.filter) { $files = $files | Where-Object { $_.Name -match $a.filter } }
  $files = $files | Sort-Object Name
  if ($a.take.Count -gt 0) { $files = @($a.take | ForEach-Object { $files[$_] }) }

  $titles = Get-Titles $a.id
  if ($titles.Count -ne $files.Count) {
    Write-Host ("SKIP {0}: {1} files but {2} titles" -f $a.id, $files.Count, $titles.Count) -ForegroundColor Red
    continue
  }

  $zipPath = Join-Path $OUT ("Merely - " + (Clean $a.name) + ".zip")
  if (Test-Path $zipPath) { Write-Host ("SKIP {0} - already built" -f $a.name) -ForegroundColor DarkGray; continue }

  $stage = Join-Path $env:TEMP ("merely-" + $a.id)
  if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
  New-Item -ItemType Directory -Force -Path $stage | Out-Null

  Write-Host ""
  Write-Host ("{0}  ({1} tracks)" -f $a.name, $files.Count) -ForegroundColor Cyan

  for ($i = 0; $i -lt $files.Count; $i++) {
    $f     = $files[$i]
    $n     = $i + 1
    $title = $titles[$i]
    $dest  = Join-Path $stage ("{0:D2} - {1}.mp3" -f $n, (Clean $title))

    $common = @(
      '-metadata', ("title="        + $title),
      '-metadata', 'artist=Merely',
      '-metadata', 'album_artist=Merely',
      '-metadata', ("album="        + $a.name),
      '-metadata', ("track="        + $n + "/" + $files.Count)
    )

    if ($f.Extension.ToLower() -eq '.mp3') {
      # already lossy - copy the stream, only rewrite tags
      & ffmpeg -hide_banner -loglevel error -i $f.FullName -map 0:a -c:a copy -map_metadata -1 @common $dest -y
    } else {
      & ffmpeg -hide_banner -loglevel error -i $f.FullName -map 0:a -c:a libmp3lame -b:a 320k -map_metadata -1 @common $dest -y
    }
    if ($LASTEXITCODE -ne 0) { Write-Host "  FAILED on $($f.Name)" -ForegroundColor Red; exit 1 }
    Write-Host ("  {0:D2}. {1}" -f $n, $title)
  }

  $zip = Join-Path $OUT ("Merely - " + (Clean $a.name) + ".zip")
  if (Test-Path $zip) { Remove-Item $zip -Force }
  Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip -CompressionLevel Optimal
  Remove-Item $stage -Recurse -Force

  $mb = (Get-Item $zip).Length / 1MB
  $summary += [pscustomobject]@{ Album = $a.name; Tracks = $files.Count; MB = [math]::Round($mb,1) }
  Write-Host ("  -> {0}  ({1:N1} MB)" -f (Split-Path $zip -Leaf), $mb) -ForegroundColor Green
}

Write-Host ""
Write-Host "=== READY TO SEND ===" -ForegroundColor Green
$summary | Format-Table -AutoSize
Write-Host ("All zips: {0}" -f $OUT)
