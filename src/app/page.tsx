import { artist } from "@/content/site";

// PLACEHOLDER PAGE — replaced entirely in Phase 2 by the real home page.
// This exists so the project builds and runs end to end after Phase 1.

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Phase 1 complete
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
          {artist.name}
        </h1>
        <p className="mt-4 text-lg text-white/60">{artist.tagline}</p>
        <p className="mt-10 text-sm leading-relaxed text-white/40">
          The project is set up and running. The real design and home page are
          built in Phase 2.
        </p>
      </div>
    </main>
  );
}
