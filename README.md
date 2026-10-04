# Chinmay Lale — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (+ ScrollTrigger, SplitText) · Lenis

A space / fighter-jet themed portfolio, kept deliberately restrained: near-black palette, hairline
panels, a technical-drawing jet schematic and quiet flight-telemetry details.

## Run

```bash
npm install
npm run dev      # http://localhost:3000   (standalone page: /planet-jumping)
npm run build    # static export → ./out  (this is what gets deployed)
npx serve out    # preview the exported site locally (`npm start` doesn't apply to a static export)
```

## Deploy to GitHub Pages

The site is a fully static export, deployed by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

1. Create an empty GitHub repo (no README/licence). Name it `<username>.github.io` to serve from the domain root, or anything else to serve from `/<repo-name>/` — the workflow detects which and sets the base path itself.
2. `git remote add origin https://github.com/<username>/<repo>.git` then `git push -u origin main`.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions** (one time).
4. Watch **Actions → Deploy to GitHub Pages**; the live URL appears on the finished run and under Settings → Pages.

The standalone experience lives at `<site>/planet-jumping/` (keep the trailing slash). Hand-written asset URLs go through
[`asset()`](src/lib/asset.ts) so they respect the base path.

## Edit your content

Everything lives in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile` — contact links, `resume` (drop a PDF in `/public`), `photo` (drop an image in `/public`)
- `experience`, `projects` (add `live` / `repo` URLs to show buttons), `skillGroups`, `achievements`, `education`
- `currentMission` — the GenieHire section (add an `href` to show a link)

## Hero depth effect

Three backdrops share one idea. **Earth is the default**; open `/?hero=nebula` or `/?hero=moon` to compare the others. The Earth and Moon heroes put a photographic planet disc in front of the name so the last letter tucks behind its limb (with a soft cast shadow). The Earth is a real DSCOVR EPIC photo centred on India. The nebula version works differently: The nebula hero draws
the same Hubble image twice — a full back layer and a front layer that is visible only where the gas is dense
(`nebula-mask.png`, stars removed) — with the name sandwiched between them, so thick clouds drift in front of parts of
the lettering. Both layers get identical parallax so they always line up.

Moon version: the giant name sits on a layer **behind** a photoreal Moon, so its last
letter tucks behind the disc (with the Moon casting a soft shadow on the lettering), and the small copy sits
in front of both. Each layer drifts at its own speed on pointer movement and scroll. The Moon is a 3240 px
NASA render, cropped to a circle and shipped at two sizes in [`public/hero/`](public/hero) (see
[`CREDITS.md`](public/hero/CREDITS.md)). Layout and parallax live in
[`Hero.tsx`](src/components/sections/Hero.tsx).

## Projects

On desktop the project cards park under the heading and each next card slides over the last (the covered
one scales back and dims); on small screens they are a plain stacked list.

## Deep-space backgrounds

Looping NASA footage (public domain, from the Scientific Visualization Studio) sits behind the skills
orbit and the contact section via [`SpaceVideo`](src/components/ui/SpaceVideo.tsx). Each clip in
[`public/space/`](public/space) exists as a 1080p file (~5 MB) and a 4K file (~13 MB) plus a poster frame.
The 4K file is only used on genuinely high-resolution screens; nothing is fetched until a section nears the
viewport, playback pauses off-screen, and reduced-motion / data-saver visitors get the still poster.
Sources and credits: [`public/space/CREDITS.md`](public/space/CREDITS.md).

## Technology logos

Logos live in [`public/logos/`](public/logos) as single-colour SVGs (brand marks from
[Simple Icons](https://simpleicons.org); `sql.svg` is a generic database glyph) and are drawn with CSS
masking by `src/components/ui/TechLogo.tsx`, so they match the surrounding text colour and take their
brand colour on hover. To add one: drop `name.svg` in `public/logos/` and add a line to
[`src/data/tech.ts`](src/data/tech.ts) keyed by the skill name used in `portfolio.ts`.

## Planet Jumping (separate page)

A standalone, dependency-free space-portal experience lives at **`/planet-jumping`**
(source: [`public/planet-jumping.html`](public/planet-jumping.html), exposed through a rewrite in
`next.config.ts`). It is a single self-contained HTML file — inline CSS/JS, no build step, no
libraries — with a video preloader and a canvas-driven "portal" that tilts toward the pointer and
expands to carry you from Mars → Earth → Venus. Its media is served locally from
[`public/planet-jumping/`](public/planet-jumping) — the videos are 8-bit H.264 1080p (~11 MB total), which
plays smoothly everywhere; the original 10-bit HEVC files were ~46 MB and often stuttered.

## How it's put together

| Piece | File |
| --- | --- |
| Loader (pre-flight HUD → takeoff → hyperspace → blast doors) | `src/components/Loader.tsx` |
| Smooth scroll (Lenis driven by the GSAP ticker) | `src/components/SmoothScroll.tsx` |
| Starfield canvas, nebula, flybys | `StarField.tsx`, `Nebula.tsx`, `Flyby.tsx` |
| Altitude / Mach HUD (scrolling = ascent to orbit) | `src/components/HudTelemetry.tsx` |
| Jet schematic + outline mark | `src/components/Jet.tsx` |
| Sections | `src/components/sections/*` |

`prefers-reduced-motion` is respected: the loader becomes a short fade, and the starfield, flybys,
marquee and pinned scrolling are disabled or simplified.
