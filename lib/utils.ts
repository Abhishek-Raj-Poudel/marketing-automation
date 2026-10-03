const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const date = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

export const formatPrice = (amount: number) => currency.format(amount);
export const formatDate = (iso: string) => date.format(new Date(iso));
