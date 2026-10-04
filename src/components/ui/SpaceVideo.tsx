"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { asset } from "@/lib/asset";

export type SpaceClip = "cliffs" | "nebula";

type Props = {
  clip: SpaceClip;
  /** Overall visibility of the footage (0–1). */
  opacity?: number;
  /** Which edges melt away so the footage blends into the page. */
  fade?: "both" | "top" | "bottom" | "none";
  /** Darkens part of the frame so text on top stays readable. */
  scrim?: "left" | "center" | "none";
  /** Which part of the frame stays in view when the viewport crops it (CSS object-position). */
  focus?: string;
  className?: string;
};

const masks = {
  both: "linear-gradient(to bottom, transparent, #000 24%, #000 76%, transparent)",
  top: "linear-gradient(to bottom, transparent, #000 30%)",
  bottom: "linear-gradient(to bottom, #000 70%, transparent)",
  none: "none",
} as const;

const scrims = {
  left: "linear-gradient(90deg, rgba(6,7,10,.82), rgba(6,7,10,.45) 45%, rgba(6,7,10,.05))",
  center: "radial-gradient(ellipse at center, rgba(6,7,10,.72), rgba(6,7,10,.2) 72%)",
  none: "none",
} as const;

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Looping deep-space footage (NASA / STScI) used as a quiet section backdrop.
 * – nothing is fetched until the section is near the viewport
 * – plays only while on screen; pauses when the tab is hidden
 * – 4K file only on genuinely high-resolution screens, otherwise 1080p
 * – reduced-motion / data-saver visitors get the still poster instead
 */
export default function SpaceVideo({
  clip,
  opacity = 0.6,
  fade = "both",
  scrim = "none",
  focus = "50% 50%",
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const lowData = !!net?.saveData || /(^|-)2g$/.test(net?.effectiveType ?? "");
    if (prefersReducedMotion() || lowData) return; // poster only

    const physicalWidth = Math.max(window.screen.width, window.screen.height) * (window.devicePixelRatio || 1);
    const uhd = physicalWidth >= 3400 && !window.matchMedia("(pointer: coarse)").matches;

    let loaded = false;
    let visible = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      video.src = asset(`/space/${clip}-${uhd ? "4k" : "1080"}.mp4`);
      video.load();
    };
    const sync = () => {
      if (visible && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };

    const onPlaying = () => setReady(true);
    video.addEventListener("playing", onPlaying);

    const ioLoad = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        load();
        ioLoad.disconnect();
      },
      { rootMargin: "80% 0px" },
    );
    const ioPlay = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) load();
        if (loaded) sync();
      },
      { threshold: 0 },
    );
    ioLoad.observe(root);
    ioPlay.observe(root);
    document.addEventListener("visibilitychange", sync);

    return () => {
      ioLoad.disconnect();
      ioPlay.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("playing", onPlaying);
      video.pause();
    };
  }, [clip]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ opacity, maskImage: masks[fade], WebkitMaskImage: masks[fade] }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${asset(`/space/${clip}.jpg`)})`, backgroundPosition: focus }}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        style={{ objectPosition: focus }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {scrim !== "none" && <div className="absolute inset-0" style={{ background: scrims[scrim] }} />}
      {scrim === "left" && <div className="absolute inset-0 bg-void/40 md:hidden" />}
    </div>
  );
}
