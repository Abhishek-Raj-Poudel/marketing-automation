# Order confirmation

`/order/[orderId]`

## Reads from the store

Orders live in `localStorage`, so this page is a client component. It calls
`getOrder(orderId)` and renders. No server fetch, no API route — there is no
backend to fetch from.

This page is not shareable. A URL alone means nothing on another device, because
the order only exists in the browser that placed it. That is the accepted
limitation of a no-database demo. It is also why Klaviyo, not a real order
record, is the eventual destination for order data.

## Content

- Order number in mono, large, `MA-XXXXXX`
- Placed date, formatted with `Intl.DateTimeFormat`
- Line items with image, name, quantity, line total
- Subtotal
- Customer block: name, email, address
- Plain statement that this is a demo order and nothing was charged

No payment form, no tracking number, no "arrives in 3-5 days" fiction.

## Not found

Unknown id renders a 404 block inside the normal layout: "Order not found", a
link to `/shop`. It does not call the global `notFound()` — that renders the
root 404 chrome and drops the header, which is a worse experience for someone
who mistyped a suffix on an otherwise working page.

## Fresh-mount behaviour

Direct navigation to `/order/[id]` rehydrates first (see
[persistence.md](./persistence.md)), so `getOrder` finds the order after the
store fills in. Because the store update re-renders, there is no "loading" state
to write.

## Verify

Place an order, land here, refresh — the order is still there. Change the id in
the URL → not-found block, header still present.
