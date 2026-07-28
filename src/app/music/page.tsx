import type { Metadata } from 'next';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import ReleaseCard from '@/components/ReleaseCard';
import Button from '@/components/Button';
import { artist, releases, streamingLinks } from '@/content/site';

export const metadata: Metadata = {
  title: 'Music',
  description: `Releases by ${artist.name}. ${artist.genre}`,
};

export default function MusicPage() {
  return (
    <>
      <PageHeader eyebrow="Listen" title="Music" description={artist.genre} />

      <section className="py-20 sm:py-28">
        <Container>
          {releases.length > 0 ? (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {releases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-bone-dim">
              No releases listed yet. Check back soon.
            </p>
          )}
        </Container>
      </section>

      {/* Streaming platforms listed once at the bottom rather than repeated on
          every card. Hidden entirely until at least one link exists. */}
      {streamingLinks.length > 0 && (
        <section className="border-t border-line py-20 sm:py-28">
          <Container>
            <h2 className="eyebrow">Also on</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {streamingLinks.map((link) => (
                <li key={link.label}>
                  <Button href={link.href} external variant="secondary">
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
