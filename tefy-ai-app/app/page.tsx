"use client";
import { useState } from "react";
import Card from "./components/Card";
import PostCard from "./components/PostCard";
import BottomNav from "./components/BottomNav";
import CreateButton from "./components/CreateButton";
import BuyButton from "./components/BuyBotton";

export default function HomePageMock() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"forYou"|"knowledge"|"ideas"|"popular">("forYou");

  const posts = {
    forYou: ["เริ่มวันใหม่ด้วยแรงบันดาลใจ","เคล็ดลับเช้าๆ"],
    knowledge: ["จัดการเวลาอย่างมืออาชีพ","สมาธิ & Productivity"],
    ideas: ["แนวคิดสร้างสรรค์","เทคนิคคิดเร็ว"],
    popular: ["Top Creator Posts","บทความยอดนิยม"]
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Tefy App</h2>

          {/* Email / Password */}
          <input type="email" placeholder="Email" className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="password" placeholder="Password" className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>

          {/* Login / Signup */}
          <div className="flex gap-2 mb-4">
            <button onClick={()=>setLoggedIn(true)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold">Login</button>
            <button onClick={()=>setLoggedIn(true)} className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold">Signup</button>
          </div>

          {/* Social Login */}
          <div className="flex flex-col gap-2 mt-2">
            <button onClick={()=>setLoggedIn(true)} className="bg-red-500 text-white py-2 rounded-lg">Login with Google</button>
            <button onClick={()=>setLoggedIn(true)} className="bg-blue-800 text-white py-2 rounded-lg">Login with Facebook</button>
            <button onClick={()=>setLoggedIn(true)} className="bg-green-600 text-white py-2 rounded-lg">Login with Line</button>
          </div>
        </div>
      </div>
    )
  }

  // หน้า Home UI หลัง Login (ไม่เชื่อมต่อระบบ)
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-3 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Think Everyday</h1>
        <button onClick={()=>setLoggedIn(false)} className="text-red-500 font-semibold">Logout</button>
      </header>

      {/* Tabs */}
      <div className="flex justify-around bg-white border-b">
        {["forYou","knowledge","ideas","popular"].map(tab=>(
          <button key={tab} className={`py-3 px-4 ${activeTab===tab?"text-blue-600 font-bold":"text-gray-500"}`}
            onClick={()=>setActiveTab(tab as any)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <section className="p-4 grid grid-cols-2 gap-4">
        <Card title="Coin" value="120"/>
        <Card title="ดาว ⭐" value="45"/>
        <Card title="รายได้ (฿)" value="680"/>
        <BuyButton/>
        <CreateButton/>
      </section>

      {/* Feed */}
      <section className="px-4 space-y-4 mt-2">
        {posts[activeTab].map(title=><PostCard key={title} title={title}/>)}
      </section>

      <BottomNav/>
    </main>
  )
}
