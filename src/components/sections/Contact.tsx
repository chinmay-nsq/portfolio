"use client";

import { useState } from "react";
import { scrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import Arrow from "../ui/Arrow";

const channels = [
  { label: "LinkedIn", value: "in/ChinmayLale", href: profile.linkedin },
  { label: "GitHub", value: "@ChinmayLale", href: profile.github },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
];

/** The drawer front: where the rod ends, and where you borrow the engineer. */
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
    <section id="contact" className="shell scroll-mt-14 pb-8 pt-24">
      <div
        className="relative overflow-hidden rounded-[10px] bg-steel px-5 pb-24 pt-10 text-center text-white sm:px-12"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,0) 40%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.12), inset 0 -2px 0 rgba(0,0,0,.3), 0 30px 60px -30px rgba(23,25,30,.6)",
        }}
      >
        {/* brass label holder with its card */}
        <div
          className="mx-auto w-fit rounded-[5px] p-[5px] shadow-[0_2px_4px_rgba(0,0,0,.35)]"
          style={{ background: "linear-gradient(180deg, #e2c98f, #b38f52 55%, #8a6f3e)" }}
        >
          <div className="typed rounded-[2px] bg-card px-5 !leading-[30px] text-ink sm:px-7">LALE, C. · BORROW THIS ENGINEER</div>
        </div>
        {/* pull */}
        <div
          aria-hidden="true"
          className="mx-auto mt-3 h-6 w-32 rounded-b-[40px] border-[5px] border-t-0 border-brass shadow-[0_4px_6px_-2px_rgba(0,0,0,.4)]"
        />

        <h2 className="mt-14 font-display text-[clamp(2.2rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Want to borrow this engineer?
        </h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-7 text-white/70">
          Email is the fastest way in. Hiring, building something, or just want to argue about tabs versus spaces, I&apos;ll
          get back to you.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block break-all font-display text-[clamp(1.35rem,4vw,2.6rem)] font-medium tracking-[-0.02em] underline decoration-white/30 decoration-1 underline-offset-[0.22em] transition-colors hover:decoration-white"
        >
          {profile.email}
        </a>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="btn min-w-[11.5rem] border border-white/25 text-white hover:border-white/60 hover:bg-white/5"
          >
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
                className={`absolute h-4 w-4 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${copied ? "scale-100 opacity-100 blur-0" : "scale-25 opacity-0 blur-[4px]"}`}
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
          {profile.resume && (
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn bg-white text-ink hover:bg-white/90">
              Download my CV <Arrow dir="down" />
            </a>
          )}
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col rounded-md bg-white/[0.06] px-4 py-3 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)] transition-[background-color,box-shadow] duration-200 hover:bg-white/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)]"
              >
                <span className="typed flex items-center justify-between !text-[12px] uppercase !leading-6 tracking-[0.08em] text-white/60">
                  {c.label}
                  <Arrow dir="up-right" className="!h-3.5 !w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 truncate text-[16px] text-white">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* the end of the rod: a brass knob through the drawer front */}
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,.45)]"
          style={{ background: "radial-gradient(circle at 35% 30%, #f0dcaa, #b8945a 55%, #7d6336)" }}
        />
      </div>

      <footer className="typed mt-6 flex flex-col items-center justify-between gap-2 !text-[13px] text-ink-2 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Catalogued and coded by me, with Next.js and GSAP.</span>
        <button
          type="button"
          onClick={() => scrollTo(0, 1.6)}
          className="-my-2 inline-flex items-center gap-2 py-2 transition-colors hover:text-ink"
        >
          Back to the top <Arrow dir="up" />
        </button>
      </footer>
    </section>
  );
}
