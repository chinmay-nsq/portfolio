"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cosmosAssets, cosmosPlanets, cosmosStates, type CosmosId } from "@/data/cosmos";
import SectionHeading from "../ui/SectionHeading";

type Phase = "idle" | "transitioning";
type Engine = { travel: () => void; reset: () => void };

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
const raf = () => new Promise<void>((res) => requestAnimationFrame(() => res()));

/** Resolves on the first of `events` (or after `timeout` ms). Never rejects. */
function waitFor(el: EventTarget, events: string[], timeout: number) {
  return new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      events.forEach((e) => el.removeEventListener(e, finish));
      clearTimeout(timer);
      resolve();
    };
    events.forEach((e) => el.addEventListener(e, finish));
    const timer = setTimeout(finish, timeout);
  });
}

/** Resolves when the media can supply pixels (image decoded / video has a frame). */
function mediaReady(media: HTMLVideoElement | HTMLImageElement, timeout: number) {
  if (media instanceof HTMLImageElement) {
    if (media.complete && media.naturalWidth) return Promise.resolve();
    return waitFor(media, ["load", "error"], timeout);
  }
  if (media.readyState >= 2) return Promise.resolve();
  return waitFor(media, ["loadeddata", "canplay", "error"], timeout);
}

/**
 * Planet hopping — a rounded "portal" window cut out of a canvas. The footage inside is
 * screen-locked, so tilting the window gives a parallax effect; clicking it expands the
 * window to swallow the scene and jump to the next planet.
 * Media loads lazily (only when the section nears the viewport) and playback stops off-screen.
 */
