# ---------------------------------------------------------------------------
#  set-live-keys.ps1  —  put Stripe LIVE keys into .env.local
# ---------------------------------------------------------------------------
#
#  Run this in a normal PowerShell window from the nick-site folder:
#
#      cd "C:\Users\Andrew\Desktop\Nick\Claude\nick-site"
#      powershell -ExecutionPolicy Bypass -File .\scripts\set-live-keys.ps1
#
#  It asks for the two live keys, writes them into .env.local, and checks
#  them against Stripe. The secret key is typed into a hidden prompt, so it
#  is never echoed to the screen and never lands in PowerShell history.
#
#  The keys go from your keyboard straight into a gitignored file on this
#  machine. They are not printed, not logged, and not sent anywhere except
#  Stripe's own API.
# ---------------------------------------------------------------------------

$ErrorActionPreference = 'Stop'

$repo = 'C:\Users\Andrew\Desktop\Nick\Claude\nick-site'
Set-Location $repo
$envFile = Join-Path $repo '.env.local'

if (-not (Test-Path $envFile)) { Write-Host "No .env.local found at $envFile" -ForegroundColor Red; exit 1 }

Write-Host ''
Write-Host '  Stripe LIVE key setup' -ForegroundColor Cyan
Write-Host '  ---------------------'
Write-Host '  Get these from Nick''s Stripe Dashboard with Test mode switched OFF:'
Write-Host '  Developers -> API keys'
Write-Host ''

# --- Publishable key (not secret, safe to show) -----------------------------
$pub = Read-Host '  Publishable key (pk_live_...)'
$pub = $pub.Trim()
if ($pub -notmatch '^pk_live_') {
    Write-Host ''
    Write-Host "  That does not look like a live publishable key." -ForegroundColor Red
    if ($pub -match '^pk_test_') { Write-Host '  That is a TEST key. Switch Test mode OFF in Stripe first.' -ForegroundColor Yellow }
    exit 1
}

# --- Secret key (hidden input) ----------------------------------------------
Write-Host ''
Write-Host '  Now the secret key. It will NOT appear as you type or paste.' -ForegroundColor Yellow
Write-Host '  Right-click pastes in PowerShell. Press Enter when done.'
$secureSecret = Read-Host '  Secret key (sk_live_...)' -AsSecureString
$bstr   = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureSecret)
$secret = [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr).Trim()
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)

if ($secret -notmatch '^(sk|rk)_live_') {
    Write-Host ''
    Write-Host '  That does not look like a live secret key.' -ForegroundColor Red
    if ($secret -match '^(sk|rk)_test_') { Write-Host '  That is a TEST key. Switch Test mode OFF in Stripe first.' -ForegroundColor Yellow }
    exit 1
}

# --- Check it against Stripe before writing anything ------------------------
Write-Host ''
Write-Host '  Checking the key against Stripe...' -ForegroundColor Cyan
try {
    $acct = Invoke-RestMethod -Uri 'https://api.stripe.com/v1/account' `
                              -Headers @{ Authorization = "Bearer $secret" } -Method Get
} catch {
    Write-Host '  Stripe rejected that key. Nothing was written.' -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)"
    exit 1
}

Write-Host "  OK - account $($acct.id)" -ForegroundColor Green
Write-Host "     charges_enabled  : $($acct.charges_enabled)"
Write-Host "     payouts_enabled  : $($acct.payouts_enabled)"
if (-not $acct.charges_enabled) {
    Write-Host '  WARNING: this account cannot take charges yet.' -ForegroundColor Yellow
    $go = Read-Host '  Write the keys anyway? (y/n)'
    if ($go -ne 'y') { Write-Host '  Cancelled. Nothing written.'; exit 0 }
}

# --- Back up, then rewrite the three lines ----------------------------------
$backup = "$envFile.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item $envFile $backup
Write-Host ''
Write-Host "  Backed up old file to: $(Split-Path $backup -Leaf)" -ForegroundColor DarkGray

$lines = Get-Content $envFile
$sawSecret = $false
$sawPub    = $false
$out = foreach ($line in $lines) {
    if ($line -match '^\s*STRIPE_SECRET_KEY\s*=') {
        if (-not $sawSecret) { $sawSecret = $true; "STRIPE_SECRET_KEY=$secret" }
        # any further duplicates are dropped
    }
    elseif ($line -match '^\s*NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\s*=') {
        if (-not $sawPub) { $sawPub = $true; "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$pub" }
    }
    else { $line }
}
# Append only if the key was genuinely absent.
# NOTE: do not use `$array -notmatch 'x'` for this test — on an array that
# returns the non-matching ELEMENTS (truthy whenever any line differs), which
# appended a second copy of both keys. Use explicit booleans instead.
if (-not $sawSecret) { $out += "STRIPE_SECRET_KEY=$secret" }
if (-not $sawPub)    { $out += "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$pub" }

Set-Content -Path $envFile -Value $out -Encoding UTF8

Write-Host ''
Write-Host '  Done. Live keys are in .env.local.' -ForegroundColor Green
Write-Host '  That file is gitignored - it will not go to GitHub.'
Write-Host ''
Write-Host '  Tell Claude "live keys are in" and it will do the rest:' -ForegroundColor Cyan
Write-Host '    - create the 14 products in Stripe live mode'
Write-Host '    - write the real price IDs into site.ts, commit and push'
Write-Host '    - put the live keys into Vercel and redeploy'
Write-Host '    - reopen the store and verify checkout works'
Write-Host ''
