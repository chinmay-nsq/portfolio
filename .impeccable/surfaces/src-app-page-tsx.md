---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

Scope: the single-page portfolio at `/` (src/app/page.tsx and its sections). Visitor mode: Experience.

Audience and job: anyone who might hire or work with Chinmay (recruiters, hiring leads, engineering managers, founders, clients), skimming on laptop or phone, deciding whether to reach out. Action: email (primary), LinkedIn/GitHub/phone. Proof: real metrics in src/data/portfolio.ts. Constraints: light theme only, no cards/pages/drawer metaphors, no space or aviation motifs, no loader, simple (not flashy) motion, first-person human copy with playful moments, nothing invented.

History: the owner rejected the space theme, a library card-catalogue concept (ruled and plain), a dark look, and found the plain editorial version not distinctive enough. On 2026-11-04 they asked for something out of the box that makes visitors say "wow" and want to scroll, with simple, aesthetic motion.

## Direction contract

THESIS: One pen line draws itself down the page as you scroll, tying a knot at every job and project, and finishes by underlining the email address. The visitor scrolls to see where the line goes. It refuses the dev-portfolio default of hero + card grid + skill badges and keeps every other surface quiet.

OWN-WORLD: White ground, near-black ink with a two-step gray ramp, hairline rules (#e6e7ea), one cobalt accent (#2b45f0) used for the line, its pen-tip dot, actions and key numbers. Funnel Display headlines, Funnel Sans text. A single centred reading column; the left margin belongs to the line and its margin notes (years) that appear when the pen reaches them.

STORY: The visitor reads one big claim with a real number, notices the line starting beside it, follows it through the work and projects (knots and years appearing as it arrives), and lands on "You followed the line all the way down here. Might as well say hi." with the email underlined by the line itself.

FIRST VIEWPORT: Name and section links plus an accent "Email me" pill in the header. "follow the line" note in the left margin (xl), the line starting beside the headline "I build software that 5,000+ people use every day." (5,000+ in accent), intro paragraph, Email me and See my work buttons, the live "It's 9:42 pm in Pune, so I'm probably…" line. On load the pen draws down to just past the middle of the screen.

FORM: The Line (src/components/Thread.tsx), devised by the agent at the owner's request for an out-of-the-box but simple direction. Signature interaction: scroll-drawn line with knots, margin notes and the final email underline. seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
