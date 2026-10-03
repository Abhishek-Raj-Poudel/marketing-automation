# Tracking

Placeholder analytics. Console logs in development, nothing in production.
Klaviyo is **not** part of this project.

## The seam

`lib/tracking.ts` is the only file that changes when Klaviyo is added. Every
call site already exists and already passes the right payload.

```ts
export function trackViewedProduct(product: Product): void
export function trackViewedCollection(category: string): void
export function trackSearch(term: string): void
export function trackAddedToCart(product: Product, quantity: number, cart: CartLine[]): void
export function trackStartedCheckout(cart: CartLine[], customer: Customer | null): void
export function trackPlacedOrder(order: Order): void
export function identifyCustomer(customer: Customer): void
```

All seven are one-line wrappers over a single `emit(event, payload)` that logs
when `process.env.NODE_ENV !== "production"`. Seven named exports rather than
one generic `track()` because the names are the API surface: when Klaviyo lands,
each body becomes a `klaviyo.track(...)` call and no caller moves.

## Trigger points

| Call | Fires on |
| --- | --- |
| `trackViewedCollection` | `/collections/[category]` mount, and `/shop` when a category filter is active |
| `trackViewedProduct` | `/products/[slug]` mount |
| `trackSearch` | Search form submit, not per keystroke |
| `trackAddedToCart` | `AddToCart` click, after the store update |
| `trackStartedCheckout` | `/checkout` mount |
| `trackPlacedOrder` | `placeOrder` success, before redirect |
| `identifyCustomer` | Newsletter form submit and checkout submit |

`trackViewedProduct` and `trackViewedCollection` need `useEffect` and are fired
from small client wrappers, not from the server component page — the page itself
stays a server component so the catalogue renders without shipping JS.

## Payload note

`trackAddedToCart` receives the full cart after the add, not the cart before.
Klaviyo's "Added to Cart" metric needs the resulting cart state to compute
cart value.

## Verify

Run `pnpm dev`, open the browser console, add to cart, submit the checkout. Each
action logs one line. Nothing logs in `pnpm build && pnpm start`.
