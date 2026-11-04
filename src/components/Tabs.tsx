"use client";

import { useEffect, useRef, useState } from "react";
import { scrollTo } from "@/lib/scroll";
import { navLinks, profile } from "@/data/portfolio";

/** Fixed header. The navigation is a row of guide-card tabs; the one you're reading is pulled up and white. */
export default function Tabs() {
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLElement>(null);

  // On narrow screens the tab row scrolls; keep the active tab in view
  useEffect(() => {
    const nav = navRef.current;
    const tab = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !tab) return;
    const left = tab.offsetLeft - nav.offsetLeft;
    if (left < nav.scrollLeft || left + tab.offsetWidth > nav.scrollLeft + nav.clientWidth) {
      nav.scrollTo({ left: left - 8, behavior: "smooth" });
    }
  }, [active]);

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-ground/85 backdrop-blur-md">
      <div className="shell flex h-14 items-end justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="mb-3.5 flex shrink-0 items-baseline gap-2.5"
          aria-label={`${profile.name}, back to top`}
        >
          <span className="typed hidden text-[13px] leading-none text-ink-2 sm:inline">005.1 LAL</span>
          <span className="font-display text-[17px] font-semibold leading-none tracking-[-0.01em]">Chinmay Lale</span>
        </a>

        <nav ref={navRef} aria-label="Sections" className="-mb-px flex min-w-0 items-end gap-1 overflow-x-auto [scrollbar-width:none] max-md:pr-6 max-md:[mask-image:linear-gradient(90deg,#000_calc(100%-28px),transparent)]">
          {navLinks.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, `#${l.id}`)}
                aria-current={on ? "location" : undefined}
                className={`shrink-0 rounded-t-md border border-b-0 px-3 text-[14px] font-medium transition-[height,background-color,color,border-color] duration-200 ease-out sm:px-3.5 ${
                  on
                    ? "h-10 border-ink/10 bg-card leading-10 text-ink"
                    : "h-8 border-transparent bg-ground-deep leading-8 text-ink-2 hover:h-9 hover:leading-9 hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
