"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { fx } from "@/lib/fx";
import { scrollTo } from "@/lib/scroll";
import { asset } from "@/lib/asset";
import { profile, heroRoles } from "@/data/portfolio";
import { useIntro } from "../IntroContext";
import { EarthLimb } from "../Scenery";
import Magnetic from "../ui/Magnetic";

/**
 * Hero backdrop. `earth` is the default; open the site with `?hero=nebula` or `?hero=moon` to compare.
 * All three rely on the same trick: the name sits on a layer BETWEEN the backdrop and a foreground layer.
 */
type Variant = "earth" | "nebula" | "moon";
const noop = () => () => {};
const readVariant = (): Variant => {
  const v = new URLSearchParams(window.location.search).get("hero");
  return v === "nebula" || v === "moon" ? v : "earth";
};
const serverVariant = (): Variant => "earth";

/** A photographic planet disc that sits in front of the name. */
const PLANETS = {
  moon: {
    box: "right-[-10vw] top-[192px] w-[64vw] max-w-[360px] md:right-[3vw] md:top-[calc(150px+7vw)] md:w-[40vw] md:max-w-[780px]",
    src: asset("/hero/moon-1300.jpg"),
    srcSet: `${asset("/hero/moon-1300.jpg")} 1300w, ${asset("/hero/moon-2600.jpg")} 2600w`,
    sizes: "(min-width: 768px) 40vw, 64vw",
    filter: "brightness(.86) contrast(1.06)",
    glow: "0 0 150px 18px rgba(170,190,230,.16)",
    rim: "inset 0 0 0 1px rgba(255,255,255,.07)",
    // light from the upper left, falling into shadow lower right
    terminator:
      "radial-gradient(circle at 30% 26%, rgba(0,0,0,0) 0%, rgba(2,4,10,0) 38%, rgba(2,4,10,.5) 72%, rgba(2,4,10,.86) 100%)",
  },
  earth: {
    box: "right-[-12vw] top-[208px] w-[68vw] max-w-[380px] md:right-[-4vw] md:top-[calc(130px+5vw)] md:w-[44vw] md:max-w-[840px]",
    src: asset("/hero/earth-760.jpg"),
    srcSet: `${asset("/hero/earth-760.jpg")} 760w, ${asset("/hero/earth-1500.jpg")} 1500w`,
    sizes: "(min-width: 768px) 44vw, 68vw",
    filter: "brightness(.96) contrast(1.04)",
    // a thin blue atmosphere hugging the limb, plus a soft halo in space
    glow: "0 0 60px 8px rgba(110,175,255,.42), 0 0 220px 40px rgba(60,120,255,.17)",
    rim: "inset 0 0 0 1px rgba(160,205,255,.3), inset 0 0 52px 10px rgba(110,180,255,.4)",
    terminator:
      "radial-gradient(circle at 30% 26%, rgba(0,0,0,0) 0%, rgba(2,6,16,0) 46%, rgba(2,6,16,.4) 78%, rgba(2,6,16,.72) 100%)",
  },
} as const;

