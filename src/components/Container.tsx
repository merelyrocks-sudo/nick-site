import { ReactNode } from 'react';

/**
 * Constrains content to a readable width and applies the standard page gutters.
 * Every section uses this so left edges line up down the whole page.
 */
export default function Container({
  children,
  className = '',
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Use for image-led sections that should breathe wider than text. */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${
        wide ? 'max-w-[1600px]' : 'max-w-[1200px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}
