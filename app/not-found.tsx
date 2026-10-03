import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-serif mt-3 text-4xl text-ink">
        We could not find that page
      </h1>
      <p className="mt-4 text-body">
        The link may be old, or the product may have sold out and been retired.
      </p>
      <Link
        href="/shop"
        className="btn-primary btn-primary-hover mt-8 inline-flex h-12 items-center px-6 text-sm"
      >
        Go to shop
      </Link>
    </div>
  );
}
