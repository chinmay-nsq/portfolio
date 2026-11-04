const NUM = /(\b\d[\d,.]*(?:\+|%|ms)?)/g;

/** Sets every metric in a sentence in full ink, so the numbers read on a skim. */
export default function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(NUM).map((part, i) =>
        i % 2 ? (
          <b key={i} className="font-semibold text-ink">
            {part}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}
