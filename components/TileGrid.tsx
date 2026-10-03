import Image from "next/image";
import Link from "next/link";
import { categories, slugify } from "@/data/products";

export function TileGrid() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((c) => (
        <Link
          key={c}
          href={`/collections/${slugify(c)}`}
          className="card card-lift group focus-ring flex flex-col items-center gap-3 p-6 text-center focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="relative h-16 w-16 overflow-hidden rounded-media bg-subtle">
            <Image
              src={`https://picsum.photos/seed/tile-${slugify(c)}/200/200`}
              alt=""
              fill
              sizes="64px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </span>
          <span className="text-sm font-medium text-text group-hover:text-accent">
            {c}
          </span>
        </Link>
      ))}
    </div>
  );
}
