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
    <div className="mx-auto max-w-6xl px-5 py-16">
      <TrackProductView product={product} />

      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="card overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover opacity-90"
            />
          </div>
        </Reveal>

        <Reveal index={1}>
          <Link
            href={`/collections/${slugify(product.category)}`}
            className="tag bg-blue-bg text-blue-ink hover:opacity-80"
          >
            {product.category}
          </Link>
          <h1 className="display-serif mt-5 text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
            {product.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-body">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 max-w-prose text-body">{product.description}</p>
          <AddToCart product={product} />
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow">More {product.category.toLowerCase()}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} index={i}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
