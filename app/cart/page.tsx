"use client";

import Link from "next/link";
import { QuantityStepper } from "@/components/QuantityStepper";
import { linesOf, totalOf, useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useStore((s) => s.items);
  const lines = linesOf(items);
  const total = totalOf(items);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-32 text-center">
        <h1 className="display-serif text-3xl text-ink">Your cart is empty</h1>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center border border-line px-5 text-sm text-ink hover:border-ink"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="display-serif text-4xl text-ink">Cart</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
        <ul>
          {lines.map((line) => (
            <li
              key={line.productId}
              className="flex items-center gap-5 border-b border-line py-6 first:border-t"
            >
              <Link
                href={`/products/${line.product.slug}`}
                className="h-16 w-16 shrink-0 overflow-hidden rounded-[6px] bg-bone"
              >
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="h-full w-full object-cover opacity-90"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${line.product.slug}`}
                  className="block truncate text-ink hover:underline"
                >
                  {line.product.name}
                </Link>
                <p className="font-mono text-sm text-muted">
                  {formatPrice(line.product.price)} each
                </p>
              </div>

              <QuantityStepper
                value={line.quantity}
                onChange={(n) =>
                  useStore.getState().setQuantity(line.productId, n)
                }
              />

              <p className="w-24 text-right font-mono text-sm text-body">
                {formatPrice(line.lineTotal)}
              </p>

              <button
                onClick={() => useStore.getState().remove(line.productId)}
                className="text-sm text-muted underline hover:text-ink"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="card p-8">
            <p className="eyebrow">Summary</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">
                  {lines.length === 1 ? "1 item" : `${lines.length} items`}
                </dt>
                <dd className="font-mono text-body">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="text-ink">Subtotal</dt>
                <dd className="font-mono text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted">
              Shipping and tax are not calculated in this demo.
            </p>
            <Link
              href="/checkout"
              className="btn-primary btn-primary-hover mt-6 flex h-12 items-center justify-center text-sm"
            >
              Checkout
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
