"use client";

export default function CreatorDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Creator Dashboard</h2>

      <div className="grid grid-cols-2 gap-4">
        <Stat title="โพสต์ทั้งหมด" value="12" />
        <Stat title="ดาวที่ได้รับ ⭐" value="340" />
        <Stat title="รายได้ (฿)" value="680" />
        <Stat title="ผู้ติดตาม" value="89" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="border p-4 rounded text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
