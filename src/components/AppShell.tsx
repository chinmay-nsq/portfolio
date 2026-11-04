import SmoothScroll from "./SmoothScroll";
import Header from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>{children}</main>
    </>
  );
}
