"use client";

import { useEffect, useState } from "react";
import { scrollTo } from "@/lib/scroll";
import { navLinks, profile } from "@/data/portfolio";

export default function Header() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

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
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollTo(target === "#top" ? 0 : target, 1.2);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" onClick={(e) => go(e, "#top")} className="font-display text-[17px] font-medium tracking-[-0.01em]">
          {profile.firstName} {profile.lastName}
        </a>

        <nav aria-label="Sections" className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, `#${l.id}`)}
              aria-current={active === l.id ? "location" : undefined}
              className={`hidden rounded-full px-3 py-1.5 text-[15px] transition-colors md:inline-block ${
                active === l.id ? "bg-mist text-ink" : "text-ink-2 hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className="btn btn-accent ml-2 !h-10 !px-5 !text-[14px]">
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
