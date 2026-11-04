"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";

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
    <div className="space-y-4">
      <p>
        Hiring, building something, or just want to argue about tabs versus spaces? Email is the fastest way to reach
        me, and I&apos;ll get back to you.
      </p>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <a href={`mailto:${profile.email}`} className="link font-medium">
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="press rounded-md px-1.5 py-0.5 text-[13px] text-ink-2 transition-colors hover:bg-surface hover:text-ink"
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </p>
      <p className="flex flex-wrap gap-x-5 gap-y-1 text-ink-2">
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="link">
          GitHub
        </a>
        <a href={profile.phoneHref} className="link">
          {profile.phone}
        </a>
        {profile.resume && (
          <a href={profile.resume} target="_blank" rel="noreferrer" className="link">
            CV
          </a>
        )}
      </p>
    </div>
  );
}
