"use client";

export function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-line rounded-[6px] bg-surface">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.min(99, Math.max(1, value - 1)))}
        className="h-8 w-8 text-muted hover:text-ink"
      >
        &minus;
      </button>
      <span className="w-9 text-center font-mono text-sm text-ink">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(99, Math.max(1, value + 1)))}
        className="h-8 w-8 text-muted hover:text-ink"
      >
        +
      </button>
    </div>
  );
}
