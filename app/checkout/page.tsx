"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import {
  emptyCustomer,
  linesOf,
  newOrderId,
  totalOf,
  useStore,
} from "@/store/useStore";
import {
  identifyCustomer,
  trackPlacedOrder,
  trackStartedCheckout,
} from "@/lib/tracking";
import { formatPrice } from "@/lib/utils";

const COUNTRIES = [
  "United Kingdom",
  "United States",
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
    const s = useStore.getState();
    trackStartedCheckout(s.items, s.customer);
  }, []);

  if (lines.length === 0) {
    return (
      <div className="container py-28 text-center">
        <h1 className="heading-lg">There is nothing to check out</h1>
        <Button href="/shop" size="lg" className="mt-8">
          Shop now
        </Button>
      </div>
    );
  }

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const v = (k: string) => String(form.get(k) ?? "").trim();

    const customer = {
      ...emptyCustomer(),
      email: v("email"),
      firstName: v("firstName"),
      lastName: v("lastName"),
      address: v("address"),
    };
    const shipping = `${v("address")}, ${v("city")}, ${v("postalCode")}, ${v("country")}`;

    const order = {
      id: newOrderId(),
      items: useStore.getState().items,
      total,
      customer: { ...customer, address: shipping },
      createdAt: new Date().toISOString(),
    };

    const store = useStore.getState();
    store.setCustomer(customer);
    identifyCustomer(order.customer);
    store.placeOrder(order);
    trackPlacedOrder(order);
    store.clear();

    router.push(`/order/${order.id}`);
  }

  return (
    <Section>
      <p className="eyebrow">Checkout</p>
      <h1 className="heading-xl mt-4">Almost there</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
        <form onSubmit={placeOrder} className="space-y-6">
          <fieldset className="card p-7">
            <legend className="px-2 text-sm font-semibold tracking-tight">
              Contact
            </legend>
            <Input
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              defaultValue={saved?.email}
              className="mt-4"
            />
          </fieldset>

          <fieldset className="card p-7">
            <legend className="px-2 text-sm font-semibold tracking-tight">
              Shipping
            </legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Input
                label="First name"
                name="firstName"
                autoComplete="given-name"
                defaultValue={saved?.firstName}
              />
              <Input
                label="Last name"
                name="lastName"
                autoComplete="family-name"
                defaultValue={saved?.lastName}
              />
              <Input
                label="Address"
                name="address"
                autoComplete="street-address"
                className="sm:col-span-2"
              />
              <Input label="City" name="city" autoComplete="address-level2" />
              <Input
                label="Postal code"
                name="postalCode"
                autoComplete="postal-code"
              />
              <Select
                label="Country"
                name="country"
                autoComplete="country-name"
                className="sm:col-span-2"
              >
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>
          </fieldset>

          <div>
            <Button type="submit" size="lg">
              Place order
              <ArrowRight size={17} />
            </Button>
            <p className="mt-3 text-sm text-muted">
              No payment is taken. This creates a mock order in your browser.
            </p>
          </div>
        </form>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="card p-7">
            <p className="eyebrow">Order summary</p>
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
                  <span className="min-w-0 flex-1 truncate text-sm text-text">
                    {line.product.name}
                    <span className="ml-2 font-mono text-xs text-muted">
                      {line.quantity}&times;
                    </span>
                  </span>
                  <span className="font-mono text-sm">
                    {formatPrice(line.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between border-t border-line pt-4">
              <span className="font-semibold tracking-tight">Total</span>
              <span className="font-mono font-semibold">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
