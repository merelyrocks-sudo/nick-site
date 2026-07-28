import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';

export const metadata: Metadata = { title: 'Checkout cancelled' };

export default function CancelledPage() {
  return (
    <Container className="flex min-h-[60svh] items-center py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Checkout cancelled</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-6xl">No charge made</h1>
        <p className="mt-6 text-base leading-relaxed text-bone-dim">
          You closed checkout before paying, so nothing was charged. Your basket
          is still where you left it.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/store">Back to the store</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
      </div>
    </Container>
  );
}
