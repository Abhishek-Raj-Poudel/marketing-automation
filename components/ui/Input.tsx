"use client";

import { useId } from "react";

export function Input({
  label,
  error,
  hint,
  tone = "light",
  className = "",
  ...rest
}: {
  label: string;
  error?: string;
  hint?: string;
  tone?: "light" | "dark";
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const dark = tone === "dark";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`mb-2 block text-sm font-medium ${dark ? "text-inverse-text/80" : "text-text"}`}
      >
        {label}
      </label>
      <input
        id={id}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
        className="input-base"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className={`mt-2 text-sm ${dark ? "text-inverse-text/60" : "text-muted"}`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Select({
  label,
  className = "",
  children,
  ...rest
}: {
  label: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
        {label}
      </label>
      <select id={id} required {...rest} className="input-base">
        {children}
      </select>
    </div>
  );
}
