"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useUIStore } from "@/store/uiStore";

// persist runs with skipHydration, so the first client render matches the
// server HTML (empty cart). Filling the store right after mount keeps every
// consumer free of its own useHydrated() guard.
export function StoreHydration() {
  useEffect(() => {
    useStore.persist.rehydrate();
    useUIStore.persist.rehydrate();
  }, []);

  return null;
}
