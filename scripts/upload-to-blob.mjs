/**
 * Upload pre-built delivery zips to Vercel Blob Storage.
 *
 * Usage: node scripts/upload-to-blob.mjs
 * Requires: BLOB_READ_WRITE_TOKEN in .env.local or Vercel env
 */
import { put } from '@vercel/blob';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DELIVERY_DIR = 'C:/Users/Andrew/Desktop/Nick/_delivery';

if (!existsSync(DELIVERY_DIR)) {
  console.error('Delivery directory not found:', DELIVERY_DIR);
  process.exit(1);
}

const files = readdirSync(DELIVERY_DIR).filter(f => f.endsWith('.zip'));

console.log(`Found ${files.length} delivery zips:\n`);

for (const file of files) {
  const path = join(DELIVERY_DIR, file);
  const buf = readFileSync(path);
  const mb = (buf.length / 1_000_000).toFixed(1);
  const releaseId = file
    .replace('Merely - ', '')
    .replace('.zip', '')
    .toLowerCase()
    .replace(/\s+/g, '-');

  process.stdout.write(`  ${file} (${mb} MB) ${'→'} ${releaseId} ... `);

  const blob = await put(`delivery/${releaseId}.zip`, buf, {
    access: 'public',
    addRandomSuffix: false,
  });

  console.log(`✅\n    ${blob.url}`);
}

console.log('\nDone. Add releaseId→URL pairs from above to the download map.');
