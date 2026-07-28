import { ReactNode } from 'react';

/**
 * The standard section header: small tracked label, large condensed heading,
 * optional supporting line. Used on every page so sections feel like a set.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  /** Change only if heading order requires it. Do not skip levels. */
  as?: 'h1' | 'h2' | 'h3';
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {/* Sizes run large because Bebas is condensed — it occupies far less
          width than a normal face at the same font-size. */}
      <Tag className="display mt-5 text-5xl text-bone sm:text-6xl lg:text-7xl">
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed text-bone-dim ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
