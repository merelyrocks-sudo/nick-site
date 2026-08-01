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
  name: 'Merely',

  /** One short line under the name. Aim for 3-8 words. Renders in caps. */
  tagline: 'Thrilla Killa — out now',

  /** Used in the browser tab and in Google search results. */
  seoTitle: 'Merely — Official Site',

  /** The grey text under the link in Google results. Aim for ~150 characters. */
  seoDescription:
    'Official site of Merely. Eleven albums of indie rock, the story so far, and official merch.',

  /** Genre or one-line description of the sound. Shown in the About section. */
  genre: 'Indie / alternative. Solo project. Eleven albums and counting.',

  /**
   * The bio. Each string in this list becomes its own paragraph.
   * Add or remove paragraphs freely.
   *
   * NOTE: this is a first draft written to be true of almost any emerging solo
   * artist, so the site reads properly today instead of showing TODO text.
   * It deliberately contains no invented facts — no fake cities, credits, or
   * release history. Replace it with the real story when you have it.
   */
  bio: [
    'Merely is a solo project. One person, writing and building the whole thing — guitars, noise, and everything underneath.',
    'The songs get made in small rooms and taken apart more times than is reasonable. Nothing goes out until it sounds like the thing that was in his head, which takes as long as it takes.',
    'Eleven albums so far. This is where they live, and where the next one lands.',
  ],
} as const;

// ---------------------------------------------------------------------------
// 1b. MAIN IMAGES
// ---------------------------------------------------------------------------
// Put your files in the `public/images/` folder, then change the filename here.
// Example: save `nick-hero.jpg` into public/images/ and write '/images/nick-hero.jpg'

export const images = {
  /**
   * The winged-rabbit artwork. Used full-screen in the home hero and as the
   * portrait in the About section. When a real photo of Nick exists, add it
   * as a separate entry here rather than replacing this — the rabbit is the
   * album art, not the artist.
   */
  portrait: '/images/portrait.jpg',
  portraitAlt: 'Merely artwork: a winged rabbit figure in a navy dress, standing in a faded pink room',
} as const;

/**
 * Per-page hero images used by <PageHero>. Each page gets a warm full-bleed
 * artwork so the site reads as one continuous design instead of a polished
 * home page followed by flat inner pages.
 *
 * Only files that already exist in /public are referenced. Replace any of
 * these with a better asset (e.g. a real photo for /about) without renaming
 * the keys — every page imports the map by key.
 */
export const pageHeroes = {
  music: {
    src: '/images/releases/thrilla-killa.jpg',
    alt: 'Cover artwork for Thrilla Killa',
  },
  store: {
    src: '/images/releases/thrilla-killa.jpg',
    alt: 'Cover artwork for Thrilla Killa',
  },
  merch: {
    src: '/images/placeholder-product-1.png',
    alt: 'Logo T-Shirt product mockup',
  },
  about: {
    src: images.portrait,
    alt: images.portraitAlt,
  },
  contact: {
    src: '/images/releases/daze.jpg',
    alt: 'Cover artwork for Daze',
  },
  privacy: {
    src: '/images/releases/merely-rocks-2.jpg',
    alt: 'Cover artwork for Merely Rocks 2',
  },
  terms: {
    src: '/images/releases/merely-rocks-2.jpg',
    alt: 'Cover artwork for Merely Rocks 2',
  },
  refunds: {
    src: '/images/releases/merely-rocks-2.jpg',
    alt: 'Cover artwork for Merely Rocks 2',
  },
  shipping: {
    src: '/images/releases/merely-rocks-2.jpg',
    alt: 'Cover artwork for Merely Rocks 2',
  },
  success: {
    src: '/images/releases/thrilla-killa.jpg',
    alt: 'Cover artwork for Thrilla Killa',
  },
  cancelled: {
    src: '/images/releases/dig-this.jpg',
    alt: 'Cover artwork for Dig This',
  },
} as const;

