import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { artist, contact } from '@/content/site';

export const metadata: Metadata = { title: 'Terms of Service' };

/**
 * Plain-English template, not a lawyer-drafted policy — adequate for a
 * small direct-to-fan store. Review before this matters at real volume.
 */
export default function Page() {
  return (
    <LegalPage title="Terms of Service" updated="30 July 2026">
      <div>
        <h2>Using this site</h2>
        <p>
          This is the official site of {artist.name}. By using it or buying
          something here, you agree to these terms.
        </p>
      </div>

      <div>
        <h2>Digital downloads</h2>
        <p>
          Digital albums are sold for personal listening only. Reselling,
          redistributing, or publicly rehosting the files is not allowed.
          Downloads are yours to keep — there is no subscription and no
          expiry.
        </p>
      </div>

      <div>
        <h2>Merch</h2>
        <p>
          Physical products are sold subject to availability. Prices are
          shown at checkout in your currency where supported.
        </p>
      </div>

      <div>
        <h2>Content ownership</h2>
        <p>
          All music, artwork, and writing on this site belongs to{' '}
          {artist.name}. Buying a download or a product does not transfer
          any of those rights to you.
        </p>
      </div>

      <div>
        <h2>Liability</h2>
        <p>
          This site is provided as-is. If something is wrong with an order,
          email <a href={`mailto:${contact.email}`}>{contact.email}</a> and
          it will be sorted out directly — our responsibility for any issue
          is limited to the amount you paid.
        </p>
      </div>

      <div>
        <h2>Changes</h2>
        <p>
          These terms may be updated as the store grows. The current version
          is always the one posted here.
        </p>
      </div>
    </LegalPage>
  );
}
