import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { TrackCollectionView } from "@/components/Trackers";
import { getByCategory, getCategoryFromSlug } from "@/data/products";

export async function generateMetadata(props: PageProps<"/collections/[category]">) {
  const { category: slug } = await props.params;
  const category = getCategoryFromSlug(slug);
  return { title: category ? `${category} — Loom & Knot` : "Not found" };
}

export default async function CollectionPage(
  props: PageProps<"/collections/[category]">,
) {
  const { category: slug } = await props.params;
  const category = getCategoryFromSlug(slug);
  if (!category) notFound();

  const list = getByCategory(category);

  return (
    <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-20">
      <TrackCollectionView category={category} />

      <Reveal>
        <p className="eyebrow">Collection</p>
        <h1 className="heading-xl mt-4">{category}</h1>
        <p className="mt-4 max-w-prose text-text/70">
          {list.length} pieces, all made to order in small batches.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.id} index={i % 4}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
