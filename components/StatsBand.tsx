const stats = [
  { n: "2,400+", label: "Pieces made" },
  { n: "4.9", label: "Average rating" },
  { n: "48h", label: "Dispatch time" },
  { n: "100%", label: "Plastic-free packaging" },
];

export function StatsBand() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-semibold tracking-tight">
            {s.n}
          </p>
          <p className="mt-3 text-xs font-medium tracking-[0.08em] text-inverse-text/60 uppercase">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
