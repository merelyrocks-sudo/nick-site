import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { artist, contact } from '@/content/site';

export const metadata: Metadata = { title: 'Privacy Policy' };

/**
 * Plain-English template, not a lawyer-drafted policy. Accurate for what
 * this site actually does today: no accounts, no ad tracking, no data
 * sold. If real analytics or an email newsletter tool gets added later,
 * this needs an update to match.
 */
export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="30 July 2026">
      <div>
        <h2>What we collect</h2>
        <p>
          This site does not require an account and does not use advertising
          trackers or cookies. When you buy something, our payment
          processor, Stripe, collects your email address and payment details
          in order to complete the purchase and deliver digital downloads —
          {' '}{artist.name} never sees or stores your card details.
        </p>
      </div>

      <div>
        <h2>How your information is used</h2>
        <p>
          Your email is used to send your receipt and, for digital
          purchases, your download files. It is not added to a mailing list
          and is not shared with anyone outside of Stripe and the hosting
          provider needed to run this site.
        </p>
      </div>

      <div>
        <h2>Your rights</h2>
        <p>
          To ask what information is held about you, or to have it deleted,
          email{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </div>

      <div>
        <h2>Changes</h2>
        <p>
          If this policy changes, the update will be posted here with a new
          date at the top of the page.
        </p>
      </div>
    </LegalPage>
  );
}
