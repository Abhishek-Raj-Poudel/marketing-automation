# Checkout

`/checkout`

## Validation is the browser's job

Every input carries `required`; email is `type="email"`; postal code is
`autocomplete="postal-code"`. That is the entire validation implementation.

A hand-rolled validator would be ~60 lines re-implementing what the browser
already does, with worse accessibility (no native bubble, no focus management,
no screen reader announcement) and no better coverage. The browser blocks
submit and explains the problem on the field.

## Fields

email · first name · last name · address · city · postal code · country
(`<select>` with a short list). All `autoComplete` set. Label above input, 13px
muted. Input height 44px, `1px solid #EAEAEA`, radius `6px`, focus ring
`#111` at 1px offset — visible, not a glow.

## Layout

Form left, order summary right on desktop. Summary is a read-only list: image,
name, qty, line total, then subtotal. No quantity editing here.

## Place order

1. `setCustomer(customer)` and `identifyCustomer(customer)`
2. `placeOrder({ id, items, total, customer, createdAt })`
3. `trackPlacedOrder(order)`
4. `clear()`
5. `router.push('/order/' + id)`

Order id: `MA-` + `Date.now().toString(36).toUpperCase()` + 4 random base36
chars. Short enough to read aloud on a phone call, unique enough for a demo.
Not sequential, so it leaks nothing about order volume.

`total` is computed from `data/products.ts` at submit time, never read back from
the cart's stored shape.

## Empty cart on arrival

Navigating straight to `/checkout` with an empty cart renders the empty state
and a link to `/shop`. It does not redirect — a redirect on GET hides the reason
from the visitor.

## Verify

Submit empty → browser blocks, focus lands on the first invalid field. Enter
`not-an-email` → blocked, native message. Place order → redirected to
`/order/MA-...`, cart badge back to 0, order visible after a refresh.
