"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// One observer for every block on the page. Stagger comes from --index, set by
// the caller, so a grid cascades without each item owning its own timer.
export function Reveal({
  index = 0,
  className = "",
  children,
}: {
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ "--index": index } as CSSProperties}
    >
      {children}
    </div>
  );
}
