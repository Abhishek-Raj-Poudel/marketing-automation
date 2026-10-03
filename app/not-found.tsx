import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 text-center md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="heading-lg mt-4">We could not find that page</h1>
      <p className="mx-auto prose-measure mt-4 text-text/70">
        The link may be old, or the piece may have sold out and been retired.
      </p>
      <Button href="/shop" size="lg" className="mt-8">
        Shop now
      </Button>
    </div>
  );
}
