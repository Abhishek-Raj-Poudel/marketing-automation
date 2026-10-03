"use client";

import Link from "next/link";
import { use } from "react";
import { linesOf, useStore } from "@/store/useStore";
import { formatDate, formatPrice } from "@/lib/utils";

export default function OrderPage(props: PageProps<"/order/[orderId]">) {
  const { orderId } = use(props.params);
  const order = useStore((s) => s.orders.find((o) => o.id === orderId));

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-32 text-center">
        <h1 className="display-serif text-3xl text-ink">Order not found</h1>
        <p className="mt-3 text-sm text-muted">
          Orders are stored in this browser only, so a link opened on another
          device will not resolve.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center border border-line px-5 text-sm text-ink hover:border-ink"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  const lines = linesOf(order.items);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Order confirmed</p>
      <h1 className="mt-3 font-mono text-3xl text-ink">{order.id}</h1>
      <p className="mt-2 text-sm text-muted">
        Placed {formatDate(order.createdAt)}
      </p>

      <div className="card mt-10 p-8">
        <p className="eyebrow">Items</p>
        <ul className="mt-4 space-y-4">
          {lines.map((line) => (
            <li key={line.productId} className="flex items-center gap-4">
              <span className="h-14 w-14 shrink-0 overflow-hidden rounded-[6px] bg-bone">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="h-full w-full object-cover opacity-90"
                />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-body">
                {line.product.name}
                <span className="ml-2 font-mono text-xs text-muted">
                  {line.quantity}&times;
                </span>
              </span>
              <span className="font-mono text-sm text-body">
                {formatPrice(line.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between border-t border-line pt-4">
          <span className="text-ink">Subtotal</span>
          <span className="font-mono text-ink">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="card mt-5 p-8">
        <p className="eyebrow">Delivering to</p>
        <address className="mt-4 text-sm not-italic leading-relaxed text-body">
          {order.customer.firstName} {order.customer.lastName}
          <br />
          {order.customer.email}
          <br />
          {order.customer.address}
        </address>
      </div>

      <p className="mt-8 text-xs text-muted">
        Demo order. Nothing was charged and nothing will be shipped.
      </p>
    </div>
  );
}
