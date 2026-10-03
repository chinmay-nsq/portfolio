import { useId } from "react";

/**
 * Top-down fighter-jet geometry (nose up, 200 × 300 units).
 * Only the right half is described; the left half is mirrored so the
 * aircraft is perfectly symmetric.
 */
type Pt = [number, number];

const RIGHT_HALF: Pt[] = [
  [100, 4],
  [104, 22],
  [107, 48],
  [109, 72],
  [113, 102],
  [118, 130],
  [192, 208],
  [195, 226],
  [142, 230],
  [132, 236],
  [166, 262],
  [170, 280],
  [128, 278],
  [123, 290],
  [113, 298],
  [100, 298],
];

const mirror = ([x, y]: Pt): Pt => [200 - x, y];
const toPath = (pts: Pt[]) => "M" + pts.map((p) => p.join(" ")).join("L") + "Z";

const BODY = toPath([
  ...RIGHT_HALF,
  ...RIGHT_HALF.slice(1, -1).reverse().map(mirror),
]);

const FIN: Pt[] = [
  [124, 196],
  [131, 196],
  [148, 258],
  [139, 260],
];
const INTAKE: Pt[] = [
  [110, 104],
  [119, 124],
  [117, 156],
  [110, 144],
];
const CANOPY = "M100 56C109 70 109 98 100 112C91 98 91 70 100 56Z";
const PANEL_LINES = "M122 150 176 212M78 150 24 212M128 176 186 218M72 176 14 218M130 244 160 266M70 244 40 266";

const OX = 90; // schematic offset so callouts fit either side of the aircraft
const W = 430;
const RX = OX + 212; // where right-hand callout leaders end
const LX = OX - 8; // where left-hand callout leaders end
const DIM_X = W - 16; // length dimension line
const at = ([x, y]: Pt): Pt => [x + OX, y];
const poly = (pts: Pt[]) => pts.map((p) => p.join(",")).join(" ");

const RING_TICKS = Array.from({ length: 72 }, (_, i) => i);

const callouts: { n: string; label: string; side: "r" | "l"; pts: Pt[] }[] = [
  { n: "01", label: "CANOPY", side: "r", pts: [at([100, 84]), at([136, 56]), [RX, 56]] },
  { n: "02", label: "AIR INTAKE", side: "r", pts: [at([114, 128]), at([142, 112]), [RX, 112]] },
  { n: "03", label: "STABILISER", side: "r", pts: [at([140, 226]), at([158, 206]), [RX, 206]] },
  { n: "04", label: "AFTERBURNER", side: "l", pts: [at([92, 296]), at([58, 282]), [LX, 282]] },
  { n: "05", label: "MAIN WING", side: "l", pts: [at([60, 190]), at([28, 172]), [LX, 172]] },
];

const mono = { fontFamily: "var(--font-jetbrains), ui-monospace, monospace" } as const;

/**
 * Hero artwork: an engineering-drawing style general-arrangement of the aircraft.
 * Elements carry `data-draw` (stroke-draw) and `data-fade` hooks for GSAP.
 */
