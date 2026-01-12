import { buyCoins } from "../lib/payment";

export default function BuyButton() {
  const handleBuy = async () => {
    await buyCoins("price_1Nxxxxxxx"); // price ID จาก Stripe Dashboard
  };

  return (
    <button className="bg-yellow-400 py-2 px-4 rounded-lg text-white font-semibold" onClick={handleBuy}>
      ซื้อ Coins
    </button>
  );
}
