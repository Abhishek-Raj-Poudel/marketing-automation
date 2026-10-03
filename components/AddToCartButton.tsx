"use client";

import { useState } from "react";
import { trackAddedToCart } from "@/lib/tracking";
import { useStore } from "@/store/useStore";
import type { Product } from "@/data/products";

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  function add() {
    useStore.getState().add(product.id, 1);
    trackAddedToCart(product, 1, useStore.getState().items);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={add}
      aria-label={`Add ${product.name} to cart`}
      className="mt-5 h-10 w-full border border-line text-sm text-ink transition-colors duration-200 hover:border-ink active:scale-[0.98]"
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
