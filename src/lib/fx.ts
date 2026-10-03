/**
 * Mutable, render-free store shared between the smooth-scroll driver, the
 * starfield canvas and the HUD. Written once per frame, read once per frame.
 */
export const fx = {
  /** Smoothed scroll velocity in px per frame (signed). */
  velocity: 0,
  /** Page scroll progress, 0 → 1. */
  progress: 0,
  scrollY: 0,
  /** Normalised pointer position, 0 → 1. */
  mx: 0.5,
  my: 0.5,
  /** Hyperspace intensity; 0 = idle, 1 = full warp streaks. */
  warp: 0,
};
