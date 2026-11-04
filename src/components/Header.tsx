"use client";

import { useEffect, useState } from "react";
import { scrollTo } from "@/lib/scroll";
import { navLinks, profile } from "@/data/portfolio";

/** A launch-page sub-nav: product name on the left, sections and the buy (hire) button on the right. */
export default function Header() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const go = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollTo(target === "#top" ? 0 : target, 1.2);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="wrap flex h-14 items-center justify-between gap-6">
        <a href="#top" onClick={(e) => go(e, "#top")} className="font-display text-[19px] font-semibold tracking-[-0.02em]">
          {profile.firstName}
        </a>

        <nav aria-label="Sections" className="flex items-center gap-5">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, `#${l.id}`)}
              aria-current={active === l.id ? "location" : undefined}
              className={`hidden text-[13px] transition-colors md:inline ${active === l.id ? "text-ink" : "text-ink-2 hover:text-ink"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={(e) => go(e, "#order")}
            className="inline-flex h-8 items-center rounded-full bg-accent px-3.5 text-[13px] font-medium text-white transition-[background-color,scale] hover:bg-accent-ink active:scale-[0.96]"
          >
            Hire
          </a>
        </nav>
      </div>
    </header>
  );
}
