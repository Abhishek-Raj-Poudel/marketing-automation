import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const tagColor: Record<string, string> = {
  Bags: "bg-blue-bg text-blue-ink",
  Flowers: "bg-green-bg text-green-ink",
  Amigurumi: "bg-yellow-bg text-yellow-ink",
  Keychains: "bg-red-bg text-red-ink",
  Baby: "bg-green-bg text-green-ink",
  Custom: "bg-blue-bg text-blue-ink",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-4/3 overflow-hidden bg-bone">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className={`tag self-start ${tagColor[product.category]}`}>
          {product.category}
        </span>

        <h3 className="text-base leading-snug text-ink">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        <p className="mt-auto font-mono text-sm text-muted">
          {formatPrice(product.price)}
        </p>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
