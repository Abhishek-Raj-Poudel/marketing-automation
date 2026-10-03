"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";

const KEY = "nl-popup-seen";

export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLDivElement>(null);

  // Never interrupt a checkout.
  const eligible = !pathname.startsWith("/checkout");

  useEffect(() => {
    if (!eligible || localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, [eligible]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-ink/20 p-4 sm:items-center"
      onClick={dismiss}
    >
      <div
        ref={closeRef}
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted hover:text-ink"
        >
          <span aria-hidden>&times;</span>
        </button>
        <NewsletterForm variant="popup" />
      </div>
    </div>
  );
}
