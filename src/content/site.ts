/**
 * ============================================================================
 *  SITE CONTENT — THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE WEBSITE
 * ============================================================================
 *
 *  Everything the visitor reads lives here: the name, the bio, the links,
 *  the releases, the products. Change a value here and it updates everywhere
 *  on the site automatically.
 *
 *  RULES FOR EDITING (important):
 *    - Only change the text between the ' quote marks.
 *    - Keep the quote marks and the commas exactly where they are.
 *    - To hide a social link, set it to '' (two quote marks, nothing between).
 *      Empty links are hidden automatically — they will not show as dead links.
 *
 *  Anything marked TODO is a placeholder that still needs your real content.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. ARTIST IDENTITY
// ---------------------------------------------------------------------------

export const artist = {
  /** Displayed large in the hero. Capitalization here is what visitors see. */
  name: 'NICK', // TODO: replace with the full artist name

  /** One short line under the name. Aim for 3-8 words. */
  tagline: 'Placeholder tagline goes here', // TODO

  /** Used in the browser tab and in Google search results. */
  seoTitle: 'Nick — Official Site', // TODO

  /** The grey text under the link in Google results. Aim for ~150 characters. */
  seoDescription:
    'Official website of Nick. Listen to new music, read the story, and shop official merch.', // TODO

  /** Genre or one-line description of the sound. Shown in the About section. */
  genre: 'Placeholder genre', // TODO

  /**
   * The bio. Each string in this list becomes its own paragraph.
   * Add or remove paragraphs freely.
   */
  bio: [
    'TODO: First paragraph of the bio. Who is Nick, where is he from, what does he make? This is the paragraph most people will actually read, so it should carry the story.',
    'TODO: Second paragraph. Notable releases, shows, collaborations, or what is coming next.',
  ],
} as const;

// ---------------------------------------------------------------------------
// 1b. MAIN IMAGES
// ---------------------------------------------------------------------------
// Put your files in the `public/images/` folder, then change the filename here.
// Example: save `nick-hero.jpg` into public/images/ and write '/images/nick-hero.jpg'

export const images = {
  /** The big photo at the top of the home page. Landscape, 2400 x 1600 px. */
  hero: '/images/placeholder-hero.png',
  /** Alt text describes the photo for screen readers and when images fail. */
  heroAlt: 'TODO: describe the hero photo, e.g. "Nick performing on stage"',

  /** Portrait shown in the About section. 1200 x 1500 px. */
  portrait: '/images/placeholder-portrait.png',
  portraitAlt: 'TODO: describe the portrait, e.g. "Portrait of Nick"',
} as const;

// ---------------------------------------------------------------------------
// 2. CONTACT
// ---------------------------------------------------------------------------

export const contact = {
  /** WARNING: this address is published publicly on the site. */
  email: 'hello@example.com', // TODO: replace with the real contact address

  /** Optional. Set to '' to hide. */
  bookingEmail: '', // TODO (optional)

  /** Shown on the contact section, e.g. 'Los Angeles, CA'. Set to '' to hide. */
  location: '', // TODO (optional)
} as const;

// ---------------------------------------------------------------------------
// 3. STREAMING + SOCIAL LINKS
// ---------------------------------------------------------------------------
// Paste the full web address including https://
// Leave as '' to hide that link entirely.

export const streaming = {
  spotify: '', // TODO e.g. https://open.spotify.com/artist/xxxxx
  appleMusic: '', // TODO
  youtube: '', // TODO
  soundcloud: '', // TODO
  bandcamp: '', // TODO (optional)
} as const;

export const social = {
  instagram: '', // TODO
  tiktok: '', // TODO
  twitter: '', // TODO (X)
  facebook: '', // TODO (optional)
} as const;

// ---------------------------------------------------------------------------
// 4. MUSIC RELEASES
// ---------------------------------------------------------------------------
// These appear in the Music section as artwork cards.
// Artwork goes in the /public/images/ folder. Use square images, 1000x1000px.

export type Release = {
  id: string;
  title: string;
  type: 'Album' | 'EP' | 'Single';
  year: string;
  /** Path to square cover art inside /public. */
  artwork: string;
  /** Optional one-line description shown under the title. */
  blurb?: string;
  /** Per-release listen links. Leave '' to hide that button. */
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
  };
};

export const releases: Release[] = [
  {
    id: 'release-1',
    title: 'Placeholder Album Title', // TODO
    type: 'Album',
    year: '2026', // TODO
    artwork: '/images/placeholder-release-1.png', // TODO: swap for real cover art
    blurb: 'TODO: one line about this release.',
    links: {
      spotify: '',
      appleMusic: '',
      youtube: '',
      soundcloud: '',
    },
  },
  {
    id: 'release-2',
    title: 'Placeholder Single Title', // TODO
    type: 'Single',
    year: '2026', // TODO
    artwork: '/images/placeholder-release-2.png', // TODO
    blurb: 'TODO: one line about this release.',
    links: {
      spotify: '',
      appleMusic: '',
      youtube: '',
      soundcloud: '',
    },
  },
];

