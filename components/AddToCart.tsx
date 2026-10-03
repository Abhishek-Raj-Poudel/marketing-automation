"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/QuantityStepper";
import { trackAddedToCart } from "@/lib/tracking";
import { useStore } from "@/store/useStore";
import type { Product } from "@/data/products";

export function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  function add() {
    useStore.getState().add(product.id, quantity);
    // Cart after the add, not before: cart value is the metric that matters.
    trackAddedToCart(product, quantity, useStore.getState().items);
    setQuantity(1);
  }

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <button
        onClick={add}
        className="btn-primary btn-primary-hover h-11 px-6 text-sm"
      >
        Add to cart
      </button>
    </div>
  );
}
