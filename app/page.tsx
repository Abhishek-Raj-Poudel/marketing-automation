import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Reveal } from "@/components/Reveal";
import { categories, getFeatured, slugify } from "@/data/products";

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 20% 10%, rgba(191,168,120,0.10), transparent 70%), radial-gradient(50% 50% at 85% 30%, rgba(120,140,150,0.07), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <Reveal>
            <p className="eyebrow">Made in small batches</p>
            <h1 className="display-serif mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
              Crocheted goods, one hook at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-body">
              Bags, dried flowers, amigurumi and keychains, made by hand in a
              back room in Bristol. Nothing here is moulded, and the stitch
              count varies a little, which is the point.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="btn-primary btn-primary-hover inline-flex h-12 items-center px-6 text-sm"
              >
                Shop all products
              </Link>
              <Link
                href="/collections/custom"
                className="inline-flex h-12 items-center border border-line px-6 text-sm text-ink hover:border-ink"
              >
                Commission something
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="display-serif mt-3 text-3xl text-ink">
              This month&rsquo;s batches
            </h2>
          </div>
          <Link href="/shop" className="hidden text-sm text-muted hover:text-ink sm:block">
            All products
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} index={i}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-bone">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <p className="eyebrow">Categories</p>
            <h2 className="display-serif mt-3 text-3xl text-ink">
              Start somewhere
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c} index={i}>
                <Link
                  href={`/collections/${slugify(c)}`}
                  className="card card-hover flex h-full flex-col justify-between p-8"
                >
                  <span className="display-serif text-2xl text-ink">{c}</span>
                  <span className="mt-8 text-sm text-muted">
                    Browse {c.toLowerCase()}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="max-w-2xl">
          <NewsletterForm />
        </Reveal>
      </section>
    </>
  );
}
