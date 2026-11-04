import { profile } from "@/data/portfolio";
import LocalTime from "../ui/LocalTime";

export default function Intro() {
  return (
    <>
      <header className="settle" style={{ "--i": 0 } as React.CSSProperties}>
        <h1 className="font-medium">
          {profile.name}
          <span className="sr-only">, software engineer</span>
        </h1>
        <p className="text-ink-2">Software engineer in {profile.city}</p>
      </header>

      <div className="settle mt-10 space-y-4" style={{ "--i": 1 } as React.CSSProperties}>
        <p>
          I build software that <span className="font-medium">5,000+ people</span> use every day. Right now that&apos;s
          GenieHire, an AI recruitment platform, at {profile.company}. Before that, React Native apps, Node.js APIs and
          AWS deploys that weren&apos;t allowed to go down.
        </p>
        <p>
          Off the clock I install things on my laptop just to see what they do, tinker with an ESP32, and play
          badminton. There&apos;s an LED{" "}
          <a href="#desk" className="link">
            further down this page
          </a>
          . You can switch it on.
        </p>
        <LocalTime className="text-ink-2" />
      </div>
    </>
  );
}
