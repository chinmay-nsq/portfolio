# Chinmay Lale — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4

A light bento-board portfolio: rounded tiles on soft grey, solid colours only (ink, blue, sun yellow), Bricolage
Grotesque headlines and Geist text. The first screen is the board, and some tiles are toys: a live analog clock
on Pune time, a terminal that "installs something" when tapped, an ESP32 whose LED you can switch on, and a
shuttlecock with a rally counter. Below it are work (expandable rows), projects (with small drawings), the story
so far (education and wins) and a contact block.

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

Hand-written asset URLs go through [`asset()`](src/lib/asset.ts) so they respect the base path.

## Edit your content

Everything lives in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- `profile` — contact links, `resume` (drop a PDF in `/public` to show a "Download my CV" button)
- `experience` — expandable rows under Work; `headline` is the pill shown on the collapsed row
- `projects` (add `live` / `repo` URLs to show links); the drawings live in `Projects.tsx`
- `education[].story` is how the story section tells each step; `achievements` are the coloured win tiles
- `skillGroups` feeds the structured data; the "Daily drivers" chips are listed in `Bento.tsx`

## How it's put together

| Piece | File |
| --- | --- |
| Tokens, tiles, bento grid areas, reveal-on-scroll | [`src/app/globals.css`](src/app/globals.css) |
| The hero board | `src/components/sections/Bento.tsx` |
| Clock, terminal, ESP32 and shuttlecock | `src/components/ui/Toys.tsx` |
| Tiles rising in as they scroll into view | `src/components/RevealObserver.tsx` |
| Sections | `src/components/sections/*` |

Motion is small: tiles rise in once as they come into view, rows expand, and the toys respond when tapped. It all
uses CSS transitions and the Web Animations API (no animation library), and `prefers-reduced-motion` turns it off.

Fonts: Bricolage Grotesque (headings), Geist (text) and Geist Mono (the terminal).

## SEO & sharing

- **Metadata** — title, description, canonical URL, robots directives, Open Graph + Twitter cards ([`layout.tsx`](src/app/layout.tsx), copy in [`src/lib/site.ts`](src/lib/site.ts)).
- **Share image** — [`public/og.jpg`](public/og.jpg), 1200×630, the hero headline.
- **Structured data** — JSON-LD `Person` + `ProfilePage` + `WebSite` ([`JsonLd.tsx`](src/components/JsonLd.tsx)).
- **`robots.txt`, `sitemap.xml`, `manifest.webmanifest`**, favicon, Apple touch icon and PWA icons (CL monogram).
- `/planet-jumping/` is an older experiment, kept as-is and marked `noindex`.

The public URL comes from `NEXT_PUBLIC_SITE_URL`, which the deploy workflow sets automatically (`https://<user>.github.io/<repo>`).

**After the first deploy**

1. [Google Search Console](https://search.google.com/search-console) → *Add property* → *URL prefix* → your site URL.
2. Verify with the **HTML tag** method: copy only the `content="…"` token, then in the repo go to *Settings → Secrets and variables → Actions → Variables* and add `GOOGLE_SITE_VERIFICATION`. Re-run the deploy workflow and click *Verify*.
3. *Sitemaps* → submit `sitemap.xml`. Then *URL inspection* → *Request indexing* for the home page.
4. Check the link preview in the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (they cache aggressively — use their *Scrape again* button after changing the image).

**For the strongest personal-brand SEO**, serve the site from its own root: either a repo named `<username>.github.io`, or a custom domain (e.g. `chinmaylale.dev`). Add a repository **variable** `CUSTOM_DOMAIN` with that domain, set it under *Settings → Pages → Custom domain*, and re-run the workflow — canonical URLs, sitemap and share tags all switch over automatically.

## Planet Jumping (separate page)

A standalone, dependency-free experiment lives at **`/planet-jumping/`** (keep the trailing slash), served from
[`public/planet-jumping/`](public/planet-jumping) and exposed in development through a rewrite in `next.config.ts`.
It predates the current design and isn't linked from the portfolio.
