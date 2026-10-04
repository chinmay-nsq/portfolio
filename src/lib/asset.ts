/**
 * Prefixes a /public path with the deployment base path.
 *
 * On GitHub Pages a project site lives at `user.github.io/<repo>/`, so plain `/hero/earth.jpg` would 404.
 * The deploy workflow sets NEXT_PUBLIC_BASE_PATH (empty for `user.github.io` repos and local dev).
 * Next.js prefixes <Link> and its own assets automatically, but not URLs we write by hand.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
