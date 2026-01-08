"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/" },
  { name: "Tournaments", href: "/tournaments" },
  { name: "Players", href: "/players" },
  { name: "Matches", href: "/matches" },
  { name: "Courts", href: "/courts" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-gray-900 text-white p-4 flex flex-col gap-3">
      <h1 className="text-xl font-bold mb-4">🏸 Badminton Admin</h1>

      {menu.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`p-2 rounded-lg transition ${
              active ? "bg-green-600" : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </aside>
  );
}
