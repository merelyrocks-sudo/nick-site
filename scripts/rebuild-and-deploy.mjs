/**
 * One-shot rebuild + deploy for delivery zips.
 *
 * Usage: node scripts/rebuild-and-deploy.mjs
 *
 * 1. Runs build-delivery.ps1 (rebuilds zips from source WAVs)
 * 2. Runs create-release.mjs (uploads to GitHub Releases)
 * 3. Git tag is already handled by create-release
 *
 * Run this whenever site.ts tracklists change.
 */
import { execSync } from 'node:child_process';

console.log('=== Step 1: Rebuild delivery zips ===\n');
execSync(
  'powershell -ExecutionPolicy Bypass -File ./scripts/build-delivery.ps1',
  { shell: 'powershell', stdio: 'inherit', cwd: process.cwd() }
);

console.log('\n=== Step 2: Upload to GitHub Releases ===\n');
execSync(
  'node ./scripts/create-release.mjs',
  { shell: 'powershell', stdio: 'inherit', cwd: process.cwd() }
);

console.log('\n=== Done ===');
console.log('Delivery zips rebuilt and deployed to:');
console.log('  https://github.com/merelyrocks-sudo/nick-site/releases/tag/delivery-v1');
console.log('');
console.log('The site auto-deploys via Vercel — download URLs never change.');
