"use client";

const gifts = [
  { name: "Star", cost: 1, icon: "⭐" },
  { name: "Coffee", cost: 10, icon: "☕" },
  { name: "Cake", cost: 50, icon: "🎂" },
  { name: "Crown", cost: 100, icon: "👑" },
];

export default function GiftPanel({ coin, setCoin }) {
  function sendGift(gift) {
    if (coin < gift.cost) {
      alert("เหรียญไม่พอ");
      return;
    }
    setCoin(coin - gift.cost);
    alert(`ส่ง ${gift.icon} ให้ผู้เขียนแล้ว`);
  }

  return (
    <div className="border-t mt-6 pt-3">
      <p className="text-sm mb-2">🎁 ส่งของขวัญ</p>

      <div className="flex gap-2 overflow-x-auto">
        {gifts.map((g) => (
          <button
            key={g.name}
            onClick={() => sendGift(g)}
            className="border rounded px-3 py-2"
          >
            <div className="text-xl">{g.icon}</div>
            <div className="text-xs">{g.cost} 💰</div>
          </button>
        ))}
      </div>
    </div>
  );
}
