import type { Metadata } from 'next';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { artist, digitalProducts } from '@/content/site';

export const metadata: Metadata = {
  title: 'Store',
  description: `Buy music directly from ${artist.name} — digital downloads.`,
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Digital"
        title="Music store"
        description="Buy the music directly. Every purchase goes straight to the artist."
      />

      <section className="py-20 sm:py-28">
        <Container>
          {digitalProducts.length > 0 ? (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {digitalProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="max-w-md">
              <p className="text-base text-bone-dim">
                No downloads listed yet. New music is on the way.
              </p>
              <div className="mt-8">
                <Button href="/music" variant="secondary">
                  Hear the music
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="border-t border-line py-16">
        <Container>
          <div className="max-w-2xl">
            <h2 className="eyebrow">How downloads work</h2>
            <p className="mt-5 text-sm leading-relaxed text-bone-dim">
              After payment, your files are emailed to the address you used at
              checkout. Files are high quality and yours to keep — no streaming
              account, no subscription, no expiry.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-bone-faint">
              If your files have not arrived within 24 hours, email us and we
              will send them straight over.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
