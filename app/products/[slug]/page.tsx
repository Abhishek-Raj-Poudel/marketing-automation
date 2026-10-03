import Image from "next/image";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { TrackProductView } from "@/components/Trackers";
import { getProduct, getRelated, slugify } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  return { title: product ? `${product.name} — Loom & Knot` : "Not found" };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <Section>
      <TrackProductView product={product} />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-subtle">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="lg:sticky lg:top-28">
            <Link
              href={`/collections/${slugify(product.category)}`}
              className="badge focus-ring bg-accent-soft text-accent hover:opacity-80"
            >
              {product.category}
            </Link>

            <h1 className="heading-lg mt-5">{product.name}</h1>

            <p className="mt-4 font-mono text-lg text-text">
              {formatPrice(product.price)}
            </p>

            <p className="prose-measure mt-6 text-text/70">{product.description}</p>

            <AddToCart product={product} />

            <dl className="mt-10 space-y-3 border-t border-line pt-6 text-sm">
              {[
                ["Made in", "Bristol, in batches of twenty"],
                ["Materials", "Cotton, canvas, tapestry yarn"],
                ["Dispatch", "Within 48 hours"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium text-text">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="heading-md">More {product.category.toLowerCase()}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} index={i}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </Section>
  );
}
