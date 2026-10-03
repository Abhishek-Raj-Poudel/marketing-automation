import type { CartItem, Customer, Order } from "@/store/useStore";

function emit(event: string, payload: unknown) {
  if (process.env.NODE_ENV === "production") return;
  console.log(`[track] ${event}`, payload);
}

export function trackViewedProduct(product: {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
}) {
  emit("Viewed Product", product);
}

export function trackViewedCollection(category: string) {
  emit("Viewed Collection", { category });
}

export function trackSearch(term: string) {
  emit("Searched Site", { term });
}

export function trackAddedToCart(
  product: { id: string; slug: string; name: string; category: string; price: number },
  quantity: number,
  cart: CartItem[],
) {
  emit("Added to Cart", { product, quantity, cart });
}

export function trackStartedCheckout(cart: CartItem[], customer: Customer | null) {
  emit("Started Checkout", { cart, customer });
}

export function trackPlacedOrder(order: Order) {
  emit("Placed Order", order);
}

export function identifyCustomer(customer: Customer) {
  emit("Identified Customer", customer);
}
