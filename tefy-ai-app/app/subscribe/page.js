"use client";

async function pay() {
  const res = await fetch("/api/checkout", { method: "POST" });
  const data = await res.json();
  window.location.href = data.url;
}

export default function Subscribe() {
  return (
    <button
      onClick={pay}
      className="bg-purple-500 text-white px-4 py-2 rounded"
    >
      สนับสนุน 50 บาท 💜
    </button>
  );
}
