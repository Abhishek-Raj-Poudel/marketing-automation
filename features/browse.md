# Browse & filter

Home, shop grid, category pages.

## Routes

- `/` — hero, featured products, category links, newsletter section
- `/shop` — full grid, category tabs, search
- `/collections/[category]` — products in one category

## Filter and search live in the URL

`/shop?category=bags&q=tote`. Server components read `searchParams`, filter
`data/products.ts`, render. No client filter state, no `useEffect` that fetches
nothing, no stale state when the user hits back.

Header search is a form that GETs `/shop`. It does not filter on the current
page — one code path for search, reachable from anywhere.

`searchParams` is a Promise in Next 16:

```ts
export default async function ShopPage(props: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await props.searchParams
}
```

## Categories are derived

`getCategories()` in `data/products.ts` returns the unique category list from the
products array. Nothing hand-maintains a category list, so adding a product with
a new category creates its own collection page and its own home link.

## Category matching

Collection slugs are the lowercased category name: "Baby Goods" → `/collections/baby-goods`.
Lookup maps slug back to category with a `find` over `getCategories()`; an
unknown slug calls `notFound()`.

## Empty results

Search with no matches renders a line of plain copy and a link back to `/shop`.
No illustration, no modal.

## Verify

`/shop?q=zzzz` → empty state. `/shop?category=bags` → that tab is marked current.
Back button after filtering restores the previous grid.
