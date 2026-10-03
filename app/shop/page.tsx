import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { TrackCollectionView } from "@/components/Trackers";
import {
  categories,
  getCategoryFromSlug,
  search,
  slugify,
} from "@/data/products";

export const metadata = { title: "Shop — Loom & Knot" };

export default async function ShopPage(props: PageProps<"/shop">) {
  const sp = await props.searchParams;
  const rawCategory = typeof sp.category === "string" ? sp.category : undefined;
  const term = typeof sp.q === "string" ? sp.q : "";

  const category = rawCategory
    ? getCategoryFromSlug(rawCategory)
    : undefined;

  const found = search(term);
  const list = category
    ? found.filter((p) => p.category === category)
    : found;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <p className="eyebrow">{found.length} products</p>
        <h1 className="display-serif mt-3 text-4xl text-ink">Shop</h1>
        {term && (
          <p className="mt-3 text-sm text-muted">
            Matching &ldquo;{term}&rdquo;
          </p>
        )}
      </Reveal>

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-line pb-6">
        <Tab href={term ? `/shop?q=${encodeURIComponent(term)}` : "/shop"} active={!category}>
          All
        </Tab>
        {categories.map((c) => (
          <Tab
            key={c}
            href={`/shop?category=${slugify(c)}${
              term ? `&q=${encodeURIComponent(term)}` : ""
            }`}
            active={category === c}
          >
            {c}
          </Tab>
        ))}
      </nav>

      {category && <TrackCollectionView category={category} />}

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-body">Nothing matches that.</p>
          <Link href="/shop" className="mt-3 inline-block text-sm text-muted underline">
            See everything
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} index={i % 4}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "tag bg-ink text-surface"
          : "tag border border-line text-muted hover:text-ink"
      }
    >
      {children}
    </Link>
  );
}
