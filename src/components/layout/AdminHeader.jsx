"use client";

import { useState } from "react";
import { Bell, Menu, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/constants/sidebarLinks";

export default function AdminHeader({ title = "Dashboard" }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* Left - Toggle & Title */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-gray-600 hover:text-black transition"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-black transition">
            <Bell size={20} />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button className="text-gray-600 hover:text-black transition">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <Image
              src="/avatar.png"
              alt="Admin"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* Drawer (Sidebar on small screens) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {" "}
          {/* lg:hidden ✅ */}
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer content */}
          <aside className="relative w-64 bg-white h-full shadow-md p-4 z-50 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">BTH Admin</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
