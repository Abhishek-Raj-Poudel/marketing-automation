# Features

Demo D2C crochet store. One file per feature. Every file answers: what it does,
where the code lives, how it is verified.

| Feature | File | Route |
| --- | --- | --- |
| Design system | [design-system.md](./design-system.md) | global |
| Browse & filter | [browse.md](./browse.md) | `/`, `/shop`, `/collections/[category]` |
| Product detail | [product-detail.md](./product-detail.md) | `/products/[slug]` |
| Cart | [cart.md](./cart.md) | `/cart` |
| Checkout | [checkout.md](./checkout.md) | `/checkout` |
| Order confirmation | [order-confirmation.md](./order-confirmation.md) | `/order/[orderId]` |
| Newsletter | [newsletter.md](./newsletter.md) | home section + popup |
| Tracking | [tracking.md](./tracking.md) | `lib/tracking.ts` |
| Persistence & hydration | [persistence.md](./persistence.md) | `store/useStore.ts` |

## Rules this project follows

1. All client state lives in one Zustand store, persisted to `localStorage`.
   No server state, no database, no auth.
2. Totals are always derived from `data/products.ts` at render time. Never
   persisted — a stored price goes stale the moment the catalogue changes.
3. Filters and search live in the URL, not in React state.
4. Tracking is a console log today. `lib/tracking.ts` is the only file that
   changes when Klaviyo is wired in.
