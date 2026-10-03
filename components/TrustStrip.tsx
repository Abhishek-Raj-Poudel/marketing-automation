const items = [
  "Handmade in small batches",
  "Free UK shipping over 40",
  "30-day returns",
  "4.9 average from 380 reviews",
  "Every stitch counted twice",
  "Plastic-free packaging",
  "Ships in 48 hours",
];

export function TrustStrip() {
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-bg py-5">
      <div
        className="marquee-track flex w-max gap-12 pr-12"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm font-medium text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
