"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStore } from "@/store/useStore";
import { identifyCustomer } from "@/lib/tracking";

// One form, two surfaces: the home band and the popup. variant only changes
// the framing.
export function NewsletterForm({
  variant = "band",
}: {
  variant?: "band" | "popup";
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [done, setDone] = useState(false);
  const customer = useStore((s) => s.customer);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    useStore.getState().setCustomer({ email, firstName });
    identifyCustomer(useStore.getState().customer!);
    setDone(true);
  }

  const emailField = (
    <Input
      label="Email"
      type="email"
      autoComplete="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );

  const nameField = (
    <Input
      label="First name"
      autoComplete="given-name"
      name="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
  );

  const submit = (
    <Button type="submit" size="lg" className="w-full sm:w-auto">
      Subscribe
    </Button>
  );

  if (done || customer?.email) {
    return (
      <div className="card flex flex-col items-start gap-3 p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check size={20} />
        </span>
        <p className="text-lg font-semibold tracking-tight">You are on the list</p>
        <p className="text-sm text-muted">
          Restock notices go to{" "}
          <span className="font-mono text-text">{customer?.email ?? email}</span>.
        </p>
      </div>
    );
  }

  if (variant === "popup") {
    return (
      <div className="grid sm:grid-cols-[1fr_1.1fr]">
        <div className="relative hidden min-h-[420px] bg-subtle sm:block">
          <Image
            src="https://picsum.photos/seed/popup-studio/600/800"
            alt=""
            fill
            sizes="240px"
            className="object-cover"
          />
        </div>
        <form onSubmit={onSubmit} className="p-8">
          <p className="eyebrow">One note a month</p>
          <p className="heading-lg mt-3 text-2xl">New stock, once a month.</p>
          <p className="mt-3 text-sm text-muted">
            Restock notices and the occasional pattern. Nothing else.
          </p>
          <div className="mt-6 space-y-4">
            {nameField}
            {emailField}
          </div>
          <div className="mt-6">{submit}</div>
        </form>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center"
    >
      <div className="grid w-full gap-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end">
        {nameField}
        {emailField}
        <div className="sm:pb-0.5">{submit}</div>
      </div>
      <p className="text-sm text-muted">
        Restock notices and the occasional pattern. Unsubscribe in one click.
      </p>
    </form>
  );
}
