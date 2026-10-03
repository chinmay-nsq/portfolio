"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { fx } from "@/lib/fx";
import { scrollTo } from "@/lib/scroll";
import { profile, heroRoles } from "@/data/portfolio";
import { useIntro } from "../IntroContext";
import { JetSchematic } from "../Jet";
import { EarthLimb } from "../Scenery";
import Magnetic from "../ui/Magnetic";

const TAPE_STEP = 64; // px per 10° of heading
const TAPE_LABELS = Array.from({ length: 108 }, (_, i) => (i % 36) * 10);
const label = (deg: number) =>
  deg % 90 === 0 ? "NESW"[deg / 90] : String(deg / 10).padStart(2, "0");

/** Compass tape: heading drifts gently with the pointer. */
function HeadingTape() {
  const strip = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = strip.current;
    const out = readout.current;
    if (!el || !out) return;
    let h = 40;
    const tick = (t: number) => {
      const target = 40 + (fx.mx - 0.5) * 140 + Math.sin(t * 0.3) * 6;
      h += (target - h) * 0.05;
      const hh = ((h % 360) + 360) % 360;
      el.style.transform = `translateX(${180 - ((36 + hh / 10) * TAPE_STEP + TAPE_STEP / 2)}px)`;
      out.textContent = String(Math.round(hh)).padStart(3, "0");
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      data-tape
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[84px] hidden w-[360px] -translate-x-1/2 font-mono text-[10px] text-faint xl:block"
    >
      <div className="mb-1 text-center tracking-[0.2em]">
        HDG <span ref={readout} className="text-dim">040</span>°
      </div>
      <div
        className="relative h-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
        }}
      >
        <div ref={strip} className="flex will-change-transform">
          {TAPE_LABELS.map((deg, i) => (
            <div key={i} className="relative shrink-0 text-center" style={{ width: TAPE_STEP }}>
              <span className="absolute left-1/2 top-0 h-2 w-px bg-white/35" />
              <span className="absolute left-0 top-0 h-1 w-px bg-white/15" />
              <span className="absolute left-1/2 top-2.5 -translate-x-1/2">{label(deg)}</span>
            </div>
          ))}
        </div>
        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-burner" />
      </div>
    </div>
  );
}