// ---------------------------------------------------------------------------
// 5. PRODUCTS (MERCH + MUSIC STORE)
// ---------------------------------------------------------------------------
//
//  HOW PRICING WORKS IN VERSION 1
//  ------------------------------
//  The price you type below is what the visitor SEES on the card.
//  The price actually CHARGED comes from Stripe, using the stripePriceId.
//  These two must match, or a customer will be charged a different amount
//  than advertised. Always update both together.
//
//  stripePriceId is left blank until Phase 4, when you create the products
//  in the Stripe Dashboard. A product with a blank stripePriceId shows a
//  disabled "Coming soon" button instead of a broken Buy button.
//
//  priceCents: write the price in CENTS with no decimal point.
//    $30.00 -> 3000        $28.50 -> 2850        $9.99 -> 999
//

export type Product = {
  id: string;
  name: string;
  /** Price in cents. $30.00 = 3000 */
  priceCents: number;
  description: string;
  /** Path to product image inside /public. Square, 1200x1200px. */
  image: string;
  /**
   * 'apparel'  = shipped, buyer picks a size
   * 'physical' = shipped, no size (vinyl, CD, poster)
   * 'digital'  = no shipping, delivered by email manually in V1
   */
  kind: 'apparel' | 'physical' | 'digital';
  /** Only used when kind is 'apparel'. */
  sizes?: string[];
  /** From Stripe Dashboard, looks like price_1AbCdEf... Blank = button disabled. */
  stripePriceId: string;
  /** Set false to hide from the store without deleting it. */
  available: boolean;
};

export const products: Product[] = [
  // --- MERCH ---------------------------------------------------------------
  {
    id: 'tee-logo',
    name: 'Logo T-Shirt', // TODO
    priceCents: 3000, // TODO: $30.00
    description: 'TODO: describe the shirt — colour, fabric, fit.',
    image: '/images/placeholder-product-1.png',
    kind: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stripePriceId: '', // filled in during Phase 4
    available: true,
  },
  {
    id: 'hoodie',
    name: 'Embroidered Hoodie', // TODO
    priceCents: 6500, // TODO: $65.00
    description: 'TODO: describe the hoodie.',
    image: '/images/placeholder-product-2.png',
    kind: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stripePriceId: '',
    available: true,
  },
  {
    id: 'vinyl-lp',
    name: 'Debut Album — Vinyl LP', // TODO
    priceCents: 2800, // TODO: $28.00
    description: 'TODO: describe the pressing — colour, gatefold, insert.',
    image: '/images/placeholder-product-3.png',
    kind: 'physical',
    stripePriceId: '',
    available: true,
  },

  // --- MUSIC STORE (digital) ----------------------------------------------
  {
    id: 'album-digital',
    name: 'Debut Album — Digital Download', // TODO
    priceCents: 1000, // TODO: $10.00
    description:
      'TODO: describe what the buyer receives. NOTE: in Version 1 you email these files to the buyer manually after purchase.',
    image: '/images/placeholder-release-1.png',
    kind: 'digital',
    stripePriceId: '',
    available: true,
  },
  {
    id: 'single-digital',
    name: 'Single — Digital Download', // TODO
    priceCents: 199, // TODO: $1.99
    description: 'TODO: describe the single.',
    image: '/images/placeholder-release-2.png',
    kind: 'digital',
    stripePriceId: '',
    available: true,
  },
];

// ---------------------------------------------------------------------------
// 6. DERIVED HELPERS — you do not need to edit anything below this line.
// ---------------------------------------------------------------------------

/** Formats 3000 as "$30.00" for display. */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/** Physical goods shown on the Merch page. */
export const merchProducts = products.filter(
  (p) => p.available && (p.kind === 'apparel' || p.kind === 'physical')
);

/** Digital goods shown on the Music Store page. */
export const digitalProducts = products.filter(
  (p) => p.available && p.kind === 'digital'
);

/** Looks up a product by id. Used by the checkout route. */
export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Main site navigation. Order here is the order shown in the header. */
export const nav = [
  { label: 'Music', href: '/music' },
  { label: 'Store', href: '/store' },
  { label: 'Merch', href: '/merch' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Legal pages shown in the footer. Real text is written in Phase 6. */
export const policyLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refunds', href: '/refunds' },
  { label: 'Shipping', href: '/shipping' },
] as const;

/** Streaming + social links, flattened and with the empty ones removed. */
export const streamingLinks = [
  { label: 'Spotify', href: streaming.spotify },
  { label: 'Apple Music', href: streaming.appleMusic },
  { label: 'YouTube', href: streaming.youtube },
  { label: 'SoundCloud', href: streaming.soundcloud },
  { label: 'Bandcamp', href: streaming.bandcamp },
].filter((l) => l.href !== '');

export const socialLinks = [
  { label: 'Instagram', href: social.instagram },
  { label: 'TikTok', href: social.tiktok },
  { label: 'X', href: social.twitter },
  { label: 'Facebook', href: social.facebook },
].filter((l) => l.href !== '');

/** Every external link, streaming and social together. */
export const allLinks = [...streamingLinks, ...socialLinks];

/**
 * True when no links have been filled in yet. The UI uses this to show a
 * tasteful "links coming soon" state instead of an empty gap.
 */
export const hasAnyLinks = allLinks.length > 0;
