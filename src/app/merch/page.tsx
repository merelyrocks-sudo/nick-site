import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = { title: 'Merch' };

// Placeholder route — the real page is built in Phase 3.
export default function Page() {
  return (
    <ComingSoon
      eyebrow="Shop"
      title="Merch"
      note="Apparel and physical releases arrive in Phase 3, with checkout wired up in Phase 4."
    />
  );
}
