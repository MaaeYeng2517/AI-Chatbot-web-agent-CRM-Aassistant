"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";




export default function Article() {
  const [star, setStar] = useState(0);
  const router = useRouter();

  return (
    <main className="p-4">
  
      <button
        onClick={() => router.push("/")}
        className="text-blue-500 text-sm mb-2"
      >
        ← กลับ
      </button>

      <h2 className="text-xl font-bold mb-2">
        ความรู้รอบตัวที่ควรรู้
      </h2>

      <p className="text-gray-600 mb-4">
        การเรียนรู้วันละนิด ทำให้เราเก่งขึ้นทุกวัน
      </p>

      <p>⭐ ดาว: {star}</p>

      <button
        onClick={() => setStar(star + 1)}
        className="bg-yellow-400 px-4 py-2 rounded mt-2"
      >
        +1 ⭐
      </button>
    </main>
  );
}