export default function Hero() {
  const revealed = useIntro();
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const roles = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const $ = (s: string) => root.current!.querySelector(s) as HTMLElement;
      const $$ = (s: string) => gsap.utils.toArray<HTMLElement>(s, root.current!);
      const reduce = prefersReducedMotion();

      // ── Rotating role ticker ──
      const list = roles.current!;
      const n = heroRoles.length;
      if (!reduce) {
        const loop = gsap.timeline({ repeat: -1, delay: 2.8 });
        heroRoles.forEach((_, i) => {
          loop.to(list, {
            yPercent: -(100 / (n + 1)) * (i + 1),
            duration: 0.8,
            ease: "power3.inOut",
            delay: i === 0 ? 0 : 2.2,
          });
        });
        loop.set(list, { yPercent: 0 }, ">2.2");
      }

      if (reduce) return;

      // ── Initial hidden states (the loader covers the page, so this never flashes) ──
      const name = SplitText.create($$("[data-name]"), { type: "lines", mask: "lines" });
      gsap.set(name.lines, { yPercent: 108 });
      gsap.set($$("[data-in]"), { opacity: 0, y: 18 });
      gsap.set($("[data-earth]"), { opacity: 0 });
      gsap.set($("[data-tape]"), { opacity: 0 });
      gsap.set($$("[data-draw]"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set($$("[data-fade]"), { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      tl.to($("[data-earth]"), { opacity: 1, duration: 2.4 }, 0)
        .to(name.lines, { yPercent: 0, duration: 1.4, stagger: 0.14, ease: "power4.out" }, 0.25)
        .to($$("[data-in]"), { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.6)
        .to($$("[data-draw]"), { strokeDashoffset: 0, duration: 2.2, stagger: 0.07, ease: "power2.inOut" }, 0.45)
        .to($$("[data-fade]"), { opacity: 1, duration: 1.4, stagger: 0.1, ease: "power1.out" }, 1.5)
        .to($("[data-tape]"), { opacity: 1, duration: 1.2 }, 1.2);
      intro.current = tl;

      // ── Idle float ──
      gsap.to($("[data-art-float]"), { y: -8, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // ── Pointer parallax (subtle) ──
      const ax = gsap.quickTo($("[data-art-mouse]"), "x", { duration: 1.6, ease: "power3" });
      const ay = gsap.quickTo($("[data-art-mouse]"), "y", { duration: 1.6, ease: "power3" });
      const ar = gsap.quickTo($("[data-art-mouse]"), "rotation", { duration: 1.6, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        ax(nx * -18);
        ay(ny * -12);
        ar(nx * 2.2);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // ── Scroll: copy lifts away, the aircraft recedes, the horizon drops ──
      const scrub = { trigger: root.current!, start: "top top", end: "bottom top", scrub: 0.8 };
      gsap.to($("[data-art-scroll]"), { y: -110, scale: 0.94, opacity: 0.15, ease: "none", scrollTrigger: scrub });
      gsap.to($("[data-earth-scroll]"), { y: 200, ease: "none", scrollTrigger: scrub });
      gsap.to($("[data-copy]"), { y: -70, opacity: 0, ease: "none", scrollTrigger: { ...scrub, end: "65% top" } });

      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  useEffect(() => {
    if (revealed) intro.current?.play();
  }, [revealed]);

  // IST clock
  useEffect(() => {
    const el = clock.current;
    if (!el) return;
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    el.textContent = fmt();
    const id = window.setInterval(() => (el.textContent = fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-32 pt-28 lg:pb-24"
    >
      <div data-earth-scroll className="pointer-events-none absolute inset-x-0 bottom-0">
        <div data-earth>
          <EarthLimb height="26vh" className="relative" />
        </div>
      </div>

      <HeadingTape />

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* ── Copy ── */}
        <div data-copy className="lg:col-span-7">
          <div
            data-in
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-mint" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
              <span className="relative h-1.5 w-1.5 rounded-full bg-mint" />
            </span>
            {profile.role} · {profile.company}
          </div>

          <h1
            className="mt-8 font-display text-[clamp(3.4rem,9.4vw,8.4rem)] font-medium leading-[1.04] tracking-[-0.038em]"
            aria-label={`${profile.firstName} ${profile.lastName}`}
          >
            <span data-name className="block text-white">
              {profile.firstName}
            </span>
            <span data-name className="block text-[#767a89]">
              {profile.lastName}
            </span>
          </h1>

          <p data-in className="mt-8 flex flex-wrap items-baseline gap-x-2.5 font-display text-xl text-white/90 sm:text-2xl">
            <span>Software Engineer building</span>
            <span className="relative inline-block h-[1.35em] overflow-hidden align-bottom text-hud">
              <span ref={roles} className="block">
                {[...heroRoles, heroRoles[0]].map((r, i) => (
                  <span key={i} className="block h-[1.35em] whitespace-nowrap leading-[1.35em]">
                    {r}
                  </span>
                ))}
              </span>
            </span>
          </p>

          <p data-in className="mt-6 max-w-xl text-base leading-relaxed text-dim sm:text-lg">
            I turn complex problems into fast, reliable products — from a mobile app serving 5,000+
            daily users to an AI-powered hiring platform. Off the keyboard I&apos;m usually looking
            up: at the night sky, or at fighter jets crossing it.
          </p>

          <div data-in className="mt-10 flex flex-wrap gap-3">
            <Magnetic strength={0.15}>
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#projects");
                }}
              >
                View projects <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="#contact"
                className="btn btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        {/* ── Technical schematic ── */}
        <div data-art-scroll className="pointer-events-none lg:col-span-5">
          <div data-art-float>
            <div data-art-mouse>
              <JetSchematic className="mx-auto w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[560px]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom telemetry ── */}
      <div
        data-in
        className="container-x absolute inset-x-0 bottom-6 z-10 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
      >
        <div className="flex items-center gap-3 xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          <span className="relative block h-9 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-white" style={{ animation: "scrollcue 1.8s ease-in-out infinite" }} />
          </span>
          Scroll to ascend
        </div>
        <div className="ml-auto text-right leading-relaxed">
          <div className="text-ink/80">
            {profile.baseLabel} <span className="hidden sm:inline">· {profile.baseCoords}</span>
          </div>
          <div>
            <span ref={clock}>--:--:--</span> IST
          </div>
        </div>
      </div>
    </section>
  );
}
