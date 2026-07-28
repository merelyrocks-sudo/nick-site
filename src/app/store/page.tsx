import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = { title: 'Store' };

// Placeholder route — the real page is built in Phase 3.
export default function Page() {
  return (
    <ComingSoon
      eyebrow="Digital"
      title="Store"
      note="The digital music store arrives in Phase 3, with checkout wired up in Phase 4."
    />
  );
}