/** Which part of the (cover-fitted) nebula stays in view; shared by the image and its mask. */
const NEBULA_FOCUS = "62% 45%";
const NEBULA_IMG = {
  backgroundImage: `url(${asset("/hero/nebula-2880.webp")})`,
  backgroundSize: "cover",
  backgroundPosition: NEBULA_FOCUS,
} as const;
const NEBULA_MASK = {
  WebkitMaskImage: `url(${asset("/hero/nebula-mask.png")})`,
  maskImage: `url(${asset("/hero/nebula-mask.png")})`,
  WebkitMaskSize: "cover",
  maskSize: "cover",
  WebkitMaskPosition: NEBULA_FOCUS,
  maskPosition: NEBULA_FOCUS,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;

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
  const variant = useSyncExternalStore(noop, readVariant, serverVariant);
  const revealed = useIntro();
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const roles = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const $$ = (s: string) => gsap.utils.toArray<HTMLElement>(s, root.current!);
      const reduce = prefersReducedMotion();
      const nebula = variant === "nebula";

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
      gsap.set(name.lines, { yPercent: 112 });
      gsap.set($$("[data-in]"), { opacity: 0, y: 18 });
      const limb = $$("[data-earth]");
      if (limb.length) gsap.set(limb, { opacity: 0 });
      gsap.set($$("[data-tape]"), { opacity: 0 });
      if (nebula) {
        gsap.set($$("[data-bg-fade]"), { opacity: 0 });
        gsap.set($$("[data-bg-scroll]"), { scale: 1.1, transformOrigin: "62% 40%" });
      } else {
        gsap.set($$("[data-planet]"), { opacity: 0, scale: 0.88, y: 70 });
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      if (limb.length) tl.to(limb, { opacity: 1, duration: 2.4 }, 0);
      if (nebula) {
        tl.to($$("[data-bg-fade]"), { opacity: 1, duration: 2.6, ease: "power2.out" }, 0)
          .to($$("[data-bg-scroll]"), { scale: 1, duration: 4, ease: "expo.out" }, 0);
      } else {
        tl.to($$("[data-planet]"), { opacity: 1, scale: 1, y: 0, duration: 2.4, ease: "expo.out" }, 0.1);
      }
      tl.to(name.lines, { yPercent: 0, duration: 1.5, stagger: 0.14, ease: "power4.out" }, 0.35)
        .to($$("[data-in]"), { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.8)
        .to($$("[data-tape]"), { opacity: 1, duration: 1.2 }, 1.2);
      intro.current = tl;

      // ── Pointer parallax: backdrop and name shift in opposite directions to sell the depth ──
      // (back + front nebula layers get identical motion so they always line up)
      const back = nebula ? $$("[data-bg-mouse]") : $$("[data-planet-mouse]");
      const bx = back.map((el) => gsap.quickTo(el, "x", { duration: 1.6, ease: "power3" }));
      const by = back.map((el) => gsap.quickTo(el, "y", { duration: 1.6, ease: "power3" }));
      const nx = gsap.quickTo($$("[data-name-mouse]")[0], "x", { duration: 1.9, ease: "power3" });
      const ny = gsap.quickTo($$("[data-name-mouse]")[0], "y", { duration: 1.9, ease: "power3" });
      const amp = nebula ? { x: 30, y: 18 } : { x: 34, y: 22 };
      const onMove = (e: PointerEvent) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        bx.forEach((f) => f(px * -amp.x));
        by.forEach((f) => f(py * -amp.y));
        nx(px * 14);
        ny(py * 8);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // ── Planets only: a very slow drift ──
      if (!nebula) gsap.to($$("[data-planet-float]"), { y: -10, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // ── Scroll: each layer travels at its own speed ──
      const scrub = { trigger: root.current!, start: "top top", end: "bottom top", scrub: 0.8 };
      gsap.to($$("[data-name-scroll]"), { y: -150, ease: "none", scrollTrigger: scrub });
      gsap.to($$(nebula ? "[data-bg-scroll]" : "[data-planet-scroll]"), { y: nebula ? 90 : 110, ease: "none", scrollTrigger: scrub });
      if (limb.length) gsap.to($$("[data-earth-scroll]"), { y: 200, ease: "none", scrollTrigger: scrub });
      gsap.to($$("[data-copy]"), { y: -70, opacity: 0, ease: "none", scrollTrigger: { ...scrub, end: "65% top" } });

      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root, dependencies: [variant], revertOnUpdate: true },
  );

  useEffect(() => {
    if (revealed) intro.current?.play();
  }, [revealed, variant]);

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
    <section id="home" ref={root} className="relative min-h-[100svh] overflow-hidden pb-32 pt-24 md:pt-28 lg:pb-24">
      {/* Depth stack, back → front:  backdrop (0)  <  name (10)  <  foreground gas / Moon (20)  <  copy + UI (30) */}

      {variant === "nebula" && (
        <>
          {/* back layer: the whole nebula, fading into the page at the bottom */}
          <div
            data-bg-fade
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, #000 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 70%, transparent 100%)",
            }}
          >
            <div data-bg-scroll className="absolute -inset-[5%]">
              <div data-bg-mouse className="h-full w-full" style={NEBULA_IMG} />
            </div>
          </div>
          {/* keeps the headline and copy legible over the brightest gas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,7,10,.66), rgba(6,7,10,.32) 50%, rgba(6,7,10,0) 82%), linear-gradient(0deg, rgba(6,7,10,.62), rgba(6,7,10,0) 52%)",
            }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-void/50 md:hidden" />
        </>
      )}

      {variant !== "earth" && (
        <div data-earth-scroll className="pointer-events-none absolute inset-x-0 bottom-0">
          <div data-earth>
            <EarthLimb height="26vh" className="relative" />
          </div>
        </div>
      )}

      <HeadingTape />

      {variant === "nebula" ? (
        /* front layer: the SAME image, visible only where the gas is dense, so clouds drift in front of the lettering */
        <div
          data-bg-fade
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          style={{
            maskImage: "radial-gradient(ellipse 56% 40% at 64% 25%, #000 0%, #000 44%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 56% 40% at 64% 25%, #000 0%, #000 44%, transparent 100%)",
          }}
        >
          <div data-bg-scroll className="absolute -inset-[5%]">
            <div data-bg-mouse className="h-full w-full" style={{ ...NEBULA_IMG, ...NEBULA_MASK }} />
          </div>
        </div>
      ) : (
        /* the planet sits IN FRONT of the name, so letters slip behind it */
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute z-20 aspect-square ${PLANETS[variant].box}`}
        >
          <div data-planet-scroll className="h-full w-full">
            <div data-planet className="h-full w-full">
              <div data-planet-float className="h-full w-full">
                <div data-planet-mouse className="h-full w-full">
                  {/* shadow cast on the lettering behind the planet */}
                  <div className="h-full w-full" style={{ filter: "drop-shadow(-26px 30px 46px rgba(0,0,0,.72))" }}>
                    <div
                      className="relative h-full w-full overflow-hidden rounded-full"
                      style={{ boxShadow: PLANETS[variant].glow }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={PLANETS[variant].src}
                        srcSet={PLANETS[variant].srcSet}
                        sizes={PLANETS[variant].sizes}
                        alt=""
                        decoding="async"
                        fetchPriority="high"
                        className="h-full w-full scale-[1.01] object-cover"
                        style={{ filter: PLANETS[variant].filter }}
                      />
                      <div className="absolute inset-0" style={{ background: PLANETS[variant].terminator }} />
                      <div className="absolute inset-0 rounded-full" style={{ boxShadow: PLANETS[variant].rim }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-x relative">
        <div
          data-in
          className="relative z-30 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-mint" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
            <span className="relative h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
          {profile.role} · {profile.company}
        </div>

        {/* ── The name: huge, layered BETWEEN the backdrop and the foreground ── */}
        <div data-name-scroll className="relative z-10">
          <div data-name-mouse>
            <h1
              className="mt-7 select-none font-display text-[clamp(4.7rem,15vw,16.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.05em]"
              aria-label={`${profile.firstName} ${profile.lastName}`}
            >
              <span data-name className="block text-white">
                {profile.firstName}
              </span>
              <span data-name className="block text-[#8a8fa0]">
                {profile.lastName}
              </span>
            </h1>
          </div>
        </div>

        {/* ── Copy ── */}
        <div
          data-copy
          className={`relative z-30 md:mt-8 md:max-w-[min(42rem,calc(57vw-3.5rem))] ${variant === "nebula" ? "mt-8" : "mt-[46vw]"}`}
        >
          <p data-in className="flex flex-wrap items-baseline gap-x-2.5 font-display text-xl text-white/90 sm:text-2xl">
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

          <p data-in className="mt-4 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
            I turn complex problems into fast, reliable products — from a mobile app serving 5,000+
            daily users to an AI-powered hiring platform. Off the keyboard I&apos;m usually looking
            up: at the night sky, or at fighter jets crossing it.
          </p>

          <div data-in className="mt-6 flex flex-wrap gap-3">
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
      </div>

      {/* ── Bottom telemetry ── */}
      <div
        data-in
        className="container-x absolute inset-x-0 bottom-6 z-30 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
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
