import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    eyebrow: "Made by hand",
    title: "Every piece is one person, one afternoon",
    body: "A bag takes about four hours. That is why batches are small and sell through — we would rather make fewer things properly than hold stock of things we rushed.",
    chips: ["Totes", "Pouches", "Straps"],
    href: "/collections/bags",
    cta: "Explore bags",
    seed: "studio-bench",
    flip: false,
  },
  {
    eyebrow: "Gifts that last",
    title: "Flowers that need no water and no bin",
    body: "Dried crochet stems hold their shape for years. A birthday present that cannot be forgotten in a fortnight, and cannot be killed by an overenthusiastic recipient.",
    chips: ["Bouquets", "Single stems", "Pots"],
    href: "/collections/flowers",
    cta: "Explore flowers",
    seed: "studio-flowers",
    flip: true,
  },
  {
    eyebrow: "Small things",
    title: "Keychains, and other reasons to buy a second one",
    body: "Three for the price of two is our standing offer. They are the cheapest thing we make and the first thing anyone notices.",
    chips: ["Keychains", "Sets of three", "Under 20"],
    href: "/collections/keychains",
    cta: "Explore keychains",
    seed: "studio-small",
    flip: false,
  },
];

export function FeatureSections() {
  return (
    <>
      {sections.map((s) => (
        <div
          key={s.href}
          className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-16 md:py-14"
        >
          <div className={s.flip ? "md:order-2" : ""}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-subtle">
              <Image
                src={`https://picsum.photos/seed/${s.seed}/1200/900`}
                alt="A workbench in the studio"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className={s.flip ? "md:order-1" : ""}>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 className="heading-lg mt-3">{s.title}</h2>
            <p className="prose-measure mt-4 text-text/70">{s.body}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {s.chips.map((chip) => (
                <li key={chip}>
                  <Link
                    href={`/shop?q=${encodeURIComponent(chip)}`}
                    className="badge focus-ring bg-subtle text-text/70 hover:bg-accent-soft hover:text-accent"
                  >
                    {chip}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={s.href}
              className="focus-ring group mt-7 inline-flex items-center gap-1.5 rounded-focus font-medium underline-offset-4 hover:underline"
            >
              {s.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
