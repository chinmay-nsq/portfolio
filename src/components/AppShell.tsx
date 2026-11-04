import Header from "./Header";
import RevealObserver from "./RevealObserver";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pb-10">{children}</main>
      <RevealObserver />
    </>
  );
}
