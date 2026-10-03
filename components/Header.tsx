"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { MobileDrawer } from "@/components/MobileDrawer";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/store/useStore";

export function Header() {
  const count = useStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const [scrolled, setScrolled] = useState(false);

  const sentinel = useRef<HTMLDivElement>(null);

  // Sentinel instead of a scroll listener: the header is sticky so it never
  // moves, but this 1px sibling does, and the browser does the work.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    if (sentinel.current) io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px" />
      <header
      className={`sticky top-0 z-100 bg-bg transition-shadow duration-200 ${
        scrolled ? "border-b border-line shadow-header" : ""
      }`}
    >
      <div className="container flex h-16 items-center gap-6">
        <Link href="/" className="focus-ring rounded-focus text-lg font-semibold tracking-tight text-text">
          Loom &amp; Knot
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <MegaMenu />
          <Link href="/collections/custom" className="focus-ring rounded-focus py-6 text-[0.9375rem] text-text hover:text-accent">
            Custom orders
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form action="/shop" className="hidden md:block">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                name="q"
                placeholder="Search"
                aria-label="Search products"
                className="focus-ring h-10 w-44 rounded-button border border-line bg-subtle pr-3 pl-9 text-sm transition-[width,background-color] duration-200 focus:w-56 focus:border-text focus:bg-bg focus:outline-none"
              />
            </div>
          </form>

          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-button text-text hover:bg-subtle"
          >
            <ShoppingBag size={19} strokeWidth={1.7} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-inverse-text">
                {count}
              </span>
            )}
          </Link>

          <div className="hidden lg:block">
            <Button href="/shop" variant="primary" size="sm">
              Shop now
            </Button>
          </div>

          <MobileDrawer />
        </div>
        </div>
      </header>
    </>
  );
}
