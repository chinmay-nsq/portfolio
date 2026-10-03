"use client";

import { useCallback, useState } from "react";
import { IntroContext } from "./IntroContext";
import SmoothScroll from "./SmoothScroll";
import Nebula from "./Nebula";
import StarField from "./StarField";
import Flyby from "./Flyby";
import Loader from "./Loader";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import HudTelemetry from "./HudTelemetry";

/**
 * Persistent layers (sky, cursor, HUD, loader) + the page content.
 * `revealed` flips to true the moment the loader's blast doors begin to open.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const reveal = useCallback(() => setRevealed(true), []);

  return (
    <IntroContext.Provider value={revealed}>
      <SmoothScroll locked={!revealed} />
      <Nebula />
      <StarField />
      <Flyby />
      <Navbar />
      <HudTelemetry />
      <main className="relative z-10">{children}</main>
      <Loader onReveal={reveal} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </IntroContext.Provider>
  );
}
