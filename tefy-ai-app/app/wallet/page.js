"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Wallet() {
  const [coin, setCoin] = useState(50);
  const router = useRouter();

  return (
    <main className="p-4">
      <button
        onClick={() => router.push("/")}
        className="text-blue-500 text-sm mb-2"
      >
        ← กลับ
      </button>

      <h2 className="text-xl font-bold mb-4">
        💰 กระเป๋าเหรียญ
      </h2>

      <p className="mb-3">
        เหรียญคงเหลือ: <b>{coin}</b>
      </p>

      <button
        onClick={() => setCoin(coin + 30)}
        className="w-full bg-yellow-400 py-2 rounded"
      >
        +30 เหรียญ (ตัวอย่าง)
      </button>

      <p className="text-xs text-gray-500 mt-4">
        * ตัวอย่าง UX ยังไม่ใช่เงินจริง
      </p>
    </main>
  );
}
