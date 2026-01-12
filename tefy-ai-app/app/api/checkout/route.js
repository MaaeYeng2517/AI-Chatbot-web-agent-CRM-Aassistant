import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "thb",
        product_data: { name: "สนับสนุนผู้เขียน" },
        unit_amount: 5000, // 50 บาท
      },
      quantity: 1,
    }],
    success_url: "https://yourdomain.com/success",
    cancel_url: "https://yourdomain.com/cancel",
  });

  return Response.json({ url: session.url });
}
