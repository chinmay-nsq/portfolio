"use client";

import { useRef, useState } from "react";
import { scrollTo } from "@/lib/scroll";
import { footnotes, profile } from "@/data/portfolio";
import Arrow from "../ui/Arrow";
import LocalTime from "../ui/LocalTime";
import { useReveal } from "../ui/useReveal";

const channels = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: profile.phone, href: profile.phoneHref },
];

/** The "buy" section: get in touch, then the fine print and the footer. */
export default function Order() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [copied, setCopied] = useState(false);

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
    <section ref={root} id="order" className="scroll-mt-14 pt-28 sm:pt-36">
      <div className="wrap text-center">
        <h2 data-reveal className="font-display text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Get <span className="launch-gradient">Chinmay.</span>
        </h2>
        <p data-reveal className="lede mt-6">
          Ships worldwide, by email. Hiring, building something, or just want to argue about tabs versus spaces, I&apos;ll
          get back to you.
        </p>

        <div data-reveal className="mt-10 flex flex-col items-center gap-5">
          <a href={`mailto:${profile.email}`} className="btn btn-accent h-14 px-8 text-[17px]">
            Email {profile.email}
          </a>
          <button type="button" onClick={copy} className="btn-link !text-[15px]">
            <span aria-live="polite">{copied ? "Copied to clipboard" : "Copy the address instead"}</span>
          </button>
        </div>

        <ul data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[16px]">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-ink-2 transition-colors hover:text-ink"
              >
                {c.label}
                {c.href.startsWith("http") && <Arrow dir="up-right" />}
              </a>
            </li>
          ))}
          {profile.resume && (
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
                Download my CV <Arrow dir="down" />
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* the fine print, like every launch page has */}
      <footer className="mt-28 bg-mist py-12 text-[12px] leading-relaxed text-ink-2">
        <div className="wrap">
          <ol className="space-y-2 border-b border-line pb-8">
            {footnotes.map((f, i) => (
              <li key={i} id={`fn-${i + 1}`} className="scroll-mt-20">
                <span className="mr-1">{i + 1}.</span>
                {f}
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[90ch]">
            The C1 chip is a figure of speech. No engineers were benchmarked without their consent. Results may vary
            with coffee, deadlines and how many browser tabs are open.
          </p>
          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <LocalTime />
            <div className="flex items-center gap-6">
              <span>
                © {new Date().getFullYear()} {profile.name}
              </span>
              <button
                type="button"
                onClick={() => scrollTo(0, 1.6)}
                className="-my-2 inline-flex items-center gap-1 py-2 transition-colors hover:text-ink"
              >
                Back to top <Arrow dir="up" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
