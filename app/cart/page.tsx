"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/QuantityStepper";
import { linesOf, totalOf, useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useStore((s) => s.items);
  const lines = linesOf(items);
  const total = totalOf(items);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-page px-5 py-28 text-center md:px-8">
        <h1 className="heading-lg">Your cart is empty</h1>
        <p className="mx-auto prose-measure mt-4 text-text/70">
          Nothing in here yet. The new batches go up on the first of the month.
        </p>
        <Button href="/shop" size="lg" className="mt-8">
          Shop now
          <ArrowRight size={17} />
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-20">
      <h1 className="heading-xl">Cart</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
        <ul>
          {lines.map((line) => (
            <li
              key={line.productId}
              className="flex flex-wrap items-center gap-4 border-b border-line py-6 first:border-t sm:gap-5"
            >
              <Link
                href={`/products/${line.product.slug}`}
                className="focus-ring relative h-20 w-20 shrink-0 overflow-hidden rounded-card bg-subtle"
              >
                <Image
                  src={line.product.image}
                  alt={line.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold tracking-tight">
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="focus-ring rounded-focus outline-offset-4 hover:text-accent"
                  >
                    {line.product.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted">{line.product.category}</p>
                <p className="mt-1 font-mono text-sm text-text/70">
                  {formatPrice(line.product.price)} each
                </p>
              </div>

              <QuantityStepper
                value={line.quantity}
                onChange={(n) => useStore.getState().setQuantity(line.productId, n)}
              />

              <p className="w-24 text-right font-mono text-text">
                {formatPrice(line.lineTotal)}
              </p>

              <button
                onClick={() => useStore.getState().remove(line.productId)}
                className="focus-ring rounded-focus text-sm text-muted underline-offset-4 hover:text-text hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="card p-7">
            <p className="eyebrow">Summary</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">
                  {lines.length === 1 ? "1 item" : `${lines.length} items`}
                </dt>
                <dd className="font-mono text-text/70">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-4">
                <dt className="text-lg font-semibold tracking-tight">Total</dt>
                <dd className="font-mono text-lg font-semibold">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-sm text-muted">
              Shipping and tax are not calculated in this demo.
            </p>

            <Button href="/checkout" size="lg" className="mt-6 w-full">
              Checkout
              <ArrowRight size={17} />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
