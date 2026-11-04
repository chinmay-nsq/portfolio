import SmoothScroll from "./SmoothScroll";
import Tabs from "./Tabs";

/** Header tabs + the drawer. The rod runs down the middle, behind every card, and ends at the drawer front. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Tabs />
      <main className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-40 left-1/2 top-80 w-[3px] -translate-x-1/2 rounded-full"
          style={{ background: "linear-gradient(90deg, #9aa3ae, #e8ebef 45%, #8d96a2)" }}
        />
        <div className="relative">{children}</div>
      </main>
    </>
  );
}
