"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Pt = [number, number];

/** Smooth curve through every point (Catmull-Rom converted to cubic Béziers). */
function smooth(pts: Pt[]) {
  if (pts.length < 2) return "";
  const f = (p: Pt) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  let d = `M${f(pts[0])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1)} ${f(c2)} ${f(p2)}`;
  }
  return d;
}

/**
 * The line. One pen stroke that runs down the left margin, ties a knot at every job and project,
 * and finishes by underlining the email address. It draws itself as you scroll.
 *
 * Elements opt in with `data-thread`:
 *   "start"      where the line begins (top of the element)
 *   "sway"       pass by in the margin
 *   "knot"       tie a small loop beside it; it gets `data-reached` once the pen gets there
 *   "underline"  leave the margin and underline the element (the end)
 */
export default function Thread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const tip = tipRef.current;
    const main = svg?.parentElement;
    if (!svg || !path || !tip || !main) return;

    const reduce = prefersReducedMotion();
    let total = 0;
    let ys = new Float32Array(0); // furthest y reached by each sampled length
    const SAMPLES = 800;
    let anchors: { el: HTMLElement; y: number; on: boolean }[] = [];
    let drawn = 0;

    const build = () => {
      const mr = main.getBoundingClientRect();
      const W = main.clientWidth;
      const H = main.scrollHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.style.height = `${H}px`;

      const col = main.querySelector<HTMLElement>("[data-col]");
      const colLeft = col ? col.getBoundingClientRect().left - mr.left : 40;
      const wide = W >= 1024;
      const x = wide ? colLeft - 56 : 14;
      const R = wide ? 10 : 6;
      const sway = wide ? 16 : 4;

      const pts: Pt[] = [];
      const els = Array.from(main.querySelectorAll<HTMLElement>("[data-thread]"));
      anchors = [];
      let flip = 1;
      const pass = (y: number) => {
        // a gentle wave between anchors that are far apart
        const last = pts[pts.length - 1];
        if (last && y - last[1] > 320) pts.push([x + sway * (flip = -flip), (last[1] + y) / 2]);
      };

      for (const el of els) {
        const r = el.getBoundingClientRect();
        const top = r.top - mr.top;
        const mid = top + Math.min(r.height / 2, 30);
        const kind = el.dataset.thread;
        if (kind === "start") {
          pts.push([x, top]);
        } else if (kind === "sway") {
          pass(mid);
          pts.push([x + sway * (flip = -flip), mid]);
        } else if (kind === "knot") {
          pass(mid);
          // a small cursive loop: down, round to the right, back up and over
          pts.push([x, mid - R * 3], [x + R * 1.2, mid - R * 0.3], [x, mid + R * 0.9], [x - R * 1.2, mid - R * 0.3], [x + R * 0.2, mid - R * 1.4]);
          anchors.push({ el, y: mid, on: false });
        } else if (kind === "underline") {
          const left = r.left - mr.left;
          const base = r.bottom - mr.top - 2;
          pass(base);
          pts.push([x, base - 70], [left - 2, base + 2], [left + r.width * 0.55, base + 4], [left + r.width + 10, base - 2]);
          anchors.push({ el, y: base, on: false });
        }
      }

      path.setAttribute("d", smooth(pts));
      total = path.getTotalLength();
      ys = new Float32Array(SAMPLES + 1);
      let maxY = -Infinity;
      for (let i = 0; i <= SAMPLES; i++) {
        maxY = Math.max(maxY, path.getPointAtLength((i / SAMPLES) * total).y);
        ys[i] = maxY;
      }
      path.style.strokeDasharray = `${total}`;
      if (reduce) drawn = total;
    };

    // length of line whose pen has travelled down to y
    const lengthAt = (y: number) => {
      let lo = 0;
      let hi = SAMPLES;
      while (lo < hi) {
        const m = (lo + hi) >> 1;
        if (ys[m] < y) lo = m + 1;
        else hi = m;
      }
      return (lo / SAMPLES) * total;
    };

    const tick = () => {
      if (!total) return;
      if (!reduce) {
        const vh = window.innerHeight;
        const max = document.documentElement.scrollHeight - vh;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
        const mainTop = main.getBoundingClientRect().top + window.scrollY;
        // the pen sits a little below the middle of the screen, and catches up with the bottom at the very end
        const target = window.scrollY + vh * (0.6 + 0.4 * p ** 4) - mainTop;
        drawn += (lengthAt(target) - drawn) * 0.12;
      }
      path.style.strokeDashoffset = `${total - drawn}`;
      const pt = path.getPointAtLength(drawn);
      tip.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      for (const a of anchors) {
        const on = a.y <= pt.y + 6;
        if (on !== a.on) {
          a.on = on;
          a.el.toggleAttribute("data-reached", on);
        }
      }
    };

    let queued = 0;
    const rebuild = () => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(() => {
        build();
        tick();
      });
    };
    const ro = new ResizeObserver(rebuild);
    ro.observe(main);
    void document.fonts?.ready.then(rebuild);
    rebuild();

    gsap.ticker.add(tick);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(queued);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <svg ref={svgRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 w-full overflow-visible" preserveAspectRatio="none">
      <path ref={pathRef} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <g ref={tipRef}>
        <circle r="7" fill="var(--color-accent)" opacity=".16" />
        <circle r="4" fill="var(--color-accent)" stroke="#fff" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
