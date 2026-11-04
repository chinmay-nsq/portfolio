# Chinmay Lale — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (+ ScrollTrigger) · Lenis

A clean, light portfolio with one idea: **the line**. A single blue pen stroke draws itself down the left
margin as you scroll, ties a knot beside every job and project (the year appears in the margin when the pen
gets there), and finishes by underlining the email address at the bottom. Everything else stays quiet:
white page, Funnel Display headlines, one reading column.

The line lives in [`src/components/Thread.tsx`](src/components/Thread.tsx). Any element can join it with a
`data-thread` attribute: `start`, `sway` (pass by in the margin), `knot` (tie a loop; the element gets
`data-reached` when the pen arrives, which reveals its `.margin-note`), or `underline` (leave the margin and
underline it). The path is rebuilt from those anchors whenever the layout changes.

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
- `experience` — one expandable row each; `headline` is the line shown on the collapsed row, `current: true` adds the "Now" badge and opens it by default
- `projects` (add `live` / `repo` URLs to show links), `skillGroups`, `achievements`, `education`

In the **Toolbox** section a skill is shown in full ink when a job or project on the page lists it in its `tags`
(matching lives in [`src/lib/content.ts`](src/lib/content.ts)), and lighter otherwise.

## How it's put together

| Piece | File |
| --- | --- |
| The line (scroll-drawn path, knots, margin notes) | `src/components/Thread.tsx` |
| Design tokens, reading column, buttons | [`src/app/globals.css`](src/app/globals.css) |
| Header (active section highlight) | `src/components/Header.tsx` |
| Live "It's 9:42 pm in Pune…" line | `src/components/ui/LocalTime.tsx` |
| Sections | `src/components/sections/*` |
| Smooth scroll (Lenis driven by the GSAP ticker) | `src/components/SmoothScroll.tsx` |

Motion is deliberately small: the hero headline rises in word by word, the line draws with scroll, and work
rows expand and collapse. With `prefers-reduced-motion` the line is simply drawn in full and nothing animates.

Fonts: Funnel Display (headings) and Funnel Sans (text).

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
