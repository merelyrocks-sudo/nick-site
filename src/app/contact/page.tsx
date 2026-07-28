import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = { title: 'Contact' };

// Placeholder route — the real page is built in Phase 3.
export default function Page() {
  return (
    <ComingSoon
      eyebrow="Contact"
      title="Contact"
      note="The contact page arrives in Phase 3. In the meantime the email address in the footer works."
    />
  );
}