export function JetSchematic({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const cx = OX + 100;

  return (
    <svg
      viewBox={`0 -6 ${W} 346`}
      className={className}
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={id("fill")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".085" />
          <stop offset="1" stopColor="#fff" stopOpacity=".012" />
        </linearGradient>
        <linearGradient id={id("exh")} gradientUnits="userSpaceOnUse" x1="0" y1="298" x2="0" y2="338">
          <stop offset="0" stopColor="#ff9a5a" stopOpacity=".95" />
          <stop offset=".35" stopColor="#ff6a2b" stopOpacity=".5" />
          <stop offset="1" stopColor="#ff6a2b" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" stopColor="#ff8a4a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ff6a2b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Instrument rings */}
      <g data-fade transform={`translate(${cx} 150)`} stroke="rgba(236,236,241,.11)" strokeWidth=".5">
        <circle r="150" />
        <circle r="116" strokeDasharray="1.5 4" opacity=".8" />
        <circle r="64" opacity=".5" />
        {RING_TICKS.map((i) => (
          <line
            key={i}
            y1="-150"
            y2={i % 6 === 0 ? -158 : -154}
            transform={`rotate(${i * 5})`}
            strokeOpacity={i % 6 === 0 ? 1 : 0.6}
          />
        ))}
        <path d="M-174 0H-120M120 0H174M0 -174V-128M0 128V174" opacity=".6" />
      </g>

      {/* Aircraft */}
      <g transform={`translate(${OX} 0)`}>
        {/* afterburner */}
        <g data-fade>
          {[92, 108].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="298" r="7" fill={`url(#${id("glow")})`} />
              <line
                className="jet-flame"
                style={{ animationDelay: `${i * 0.06}s` }}
                x1={x}
                y1="299"
                x2={x}
                y2="338"
                stroke={`url(#${id("exh")})`}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        <path data-draw pathLength={1} d={BODY} fill={`url(#${id("fill")})`} stroke="rgba(236,236,241,.92)" strokeWidth=".9" strokeLinejoin="round" />
        {[FIN, FIN.map(mirror)].map((pts, i) => (
          <path key={`f${i}`} data-draw pathLength={1} d={toPath(pts)} stroke="rgba(236,236,241,.55)" strokeWidth=".55" />
        ))}
        {[INTAKE, INTAKE.map(mirror)].map((pts, i) => (
          <path key={`i${i}`} data-draw pathLength={1} d={toPath(pts)} stroke="rgba(236,236,241,.55)" strokeWidth=".55" fill="rgba(0,0,0,.35)" />
        ))}
        <path data-draw pathLength={1} d={CANOPY} stroke="rgba(236,236,241,.8)" strokeWidth=".7" fill="rgba(157,184,214,.12)" />
        <path data-draw pathLength={1} d={PANEL_LINES} stroke="rgba(236,236,241,.28)" strokeWidth=".4" />
        {[86, 102].map((x) => (
          <rect key={x} data-draw pathLength={1} x={x} y="286" width="12" height="12" rx="1.5" stroke="rgba(236,236,241,.6)" strokeWidth=".55" />
        ))}
        <path data-fade d="M100 -2V304" stroke="rgba(236,236,241,.22)" strokeWidth=".4" strokeDasharray="6 3 1 3" />

        {/* Navigation lights */}
        <g data-fade>
          <circle cx="5" cy="226" r="1.7" fill="#ff4d4d" className="blink" />
          <circle cx="195" cy="226" r="1.7" fill="#4dff9a" className="blink" style={{ animationDelay: ".7s" }} />
        </g>
      </g>

      {/* Callouts */}
      <g data-fade stroke="rgba(236,236,241,.5)" strokeWidth=".5">
        {callouts.map((c) => {
          const [ax, ay] = c.pts[0];
          const [lx, ly] = c.pts[c.pts.length - 1];
          const anchorEnd = c.side === "l";
          return (
            <g key={c.n}>
              <polyline points={poly(c.pts)} strokeOpacity={1.2} />
              <circle cx={ax} cy={ay} r="1.3" fill="#ececf1" stroke="none" />
              <text
                x={anchorEnd ? lx - 3 : lx + 3}
                y={ly + 1.7}
                fontSize="7.4"
                letterSpacing=".5"
                textAnchor={anchorEnd ? "end" : "start"}
                fill="rgba(236,236,241,.82)"
                stroke="none"
                style={mono}
              >
                <tspan fill="#ff6a2b">{c.n}</tspan>  {c.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* Dimension lines */}
      <g data-fade stroke="rgba(236,236,241,.3)" strokeWidth=".4">
        {/* wingspan */}
        <path d={`M${OX + 5} 234V330M${OX + 195} 234V330`} strokeDasharray="1.5 2" />
        <path d={`M${OX + 5} 322H${OX + 195}M${OX + 5} 319V325M${OX + 195} 319V325`} />
        <rect x={cx - 34} y="316" width="68" height="11" fill="#06070a" stroke="none" />
        <text x={cx} y="324.9" fontSize="6.4" letterSpacing="1" textAnchor="middle" fill="rgba(236,236,241,.75)" stroke="none" style={mono}>
          WINGSPAN
        </text>
        {/* length */}
        <path d={`M${OX + 198} 4H${DIM_X + 6}M${OX + 198} 298H${DIM_X + 6}`} strokeDasharray="1.5 2" />
        <path d={`M${DIM_X} 4V298M${DIM_X - 3} 4H${DIM_X + 3}M${DIM_X - 3} 298H${DIM_X + 3}`} />
        <rect x={DIM_X - 6} y="134" width="12" height="34" fill="#06070a" stroke="none" />
        <text x={DIM_X + 1} y="151" fontSize="6.4" letterSpacing="1" textAnchor="middle" fill="rgba(236,236,241,.75)" stroke="none" transform={`rotate(-90 ${DIM_X + 1} 151)`} style={mono}>
          LENGTH
        </text>
      </g>

      {/* Sheet notes */}
      <g data-fade fill="rgba(236,236,241,.5)" style={mono} fontSize="6.2" letterSpacing="1">
        <text x="2" y="6">FIG. 01 — GENERAL ARRANGEMENT</text>
        <text x="2" y="340">NOT TO SCALE</text>
      </g>
    </svg>
  );
}

/** Small outline jet for the loader runway and background flybys. Inherits `currentColor`. */
export function JetMark({
  className = "",
  flame = true,
}: {
  className?: string;
  flame?: boolean;
}) {
  return (
    <svg viewBox="0 0 200 340" className={className} fill="none" aria-hidden="true" style={{ overflow: "visible" }}>
      {flame &&
        [92, 108].map((x, i) => (
          <line
            key={x}
            className="jet-flame"
            style={{ animationDelay: `${i * 0.06}s` }}
            x1={x}
            y1="300"
            x2={x}
            y2="336"
            stroke="#ff7a3d"
            strokeWidth="5"
            strokeLinecap="round"
            strokeOpacity=".85"
          />
        ))}
      <path d={BODY} fill="rgba(255,255,255,.07)" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d={CANOPY} stroke="currentColor" strokeWidth="3.5" strokeOpacity=".7" />
      <path d="M100 112V290" stroke="currentColor" strokeWidth="2.5" strokeOpacity=".3" />
    </svg>
  );
}
