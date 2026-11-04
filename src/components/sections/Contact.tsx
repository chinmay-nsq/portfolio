"use client";

import { useState } from "react";
import { scrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import Arrow from "../ui/Arrow";
import LocalTime from "../ui/LocalTime";

const channels = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
  { label: profile.phone, href: profile.phoneHref },
];

export default function Contact() {
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
    <section id="contact" className="scroll-mt-16 bg-mist">
      <div className="shell pb-10 pt-24 sm:pt-32">
        <h2 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
          Got something to build?
          <span className="block text-ink-3">Let&apos;s talk about it.</span>
        </h2>
        <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-ink-2">
          Hiring, starting a project, or just want to argue about tabs versus spaces. Email is the fastest way to reach
          me, and I&apos;ll get back to you.
        </p>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink/10 pt-10 md:flex-row md:items-end md:justify-between">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 break-all font-display text-[clamp(1.5rem,4.4vw,3.25rem)] font-medium tracking-[-0.03em]"
          >
            <span className="draw-link">{profile.email}</span>
            <Arrow dir="up-right" className="!h-[0.7em] !w-[0.7em] text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <button type="button" onClick={copy} className="btn btn-line shrink-0 bg-paper">
            <span className="relative grid h-4 w-4 place-items-center" aria-hidden="true">
              {/* both icons stay mounted and cross-fade */}
              <svg
                viewBox="0 0 16 16"
                className={`absolute h-4 w-4 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${copied ? "scale-25 opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              >
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                <path d="M10.5 3.5v-.5a1 1 0 00-1-1h-6a1 1 0 00-1 1v6a1 1 0 001 1h.5" strokeLinecap="round" />
              </svg>
              <svg
                viewBox="0 0 16 16"
                className={`absolute h-4 w-4 text-accent transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${copied ? "scale-100 opacity-100 blur-0" : "scale-25 opacity-0 blur-[4px]"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <span aria-live="polite">{copied ? "Email copied" : "Copy my email"}</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[16px]">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="draw-link inline-flex items-center gap-1.5"
            >
              {c.label}
              {c.href.startsWith("http") && <Arrow dir="up-right" className="text-ink-3" />}
            </a>
          ))}
          {profile.resume && (
            <a href={profile.resume} target="_blank" rel="noreferrer" className="draw-link inline-flex items-center gap-1.5">
              Download my CV <Arrow dir="down" className="text-ink-3" />
            </a>
          )}
        </div>

        <footer className="mt-28 flex flex-col gap-4 border-t border-ink/10 pt-6 text-[14px] text-ink-2 md:flex-row md:items-center md:justify-between">
          <LocalTime />
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <button
              type="button"
              onClick={() => scrollTo(0, 1.6)}
              className="-my-2 inline-flex items-center gap-1.5 py-2 transition-colors hover:text-ink"
            >
              Back to top <Arrow dir="up" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
