import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { contact } from '@/content/site';

export const metadata: Metadata = { title: 'Shipping Policy' };

/**
 * Plain-English template. The shipping windows below are placeholder
 * defaults — replace once real merch and real fulfillment (Printful or
 * otherwise) is wired up.
 */
export default function Page() {
  return (
    <LegalPage title="Shipping Policy" updated="30 July 2026">
      <div>
        <h2>Digital downloads</h2>
        <p>
          Nothing to ship — download links are emailed to you, usually
          within minutes of purchase and always within 24 hours.
        </p>
      </div>

      <div>
        <h2>Merch</h2>
        <p>
          Physical merch isn&apos;t available to order yet. Once it is,
          orders will ship within a few business days, with delivery time
          depending on your country. Full details will appear here the
          moment merch goes live.
        </p>
      </div>

      <div>
        <h2>Problems with an order</h2>
        <p>
          If anything about a physical order looks wrong once merch is
          live — late, lost, or damaged — email{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> and it
          will be sorted out.
        </p>
      </div>
    </LegalPage>
  );
}
