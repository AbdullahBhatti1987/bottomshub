"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/lib/constants/sidebarLinks";
import { ChevronLeft, X } from "lucide-react";

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  drawerOpen,
  setDrawerOpen,
}) {
  const pathname = usePathname();

  const renderLinks = () =>
    sidebarLinks.map((item) => {
      const isActive = pathname === item.href;

      return (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-black"
            }`}
            onClick={() => drawerOpen && setDrawerOpen(false)}
          >
            <span className="min-w-[24px]">{item.icon}</span>

            {/* Label text (hidden when collapsed) */}
            <span
              className={`whitespace-nowrap transition-all duration-200 ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              } overflow-hidden`}
            >
              {item.label}
            </span>
          </Link>

          {/* Tooltip on icon hover when collapsed */}
          {collapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-black/80 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
              {item.label}
            </div>

           
          )}
        </div>
      );
    });

  return (
    <>
      <aside
        className={`hidden lg:flex fixed top-0 left-0 z-40 h-screen border-r border-gray-200 bg-white flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "w-[80px]" : "w-[240px]"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              BTH Admin
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-black transition-transform duration-300"
          >
            <ChevronLeft
              size={20}
              className={`transform transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-visible space-y-1 relative">
          {renderLinks()}
        </nav>
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
            onClick={() => setDrawerOpen(false)}
          />

          <aside
            className={`
        relative w-64 bg-white h-full shadow-md p-4 z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
      `}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">BTH Admin</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">{renderLinks()}</nav>
          </aside>
        </div>
      )}
    </>
  );
}
