# Chinmay Lale — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP (+ ScrollTrigger) · Lenis

The site is a library card catalogue with one person in it. Every job, project and win is an index card
written in catalogue form (call number, imprint, notes, subject tracings, a date-due stamp), the sections
are guide cards with staggered tabs, and the page closes on the drawer front. Light steel-gray ground,
white ruled cards, one red ink saved for the job I'm on now.

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
- `experience` — one card each; `current: true` gets the red CHECKED OUT stamp, the rest are stamped RETURNED with their end date
- `projects` (add `live` / `repo` URLs to show buttons), `skillGroups`, `achievements`, `education`, `stats`

Call numbers, stamps and tracings are derived in [`src/lib/catalogue.ts`](src/lib/catalogue.ts). The **subject index**
(skills section) cross-references each skill to the jobs and projects whose `tags` mention it, so tagging a job with
`Redis` automatically lists it next to Redis.

## How it's put together

| Piece | File |
| --- | --- |
| Design tokens, the ruled card, buttons | [`src/app/globals.css`](src/app/globals.css) |
| Index card / stamp / section guide card | `src/components/ui/Card.tsx`, `Stamp.tsx`, `GuideCard.tsx` |
| Header tabs (active section is pulled up) | `src/components/Tabs.tsx` |
| The rod running through every card | `src/components/AppShell.tsx` |
| Sections | `src/components/sections/*` |
| Smooth scroll (Lenis driven by the GSAP ticker) | `src/components/SmoothScroll.tsx` |

Motion is deliberately small: the title card slides out of the drawer and gets stamped, work cards stack on
desktop as you scroll (the covered card sinks back), and each card's stamp lands as it arrives.
`prefers-reduced-motion` turns all of it off.

Fonts: Bricolage Grotesque (headings), Geist (text), Courier Prime (typed catalogue data only).

## SEO & sharing

- **Metadata** — title, description, canonical URL, robots directives, Open Graph + Twitter cards ([`layout.tsx`](src/app/layout.tsx), copy in [`src/lib/site.ts`](src/lib/site.ts)).
- **Share image** — [`public/og.jpg`](public/og.jpg), 1200×630, the title card.
- **Structured data** — JSON-LD `Person` + `ProfilePage` + `WebSite` ([`JsonLd.tsx`](src/components/JsonLd.tsx)).
- **`robots.txt`, `sitemap.xml`, `manifest.webmanifest`**, favicon, Apple touch icon and PWA icons (an index card).
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
It predates the catalogue redesign and isn't linked from the portfolio.
