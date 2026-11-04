import SmoothScroll from "./SmoothScroll";
import Header from "./Header";
import Thread from "./Thread";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="relative">
        {children}
        <Thread />
      </main>
    </>
  );
}