// ---------------------------------------------------------------------------
// 2. CONTACT
// ---------------------------------------------------------------------------

export const contact = {
  /** WARNING: this address is published publicly on the site. */
  email: 'merelyrocks@gmail.com',

  /** Shown on the contact section, e.g. 'Los Angeles, CA'. Set to '' to hide. */
  location: '', // TODO (optional)
} as const;

// ---------------------------------------------------------------------------
// 3. STREAMING + SOCIAL LINKS
// ---------------------------------------------------------------------------
// Paste the full web address including https://
// Leave as '' and the service shows in the hub as a dimmed "soon" tile —
// it fills in automatically the moment you paste a real URL.

export const streaming: Record<string, string> = {
  spotify: 'https://open.spotify.com/artist/4s3TTBCeMLeCYPTVQrOGEw?si=sQFpj2iqTaySVpshw7aeyw',
  appleMusic: 'https://music.apple.com/us/artist/merely/1625077159',
  youtube: 'https://www.youtube.com/channel/UCCbGnstwWpe-dT4TEoR3nig',
  youtubeMusic: '', // TODO (optional — often the same artist as YouTube)
  soundcloud: '', // TODO
  bandcamp: '', // TODO (optional)
  tidal: '', // TODO (optional)
  amazonMusic: '', // TODO (optional)
};

export const social: Record<string, string> = {
  instagram: 'https://www.instagram.com/merelyrocks/',
  tiktok: 'https://www.tiktok.com/@merelyrocks?is_from_webapp=1&sender_device=pc',
  twitter: 'https://x.com/MerelyRocks',
  facebook: '', // TODO (optional) — a real band Page, not a personal profile
};

// ---------------------------------------------------------------------------
// 3b. NEWSLETTER
// ---------------------------------------------------------------------------
// V1 has no newsletter system of its own. When you create a free signup
// (Buttondown, Mailchimp, etc.), paste the public signup page URL here and
// the Subscribe button appears in the header automatically.

