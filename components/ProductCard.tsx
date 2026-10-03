"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trackAddedToCart } from "@/lib/tracking";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const [loaded, setLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  function add() {
    useStore.getState().add(product.id, 1);
    trackAddedToCart(product, 1, useStore.getState().items);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group card card-lift flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-subtle">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-subtle" />}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Always visible on touch, reveals on hover where a pointer exists. */}
        <div className="absolute inset-x-3 bottom-3 lg:translate-y-2 lg:opacity-0 lg:transition-all lg:duration-200 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            onClick={add}
            aria-label={`Add ${product.name} to cart`}
            className="btn-base focus-ring h-11 w-full bg-bg text-sm font-semibold text-text shadow-card hover:bg-text hover:text-inverse-text"
          >
            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="text-xs font-medium tracking-[0.06em] text-muted uppercase">
          {product.category}
        </p>
        <h3 className="heading-md">
          <Link
            href={`/products/${product.slug}`}
            className="focus-ring rounded-focus outline-offset-4 hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-auto pt-2 font-mono text-sm text-text">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
