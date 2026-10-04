"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Magnetic from "../ui/Magnetic";
import { EarthLimb } from "../Scenery";
import SpaceVideo from "../ui/SpaceVideo";
import { useReveal } from "../ui/useReveal";

const channels = [
  { label: "LinkedIn", value: "in/ChinmayLale", href: profile.linkedin },
  { label: "GitHub", value: "@ChinmayLale", href: profile.github },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  useReveal(root);

  // The horizon rises into view as the final approach completes
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-earth]",
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "center center", scrub: 0.8 },
        },
      );
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={root} className="relative flex min-h-screen flex-col overflow-hidden pt-28 sm:pt-36">
      <SpaceVideo clip="cliffs" opacity={0.5} fade="top" scrim="center" />

      <div data-earth className="pointer-events-none absolute inset-x-0 bottom-0">
        <EarthLimb height="46vh" className="relative" />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col items-center text-center">
        <SectionHeading index="07" label="Contact" title="Let's build something" muted="that flies." center />

        <p data-reveal className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink/75">
          Have a product, a platform, or just a good conversation about space and fighter jets in
          mind? Send a message — I&apos;ll get back to you.
        </p>

        <div data-reveal className="mt-12 flex flex-col items-center gap-6">
          <Magnetic strength={0.12}>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-block font-display text-[clamp(1.4rem,4.4vw,3.4rem)] font-medium leading-tight tracking-[-0.025em] text-white"
            >
              {profile.email}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-white/40 transition-transform duration-500 group-hover:scale-x-0 group-hover:origin-right" />
            </a>
          </Magnetic>
          <button type="button" onClick={copy} className="btn btn-ghost" aria-live="polite">
            {copied ? "Copied ✓" : "Copy email address"}
          </button>
        </div>

        <div className="mt-14 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          {channels.map((c, i) => (
            <a
              key={c.label}
              data-reveal
              data-reveal-delay={i * 0.07}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="panel group block bg-void/60 p-5 text-left backdrop-blur-sm"
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {c.label}
                <span className="text-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className="mt-3 truncate text-[15px] text-white">{c.value}</div>
            </a>
          ))}
        </div>

        {profile.resume && (
          <a data-reveal href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-primary mt-8">
            Download CV <span aria-hidden>↓</span>
          </a>
        )}
      </div>

      <footer className="container-x relative z-10 mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pb-8 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-dim sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="text-center">
          Built with Next.js &amp; GSAP
          <br />
          <span className="text-faint">Space imagery: NASA · STScI · ESA · CSA</span>
        </span>
        <button type="button" onClick={() => scrollTo(0, 3)} className="transition-colors hover:text-white">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