export default function Cosmos() {
  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefetchRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portalRef = useRef<HTMLButtonElement>(null);
  const engine = useRef<Engine | null>(null);

  const [planet, setPlanet] = useState<CosmosId>("mars");
  const [phase, setPhase] = useState<Phase>("idle");
  const [content, setContent] = useState(false);
  const state = cosmosStates[planet];

  useEffect(() => {
    const rootEl = root.current;
    const bg = bgRef.current;
    const video = videoRef.current;
    const prefetch = prefetchRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const portal = portalRef.current;
    const ctx = canvas?.getContext("2d");
    if (!rootEl || !bg || !video || !prefetch || !img || !canvas || !portal || !ctx) return;

    const scene = document.createElement("canvas"); // holds the frozen last frame of a jump
    const sctx = scene.getContext("2d");
    if (!sctx) return;

    const reduce = prefersReducedMotion();
    const dur = (ms: number) => (reduce ? 1 : ms);

    let W = 0;
    let H = 0;
    let radius = 90;
    let current: CosmosId = "mars";
    let usingImage = false;
    let busy = false;
    let armed = false;
    let revealed = false;
    let visible = false;
    let running = false;
    let destroyed = false;
    let rotX = 0;
    let rotY = 0;
    let targetX = 0;
    let targetY = 0;
    let expansion = 0; // 0 → portal window, 1 → fills the section
    let maskScale = 0; // reveal scale of the window
    let transitionActive = false;
    let frozen = false;
    let last = 0;

    const currentMedia = () => (usingImage ? img : video);

    function animateValue(setter: (v: number) => void, duration: number) {
      return new Promise<void>((resolve) => {
        const t0 = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          setter(ease(t));
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });
    }

    /* ───── Canvas ───── */
    function resize() {
      W = rootEl!.clientWidth;
      H = rootEl!.clientHeight;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * d);
      canvas!.height = Math.round(H * d);
      ctx!.setTransform(d, 0, 0, d, 0, 0);
      radius = parseFloat(getComputedStyle(portal!).borderTopLeftRadius) || 90;
    }

    function drawCover(c: CanvasRenderingContext2D, media: HTMLVideoElement | HTMLImageElement) {
      const mw = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
      const mh = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
      if (!mw || !mh) return;
      const scale = Math.max(W / mw, H / mh);
      c.drawImage(media, (W - mw * scale) / 2, (H - mh * scale) / 2, mw * scale, mh * scale);
    }

    function drawShade(c: CanvasRenderingContext2D) {
      const y = H * 0.52;
      const g = c.createLinearGradient(0, y, 0, H);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,.88)");
      c.fillStyle = g;
      c.fillRect(0, y, W, H - y);
    }

    /** ~44 points of a w×h rounded rect (corner radius r), centred on the origin. */
    function roundedPoints(w: number, h: number, r: number) {
      const PI = Math.PI;
      const corners = [
        [w / 2 - r, -h / 2 + r, -PI / 2, 0],
        [w / 2 - r, h / 2 - r, 0, PI / 2],
        [-w / 2 + r, h / 2 - r, PI / 2, PI],
        [-w / 2 + r, -h / 2 + r, PI, PI * 1.5],
      ];
      const pts: [number, number][] = [];
      for (const [cx, cy, a0, a1] of corners) {
        for (let i = 0; i <= 10; i++) {
          const a = a0 + ((a1 - a0) * i) / 10;
          pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }
      }
      return pts;
    }

    /** Fake perspective (focal length 850) around a centre. */
    function project(pts: [number, number][], rx: number, ry: number, cx: number, cy: number) {
      const ax = (rx * Math.PI) / 180;
      const ay = (ry * Math.PI) / 180;
      const cax = Math.cos(ax);
      const sax = Math.sin(ax);
      const cay = Math.cos(ay);
      const say = Math.sin(ay);
      return pts.map(([x, y]): [number, number] => {
        const z = x * say - y * sax;
        const p = 850 / (850 + z);
        return [cx + x * cay * p, cy + y * cax * p];
      });
    }

    function draw(now: number) {
      const dt = Math.min(40, now - (last || now));
      last = now;
      const k = Math.min(1, dt * 0.009);
      rotX += (targetX - rotX) * k;
      rotY += (targetY - rotY) * k;

      ctx!.clearRect(0, 0, W, H);
      if (frozen) {
        ctx!.drawImage(scene, 0, 0, W, H);
        drawShade(ctx!);
      }

      const host = rootEl!.getBoundingClientRect();
      const rect = portal!.getBoundingClientRect();
      const rectCx = rect.left - host.left + rect.width / 2;
      const rectCy = rect.top - host.top + rect.height / 2;
      const e = expansion;
      const cx = rectCx + (W / 2 - rectCx) * e;
      const cy = rectCy + (H / 2 - rectCy) * e;
      const scale = e ? 1 : maskScale;
      const w = (rect.width + (W - rect.width) * e) * scale;
      const h = (rect.height + (H - rect.height) * e) * scale;
      const r = Math.max(0, Math.min(radius * (1 - e) * scale, w / 2, h / 2));

      if (w > 1 && h > 1) {
        const pts = project(roundedPoints(w, h, r), rotX * (1 - e), rotY * (1 - e), cx, cy);
        ctx!.save();
        ctx!.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y)));
        ctx!.closePath();
        ctx!.clip();
        ctx!.fillStyle = "#030303";
        ctx!.fillRect(0, 0, W, H);
        drawCover(ctx!, currentMedia());
        if (transitionActive) drawShade(ctx!);
        ctx!.restore();
      }
    }

    function loop(now: number) {
      if (destroyed || !visible) {
        running = false;
        return;
      }
      draw(now);
      requestAnimationFrame(loop);
    }

    function startLoop() {
      if (running || destroyed) return;
      running = true;
      last = 0;
      requestAnimationFrame(loop);
    }

    /* ───── Media ───── */
    function applyPortalMedia(id: CosmosId) {
      const s = cosmosStates[id];
      if (s.image) {
        usingImage = true;
        video!.pause();
        if (img!.getAttribute("src") !== s.image) img!.src = s.image;
      } else if (s.portal) {
        usingImage = false;
        video!.loop = true;
        video!.playbackRate = 1;
        if (video!.getAttribute("src") !== s.portal) {
          video!.src = s.portal;
          video!.load();
        }
        video!.play().catch(() => {});
      }
    }

    /** Fetch nothing until the section is near the viewport. */
    function arm() {
      if (armed) return;
      armed = true;
      bg!.src = cosmosAssets.marsBackground;
      bg!.load();
      video!.src = cosmosAssets.toEarth;
      video!.load();
    }

    /* ───── Reveals ───── */
    function revealMask() {
      maskScale = 0;
      return animateValue((v) => (maskScale = v), dur(1050));
    }

    async function showWindow() {
      await mediaReady(currentMedia(), 6000);
      if (destroyed) return;
      const mask = revealMask();
      await wait(dur(120));
      setContent(true);
      await mask;
    }

    async function firstReveal() {
      arm();
      await Promise.all([mediaReady(bg!, 8000), mediaReady(video!, 8000)]);
      if (destroyed) return;
      video!.loop = true;
      video!.play().catch(() => {});
      await showWindow();
      // Warm the next hop quietly while the visitor reads.
      setTimeout(() => {
        if (!destroyed && !prefetch!.getAttribute("src")) prefetch!.src = cosmosAssets.toVenus;
      }, 1500);
    }

    /* ───── Travel ───── */
    async function travel() {
      if (busy || !revealed || current === "venus") return;
      busy = true;
      targetX = targetY = 0;
      try {
        const next: CosmosId = current === "mars" ? "earth" : "venus";
        await mediaReady(video!, 8000);

        setPhase("transitioning");
        setContent(false);
        video!.loop = false;
        video!.currentTime = 0;
        video!.playbackRate = 1.3;
        transitionActive = true;
        const ended = video!.ended
          ? Promise.resolve()
          : waitFor(video!, ["ended", "error"], Math.max(5000, ((video!.duration || 6) / 1.3) * 1000 + 3000));
        await video!.play();

        await animateValue((v) => (expansion = v), dur(1100));
        await ended;

        // Freeze the final frame so the next scene starts exactly where this one ended.
        const d = Math.min(window.devicePixelRatio || 1, 2);
        scene.width = Math.round(W * d);
        scene.height = Math.round(H * d);
        sctx!.setTransform(d, 0, 0, d, 0, 0);
        drawCover(sctx!, video!);
        frozen = true;

        current = next;
        setPlanet(next);
        applyPortalMedia(next);
        if (next === "earth") img!.src = cosmosAssets.mercury; // warm the still for the last hop
        await raf();
        await raf();

        transitionActive = false;
        expansion = 0;
        maskScale = 0;
        setPhase("idle");

        await showWindow();
        await wait(dur(450));
        busy = false;
      } catch {
        transitionActive = false;
        expansion = 0;
        maskScale = 1;
        setPhase("idle");
        setContent(true);
        busy = false;
      }
    }

    async function reset() {
      if (busy || current !== "venus") return;
      busy = true;
      setContent(false);
      frozen = false;
      current = "mars";
      setPlanet("mars");
      applyPortalMedia("mars");
      maskScale = 0;
      await showWindow();
      busy = false;
    }

    engine.current = {
      travel: () => void travel(),
      reset: () => void reset(),
    };

    /* ───── Pointer tilt ───── */
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || busy || reduce) return;
      const r = rootEl.getBoundingClientRect();
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 37.4;
      targetX = ((e.clientY - r.top) / r.height - 0.5) * -33;
    };
    const onLeave = () => {
      targetX = targetY = 0;
    };
    rootEl.addEventListener("pointermove", onMove);
    rootEl.addEventListener("pointerleave", onLeave);

    /* ───── Lifecycle ───── */
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(rootEl);

    const ioArm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        arm();
        ioArm.disconnect();
      },
      { rootMargin: "120% 0px" },
    );
    const ioVisible = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          startLoop();
          if (armed && !busy && !usingImage) video.play().catch(() => {});
        } else if (!busy) {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    const ioReveal = new IntersectionObserver(
      ([entry]) => {
        // Lets the fixed altitude HUD step aside while this section is on screen.
        document.documentElement.dataset.cosmos = entry.isIntersecting ? "in" : "";
        if (entry.isIntersecting && !revealed) {
          revealed = true;
          void firstReveal();
        }
      },
      { threshold: 0.4 },
    );
    ioArm.observe(rootEl);
    ioVisible.observe(rootEl);
    ioReveal.observe(rootEl);

    return () => {
      destroyed = true;
      engine.current = null;
      ro.disconnect();
      ioArm.disconnect();
      ioVisible.disconnect();
      ioReveal.disconnect();
      rootEl.removeEventListener("pointermove", onMove);
      rootEl.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.cosmos;
      video.pause();
    };
  }, []);

  return (
    <section
      id="cosmos"
      ref={root}
      aria-label="Planet hopping"
      data-phase={phase}
      data-content={content ? "in" : "out"}
      data-planet={planet}
      className="cosmos relative isolate h-[100svh] min-h-[660px] overflow-hidden bg-[#0a0908]"
    >
      {/* Backdrop for the starting planet */}
      <video
        ref={bgRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-1 h-48 bg-gradient-to-b from-void to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1"
        style={{ background: "linear-gradient(to bottom, transparent 52%, rgba(0,0,0,.88) 100%)" }}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-3 h-full w-full" />

      {/* Heading */}
      <div className="container-x pointer-events-none absolute inset-x-0 top-0 z-4 pt-24 sm:pt-28">
        <div className="pointer-events-auto flex items-start justify-between gap-6">
          <SectionHeading index="07" label="Beyond the code" title="Planet hopping" />
          <a href="/planet-jumping" data-cursor className="btn btn-ghost mt-1 hidden !h-9 sm:inline-flex">
            Full experience <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      {/* Planet list */}
      <aside
        key={planet}
        aria-label="Planets"
        className="absolute left-[max(1.5rem,calc((100vw-1280px)/2+3rem))] top-1/2 z-4 hidden -translate-y-[43%] flex-col gap-1.5 text-base text-white/90 lg:flex"
      >
        {cosmosPlanets.map((name, i) => {
          const active = name === state.name;
          return (
            <span
              key={name}
              style={{ animationDelay: `${0.02 + i * 0.03}s` }}
              className={`cosmos-row flex min-h-5 items-center ${active ? "gap-2 text-lg font-semibold text-white" : "text-white/75"}`}
            >
              {active && <span className="cosmos-dot h-3.5 w-3.5 rounded-full bg-white" />}
              {name}
            </span>
          );
        })}
      </aside>

      {/* Portal */}
      <div className="cosmos-chrome absolute left-1/2 top-[44%] z-4 w-[min(260px,66vw)] -translate-x-1/2 -translate-y-[54%] md:top-1/2 md:w-[min(300px,48vw)] lg:w-[min(320px,31vw)]">
        <div className="cosmos-caption mb-3 flex items-center justify-between text-sm text-white md:text-base">
          <span>Next:</span>
          <span>
            {state.number} <strong className="ml-1 font-semibold md:text-lg">{state.next}</strong>
          </span>
        </div>
        <button
          ref={portalRef}
          type="button"
          data-cursor
          aria-label={`Travel to ${state.next}`}
          onClick={() => engine.current?.travel()}
          className="relative block aspect-[320/350] w-full rounded-[70px] border-0 bg-transparent p-0 md:rounded-[90px]"
        >
          {/* Pixel sources for the canvas — never visible themselves */}
          <video ref={videoRef} muted playsInline preload="auto" aria-hidden="true" className="pointer-events-none invisible absolute h-px w-px" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} alt="Mercury" className="pointer-events-none invisible absolute h-px w-px" />
        </button>
        {planet === "venus" && content && (
          <div className="absolute inset-x-0 top-full z-10 mt-3 flex justify-center md:mt-5">
            <button type="button" data-cursor className="btn btn-ghost !h-9 md:!h-11" onClick={() => engine.current?.reset()}>
              Replay from Mars
            </button>
          </div>
        )}
      </div>

      {/* Title + facts */}
      <div className="cosmos-chrome pointer-events-none absolute inset-x-0 bottom-0 z-4">
        <div className="container-x flex flex-col gap-5 pb-7 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-8">
          <h3
            key={`t-${planet}`}
            className="cosmos-title font-display text-[clamp(88px,17.5vw,250px)] font-medium uppercase leading-[0.78] tracking-[-0.04em] text-white"
          >
            {state.name}
          </h3>
          <dl key={`f-${planet}`} className="w-full text-[13px] leading-snug md:w-[min(447px,36vw)] md:text-[15px]">
            {state.facts.map(([k, v]) => (
              <div
                key={k}
                className="cosmos-fact grid grid-cols-[92px_1fr] gap-4 border-b border-white/45 py-1.5 last:border-b-0 md:grid-cols-[124px_1fr] md:py-2"
              >
                <dt className="font-semibold text-white">{k}:</dt>
                <dd className="text-white/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Quietly warms the next hop's footage */}
      <video ref={prefetchRef} muted playsInline preload="auto" aria-hidden="true" className="hidden" />
    </section>
  );
}
