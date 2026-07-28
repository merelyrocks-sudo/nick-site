import type { Metadata } from 'next';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import { artist, contact, streamingLinks, socialLinks } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${artist.name} — bookings, press, and enquiries.`,
};

/**
 * Version 1 has no contact form on purpose.
 *
 * A form needs a server to receive the message, a spam filter, and somewhere to
 * store or forward it — all of which is Version 2 work. A plain email address
 * arrives reliably, works from every device, and gives the sender a copy in
 * their own sent folder. It is the better option until there is a real reason
 * to build the form.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Bookings, press, features, or anything else."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="eyebrow">Email</h2>
              <p className="mt-6 text-base leading-relaxed text-bone-dim">
                The fastest way to reach Merely. Emails are read personally.
              </p>
              <div className="mt-8">
                <Button href={`mailto:${contact.email}`}>
                  {contact.email}
                </Button>
              </div>

              {contact.bookingEmail && (
                <div className="mt-12">
                  <h2 className="eyebrow">Bookings</h2>
                  <div className="mt-6">
                    <Button
                      href={`mailto:${contact.bookingEmail}`}
                      variant="secondary"
                    >
                      {contact.bookingEmail}
                    </Button>
                  </div>
                </div>
              )}

              {contact.location && (
                <div className="mt-12">
                  <h2 className="eyebrow">Based in</h2>
                  <p className="mt-5 text-base text-bone-dim">
                    {contact.location}
                  </p>
                </div>
              )}
            </div>

            <div>
              {socialLinks.length > 0 && (
                <>
                  <h2 className="eyebrow">Follow</h2>
                  <ul className="mt-6 space-y-4">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between border-b border-line py-3 text-base text-bone-dim transition-colors hover:text-bone"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="text-bone-faint transition-transform duration-200 group-hover:translate-x-1 group-hover:text-bone"
                          >
                            →
                          </span>
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {streamingLinks.length > 0 && (
                <div className={socialLinks.length > 0 ? 'mt-12' : ''}>
                  <h2 className="eyebrow">Listen</h2>
                  <ul className="mt-6 space-y-4">
                    {streamingLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between border-b border-line py-3 text-base text-bone-dim transition-colors hover:text-bone"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="text-bone-faint transition-transform duration-200 group-hover:translate-x-1 group-hover:text-bone"
                          >
                            →
                          </span>
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {socialLinks.length === 0 && streamingLinks.length === 0 && (
                <>
                  <h2 className="eyebrow">Elsewhere</h2>
                  <p className="mt-6 text-sm leading-relaxed text-bone-faint">
                    Social and streaming links are coming soon. Email is the way
                    to reach Merely in the meantime.
                  </p>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
