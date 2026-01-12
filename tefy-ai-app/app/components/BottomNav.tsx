"use client";
import CreateButton from "./CreateButton";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      <NavItem icon="🏠" label="Home" active />
      <NavItem icon="🔍" label="Discover" />
      <CreateButton />
      <NavItem icon="💰" label="Wallet" />
      <NavItem icon="👤" label="Profile" />
    </nav>
  );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center text-xs ${active ? "text-blue-600" : "text-gray-500"}`}>
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
