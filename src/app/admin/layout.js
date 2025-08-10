"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";
import { useState } from "react";

export default function AdminLayout({ children, title = "Dashboard" }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50 transition-all duration-300 ease-in-out ">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out 
         ${collapsed ? "lg:ml-[80px]" : "lg:ml-[240px]"} ml-0`}
      >
        <AdminHeader title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
