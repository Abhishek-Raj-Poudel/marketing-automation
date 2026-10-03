# Product detail

`/products/[slug]`

## Layout

Two columns on desktop, stacked on mobile. Left: image at 4:3, full width.
Right: category tag, name (serif, `clamp(1.75rem, 3vw, 2.5rem)`), price in
mono, description at `line-height: 1.6`, quantity stepper, Add to Cart.
Below the fold: related products.

## Server component, client island

`app/products/[slug]/page.tsx` is a server component. It looks the product up
from `data/products.ts`, fires nothing, and renders. Two client islands:

- `components/AddToCart.tsx` — quantity stepper + button, the only interactive
  part
- `components/TrackProductView.tsx` — empty component with a `useEffect` that
  calls `trackViewedProduct`

Putting `trackViewedProduct` in a tiny wrapper rather than making the whole page
`"use client"` keeps the catalogue grid and the description out of the JS bundle.
The tracking call itself needs the client because it fires on mount, not render.

Unknown slug calls `notFound()`.

## Related products

Same category, `featured` first, excluding self, capped at 4. If the category has
only this one product, the section is omitted — not rendered empty.

## Add to Cart

`add(productId, quantity)` then `trackAddedToCart(product, quantity, cart)`.
The store merges quantities when the same product is added twice rather than
appending a duplicate line.

The button does not navigate. The header badge updates and that is the feedback.
Navigating away from the product page on add breaks the compare-two-things habit
and loses scroll position.

## Quantity stepper

`−` / value / `+`, integer only, clamps at 1 and 99. Buttons are 32px square
with a `1px` border. Native `<input type="number">` was rejected — the spinner
chrome breaks the flat aesthetic and the arrows are 3 lines of markup.

## Verify

`/products/does-not-exist` → 404 page. Adding the same product twice shows
quantity 2 on one line, not two lines. Related section hides when it would be
empty.
