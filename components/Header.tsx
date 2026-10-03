"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { categories, slugify } from "@/data/products";

export function Header() {
  const count = useStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link href="/" className="display-serif text-xl text-ink">
          Loom &amp; Knot
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-body md:flex">
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/collections/${slugify(c)}`}
              className="hover:text-ink"
            >
              {c}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <form action="/shop" className="hidden sm:block">
            <input
              type="search"
              name="q"
              placeholder="Search"
              aria-label="Search products"
              className="h-9 w-40 border border-line rounded-[6px] bg-surface px-3 text-sm placeholder:text-muted focus:border-ink focus:outline-none"
            />
          </form>

          <Link
            href="/cart"
            className="relative text-sm text-ink"
            aria-label={`Cart, ${count} items`}
          >
            Cart
            {count > 0 && (
              <span className="tag absolute -right-3 -top-2 bg-yellow-bg text-yellow-ink">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
