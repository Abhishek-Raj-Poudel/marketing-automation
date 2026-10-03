"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export function AnnouncementBar() {
  // useSyncExternalStore, not an effect: the server snapshot is `false`, so
  // there is no hydration mismatch and no setState-in-effect cascade.
  const seen = useSyncExternalStore(
    (cb) => useUIStore.subscribe(cb),
    () => useUIStore.getState().announcementSeen,
    () => false,
  );
  const [gone, setGone] = useState(false);

  const visible = !seen && !gone;

  function dismiss() {
    setGone(true);
    useUIStore.getState().hideAnnouncement();
  }

  return (
    <div
      className="overflow-hidden bg-inverse text-inverse-text transition-[height] duration-300"
      style={{ height: visible ? 40 : 0 }}
    >
      <div className="relative mx-auto flex h-10 max-w-page items-center justify-center gap-3 px-5 text-sm">
        <p className="hidden sm:block">Free UK shipping over 40</p>
        <span aria-hidden className="hidden h-3 w-px bg-inverse-text/30 sm:block" />
        <a
          href="/shop"
          className="focus-ring inline-flex items-center gap-1.5 rounded-focus underline-offset-4 hover:underline"
        >
          Shop the new batches
          <ArrowRight size={14} />
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="focus-ring absolute right-4 flex h-7 w-7 items-center justify-center rounded-full text-inverse-text/70 hover:text-inverse-text md:right-8"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
