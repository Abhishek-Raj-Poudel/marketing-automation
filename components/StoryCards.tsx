import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    title: "The Bristol makers",
    stat: "Six pairs of hands",
    body: "Everything here is crocheted in one room above a bike shop.",
    href: "/collections/custom",
    seed: "story-makers",
    cta: "Meet the studio",
  },
  {
    title: "Flowers that outlive the occasion",
    stat: "4 years, still upright",
    body: "A dried bouquet in a Bristol flat, bought for a 40th birthday.",
    href: "/collections/flowers",
    seed: "story-flowers",
    cta: "Shop flowers",
  },
  {
    title: "Commissions, start to finish",
    stat: "120+ custom orders",
    body: "Send a photo, get a quote in two days, worn or delivered.",
    href: "/collections/custom",
    seed: "story-custom",
    cta: "Commission something",
  },
];

export function StoryCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((s) => (
        <Link
          key={s.title}
          href={s.href}
          className="group focus-ring relative flex aspect-[2/3] flex-col justify-end overflow-hidden rounded-card bg-inverse focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Image
            src={`https://picsum.photos/seed/${s.seed}/800/1200`}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
          />
          <div className="relative p-6">
            <p className="text-xs font-semibold tracking-[0.08em] text-inverse-text/70 uppercase">
              {s.stat}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-inverse-text">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-inverse-text/75">{s.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-inverse-text">
              {s.cta}
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
