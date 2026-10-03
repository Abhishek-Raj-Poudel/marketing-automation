"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { emptyCustomer, linesOf, newOrderId, totalOf, useStore } from "@/store/useStore";
import { identifyCustomer, trackPlacedOrder, trackStartedCheckout } from "@/lib/tracking";
import { formatPrice } from "@/lib/utils";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Ireland",
  "Australia",
  "New Zealand",
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useStore((s) => s.items);
  const saved = useStore((s) => s.customer);
  const fired = useRef(false);

  const lines = linesOf(items);
  const total = totalOf(items);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackStartedCheckout(useStore.getState().items, useStore.getState().customer);
  }, []);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-32 text-center">
        <h1 className="display-serif text-3xl text-ink">
          There is nothing to check out
        </h1>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center border border-line px-5 text-sm text-ink hover:border-ink"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const value = (k: string) => String(form.get(k) ?? "").trim();

    const customer = {
      ...emptyCustomer(),
      email: value("email"),
      firstName: value("firstName"),
      lastName: value("lastName"),
      address: value("address"),
    };
    const city = value("city");
    const postalCode = value("postalCode");
    const country = value("country");

    const order = {
      id: newOrderId(),
      items: useStore.getState().items,
      total,
      customer: { ...customer, address: `${customer.address}, ${city}, ${postalCode}, ${country}` },
      createdAt: new Date().toISOString(),
    };

    const store = useStore.getState();
    store.setCustomer(customer);
    identifyCustomer({ ...customer, address: order.customer.address });
    store.placeOrder(order);
    trackPlacedOrder(order);
    store.clear();

    router.push(`/order/${order.id}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="display-serif text-4xl text-ink">Checkout</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={placeOrder}>
          <p className="eyebrow">Contact</p>
          <Field name="email" label="Email" type="email" autoComplete="email" defaultValue={saved?.email} className="mt-4" />

          <p className="eyebrow mt-10">Shipping</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field name="firstName" label="First name" autoComplete="given-name" defaultValue={saved?.firstName} />
            <Field name="lastName" label="Last name" autoComplete="family-name" defaultValue={saved?.lastName} />
          </div>
          <Field name="address" label="Address" autoComplete="street-address" className="mt-4" />

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field name="city" label="City" autoComplete="address-level2" />
            <Field name="postalCode" label="Postal code" autoComplete="postal-code" />
            <label className="block">
              <span className="eyebrow">Country</span>
              <select name="country" required autoComplete="country-name" className="field field-focus mt-2">
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="btn-primary btn-primary-hover mt-10 h-12 px-6 text-sm">
            Place order
          </button>
          <p className="mt-3 text-xs text-muted">
            No payment is taken. This creates a mock order in your browser.
          </p>
        </form>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="card p-8">
            <p className="eyebrow">Order summary</p>
            <ul className="mt-6 space-y-4">
              {lines.map((line) => (
                <li key={line.productId} className="flex items-center gap-3">
                  <span className="h-12 w-12 shrink-0 overflow-hidden rounded-[6px] bg-bone">
                    <img src={line.product.image} alt={line.product.name} className="h-full w-full object-cover opacity-90" />
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
              <span className="font-mono text-ink">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  className = "",
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow">{label}</span>
      <input required {...props} className="field field-focus mt-2" />
    </label>
  );
}
