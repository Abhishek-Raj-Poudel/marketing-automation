import Link from "next/link";
import { Section } from "@/components/ui/Section";
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
  const raw = typeof sp.category === "string" ? sp.category : undefined;
  const term = typeof sp.q === "string" ? sp.q : "";

  const category = raw ? getCategoryFromSlug(raw) : undefined;
  const found = search(term);
  const list = category ? found.filter((p) => p.category === category) : found;

  return (
    <Section>
      <Reveal>
        <h1 className="heading-xl">Shop</h1>
        {term ? (
          <p className="mt-4 text-text/70">
            Matching &ldquo;{term}&rdquo; &mdash; {list.length} of {found.length}{" "}
            products
          </p>
        ) : (
          <p className="mt-4 text-text/70">{found.length} products</p>
        )}
      </Reveal>

      <nav className="mt-10 flex flex-wrap gap-2 border-b border-line pb-6">
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
        <div className="py-28 text-center">
          <p className="text-lg text-text">Nothing matches that.</p>
          <Link
            href="/shop"
            className="focus-ring mt-3 inline-block rounded-focus text-muted underline underline-offset-4 hover:text-text"
          >
            See everything
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} index={i % 4}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
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
          ? "badge focus-ring bg-text text-inverse-text"
          : "badge focus-ring border border-line text-muted hover:border-text hover:text-text"
      }
    >
      {children}
    </Link>
  );
}
