import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * Static export for GitHub Pages.
 * NEXT_PUBLIC_BASE_PATH is set by the deploy workflow: "" for a `<user>.github.io` repo,
 * "/<repo>" for a normal project site. Locally it is empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

export default function config(phase: string): NextConfig {
  const base: NextConfig = {
    basePath,
    trailingSlash: true, // /planet-jumping/ → planet-jumping/index.html, which is what GitHub Pages serves
    images: { unoptimized: true }, // the default image optimiser needs a server
  };

  // `next dev` doesn't serve a folder's index.html, and rewrites can't coexist with a static export,
  // so in development only we map the standalone page's URL onto its file.
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...base,
      async rewrites() {
        return [{ source: "/planet-jumping", destination: "/planet-jumping/index.html" }];
      },
    };
  }

  // `next build` writes a plain static site to ./out
  return { ...base, output: "export" };
}
