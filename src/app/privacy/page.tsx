import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = { title: 'Privacy Policy' };

// Placeholder route — the real page is built in Phase 6.
export default function Page() {
  return (
    <ComingSoon
      eyebrow="Legal"
      title="Privacy Policy"
      note="Policy text is written in Phase 6, before launch."
    />
  );
}
