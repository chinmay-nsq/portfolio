import { profile } from "@/data/portfolio";

/**
 * Canonical origin + base path of the deployed site, e.g. `https://chinmay-nsq.github.io/portfolio`.
 * The deploy workflow sets NEXT_PUBLIC_SITE_URL; locally it falls back to the dev server.
 * Change it (or set the variable) when you move to a custom domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** Absolute URL for a site path, e.g. absoluteUrl("/og.jpg"). */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const siteMeta = {
  name: `${profile.firstName} ${profile.lastName}`,
  title: "Chinmay Lale — Software Engineer (React, Node.js, AWS)",
  shortTitle: "Chinmay Lale — Software Engineer",
  description:
    "Full-stack software engineer in Pune, India, building GenieHire, an AI recruitment platform, at Nsquare Experts. React, Next.js, Node.js, React Native and AWS, plus an ESP32 and a badminton racket.",
  locale: "en_IN",
  ogImage: { path: "/og.jpg", width: 1200, height: 630, alt: "Chinmay Lale, full-stack engineer: writes the kind of software you never notice, used by 5,000+ people every day." },
  themeColor: "#f4f4f5",
} as const;
