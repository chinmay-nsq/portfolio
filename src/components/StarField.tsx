"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { fx } from "@/lib/fx";

type Star = {
  x: number;
  y: number;
  z: number; // depth: 0.12 (far) → 1 (near)
  r: number;
  phase: number;
  speed: number;
  color: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
};

const COLORS = ["#ffffff", "#c9d8f0", "#f1e6d4", "#d4e4f5"];

/**
 * Full-screen canvas starfield.
 * – parallax against scroll + pointer
 * – stars stretch into streaks with scroll velocity
 * – radial "hyperspace" streaks while `fx.warp` > 0
 * – occasional shooting stars
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const shooters: Shooter[] = [];
    let vel = 0;
    let nextShot = 4;

    const seed = () => {
      const count = Math.min(520, Math.floor((w * h) / 4200));
      stars = Array.from({ length: count }, () => {
        const z = 0.12 + Math.pow(Math.random(), 1.8) * 0.88;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 1.2 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          color: Math.random() < 0.7 ? 0 : 1 + Math.floor(Math.random() * 3),
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prevW = w;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile URL bars resize the viewport height constantly – only reseed on real width changes.
      if (!stars.length || Math.abs(w - prevW) > 40) seed();
      if (reduce) draw(0, 0);
    };

    const spawnShooter = () => {
      const dir = Math.random() < 0.5 ? 1 : -1;
      const angle = ((18 + Math.random() * 26) * Math.PI) / 180;
      const speed = 800 + Math.random() * 500;
      shooters.push({
        x: w * (0.15 + Math.random() * 0.7),
        y: Math.random() * h * 0.4,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 0.8 + Math.random() * 0.5,
        len: 140 + Math.random() * 120,
      });
    };

    function draw(time: number, deltaMs: number) {
      const dt = Math.min(deltaMs, 50) / 1000;
      const t = time;
      ctx!.clearRect(0, 0, w, h);

      vel += (fx.velocity - vel) * 0.12;
      const warp = fx.warp;
      const cx = w / 2;
      const cy = h / 2;
      const mx = fx.mx - 0.5;
      const scroll = fx.scrollY;
      const dirSign = vel >= 0 ? 1 : -1;

      ctx!.lineCap = "round";

      for (const s of stars) {
        const par = s.z;
        let y = (s.y - scroll * par * 0.18) % h;
        if (y < 0) y += h;
        let x = (s.x - mx * 46 * par) % w;
        if (x < 0) x += w;

        const twinkle = reduce ? 1 : 0.62 + 0.38 * Math.sin(t * s.speed + s.phase);
        let alpha = (0.16 + par * 0.7) * twinkle + warp * 0.35;
        if (alpha > 1) alpha = 1;
        ctx!.globalAlpha = alpha;

        const scrollLen = reduce ? 0 : Math.min(140, Math.abs(vel) * par * 1.7);
        const k = warp > 0.01 ? Math.min(0.78, warp * 0.34 * (0.4 + par)) : 0;

        if (k > 0 || scrollLen > 2) {
          const x0 = k > 0 ? x - (x - cx) * k : x;
          const y0 = k > 0 ? y - (y - cy) * k : y + dirSign * scrollLen;
          ctx!.strokeStyle = COLORS[s.color];
          ctx!.lineWidth = s.r;
          ctx!.beginPath();
          ctx!.moveTo(x0, y0);
          ctx!.lineTo(x, y);
          ctx!.stroke();
        } else {
          ctx!.fillStyle = COLORS[s.color];
          if (s.r > 1.25) {
            ctx!.beginPath();
            ctx!.arc(x, y, s.r, 0, Math.PI * 2);
            ctx!.fill();
          } else {
            ctx!.fillRect(x - s.r / 2, y - s.r / 2, s.r, s.r);
          }
        }
      }
      ctx!.globalAlpha = 1;

      if (reduce) return;

      // Shooting stars
      if (t > nextShot && !document.hidden) {
        spawnShooter();
        nextShot = t + 4 + Math.random() * 7;
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.life > s.max) {
          shooters.splice(i, 1);
          continue;
        }
        const a = Math.sin((s.life / s.max) * Math.PI);
        const mag = Math.hypot(s.vx, s.vy);
        const tx = s.x - (s.vx / mag) * s.len;
        const ty = s.y - (s.vy / mag) * s.len;
        const grad = ctx!.createLinearGradient(s.x, s.y, tx, ty);
        grad.addColorStop(0, `rgba(255,255,255,${a})`);
        grad.addColorStop(0.3, `rgba(150,220,255,${a * 0.45})`);
        grad.addColorStop(1, "rgba(150,220,255,0)");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(tx, ty);
        ctx!.stroke();
      }
    }

    const onMove = (e: PointerEvent) => {
      fx.mx = e.clientX / window.innerWidth;
      fx.my = e.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduce) gsap.ticker.add(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(draw);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
