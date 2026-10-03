import type { ReactNode } from "react";

/** Vertical rhythm + background variant. Every homepage band is one of these. */
export function Section({
  children,
  tone = "bg",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: "bg" | "subtle" | "inverse";
  id?: string;
  className?: string;
}) {
  const tones = {
    bg: "bg-bg text-text",
    subtle: "bg-subtle text-text",
    inverse: "bg-inverse text-inverse-text",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-section ${className}`}>
      <div className="mx-auto w-full max-w-page px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`heading-lg mt-3 ${align === "center" ? "" : ""}`}>{title}</h2>
      {lede && <p className="prose-measure mt-4 text-text/70">{lede}</p>}
    </div>
  );
}
