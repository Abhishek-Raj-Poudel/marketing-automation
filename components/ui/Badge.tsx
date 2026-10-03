import type { ReactNode } from "react";

const tone = {
  neutral: "bg-subtle text-muted",
  accent: "bg-accent-soft text-accent",
} as const;

export function Badge({
  children,
  tone: t = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof tone;
}) {
  return <span className={`badge ${tone[t]}`}>{children}</span>;
}
