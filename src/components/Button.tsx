import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

// Square corners, uppercase, wide tracking. Reads as a poster, not an app.
const base =
  'inline-flex items-center justify-center gap-2 rounded-none px-8 py-4 ' +
  'text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

const variants: Record<Variant, string> = {
  // Solid white. Use once per screen — it marks the single main action.
  primary:
    'bg-accent text-ink-950 font-semibold hover:bg-accent-bright shadow-[0_0_28px_-6px_rgba(255,45,120,0.7)]',
  // Outlined. For secondary actions sitting next to a primary.
  secondary:
    'border border-line-strong text-bone hover:border-accent hover:bg-accent hover:text-ink-950',
  // Text only. For tertiary actions and long link lists.
  ghost: 'px-0 py-2 text-bone-dim hover:text-accent',
};

/**
 * One button component for the whole site so every action looks and behaves
 * the same. Renders a real <a> when given href, and a real <button> otherwise —
 * this matters for keyboard and screen reader users.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  external = false,
  className = '',
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={styles}
          target="_blank"
          // noreferrer/noopener prevents the opened page from tampering with ours
          rel="noopener noreferrer"
        >
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
