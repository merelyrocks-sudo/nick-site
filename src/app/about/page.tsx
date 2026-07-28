import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = { title: 'About' };

// Placeholder route — the real page is built in Phase 3.
export default function Page() {
  return (
    <ComingSoon
      eyebrow="About"
      title="About"
      note="The full biography arrives in Phase 3."
    />
  );
}
