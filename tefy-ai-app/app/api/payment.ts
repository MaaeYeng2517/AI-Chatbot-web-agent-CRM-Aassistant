import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export async function buyCoins(priceId: string) {
  const stripe = await stripePromise;
  const res = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  const session = await res.json();
  await stripe?.redirectToCheckout({ sessionId: session.id });
}
