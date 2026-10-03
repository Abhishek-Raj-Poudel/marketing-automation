"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Presentation-only. Deliberately separate from store/useStore.ts — the
// announcement bar is not customer data and must not ride along in the same
// persisted blob as the cart.
export const useUIStore = create<{ announcementSeen: boolean; hideAnnouncement: () => void }>()(
  persist(
    (set) => ({
      announcementSeen: false,
      hideAnnouncement: () => set({ announcementSeen: true }),
    }),
    { name: "ui", skipHydration: true },
  ),
);
