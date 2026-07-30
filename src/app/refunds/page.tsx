import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { artist, contact } from '@/content/site';

export const metadata: Metadata = { title: 'Refund Policy' };

/**
 * Plain-English template. The 30-day windows below are a reasonable
 * starting default, not a legal requirement — adjust them to match what
 * you actually want to offer before relying on this.
 */
export default function Page() {
  return (
    <LegalPage title="Refund Policy" updated="30 July 2026">
      <div>
        <h2>Digital downloads</h2>
        <p>
          Because digital files are delivered instantly, purchases are
          generally final. If a file is missing, corrupted, or the wrong
          one, email{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> within 30
          days of purchase and it will be fixed or refunded — no questions
          asked.
        </p>
      </div>

      <div>
        <h2>Merch</h2>
        <p>
          Once physical merch is available: if an item arrives damaged,
          defective, or wrong, email us within 30 days of delivery for a
          replacement or refund. Change-of-mind returns are handled case by
          case — just ask.
        </p>
      </div>

      <div>
        <h2>How to request a refund</h2>
        <p>
          Email {contact.email} with your order confirmation and a short
          description of the issue. {artist.name} reads and answers these
          personally.
        </p>
      </div>
    </LegalPage>
  );
}
