import Link from "next/link";
// import { NewsletterForm } from "@/components/NewsletterForm";
import { categories, slugify } from "@/data/products";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      ...categories.map((c) => ({ label: c, href: `/collections/${slugify(c)}` })),
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "New batches", href: "/shop" },
      { label: "Under 30", href: "/shop?q=" },
      { label: "Custom commissions", href: "/collections/custom" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/shop" },
      { label: "Returns", href: "/shop" },
      { label: "Care", href: "/shop" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Your cart", href: "/cart" },
      { label: "Past orders", href: "/order/MA-DEMO" },
      { label: "Stockists", href: "/shop" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-inverse text-inverse-text">
      <div className="container py-section">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <p className="text-lg font-semibold tracking-tight">Loom &amp; Knot</p>
            <p className="mt-4 max-w-sm text-sm text-inverse-text/70">
              Crocheted goods made in small batches in a back room in Bristol.
              No moulds, no two pieces identical.
            </p>
            {/* Klaviyo onsite form — replaces the custom form for now */}
            <div className="klaviyo-form-RX6nLC" />

            {/* <NewsletterForm variant="footer" /> */}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold tracking-[0.08em] text-inverse-text/50 uppercase">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="focus-ring rounded-focus text-inverse-text/75 hover:text-inverse-text"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-inverse-text/15 pt-8 text-sm text-inverse-text/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Demo storefront. No payment is taken and nothing is shipped.</p>
          <p className="flex gap-5">
            <Link href="/shop" className="hover:text-inverse-text">
              Privacy
            </Link>
            <Link href="/shop" className="hover:text-inverse-text">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
