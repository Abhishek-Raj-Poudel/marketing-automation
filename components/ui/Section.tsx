import type { ReactNode } from "react";

/** Vertical rhythm + background variant. Every page band wraps in one of these. */
export function Section({
  children,
  tone = "bg",
  as = "section",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: "bg" | "subtle" | "inverse";
  as?: "section" | "div" | "footer" | "main";
  id?: string;
  className?: string;
}) {
  const tones = {
    bg: "bg-bg text-text",
    subtle: "bg-subtle text-text",
    inverse: "bg-inverse text-inverse-text",
  } as const;

  const Tag = as;

  return (
    <Tag id={id} className={`${tones[tone]} py-section ${className}`}>
      <div className="mx-auto w-full max-w-page px-5 md:px-8">{children}</div>
    </Tag>
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
      <h2 className="heading-lg mt-3">{title}</h2>
      {lede && <p className="prose-measure mt-4 text-text/70">{lede}</p>}
    </div>
  );
}
