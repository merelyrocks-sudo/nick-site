import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { verifyCheckoutSession } from '@/lib/delivery';

export const metadata: Metadata = { title: 'Download your music' };

const DL = 'https://github.com/merelyrocks-sudo/nick-site/releases/download/delivery-v1';

function buildDownloadUrl(albumName: string): string {
  const safe = albumName.replace(/\(\d{4}\)/, '').replace(/[?]/g, '').replace(/\s+/g, '.').replace(/\.+/g, '.').replace(/\.$/g, '');
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

  if (session_id) {
    const { session } = await verifyCheckoutSession(session_id);
    if (session?.metadata?.productName) {
      albumName = session.metadata.productName;
      downloadUrl = buildDownloadUrl(albumName);
    }
  }

  if (downloadUrl) {
    return (
      <Container className="flex min-h-[60svh] items-center py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Payment confirmed</p>
          <h1 className="display mt-5 text-5xl text-bone sm:text-6xl">Thank you</h1>
          <p className="mt-6 text-base leading-relaxed text-bone-dim">
            Your purchase of <strong className="text-bone">{albumName}</strong> is
            complete. A receipt is on its way from Stripe.
          </p>
          <div className="mt-10">
            <Button href={downloadUrl}>Download {albumName}</Button>
          </div>
          <p className="mt-6 text-sm text-bone-faint">
            Your download will start immediately. Save this link or bookmark this
            page — if you lose it, reply to your receipt email and we will resend.
          </p>
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
          Your payment went through and a receipt is on its way from Stripe.
          If you do not see your download link, reply to the receipt and we will
          send it right away.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/music">Back to the music</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
      </div>
    </Container>
  );
}
