import type { Metadata } from 'next';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { artist, merchProducts } from '@/content/site';

export const metadata: Metadata = {
  title: 'Merch',
  description: `Official merch from ${artist.name} — apparel and physical releases.`,
};

export default function MerchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Merch"
        description="Apparel and physical releases. Shipped worldwide."
      />

      <section className="py-20 sm:py-28">
        <Container>
          {merchProducts.length > 0 ? (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {merchProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="max-w-md">
              <p className="text-base text-bone-dim">
                Nothing in the shop just yet. Merch is on the way.
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
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h2 className="eyebrow">Shipping</h2>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                Orders ship within a few days. Delivery times vary by country.
              </p>
            </div>
            <div>
              <h2 className="eyebrow">Returns</h2>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                Something wrong with your order? Email us and we will sort it.
              </p>
            </div>
            <div>
              <h2 className="eyebrow">Payment</h2>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                Handled securely by Stripe. Card details never touch this site.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
