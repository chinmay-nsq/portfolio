"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis, scrollTo } from "@/lib/scroll";
import { navLinks } from "@/data/portfolio";
import { useIntro } from "./IntroContext";
import { FLYBY_EVENT } from "./Flyby";

export default function Navbar() {
  const revealed = useIntro();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Scroll progress line + hide-on-scroll-down
  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    let hidden = false;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const shouldHide = self.direction === 1 && self.scroll() > 180;
        if (shouldHide === hidden) return;
        hidden = shouldHide;
        gsap.to(navRef.current, {
          yPercent: hidden ? -120 : 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });
  }, []);

  // Entrance after the loader parts
  useEffect(() => {
    if (!revealed) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.35 },
    );
  }, [revealed]);

  // Active section tracking (IntersectionObserver stays correct around pinned sections)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Mobile menu
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) {
      wasOpen.current = true;
      getLenis()?.stop();
      gsap.to(menu, { autoAlpha: 1, duration: 0.35 });
      gsap.fromTo(
        menu.querySelectorAll("[data-m-link]"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power4.out", delay: 0.1 },
      );
    } else if (wasOpen.current) {
      wasOpen.current = false;
      getLenis()?.start();
      gsap.to(menu, { autoAlpha: 0, duration: 0.3 });
    }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(`#${id}`), open ? 250 : 0);
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-void/60 opacity-0 backdrop-blur-xl"
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a
            href="#top"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0, 2);
              window.dispatchEvent(new Event(FLYBY_EVENT));
            }}
            className="group flex items-center gap-3"
            aria-label="Chinmay Lale – back to top"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-white/20 font-display text-[13px] font-semibold tracking-tight text-white transition-colors group-hover:bg-white group-hover:text-void">
              CL
            </span>
            <span className="hidden font-sans text-sm font-medium text-white sm:block">
              Chinmay Lale
              <span className="ml-3 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:inline">
                Software Engineer
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className={`relative px-3.5 py-2 text-sm transition-colors ${active === l.id ? "text-white" : "text-dim hover:text-white"}`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-white transition-transform duration-500 ${active === l.id ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="btn btn-ghost hidden !h-9 sm:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative grid h-10 w-10 place-items-center rounded-md border border-white/15 lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-px w-5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
        <div
          ref={barRef}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white/70"
        />
      </header>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="invisible fixed inset-0 z-45 flex flex-col justify-center bg-void/95 px-8 opacity-0 backdrop-blur-xl lg:hidden"
      >
        <ul className="space-y-1">
          {navLinks.map((l, i) => (
            <li key={l.id} data-m-link>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className="flex items-baseline gap-4 py-2 font-display text-4xl font-medium tracking-tight text-white"
              >
                <span className="font-mono text-xs tracking-widest text-faint">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
