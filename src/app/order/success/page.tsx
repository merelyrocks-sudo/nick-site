import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { contact } from '@/content/site';
import { verifyCheckoutSession } from '@/lib/delivery';

export const metadata: Metadata = { title: 'Thank you' };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let verified = false;
  let albumName = '';
  let releaseId = '';

  if (session_id) {
    const session = await verifyCheckoutSession(session_id);
    if (session) {
      verified = true;
      albumName = session.metadata?.productName || 'your album';
      releaseId = session.metadata?.releaseId || '';
    }
  }

  if (verified && releaseId) {
    return (
      <Container className="flex min-h-[60svh] items-center py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Payment confirmed</p>
          <h1 className="display mt-5 text-5xl text-bone sm:text-6xl">
            Thank you
          </h1>
          <p className="mt-6 text-base leading-relaxed text-bone-dim">
            Your payment for <strong className="text-bone">{albumName}</strong>{' '}
            went through. Your receipt is on its way.
          </p>
          <div className="mt-10">
            <DownloadButton sessionId={session_id!} albumName={albumName} />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-bone-faint">
            Having trouble? Reply to your receipt or email{' '}
            <a
              href={`mailto:${contact.email}`}
              className="text-bone-dim underline underline-offset-4 hover:text-bone"
            >
              {contact.email}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/music">Back to the music</Button>
            <Button href="/" variant="secondary">
              Home
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  // Unverified — show the generic message (original behaviour)
  return (
    <Container className="flex min-h-[60svh] items-center py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Order complete</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-6xl">
          Thank you
        </h1>
        <p className="mt-6 text-base leading-relaxed text-bone-dim">
          Your payment went through and a receipt is on its way to your email.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-bone-faint">
          Digital downloads are sent by email, usually within a day. Physical
          orders ship within a few days. If anything looks wrong, reply to your
          receipt or email{' '}
          <a
            href={`mailto:${contact.email}`}
            className="text-bone-dim underline underline-offset-4 hover:text-bone"
          >
            {contact.email}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/music">Back to the music</Button>
          <Button href="/" variant="secondary">
            Home
          </Button>
        </div>
      </div>
    </Container>
  );
}

/** Client component — the download button calls the API */
import DownloadAction from './DownloadAction';

function DownloadButton({
  sessionId,
  albumName,
}: {
  sessionId: string;
  albumName: string;
}) {
  return <DownloadAction sessionId={sessionId} albumName={albumName} />;
}
