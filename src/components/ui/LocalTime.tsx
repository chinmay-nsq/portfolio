"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true });
const hourIn = (d: Date) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", hour12: false }).format(d));

function status(h: number) {
  if (h < 6) return "so I'm asleep. Email me anyway.";
  if (h < 10) return "so I'm probably reading through yesterday's logs.";
  if (h < 18) return "so I'm probably shipping something.";
  if (h < 22) return "so I'm probably fixing what I shipped.";
  return "so I'm probably on one more LeetCode problem.";
}

/** "It's 9:42 pm in Pune, so I'm probably fixing what I shipped." Renders after mount so it never mismatches the server. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={`flex items-start gap-2.5 ${className}`}>
      <span className="relative mt-[0.55em] flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60 [animation-duration:2.4s]" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="min-h-[1lh]">
        {now ? (
          <>
            It&apos;s <span className="tabular-nums">{fmt.format(now).toLowerCase()}</span> in Pune, {status(hourIn(now))}
          </>
        ) : (
          "Based in Pune, India."
        )}
      </span>
    </p>
  );
}
