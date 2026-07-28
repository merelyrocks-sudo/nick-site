import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = { title: 'Music' };

// Placeholder route — the real page is built in Phase 3.
export default function Page() {
  return (
    <ComingSoon
      eyebrow="Listen"
      title="Music"
      note="The full release list with artwork and streaming links arrives in Phase 3."
    />
  );
}
