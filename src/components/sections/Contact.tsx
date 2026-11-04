"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import LocalTime from "../ui/LocalTime";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="shell scroll-mt-20 pt-28">
      <div data-reveal className="tile bg-blue p-8 text-white sm:p-12">
        <p className="text-white/75">Got something to build?</p>
        <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Let&apos;s talk. I reply faster than my builds run.
        </h2>
        <p className="mt-5 max-w-[48ch] text-white/80">
          Hiring, starting a project, or just want to argue about tabs versus spaces. Email is the fastest way to reach me.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn bg-white text-ink hover:bg-white/90">
            {profile.email}
          </a>
          <button type="button" onClick={copy} className="btn bg-white/15 text-white hover:bg-white/25">
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-white/85">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.phoneHref} className="link">
              {profile.phone}
            </a>
          </li>
          {profile.resume && (
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="link">
                CV
              </a>
            </li>
          )}
        </ul>
      </div>

      <footer className="mt-6 flex flex-col gap-2 px-1 text-[14px] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
        <LocalTime />
        <span>
          © {new Date().getFullYear()} {profile.name}. Ship it, then make it faster.
        </span>
      </footer>
    </section>
  );
}
