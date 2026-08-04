'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function DownloadAction({
  sessionId,
  albumName,
}: {
  sessionId: string;
  albumName: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');

  async function handleDownload() {
    setState('loading');
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      if (!res.ok) {
        setState('error');
        return;
      }

      // Stream the file as a download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${albumName.replace(/\s+/g, '_')}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setState('error');
    }
  }

  return (
    <div>
      <Button onClick={handleDownload} disabled={state === 'loading'}>
        {state === 'loading'
          ? 'Preparing download…'
          : `Download ${albumName}`}
      </Button>
      {state === 'error' && (
        <p className="mt-3 text-sm text-red-400">
          Download failed. Please email{' '}
          <a
            href="mailto:merelyrocks@gmail.com"
            className="underline underline-offset-4"
          >
            merelyrocks@gmail.com
          </a>{' '}
          with your receipt and we&apos;ll send it manually.
        </p>
      )}
    </div>
  );
}