export const newsletter = {
  /** Public signup URL. Set to '' to hide the Subscribe button. */
  url: '', // TODO (optional) e.g. https://buttondown.email/merely
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
  /** Release year. Leave '' if unknown — the site hides it rather than guessing. */
  year: string;
  /** Path to square cover art inside /public. */
  artwork: string;
  /** Number of tracks. Set to 0 to hide. */
  trackCount?: number;
  /**
   * Track titles in order, taken from Nick's own album documents.
   * Leave empty and the site falls back to "Track 1", "Track 2", ... which is
   * honest placeholder text rather than invented song names.
   */
  tracks?: string[];
  /**
   * True when 30-second preview clips exist for this release at
   * /public/audio/previews/<id>/01.mp3, 02.mp3 and so on.
   */
  hasPreviews?: boolean;
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

/** Shown when a release has no cover art yet. */
export const ARTWORK_PENDING = '/images/releases/artwork-pending.jpg';

/**
 * THE ORDER OF THIS LIST IS THE ORDER SHOWN ON THE SITE.
 * Newest first is the convention. Move a block up or down to reorder.
 * The home page shows the first three.
 *
 * Titles came from the CD folder names and the artwork filenames — check them.
 * A blank year is safe: the site omits it rather than printing a guess.
 *
 * WHY THE YOUTUBE LINKS ARE EMPTY
 * -------------------------------
 * The catalogue was distributed through a CD Baby account Nick no longer has
 * access to. That delivery is what created the auto-generated "Merely - Topic"
 * channel on YouTube. Those playlists still work, but plays through them are
 * credited to the old distribution account rather than to Nick.
 *
 * The two known playlist URLs are preserved in comments on their releases so
 * nothing is lost. Put them back, or replace them with links from the new
 * distribution, by filling in the `links` object on any release.
 */
export const releases: Release[] = [
  {
    id: 'thrilla-killa',
    title: 'Thrilla Killa',
    type: 'Album',
    year: '2026',
    artwork: '/images/releases/thrilla-killa.jpg',
    trackCount: 16,
    hasPreviews: true,
    links: {},
  },
  {
    id: 'merely-rocks-2',
    title: 'Merely Rocks II',
    type: 'Album',
    year: '2025',
    artwork: '/images/releases/merely-rocks-2.jpg',
    trackCount: 15,
    hasPreviews: true,
    links: {},
  },
  {
    id: 'merely-rocks',
    title: 'Merely Rocks I',
    type: 'Album',
    year: '2024',
    artwork: '/images/releases/merely-rocks-1.jpg',
    trackCount: 15,
    hasPreviews: true,
    links: {},
  },
  {
    id: 'daze',
    title: 'Daze',
    type: 'Album',
    year: '2023',
    artwork: '/images/releases/daze.jpg',
    trackCount: 15,
    tracks: [
      'I Know That You Don\'t',
      'Fell On Deaf Ears',
      'Walpurgis (I Get Around)',
      'Alive Inside',
      'Feed Your Head',
      'Err Is Human',
      'Daze',
      'Yours Entwined (In Your Head)',
      'I\'m Feelin\' Fine',
      'Quoth The Pause',
      'The Black Cat',
      'Went Down To The Levee',
      'Would You Care?',
      'Henry The Ape I Am',
      'Strange Ways',
    ],
    hasPreviews: true,
    links: {},
  },
  {
    id: 'are-you-brutal-2',
    title: 'Are You Brutal 2',
    type: 'Album',
    year: '2020',
    artwork: ARTWORK_PENDING, // TODO: no cover art found for this release
    trackCount: 12,
    hasPreviews: true,
    links: {},
  },
  {
    id: 'are-you-brutal',
    title: 'Are You Brutal',
    type: 'Album',
    year: '2019',
    artwork: ARTWORK_PENDING, // TODO: no cover art found for this release
    trackCount: 12,
    hasPreviews: true,
    links: {},
  },
  {
    id: 'get-out',
    title: 'Get Out',
    type: 'Album',
    year: '2021',
    // WARNING: source artwork is only 281x281px and looks soft.
    // Replace with a larger scan when you find one.
    artwork: '/images/releases/get-out.jpg',
    trackCount: 12,
    tracks: [
      'Killer Diller',
      'I Get Around',
      'Mosquito',
      'Cuckoo Ca-Choo',
      'Redneck',
      'Bled',
      'Foot In Mouth',
      'Hey There, Scarecrow',
      'Rag And Bone',
      'Leadfoot',
      'Leave Me Alone',
      'Dirtbag',
    ],
    hasPreviews: true,
    links: {},
  },
  {
    id: 'merely-lives-2',
    title: 'Merely Lives 2',
    type: 'Album',
    year: '', // TODO
    // Shares artwork with Merely Lives — swap if a part 2 cover exists.
    artwork: '/images/releases/merely-lives.jpg',
    trackCount: 11,
    tracks: [
      'I Can\'t Raise Life From The Grave',
      'Darkest Hour',
      'Ahha!',
      'Let Me Wander In Your Garden',
      'Four Winds Blow (Carry Me Home)',
      'The Moor',
      'Hark! The Angels Come',
      'So Become Of What\'s In Store',
      'The Night Is Young',
      'Soon The Day Will Come',
      'Mere Mortals',
    ],
    hasPreviews: true,
    links: {},
  },
  {
    id: 'merely-lives',
    title: 'Merely Lives',
    type: 'Album',
    year: '', // TODO
    artwork: '/images/releases/merely-lives.jpg',
    trackCount: 11,
    tracks: [
      'Come! Come! To The Heart-beats Drum',
      'The Dark Of Night',
      'No More',
      'Woe Is Me',
      'The Mona Lisa',
      'You Call Me Rapture',
      '2 Wallow In',
      'Merely',
      'You Wither Away',
      'Come!',
      'I Am But A Mortal Man',
    ],
    hasPreviews: true,
    links: {},
  },
  {
    id: 'dig-this',
    title: 'Dig This',
    type: 'Album',
    year: '', // TODO
    artwork: '/images/releases/dig-this.jpg',
    // Track count confirmed from the YouTube playlist itself.
    trackCount: 17,
    // Link intentionally removed — see the note above the releases list.
    // Old auto-generated playlist, kept here so it is not lost:
    // https://www.youtube.com/playlist?list=OLAK5uy_n6PI_9PPFRQIK6Mt5rKzfE-kqVTe6Dr6Y
    tracks: [
      'Excuse The Hell Outta Me',
      'Like I Care',
      'Dig This',
      'Me? I Feel Fine',
      'Where The Hell Have You Been?',
      'Mud Diver',
      'I\'ll Do It Anyway',
      'Dig Me That Hole',
      'Pisces',
      'I Feel Fine, In My Mind',
      'Had It All',
      'I Love You Madly',
      'Crayzee For You',
      'Hey Man, What\'s The Plan?',
      'Like I Do',
      'Who Do I Serve?',
      'Eat Crow',
    ],
    hasPreviews: true,
    links: {},
  },
  {
    id: 'already-dead',
    title: 'Already Dead',
    type: 'Album',
    year: '', // TODO
    artwork: '/images/releases/already-dead.jpg',
    // Track count confirmed from the YouTube playlist itself.
    trackCount: 14,
    // Link intentionally removed — see the note above the releases list.
    // Old auto-generated playlist, kept here so it is not lost:
    // https://www.youtube.com/playlist?list=OLAK5uy_nSBOnip5qMbuWOP4q8mSZKi45-3eB1GCY
    // NOTE: the CD rip holds 14 recordings, but Nick's document and the
    // YouTube listing both name only 12. Titles 1-12 are his; tracks 13 and
    // 14 are left unnamed rather than guessed. Worth checking by ear.
    tracks: [
      'Already Dead',
      'Mother\'s Babies Dyin\'',
      'Pour Me Out',
      'It\'s Alright Mama',
      'Knowin\'',
      'Hole In My Head',
      'All Gone',
      'Goin\' Nowhere',
      'In The Day',
      'Feelin\'',
      'Drawing Near',
      'Already Dead (Reprise)',
      '',
      '',
    ],
    hasPreviews: true,
    links: {},
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

// ---------------------------------------------------------------------------
//  STORE ON/OFF SWITCH
// ---------------------------------------------------------------------------
//
//  Set this to false and every Buy button on the site goes grey and reads
//  "Coming soon". The checkout API also refuses, so the store is genuinely
//  closed and not just visually disabled.
//
//  Set it back to true to reopen. Nothing else needs changing — the Stripe
//  price IDs below stay exactly as they are.
//
//  Currently FALSE because the store is still in Stripe test mode. A visitor
//  clicking Buy would land on a Stripe page stamped "TEST MODE", which is
//  confusing on a site being shown to real people. Flip to true once Nick's
//  Stripe account is verified and live keys are in place.
//
export const storeEnabled = false;

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
  /** For digital albums: the release this product sells. */
  releaseId?: string;
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
    stripePriceId: 'price_1Tz4vqQ0jYrsWdaS52b1GpSP', // filled in during Phase 4
    available: false, // placeholder — set true once this is a real product
  },
  {
    id: 'hoodie',
    name: 'Embroidered Hoodie', // TODO
    priceCents: 6500, // TODO: $65.00
    description: 'TODO: describe the hoodie.',
    image: '/images/placeholder-product-2.png',
    kind: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stripePriceId: 'price_1Tz4vrQ0jYrsWdaSOKgbWGHc',
    available: false, // placeholder — set true once this is a real product
  },
  {
    id: 'vinyl-lp',
    name: 'Debut Album — Vinyl LP', // TODO
    priceCents: 2800, // TODO: $28.00
    description: 'TODO: describe the pressing — colour, gatefold, insert.',
    image: '/images/placeholder-product-3.png',
    kind: 'physical',
    stripePriceId: 'price_1Tz4vrQ0jYrsWdaSWfQ4wuTX',
    available: false, // placeholder — set true once this is a real product
  },

  // --- MUSIC STORE (digital) ----------------------------------------------
  {
    id: 'album-thrilla-killa',
    releaseId: 'thrilla-killa',
    name: 'Thrilla Killa (2026)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/thrilla-killa.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vsQ0jYrsWdaSdcVXGbom', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-merely-rocks-2',
    releaseId: 'merely-rocks-2',
    name: 'Merely Rocks II (2025)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/merely-rocks-2.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vsQ0jYrsWdaSWTP5ziMD', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-merely-rocks',
    releaseId: 'merely-rocks',
    name: 'Merely Rocks I (2024)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/merely-rocks-1.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vsQ0jYrsWdaSWSutpj5v', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-daze',
    releaseId: 'daze',
    name: 'Daze (2023)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/daze.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vtQ0jYrsWdaS2fwL0DAe', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-are-you-brutal-2',
    releaseId: 'are-you-brutal-2',
    name: 'Are You Brutal 2 (2020)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: ARTWORK_PENDING,
    kind: 'digital',
    stripePriceId: 'price_1Tz4vtQ0jYrsWdaSKAyaRFXA', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-are-you-brutal',
    releaseId: 'are-you-brutal',
    name: 'Are You Brutal (2019)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: ARTWORK_PENDING,
    kind: 'digital',
    stripePriceId: 'price_1Tz4vuQ0jYrsWdaSRanU8Hjq', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-get-out',
    releaseId: 'get-out',
    name: 'Get Out (2021)',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/get-out.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vuQ0jYrsWdaSgwuB5j2p', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-merely-lives-2',
    releaseId: 'merely-lives-2',
    name: 'Merely Lives 2',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    // Shares cover art with Merely Lives — no separate part 2 cover exists yet.
    image: '/images/releases/merely-lives.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vvQ0jYrsWdaSfHiRllMw', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-merely-lives',
    releaseId: 'merely-lives',
    name: 'Merely Lives',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/merely-lives.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vvQ0jYrsWdaSUcMSOP6D', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-dig-this',
    releaseId: 'dig-this',
    name: 'Dig This',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/dig-this.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vwQ0jYrsWdaS5kKr6di5', // filled in during Stripe setup
    available: true,
  },
  {
    id: 'album-already-dead',
    releaseId: 'already-dead',
    name: 'Already Dead',
    priceCents: 999, // TODO: set the real price. 999 = $9.99
    description: 'Full album download. High quality files, yours to keep.',
    image: '/images/releases/already-dead.jpg',
    kind: 'digital',
    stripePriceId: 'price_1Tz4vwQ0jYrsWdaSOm2tBZih', // filled in during Stripe setup
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

/** Looks up a release by id. Used by the album pages. */
export function getRelease(id: string): Release | undefined {
  return releases.find((r) => r.id === id);
}

/**
 * The display name for one track.
 * Falls back to "Track 3" when the real title is unknown — never invented.
 */
export function trackTitle(release: Release, index: number): string {
  const t = release.tracks?.[index];
  return t && t.trim() !== '' ? t : `Track ${index + 1}`;
}

/** True when we know the real title for this track. */
export function hasRealTitle(release: Release, index: number): boolean {
  const t = release.tracks?.[index];
  return !!t && t.trim() !== '';
}

/** Path to a track's 30-second preview, or null if none exists. */
export function previewPath(release: Release, index: number): string | null {
  if (!release.hasPreviews) return null;
  return `/audio/previews/${release.id}/${String(index + 1).padStart(2, '0')}.mp3`;
}

/** How many tracks to render for a release. */
export function trackNumbers(release: Release): number[] {
  const n = release.trackCount ?? release.tracks?.length ?? 0;
  return Array.from({ length: n }, (_, i) => i);
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
