import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { contact } from '@/content/site';
import { verifyCheckoutSession } from '@/lib/delivery';
import { getProduct } from '@/content/site';

export const metadata: Metadata = { title: 'Thank you' };

const DL = 'https://github.com/merelyrocks-sudo/nick-site/releases/download/delivery-v1';

function buildDownloadUrl(albumName: string): string {
  const safe = albumName.replace(/[?]/g, '').replace(/\s+/g, '.');
  return `${DL}/Merely.-.${safe}.zip`;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let albumName = '';
  let downloadUrl = '';
  let stripeError = '';

  if (session_id) {
    const { session, error } = await verifyCheckoutSession(session_id);
    if (error) stripeError = error;
    if (session?.metadata?.releaseId) {
      const product = getProduct(session.metadata.releaseId);
      if (product) {
        albumName = product.name;
        downloadUrl = buildDownloadUrl(albumName);
      }
    }
  }

  const debug = session_id
    ? `session_id: ${session_id.slice(0, 16)}... (${downloadUrl ? 'OK' : 'FAILED'})${stripeError ? ' — ' + stripeError : ''}`
    : 'No session_id in URL';

  if (downloadUrl) {
    return (
      <Container className="flex min-h-[60svh] items-center py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Payment confirmed</p>
          <h1 className="display mt-5 text-5xl text-bone sm:text-6xl">Thank you</h1>
          <p className="mt-6 text-base leading-relaxed text-bone-dim">
            Your payment for <strong className="text-bone">{albumName}</strong> went
            through. Your receipt is on its way.
          </p>
          <div className="mt-10">
            <Button href={downloadUrl}>Download {albumName}</Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/music">Back to the music</Button>
            <Button href="/" variant="secondary">Home</Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[60svh] items-center py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Order complete</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-6xl">Thank you</h1>
        <p className="mt-6 text-base leading-relaxed text-bone-dim">
          Your payment went through and a receipt is on its way.
        </p>
        <p className="mt-4 text-xs text-bone-faint font-mono">{debug}</p>
        <p className="mt-4 text-sm leading-relaxed text-bone-faint">
          Downloads are sent by email, usually within a day.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/music">Back to the music</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
      </div>
    </Container>
  );
}
