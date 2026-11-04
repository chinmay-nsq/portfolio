/** Thin line arrow that inherits the text colour, sized to the surrounding text. */
const paths = {
  right: "M3 8h10M9 4l4 4-4 4",
  "up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
  up: "M8 13V3M4 7l4-4 4 4",
  down: "M8 3v10M4 9l4 4 4-4",
} as const;

export default function Arrow({ dir = "right", className = "" }: { dir?: keyof typeof paths; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-[0.95em] w-[0.95em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[dir]} />
    </svg>
  );
}
