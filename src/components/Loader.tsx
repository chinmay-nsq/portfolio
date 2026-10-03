"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { fx } from "@/lib/fx";
import { JetMark } from "./Jet";

const LOG = [
  { at: 4, label: "AVIONICS", status: "ONLINE" },
  { at: 24, label: "STAR CATALOG", status: "SYNCED" },
  { at: 46, label: "NAV COMPUTER", status: "LOCKED" },
  { at: 68, label: "RADAR ARRAY", status: "ACTIVE" },
  { at: 88, label: "AFTERBURNERS", status: "ARMED" },
];

const RING_R = 146;
const RING_LEN = 2 * Math.PI * RING_R;
const TICKS = Array.from({ length: 72 }, (_, i) => i);
const BLIPS = [
  { x: 52, y: -44, d: "0s" },
  { x: -72, y: 28, d: ".7s" },
  { x: 22, y: 78, d: "1.3s" },
  { x: -34, y: -84, d: ".3s" },
];

export default function Loader({ onReveal }: { onReveal: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const revealRef = useRef(onReveal);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    revealRef.current = onReveal;
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const $ = <T extends Element = HTMLElement>(sel: string) =>
      root.querySelector(sel) as T;
    const $$ = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

    let cancelled = false;
    let launched = false;

    // ───────── Reduced motion: a quick, calm fade ─────────
    if (prefersReducedMotion()) {
      const t = gsap.timeline({
        onComplete: () => {
          revealRef.current();
          setGone(true);
        },
      });
      t.to($$("[data-l-in]"), { opacity: 1, duration: 0.3 })
        .to(root, { opacity: 0, duration: 0.5, delay: 0.5 });
      return () => {
        t.kill();
      };
    }

    // ───────── Hyperspace canvas ─────────
    const ctx = canvas.getContext("2d")!;
    const warp = { speed: 0.35 };
    let w = 0;
    let h = 0;
    const stars = Array.from({ length: 420 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 0.98 + 0.02,
      pz: 1,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawWarp = (_t: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.max(w, h) * 0.55;
      ctx.lineCap = "round";
      for (const s of stars) {
        s.pz = s.z;
        s.z -= dt * warp.speed * 0.25;
        if (s.z < 0.02) {
          s.x = Math.random() * 2 - 1;
          s.y = Math.random() * 2 - 1;
          s.z = 1;
          s.pz = 1;
        }
        const sx = cx + (s.x / s.z) * scale * 0.5;
        const sy = cy + (s.y / s.z) * scale * 0.5;
        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
          s.z = 1;
          s.pz = 1;
          continue;
        }
        const px = cx + (s.x / s.pz) * scale * 0.5;
        const py = cy + (s.y / s.pz) * scale * 0.5;
        const depth = 1 - s.z;
        ctx.strokeStyle = `rgba(${205 + depth * 50},${215 + depth * 40},255,${0.12 + depth * 0.8})`;
        ctx.lineWidth = 0.6 + depth * 1.8;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    };
    gsap.ticker.add(drawWarp);

    // ───────── Live mission clock ─────────
    const t0 = performance.now();
    const clockEl = $("[data-l-clock]");
    const tickClock = () => {
      const s = (performance.now() - t0) / 1000;
      clockEl.textContent = `T+${String(Math.floor(s / 60)).padStart(2, "0")}:${(s % 60).toFixed(1).padStart(4, "0")}`;
    };
    gsap.ticker.add(tickClock);

    const ctxG = gsap.context(() => {
      const state = { p: 0 };
      const tele = { alt: 0 };
      let shown = -1;

      const pctEl = $("[data-l-pct]");
      const ringEl = $<SVGCircleElement>("[data-l-ring]");
      const statusEl = $("[data-l-status]");
      const fillEl = $("[data-l-fill]");
      const jetEl = $("[data-l-jet]");
      const trackEl = $("[data-l-track]");
      const rwyPct = $("[data-l-rwy-pct]");
      const thrEl = $("[data-l-thr]");
      const spdEl = $("[data-l-spd]");
      const altEl = $("[data-l-alt]");
      const lines = $$("[data-l-line]");
      const flash = $("[data-l-flash]");

      const jetX = (p: number) => 44 + (p / 100) * (trackEl.clientWidth - 88);

      const render = () => {
        const p = state.p;
        pctEl.textContent = String(Math.round(p)).padStart(3, "0");
        ringEl.style.strokeDashoffset = String(RING_LEN * (1 - p / 100));
        rwyPct.textContent = `${Math.round(p)}%`;
        thrEl.textContent = String(Math.round(p)).padStart(3, "0");
        spdEl.textContent = String(Math.round(p * 2.4)).padStart(3, "0");
        gsap.set(fillEl, { scaleX: p / 100 });
        gsap.set(jetEl, { x: jetX(p) });
        warp.speed = 0.35 + (p / 100) * 0.9;

        LOG.forEach((entry, i) => {
          if (p >= entry.at && i > shown) {
            shown = i;
            gsap.to(lines[i], { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
            statusEl.textContent = `> ${entry.label} … ${entry.status}`;
          }
        });
      };

      // Intro: HUD draws itself in
      gsap.set(jetEl, { yPercent: -50, xPercent: -50, x: jetX(0) });
      gsap.set(lines, { x: -12 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo($$("[data-l-bracket]"), { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.07 })
        .fromTo($("[data-l-radar]"), { opacity: 0, scale: 0.65, rotate: -50 }, { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "expo.out" }, 0.1)
        .fromTo($$("[data-l-in]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.35);

      gsap.to($("[data-l-spin]"), { rotate: 360, duration: 24, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

      // Phase 1 – systems check up to 88 %, then hold until real assets are ready
      const hold = gsap.to(state, {
        p: 88,
        duration: 3,
        delay: 0.6,
        ease: "power2.inOut",
        onUpdate: render,
      });
      const holdDone = new Promise<void>((res) => hold.eventCallback("onComplete", () => res()));
      const pageLoaded =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((res) => window.addEventListener("load", () => res(), { once: true }));
      const assetsReady = Promise.race([
        Promise.all([document.fonts?.ready, pageLoaded]),
        new Promise((res) => setTimeout(res, 8000)),
      ]);

      // Phase 3 – takeoff, hyperspace, blast doors
      const launch = (fast: boolean) => {
        if (launched || cancelled) return;
        launched = true;
        render();

        const run = () => {
          const tl = gsap.timeline({
            onComplete: () => {
              if (!cancelled) setGone(true);
            },
          });
          tl.timeScale(fast ? 2 : 1);

          tl.add(() => {
            statusEl.textContent = "> CLEARED FOR TAKEOFF";
            statusEl.classList.add("text-burner", "blink");
          })
            // jet accelerates down the runway and out of frame
            .to(jetEl, { x: () => trackEl.clientWidth + 160, duration: 1, ease: "power3.in" }, "+=0.35")
            .to(warp, { speed: 42, duration: 1.3, ease: "power2.in" }, "<")
            .to(tele, { alt: 36000, duration: 1.3, ease: "power2.in", onUpdate: () => { altEl.textContent = String(Math.round(tele.alt)).padStart(5, "0"); } }, "<")
            .to($("[data-l-radar]"), { scale: 1.7, opacity: 0, duration: 1, ease: "power3.in" }, "<0.3")
            .to($$("[data-l-in], [data-l-bracket], [data-l-line]"), { opacity: 0, duration: 0.5 }, "<0.1")
            // jump
            .to(flash, { opacity: 1, duration: 0.14, ease: "power2.in" }, "-=0.25")
            .add(() => {
              fx.warp = 1;
              gsap.to(warp, { speed: 0.3, duration: 0.1 });
              root.style.pointerEvents = "none";
              revealRef.current();
            })
            .to($$("[data-l-hazard]"), { opacity: 1, duration: 0.1 })
            .to(flash, { opacity: 0, duration: 0.6, ease: "power2.out" })
            .to($("[data-l-door-top]"), { yPercent: -100, duration: 1.25, ease: "expo.inOut" }, "<")
            .to($("[data-l-door-bottom]"), { yPercent: 100, duration: 1.25, ease: "expo.inOut" }, "<")
            .to($("[data-l-content]"), { opacity: 0, duration: 0.7, ease: "power1.in" }, "<0.1")
            .to(fx, { warp: 0, duration: 2.2, ease: "power3.out" }, "<");
        };

        gsap.to(state, { p: 100, duration: fast ? 0.2 : 0.7, ease: "power1.out", onUpdate: render, onComplete: run });
      };

      Promise.all([holdDone, assetsReady]).then(() => launch(false));

      skipRef.current = () => {
        if (launched) return;
        gsap.killTweensOf(state);
        launch(true);
      };
    }, root);

    return () => {
      cancelled = true;
      ctxG.revert();
      gsap.ticker.remove(drawWarp);
      gsap.ticker.remove(tickClock);
      window.removeEventListener("resize", resize);
      gsap.killTweensOf(fx);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Blast doors */}
      {(["top", "bottom"] as const).map((side) => (
        <div
          key={side}
          data-l-door-top={side === "top" ? "" : undefined}
          data-l-door-bottom={side === "bottom" ? "" : undefined}
          className={`absolute inset-x-0 h-1/2 overflow-hidden bg-void ${side === "top" ? "top-0" : "bottom-0"}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        >
          <div
            data-l-hazard
            className={`absolute inset-x-0 h-px bg-white/60 opacity-0 ${side === "top" ? "bottom-0" : "top-0"}`}
          />
        </div>
      ))}

      {/* HUD layer */}
      <div data-l-content className="absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="scanlines absolute inset-0 opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(2,3,8,.85) 100%)" }}
        />

        {/* Corner brackets */}
        {[
          "left-4 top-4 border-l border-t",
          "right-4 top-4 border-r border-t",
          "bottom-4 left-4 border-b border-l",
          "bottom-4 right-4 border-b border-r",
        ].map((cls) => (
          <span key={cls} data-l-bracket className={`absolute h-8 w-8 border-white/30 opacity-0 sm:h-12 sm:w-12 ${cls}`} />
        ))}

        {/* Top bar */}
        <div
          data-l-in
          className="absolute inset-x-0 top-0 flex items-center justify-between px-7 pt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-dim opacity-0 sm:px-14 sm:pt-9"
        >
          <span>CL // PORTFOLIO</span>
          <span data-l-clock className="hidden sm:block">T+00:00.0</span>
          <button
            type="button"
            data-cursor
            onClick={() => skipRef.current()}
            className="pointer-events-auto text-dim transition-colors hover:text-white"
          >
            Skip intro →
          </button>
        </div>

        {/* Centre: radar + percent */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 pb-[8vh]">
          <div data-l-radar className="relative h-[min(64vw,310px)] w-[min(64vw,310px)] opacity-0">
            <svg viewBox="-160 -160 320 320" className="absolute inset-0 h-full w-full" fill="none">
              <circle r={RING_R} stroke="rgba(236,236,241,.1)" strokeWidth="1.5" />
              <circle
                data-l-ring
                r={RING_R}
                stroke="#ececf1"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray={RING_LEN}
                strokeDashoffset={RING_LEN}
                transform="rotate(-90)"
              />
              <g data-l-spin stroke="rgba(236,236,241,.3)">
                {TICKS.map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={-(RING_R + 8)}
                    x2="0"
                    y2={-(RING_R + (i % 6 === 0 ? 17 : 12))}
                    strokeWidth={i % 6 === 0 ? 1.6 : 0.9}
                    transform={`rotate(${i * 5})`}
                  />
                ))}
              </g>
              <g stroke="rgba(236,236,241,.09)" strokeWidth="1">
                <circle r="112" />
                <circle r="76" />
                <circle r="40" strokeDasharray="3 5" />
                <path d="M-125 0H125M0 -125V125" />
              </g>
              {BLIPS.map((b) => (
                <circle key={b.d} cx={b.x} cy={b.y} r="2.6" fill="#ff6a2b" className="blink-slow" style={{ animationDelay: b.d }} />
              ))}
            </svg>
            <div
              className="absolute inset-[16%] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg 290deg, rgba(236,236,241,.22) 360deg)",
                animation: "sweep 2.2s linear infinite",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-start font-display text-6xl font-medium leading-none tracking-tight text-white tabular-nums sm:text-7xl">
                <span data-l-pct>000</span>
                <span className="mt-2 text-xl text-dim sm:text-2xl">%</span>
              </div>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Pre-flight</span>
            </div>
          </div>

          <p
            data-l-in
            data-l-status
            className="h-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink opacity-0 sm:text-xs"
          >
            &gt; INITIALISING …
          </p>
        </div>

        {/* Boot log (left) */}
        <ul
          data-l-in
          className="absolute left-14 top-1/2 hidden translate-y-[-60%] space-y-3 font-mono text-[11px] tracking-[0.18em] opacity-0 lg:block"
        >
          {LOG.map((l, i) => (
            <li key={l.label} data-l-line className="flex gap-3 opacity-0">
              <span className="text-faint">0{i + 1}</span>
              <span className="text-ink/85">{l.label}</span>
              <span className="text-faint">…</span>
              <span className="text-mint">{l.status}</span>
            </li>
          ))}
        </ul>

        {/* Telemetry (right) */}
        <dl
          data-l-in
          className="absolute right-14 top-1/2 hidden translate-y-[-60%] gap-y-3 font-mono text-[11px] tracking-[0.18em] opacity-0 lg:grid lg:grid-cols-[auto_auto] lg:gap-x-6"
        >
          <dt className="text-faint">ALT</dt>
          <dd className="text-right text-ink/85"><span data-l-alt>00000</span> FT</dd>
          <dt className="text-faint">SPD</dt>
          <dd className="text-right text-ink/85"><span data-l-spd>000</span> KT</dd>
          <dt className="text-faint">THR</dt>
          <dd className="text-right text-ink/85"><span data-l-thr>000</span> %</dd>
          <dt className="text-faint">HDG</dt>
          <dd className="text-right text-ink/85">290°</dd>
        </dl>

        {/* Runway progress */}
        <div data-l-in className="absolute inset-x-7 bottom-[9vh] opacity-0 sm:inset-x-14">
          <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
            <span>RWY 29 · Hold short</span>
            <span data-l-rwy-pct>0%</span>
          </div>
          <div data-l-track className="relative h-14 border-y border-white/12 bg-black/30">
            <div
              className="absolute inset-x-0 top-1/2 h-px opacity-70"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, rgba(236,236,241,.55) 0 24px, transparent 24px 48px)",
                animation: "runway 0.6s linear infinite",
              }}
            />
            <div
              data-l-fill
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-transparent to-white/10"
            />
            <div data-l-jet className="absolute left-0 top-1/2">
              <div className="w-6 rotate-90 text-ink">
                <JetMark />
              </div>
            </div>
          </div>
        </div>

        <div data-l-flash className="pointer-events-none absolute inset-0 bg-white opacity-0" />
      </div>
    </div>
  );
}
