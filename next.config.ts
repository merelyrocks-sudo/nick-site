import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Next.js guesses the "project root" by looking for lockfiles. There is a
// stray package-lock.json in C:\Users\Andrew\, so it was guessing the home
// folder instead of this one — which changes how files are resolved and served.
// Pinning the root removes the guesswork and silences the warning.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
