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
  variant?: "band" | "popup" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const customer = useStore((s) => s.customer);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Could not subscribe. Try again.");
        return;
      }
      useStore.getState().setCustomer({ email, firstName });
      identifyCustomer(useStore.getState().customer!);
      setDone(true);
    } catch {
      setError("Network error. Check your connection and retry.");
    } finally {
      setPending(false);
    }
  }

  const emailField = (
    <Input
      label="Email"
      type="email"
      autoComplete="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={error ?? undefined}
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
    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
      {pending ? "Subscribing…" : "Subscribe"}
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
          <p className="heading-lg text-2xl">New stock, once a month.</p>
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

  if (variant === "footer") {
    return (
      <form onSubmit={onSubmit} className="mt-6">
        <p className="text-sm font-semibold tracking-tight text-inverse-text">
          Get the monthly note
        </p>
        <p className="mt-1 text-sm text-inverse-text/60">
          Restock notices, one email a month.
        </p>
        <div className="mt-4 flex items-end gap-2">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            name="email"
            tone="dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
            className="min-w-0 flex-1"
          />
          <Button type="submit" variant="light" size="lg" className="shrink-0" disabled={pending}>
            {pending ? "Joining…" : "Join"}
          </Button>
        </div>
      </form>
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
