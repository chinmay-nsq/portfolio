import { profile } from "@/data/portfolio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#story", label: "Story" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-page/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-[14px] font-semibold text-white">CL</span>
          <span className="hidden font-medium sm:inline">{profile.firstName}</span>
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden rounded-full px-3.5 py-2 text-[15px] text-ink-2 transition-colors hover:bg-tile hover:text-ink sm:inline-block">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-ink ml-2 !h-10 !px-4 !text-[14px]">
            Say hi
          </a>
        </nav>
      </div>
    </header>
  );
}
