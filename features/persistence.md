# Persistence & hydration

One Zustand store, three slices, persisted to `localStorage`.

## Why one file

The plan called for `store/cartStore.ts`, `customerStore.ts`, `orderStore.ts`.
Merged into `store/useStore.ts`. Three `persist` configs means three
hydration edge cases and three rehydrate calls; one store means one. Split later
if a slice outgrows the file.

## Shape

```ts
type CartItem    = { productId: string; quantity: number }
type Customer    = { email: string; firstName: string; lastName: string; address: string }
type Order       = { id: string; items: CartItem[]; total: number; customer: Customer; createdAt: string }
```

`CartSlice`: `items`, `add(productId, qty)`, `remove(productId)`,
`setQuantity(productId, qty)`, `clear()`.
`CustomerSlice`: `customer`, `setCustomer(c)`, `clearCustomer()`.
`OrderSlice`: `orders`, `placeOrder(order)`, `getOrder(id)`.

## Totals are derived, never stored

`total` and `count` are computed from `items` + `data/products.ts` inside
selectors. Nothing price-shaped is persisted — a stored total silently goes stale
the moment a price is edited, and the cart shows the wrong number with no error.

## Hydration

`persist` runs with `skipHydration: true`. One client component,
`components/StoreHydration.tsx`, mounted in the root layout, calls
`useStore.persist.rehydrate()` in a `useEffect`.

Why: server render and first client render both see default state
(`items: []`), so the HTML matches and React does not warn. The store fills in
immediately after, and subscribed components re-render. The alternative — a
`useHydrated()` boolean checked by every consumer — puts the same guard in five
places and still flashes empty cart.

## Storage keys

`zustand` (default single key) holds the whole store. The newsletter popup's
"seen" flag is a separate plain `localStorage` key, `nl-popup-seen` — it is not
store state and does not belong in the persisted blob.

## Verify

Add an item, hard-refresh, item is still there. Open `/cart` on a cold load:
no hydration warning in the console, and the empty state is what the server
sent.
