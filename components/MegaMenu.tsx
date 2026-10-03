"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  categories,
  getFeatured,
  slugify,
  type Category,
} from "@/data/products";

const blurb: Record<Category, string> = {
  Bags: "Totes, pouches and straps",
  Flowers: "Dried stems that need no water",
  Amigurumi: "Small figures with stiff spines",
  Keychains: "Coin-sized, unreasonably cheerful",
  Baby: "Blankets and pram clips",
  Custom: "Send a reference, we will tell you",
};

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const featured = getFeatured().slice(0, 2);

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="focus-ring flex items-center gap-1.5 py-6 text-[0.9375rem] text-text hover:text-accent"
      >
        Shop
        <ChevronRight
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 w-[min(46rem,calc(100vw-3rem))] pt-1">
          <div className="card grid gap-8 p-8 shadow-card sm:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow">Categories</p>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/collections/${slugify(c)}`}
                      onClick={() => setOpen(false)}
                      className="focus-ring group block rounded-media outline-offset-4"
                    >
                      <span className="flex items-center gap-1.5 font-medium text-text group-hover:text-accent">
                        {c}
                        <ChevronRight
                          size={13}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {blurb[c]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-line sm:border-l sm:pl-8">
              <p className="eyebrow">Featured</p>
              <ul className="mt-5 space-y-5">
                {featured.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="focus-ring group flex gap-3 rounded-media outline-offset-4"
                    >
                      <Image
                        src={p.image}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-media object-cover"
                      />
                      <span>
                        <span className="block text-sm font-medium text-text group-hover:text-accent">
                          {p.name}
                        </span>
                        <span className="text-sm text-muted">{blurb[p.category]}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
