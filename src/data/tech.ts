/**
 * Technology logos. The SVG files live in /public/logos (single-colour brand marks from
 * Simple Icons; `sql.svg` is a generic database glyph). `hex` is the brand colour a logo
 * lights up with on hover — near-black brands use white so they stay visible on dark.
 */
import { asset } from "@/lib/asset";

export type TechLogoData = { src: string; hex: string };

const logo = (file: string, hex: string): TechLogoData => ({ src: asset(`/logos/${file}.svg`), hex });

const logos: Record<string, TechLogoData> = {
  // Languages
  typescript: logo("typescript", "3178C6"),
  javascript: logo("javascript", "F7DF1E"),
  python: logo("python", "3776AB"),
  java: logo("openjdk", "ED8B00"),
  "c++": logo("cplusplus", "00599C"),
  c: logo("c", "A8B9CC"),
  sql: logo("sql", "9DB8D6"),
  // Frontend
  react: logo("react", "61DAFB"),
  "react.js": logo("react", "61DAFB"),
  "react native": logo("react", "61DAFB"),
  "next.js": logo("nextdotjs", "FFFFFF"),
  redux: logo("redux", "764ABC"),
  "tailwind css": logo("tailwindcss", "06B6D4"),
  "material-ui": logo("mui", "007FFF"),
  bootstrap: logo("bootstrap", "7952B3"),
  vite: logo("vite", "646CFF"),
  // Backend
  "node.js": logo("nodedotjs", "5FA04E"),
  "express.js": logo("express", "FFFFFF"),
  "spring boot": logo("springboot", "6DB33F"),
  serverless: logo("serverless", "FD5750"),
  jwt: logo("jsonwebtokens", "D63AFF"),
  // Data & cloud
  mongodb: logo("mongodb", "47A248"),
  dynamodb: logo("amazondynamodb", "4053D6"),
  postgresql: logo("postgresql", "4169E1"),
  redis: logo("redis", "FF4438"),
  firebase: logo("firebase", "FFCA28"),
  prisma: logo("prisma", "A0AEC0"),
  aws: logo("amazonaws", "FF9900"),
  "aws ec2": logo("amazonaws", "FF9900"),
  "google cloud": logo("googlecloud", "4285F4"),
  // Tools
  git: logo("git", "F05032"),
  "git / github": logo("github", "FFFFFF"),
  docker: logo("docker", "2496ED"),
  postman: logo("postman", "FF6C37"),
  figma: logo("figma", "F24E1E"),
  "linux cli": logo("linux", "FCC624"),
  "vs code": logo("visualstudiocode", "007ACC"),
  // Achievements
  leetcode: logo("leetcode", "FFA116"),
};

/** Looks up a logo by the display name used in the content data (case-insensitive). */
export function techLogo(name: string): TechLogoData | undefined {
  return logos[name.trim().toLowerCase()];
}

/** For files that are not tied to a skill name (e.g. achievement badges). */
export function logoByFile(file: string, hex = "ECECF1"): TechLogoData {
  return logo(file, hex);
}
