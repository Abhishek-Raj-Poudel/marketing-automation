"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** One panel open at a time. Height animates via scrollHeight, so no fixed
 *  max-height guess and no janky clip. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="focus-ring flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-[0.9375rem] text-text"
              >
                {item.q}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-subtle text-text">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-300"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transitionTimingFunction: EASE,
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-10 pb-6 text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
