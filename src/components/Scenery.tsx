/**
 * A restrained sliver of Earth seen from altitude: near-black disk,
 * thin atmospheric rim, faint airglow. Meant to sit quietly behind content.
 */
export function EarthLimb({
  className = "",
  height = "34vh",
}: {
  className?: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="absolute left-1/2 top-[34%] aspect-square w-[190vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, #0e1a2e 0%, #0a1220 14%, #070b14 32%, #05070b 60%)",
          boxShadow:
            "0 -1px 0 0 rgba(190,215,240,.55), 0 -10px 40px 0 rgba(120,170,220,.16), inset 0 8px 30px rgba(130,175,225,.14)",
        }}
      />
      <div
        className="absolute inset-x-0 top-[14%] h-[30%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 100%, rgba(110,160,220,.12), transparent 70%)",
        }}
      />
    </div>
  );
}
