"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { use } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { linesOf, useStore } from "@/store/useStore";
import { formatDate, formatPrice } from "@/lib/utils";

export default function OrderPage(props: PageProps<"/order/[orderId]">) {
  const { orderId } = use(props.params);
  const order = useStore((s) => s.orders.find((o) => o.id === orderId));

  if (!order) {
    return (
      <div className="container py-28 text-center">
        <h1 className="heading-lg">Order not found</h1>
        <p className="mx-auto prose-measure mt-4 text-text/70">
          Orders are stored in this browser only, so a link opened on another
          device will not resolve.
        </p>
        <Button href="/shop" size="lg" className="mt-8">
          Shop now
        </Button>
      </div>
    );
  }

  const lines = linesOf(order.items);

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-focus bg-accent-soft text-accent">
          <Check size={28} />
        </span>
        <h1 className="heading-lg mt-6">Thank you</h1>
        <p className="mt-3 text-text/70">
          Placed {formatDate(order.createdAt)}
        </p>
        <p className="mt-6 inline-block rounded-focus bg-subtle px-5 py-2 font-mono text-sm tracking-tight">
          {order.id}
        </p>
      </div>

      <div className="card mt-12 p-7">
        <h2 className="heading-md">Items</h2>
        <ul className="mt-6 space-y-5">
          {lines.map((line) => (
            <li key={line.productId} className="flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-media bg-subtle">
                <Image
                  src={line.product.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">
                {line.product.name}
                <span className="ml-2 font-mono text-xs text-muted">
                  {line.quantity}&times;
                </span>
              </span>
              <span className="font-mono text-sm">{formatPrice(line.lineTotal)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between border-t border-line pt-4">
          <span className="font-semibold tracking-tight">Total</span>
          <span className="font-mono font-semibold">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="card mt-6 p-7">
        <h2 className="heading-md">Delivering to</h2>
        <address className="mt-4 text-sm not-italic leading-relaxed text-text/80">
          {order.customer.firstName} {order.customer.lastName}
          <br />
          {order.customer.email}
          <br />
          {order.customer.address}
        </address>
      </div>

      <div className="mt-8 text-center">
        <Button href="/shop" variant="secondary" size="lg">
          Continue shopping
        </Button>
        <p className="mt-6 text-sm text-muted">
          Demo order. Nothing was charged and nothing will be shipped.
        </p>
      </div>
      </div>
    </Section>
  );
}
