/**
 * Create a GitHub release with delivery zips attached.
 * Uses gh CLI (already authenticated as merelyrocks-sudo).
 */
import { execSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DELIVERY_DIR = 'C:/Users/Andrew/Desktop/Nick/_delivery';
const TAG = 'delivery-v1';

if (!existsSync(DELIVERY_DIR)) {
  console.error('Delivery directory not found:', DELIVERY_DIR);
  process.exit(1);
}

const files = readdirSync(DELIVERY_DIR).filter(f => f.endsWith('.zip'));
console.log(`Found ${files.length} delivery zips`);

// Delete existing release if present, then recreate
let releaseDeleted = false;
try { execSync(`gh release delete ${TAG} --yes 2>$null`, { shell: 'powershell' }); releaseDeleted = true; } catch {}

if (releaseDeleted) {
  // Recreate release (empty)
  execSync(
    `gh release create ${TAG} --title "Delivery Zips" --notes "Auto-generated delivery zips for the Merely store. Not a real release — just a CDN for digital downloads."`,
    { shell: 'powershell', stdio: 'inherit' }
  );
}

// Upload each zip individually to avoid shell quoting issues
for (const file of files) {
  const path = join(DELIVERY_DIR, file);
  process.stdout.write(`  Uploading ${file}... `);
  try {
    execSync(`gh release upload ${TAG} "${path}" --clobber`, { shell: 'powershell', stdio: 'pipe' });
    console.log('✅');
  } catch (e) {
    console.log('FAILED');
  }
}

// Print asset download URLs
console.log('\n--- Download URLs ---');
const out = execSync(
  `gh release view ${TAG} --json assets -q "assets[] | .name + ': ' + .url"`,
  { shell: 'powershell', encoding: 'utf8' }
);
console.log(out);
