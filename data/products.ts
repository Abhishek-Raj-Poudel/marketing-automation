export type Category =
  | "Bags"
  | "Flowers"
  | "Amigurumi"
  | "Keychains"
  | "Baby"
  | "Custom";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "market-tote-ochre",
    name: "Market Tote, Ochre",
    category: "Bags",
    price: 68,
    description:
      "Bulky cotton canvas with a chunky crochet handle. Holds a laptop and a market haul. Unlined, so it creases the way canvas does.",
    image: "https://picsum.photos/seed/market-tote-ochre/1200/800",
    featured: true,
  },
  {
    id: "p02",
    slug: "crossbody-pouch-clay",
    name: "Crossbody Pouch, Clay",
    category: "Bags",
    price: 42,
    description:
      "Small enough for a phone and keys, structured enough to stand up on a table. Adjustable strap, brass clasp.",
    image: "https://picsum.photos/seed/crossbody-pouch-clay/1200/800",
    featured: false,
  },
  {
    id: "p03",
    slug: "tote-strap-natural",
    name: "Tote Strap, Natural",
    category: "Bags",
    price: 26,
    description:
      "Detachable strap that turns a market tote into a shoulder bag. Sold separately, fits any of our totes.",
    image: "https://picsum.photos/seed/tote-strap-natural/1200/800",
    featured: false,
  },
  {
    id: "p04",
    slug: "dried-bouquet-bone",
    name: "Dried Bouquet, Bone",
    category: "Flowers",
    price: 54,
    description:
      "Cream and oatmeal crochet stems, wired and wired tight. They hold their shape for years and need no water.",
    image: "https://picsum.photos/seed/dried-bouquet-bone/1200/800",
    featured: true,
  },
  {
    id: "p05",
    slug: "single-stem-rose-dust",
    name: "Single Stem Rose, Dust",
    category: "Flowers",
    price: 18,
    description:
      "One rose on a straight stem, muted pink. Usually bought three at a time for a small arrangement.",
    image: "https://picsum.photos/seed/single-stem-rose-dust/1200/800",
    featured: false,
  },
  {
    id: "p06",
    slug: "pothos-vine-pot",
    name: "Pothos Vine in Pot",
    category: "Flowers",
    price: 38,
    description:
      "Crocheted leaves trailing over a small clay pot. Decorative only — it will not survive being watered for real.",
    image: "https://picsum.photos/seed/pothos-vine-pot/1200/800",
    featured: false,
  },
  {
    id: "p07",
    slug: "bear-scout-sand",
    name: "Bear Scout, Sand",
    category: "Amigurumi",
    price: 46,
    description:
      "Twelve centimetres of a bear in a knit scout hat. Stiff enough to sit upright, which is the whole point.",
    image: "https://picsum.photos/seed/bear-scout-sand/1200/800",
    featured: true,
  },
  {
    id: "p08",
    slug: "fox-with-scarf-rust",
    name: "Fox with Scarf, Rust",
    category: "Amigurumi",
    price: 40,
    description:
      "Pointed ears, a scarf that stays put, and a tail roughly the size of the fox itself. Machine washable on cold.",
    image: "https://picsum.photos/seed/fox-with-scarf-rust/1200/800",
    featured: false,
  },
  {
    id: "p09",
    slug: "mushroom-desk-cork",
    name: "Mushroom, Desk Cork",
    category: "Amigurumi",
    price: 28,
    description:
      "Eight centimetres tall, weighted base so it does not tip over a keyboard. Sold as a set of three.",
    image: "https://picsum.photos/seed/mushroom-desk-cork/1200/800",
    featured: false,
  },
  {
    id: "p10",
    slug: "hearts-keychain-set",
    name: "Hearts Keychain, Set of 3",
    category: "Keychains",
    price: 16,
    description:
      "Three small hearts in rust, bone and sage on split rings. Roughly the size of a coin.",
    image: "https://picsum.photos/seed/hearts-keychain-set/1200/800",
    featured: false,
  },
  {
    id: "p11",
    slug: "lemon-keychain",
    name: "Lemon Keychain",
    category: "Keychains",
    price: 14,
    description:
      "One lemon, one ring, unreasonably cheerful on a set of keys. Made in batches of fifty.",
    image: "https://picsum.photos/seed/lemon-keychain/1200/800",
    featured: false,
  },
  {
    id: "p12",
    slug: "stroller-chain-moss",
    name: "Stroller Chain, Moss",
    category: "Baby",
    price: 32,
    description:
      "Twenty-two linked rings for a pram or a highchair clasp. Cotton cord, wooden clasp, no small loose parts.",
    image: "https://picsum.photos/seed/stroller-chain-moss/1200/800",
    featured: true,
  },
  {
    id: "p13",
    slug: "baby-blanket-waffle",
    name: "Baby Blanket, Waffle",
    category: "Baby",
    price: 78,
    description:
      "Open waffle stitch, cotton, roughly a metre square. Light enough to fold into a bag without creasing.",
    image: "https://picsum.photos/seed/baby-blanket-waffle/1200/800",
    featured: false,
  },
  {
    id: "p14",
    slug: "custom-commission",
    name: "Custom Commission",
    category: "Custom",
    price: 120,
    description:
      "A starting price for something we have not made yet. Send a reference photo and a week you need it by; we will say whether it is possible.",
    image: "https://picsum.photos/seed/custom-commission/1200/800",
    featured: false,
  },
  {
    id: "p15",
    slug: "name-banner-slate",
    name: "Name Banner, Slate",
    category: "Custom",
    price: 24,
    description:
      "Any name, any of five letters, crocheted flat and mounted on a card. Choose the thread colour at checkout.",
    image: "https://picsum.photos/seed/name-banner-slate/1200/800",
    featured: false,
  },
];

export const categories: Category[] = [
  ...new Set(products.map((p) => p.category)),
];

export function slugify(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryFromSlug(slug: string): Category | undefined {
  return categories.find((c) => slugify(c) === slug);
}

export function getByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameCategory = getByCategory(product.category).filter(
    (p) => p.id !== product.id,
  );
  return [...sameCategory]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}

export function search(term: string): Product[] {
  const q = term.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
  );
}
