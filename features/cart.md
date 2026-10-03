# Cart

`/cart`

## Lines

Image (64px square), name, unit price in mono, quantity stepper, line total,
remove control. Rows separated by `border-bottom: 1px solid #EAEAEA`. No card
around the list — the table edge is the container.

Remove is a plain text button labelled `Remove`, not a bin icon. An icon-only
delete on a row of items is a misclick waiting to happen.

## Totals

Derived on render from `items` + `data/products.ts`. Subtotal only — no tax, no
shipping, no invented discount row. A demo that fakes a tax line invites the
question of where the number came from.

Sticky summary on desktop: subtotal, count, Checkout button (`#111` bg, links
to `/checkout`). Checkout is disabled at zero items.

## Empty state

One line of copy — the cart is empty — and a link to `/shop`. No illustration.

## Hydration

Client component. Because `persist` uses `skipHydration`, the first client
render matches the server HTML: an empty cart. After rehydrate, real items
appear. No `useHydrated()` guard, no flash of a wrong count.

## Verify

Add three items, refresh, all three persist. Change quantity to 0 → clamped to
1, not removed (removal is the Remove button's job). Subtotal matches
sum(price × qty) from `data/products.ts`.
