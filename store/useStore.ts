"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/data/products";

export type CartItem = { productId: string; quantity: number };

export type Customer = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customer: Customer;
  createdAt: string;
};

type State = {
  items: CartItem[];
  customer: Customer | null;
  orders: Order[];
  add: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  setCustomer: (customer: Partial<Customer>) => void;
  clearCustomer: () => void;
  placeOrder: (order: Order) => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      items: [],
      customer: null,
      orders: [],

      add: (productId, quantity) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          return {
            items: existing
              ? s.items.map((i) =>
                  i.productId === productId
                    ? { ...i, quantity: clampQty(i.quantity + quantity) }
                    : i,
                )
              : [...s.items, { productId, quantity: clampQty(quantity) }],
          };
        }),

      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),

      setQuantity: (productId, quantity) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: clampQty(quantity) }
              : i,
          ),
        })),

      clear: () => set({ items: [] }),

      setCustomer: (customer) =>
        set((s) => ({ customer: { ...emptyCustomer(), ...s.customer, ...customer } })),

      clearCustomer: () => set({ customer: null }),

      placeOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: "store", skipHydration: true },
  ),
);

function clampQty(n: number) {
  return Math.min(99, Math.max(1, Math.round(n) || 1));
}

export const emptyCustomer = (): Customer => ({
  email: "",
  firstName: "",
  lastName: "",
  address: "",
});

export function newOrderId() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MA-${Date.now().toString(36).toUpperCase()}-${rand}`;
}

// Derived from the catalogue at render time. Nothing price-shaped is persisted:
// a stored total goes stale the moment a price is edited.
export function linesOf(items: CartItem[]) {
  return items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ ...item, product, lineTotal: product.price * item.quantity }] : [];
  });
}

export const totalOf = (items: CartItem[]) =>
  linesOf(items).reduce((sum, l) => sum + l.lineTotal, 0);
