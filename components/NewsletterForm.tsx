"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { identifyCustomer } from "@/lib/tracking";

// One form, two surfaces: the home section and the popup. variant only changes
// the heading and the width.
export function NewsletterForm({
  variant = "section",
}: {
  variant?: "section" | "popup";
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

  if (done || customer?.email) {
    return (
      <div className="card p-8">
        <p className="display-serif text-xl text-ink">You are on the list.</p>
        <p className="mt-3 text-sm text-muted">
          We will write to{" "}
          <span className="font-mono text-body">{customer?.email ?? email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-8">
      <p className="eyebrow">
        {variant === "popup" ? "One note a month" : "Newsletter"}
      </p>
      <h2
        className={`display-serif mt-3 text-ink ${
          variant === "popup" ? "text-2xl" : "text-3xl"
        }`}
      >
        {variant === "popup"
          ? "New stock, once a month."
          : "Tell us when the next batch lands."}
      </h2>
      <p className="mt-3 text-sm text-muted">
        Restock notices and the occasional pattern. Nothing else.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">First name</span>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="field mt-2"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="field mt-2"
          />
        </label>
      </div>

      <button type="submit" className="btn-primary btn-primary-hover mt-6 h-11 px-5 text-sm">
        Subscribe
      </button>
    </form>
  );
}
