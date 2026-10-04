import { logoByFile, techLogo } from "@/data/tech";

type Props = {
  /** Display name from the content data, e.g. "Next.js". Renders nothing if there is no logo. */
  name?: string;
  /** Alternatively, a file in /public/logos without the extension. */
  file?: string;
  className?: string;
  /** Force the brand colour (otherwise it lights up when a `.tech-group` ancestor is hovered). */
  lit?: boolean;
};

/**
 * Monochrome logo drawn from an SVG in /public/logos via CSS masking, so it inherits the
 * surrounding text colour and can take its brand colour on hover.
 */
export default function TechLogo({ name, file, className = "h-4 w-4", lit = false }: Props) {
  const data = name ? techLogo(name) : file ? logoByFile(file) : undefined;
  if (!data) return null;
  const url = `url(${data.src})`;
  return (
    <span
      aria-hidden="true"
      className={`tech-logo inline-block shrink-0 ${lit ? "is-lit" : ""} ${className}`}
      style={{ "--brand": `#${data.hex}`, WebkitMaskImage: url, maskImage: url } as React.CSSProperties}
    />
  );
}
