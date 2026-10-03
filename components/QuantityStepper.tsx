"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-line bg-bg">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.min(99, Math.max(1, value - 1)))}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-text/70 hover:text-text"
      >
        <Minus size={15} />
      </button>
      <span className="w-10 text-center font-mono text-sm text-text">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(99, Math.max(1, value + 1)))}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-text/70 hover:text-text"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
