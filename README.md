# Chinmay Lale — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (+ ScrollTrigger, SplitText) · Lenis

A space / fighter-jet themed portfolio, kept deliberately restrained: near-black palette, hairline
panels, a technical-drawing jet schematic and quiet flight-telemetry details.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit your content

Everything lives in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile` — contact links, `resume` (drop a PDF in `/public`), `photo` (drop an image in `/public`)
- `experience`, `projects` (add `live` / `repo` URLs to show buttons), `skillGroups`, `achievements`, `education`
- `currentMission` — the GenieHire section (add an `href` to show a link)

## Planet Jumping (separate page)

A standalone, dependency-free space-portal experience lives at **`/planet-jumping`**
(source: [`public/planet-jumping.html`](public/planet-jumping.html), exposed through a rewrite in
`next.config.ts`). It is a single self-contained HTML file — inline CSS/JS, no build step, no
libraries — with a video preloader and a canvas-driven "portal" that tilts toward the pointer and
expands to carry you from Mars → Earth → Venus. It loads its media from the CDN URLs in the file.

## How it's put together

| Piece | File |
| --- | --- |
| Loader (pre-flight HUD → takeoff → hyperspace → blast doors) | `src/components/Loader.tsx` |
| Smooth scroll (Lenis driven by the GSAP ticker) | `src/components/SmoothScroll.tsx` |
| Starfield canvas, nebula, flybys | `StarField.tsx`, `Nebula.tsx`, `Flyby.tsx` |
| Altitude / Mach HUD (scrolling = ascent to orbit) | `src/components/HudTelemetry.tsx` |
| Jet schematic + outline mark | `src/components/Jet.tsx` |
| Planet hopping (portal section, lazy-loaded media) | `src/components/sections/Cosmos.tsx`, `src/data/cosmos.ts` |
| Sections | `src/components/sections/*` |

`prefers-reduced-motion` is respected: the loader becomes a short fade, and the starfield, flybys,
marquee and pinned scrolling are disabled or simplified.
