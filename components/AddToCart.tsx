"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
    <div className="mt-9 flex flex-wrap items-center gap-4">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <Button onClick={add} size="lg">
        <ShoppingBag size={17} />
        Add to cart
      </Button>
    </div>
  );
}
