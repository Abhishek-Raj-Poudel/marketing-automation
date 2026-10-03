"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { categories, slugify, type Category } from "@/data/products";

const blurb: Record<Category, string> = {
  Bags: "Totes, pouches and straps",
  Flowers: "Dried stems that need no water",
  Amigurumi: "Small figures with stiff spines",
  Keychains: "Coin-sized, unreasonably cheerful",
  Baby: "Blankets and pram clips",
  Custom: "Send a reference, we will tell you",
};

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const items = [
        ...panel.current!.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled])',
        ),
      ];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="focus-ring flex h-10 w-10 items-center justify-center lg:hidden"
      >
        <MenuIcon />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-100 lg:hidden">
      <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        // One delegated handler closes the drawer for every link in it, so
        // none of them need an onClick of their own.
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-0 flex max-h-full flex-col overflow-y-auto bg-bg"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link href="/" className="text-lg font-semibold tracking-tight text-text">
            Loom &amp; Knot
          </Link>
          <button
            aria-label="Close menu"
            className="focus-ring flex h-10 w-10 items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-5 py-6">
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="focus-ring flex w-full items-center justify-between py-3 text-left text-lg font-semibold tracking-tight text-text"
          >
            Shop
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-300"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <ul className="overflow-hidden">
              <li className="border-b border-line">
                <Link
                  href="/shop"
                  className="block py-3 text-sm text-muted"
                >
                  All products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c} className="border-b border-line">
                  <Link
                    href={`/collections/${slugify(c)}`}
                    className="block py-3"
                  >
                    <span className="font-medium text-text">{c}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {blurb[c]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/collections/custom"
            className="block border-b border-line py-4 text-lg font-semibold tracking-tight text-text"
          >
            Custom orders
          </Link>
          <Link
            href="/cart"
            className="block border-b border-line py-4 text-lg font-semibold tracking-tight text-text"
          >
            Cart
          </Link>
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t border-line bg-bg p-5">
          <Button href="/shop" className="flex-1">
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
