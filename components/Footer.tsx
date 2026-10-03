import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Bags", href: "/collections/bags" },
      { label: "Flowers", href: "/collections/flowers" },
      { label: "Amigurumi", href: "/collections/amigurumi" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Custom orders", href: "/collections/custom" },
      { label: "Cart", href: "/cart" },
      { label: "Shipping", href: "/shop" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-3">
        <div>
          <p className="display-serif text-lg text-ink">Loom &amp; Knot</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Crocheted goods made in small batches. Everything here was made by
            hand, which is why the stitch count varies a little.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-body hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted">
          Demo storefront. No orders are fulfilled and no payment is taken.
        </div>
      </div>
    </footer>
  );
}
