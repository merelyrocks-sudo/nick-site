import Container from './Container';
import SectionHeading from './SectionHeading';
import Button from './Button';

/**
 * Temporary page body used by routes that are built in a later phase.
 * Every link in the header and footer therefore leads somewhere real —
 * no dead ends and no 404s while the site is still being built.
 */
export default function ComingSoon({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <Container className="flex min-h-[60svh] items-center py-24">
      <div className="mx-auto max-w-xl text-center">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={note}
          align="center"
        />
        <div className="mt-10">
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </Container>
  );
}
