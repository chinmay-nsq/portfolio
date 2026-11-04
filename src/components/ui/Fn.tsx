/** A footnote marker that jumps to the fine print at the bottom of the page. */
export default function Fn({ n }: { n: number }) {
  return (
    <a href={`#fn-${n}`} className="fn" aria-label={`Footnote ${n}`}>
      {n}
    </a>
  );
}
