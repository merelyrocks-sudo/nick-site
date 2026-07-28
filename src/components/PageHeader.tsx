import Container from './Container';
import SectionHeading from './SectionHeading';

/**
 * The masthead every inner page opens with. Keeps /music, /merch, /about and
 * the rest visually consistent, and guarantees each page has exactly one h1.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Container>
    </section>
  );
}
