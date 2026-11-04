/** The "C1" chip: the launch-page hero object, drawn in CSS. */
export default function Chip({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      {/* soft light the chip sits in */}
      <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(closest-side,rgba(138,63,252,.18),rgba(43,69,240,.10)_55%,transparent)] blur-2xl" />

      {/* pins along each edge */}
      <div
        className="absolute inset-[-3.5%] rounded-[24%]"
        style={{
          background:
            "repeating-linear-gradient(90deg, #b9bcc6 0 2px, transparent 2px 9px) top / 70% 6px no-repeat, repeating-linear-gradient(90deg, #b9bcc6 0 2px, transparent 2px 9px) bottom / 70% 6px no-repeat, repeating-linear-gradient(0deg, #b9bcc6 0 2px, transparent 2px 9px) left / 6px 70% no-repeat, repeating-linear-gradient(0deg, #b9bcc6 0 2px, transparent 2px 9px) right / 6px 70% no-repeat",
        }}
      />

      {/* the package: a silver rim around a near-black die */}
      <div className="absolute inset-0 rounded-[22%] bg-[linear-gradient(145deg,#f4f4f6,#a7aab4_45%,#e7e8ec_70%,#8d909a)] p-[3px] shadow-[0_30px_60px_-30px_rgba(29,29,31,.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-[21%] bg-[linear-gradient(160deg,#2a2b31,#121216_60%,#1c1d22)]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "12.5% 12.5%",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.14),transparent_55%)]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-display text-[clamp(3.5rem,11vw,6.5rem)] font-semibold leading-none tracking-[-0.04em] text-[#ececf0]">
              C1
            </span>
            <span className="mt-2 text-[clamp(.7rem,1.6vw,.85rem)] font-medium uppercase tracking-[0.28em] text-[#9a9ca6]">Chinmay</span>
          </div>
          <span className="absolute bottom-[9%] left-0 right-0 text-center text-[clamp(.55rem,1.2vw,.68rem)] tracking-[0.18em] text-[#6d6f78]">
            FULL-STACK · PUNE · 2024
          </span>
        </div>
      </div>
    </div>
  );
}
