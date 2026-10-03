# Newsletter

One feature, two surfaces: a section on the home page and a delayed popup.
Both collect the same two fields and write the same store slice.

## One component, two call sites

`components/NewsletterForm.tsx` takes `variant: "section" | "popup"`. The
variant changes the heading and the width. The email field, the first-name
field, the submit handler, and the success state are written once.

## Submission

```ts
setCustomer({ email, firstName, lastName: "", address: "" })
identifyCustomer({ email, firstName, lastName: "", address: "" })
```

`setCustomer` is a partial merge, so a newsletter signup never blanks an address
the visitor already gave at checkout.

`lastName` and `address` are empty strings because the store's `Customer` type
requires them. Not worth a second `NewsletterSubscriber` type for two fields the
popup does not collect.

Success state replaces the form with one line — a check glyph and "You're on the
list." The submitted email is echoed back in mono so the visitor can confirm
what was captured.

## Popup

Shows once, 8 seconds after mount, on any page except `/checkout` (interrupting
a checkout is the fastest way to lose a sale).

Dismissal is one `localStorage` key: `nl-popup-seen`, set on dismiss **and** on
submit. Not store state — it is a fact about the browser, not about the customer,
and it does not belong in the persisted store blob.

Dismissal is permanent. No "show again" toggle, no snooze. A demo does not need
a preference centre.

Backdrop click and the `×` both dismiss. `×` carries `aria-label="Dismiss"`. The
card is `role="dialog"` with `aria-modal`; focus moves into it on open and
returns to the trigger on close. Escape closes.

## Verify

Home, wait 8s, popup appears. Dismiss with `×`, reload, gone. Submit from the
popup, check the email is in `customerStore`. Visit `/checkout`, wait 8s, no
popup.
