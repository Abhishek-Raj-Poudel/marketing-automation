"use client";

import { useEffect, useRef } from "react";
import { trackViewedCollection, trackViewedProduct } from "@/lib/tracking";
import type { Product } from "@/data/products";

export function TrackProductView({ product }: { product: Product }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewedProduct(product);
  }, [product]);
  return null;
}

export function TrackCollectionView({ category }: { category: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewedCollection(category);
  }, [category]);
  return null;
}
