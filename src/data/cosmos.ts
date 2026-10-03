/** Content + media for the "Planet hopping" section (same assets as /planet-jumping). */

const BASE = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";

export const cosmosAssets = {
  marsBackground: `${BASE}/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4`,
  toEarth: `${BASE}/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4`,
  toVenus: `${BASE}/b30f64d9-1637-477a-83df-d0fc6461a422.mp4`,
  mercury: `${BASE}/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg`,
};

export type CosmosId = "mars" | "earth" | "venus";

export const cosmosPlanets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
] as const;

export type CosmosState = {
  name: string;
  next: string;
  number: string;
  /** Video shown in the portal window (and played during the jump). */
  portal?: string;
  /** Still shown in the portal window instead of a video. */
  image?: string;
  facts: [string, string][];
};

export const cosmosStates: Record<CosmosId, CosmosState> = {
  mars: {
    name: "Mars",
    next: "Earth",
    number: "[03]",
    portal: cosmosAssets.toEarth,
    facts: [
      ["Distance", "About 228 million km (1.5 astronomical units)."],
      ["Year", "One Martian year is equal to 687 Earth days."],
      ["Temperature", "Around -60 °C, dropping to -125 °C at the poles in winter."],
      ["Atmosphere", "Very thin, consisting of 95% carbon dioxide, with frequent dust storms."],
    ],
  },
  earth: {
    name: "Earth",
    next: "Venus",
    number: "[02]",
    portal: cosmosAssets.toVenus,
    facts: [
      ["Distance", "149.6 million km from the Sun."],
      ["Year", "365.25 Earth days."],
      ["Temperature", "Average surface temperature around 15 °C."],
      ["Atmosphere", "Mostly nitrogen and oxygen, supporting life and liquid water."],
    ],
  },
  venus: {
    name: "Venus",
    next: "Mercury",
    number: "[06]",
    image: cosmosAssets.mercury,
    facts: [
      ["Distance", "108.2 million km from the Sun."],
      ["Year", "225 Earth days."],
      ["Temperature", "Around 465 °C — the hottest planet in the Solar System."],
      ["Atmosphere", "Extremely dense, mostly carbon dioxide, with clouds of sulfuric acid."],
    ],
  },
};
