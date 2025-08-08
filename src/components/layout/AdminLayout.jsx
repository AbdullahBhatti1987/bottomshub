// "use client";

// import AdminSidebar from "@/components/layout/AdminSidebar";
// import AdminHeader from "@/components/layout/AdminHeader";

// export default function AdminLayout({ children, title = "Dashboard" }) {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1 ml-[240px]">
//         {/* Header */}
//         <AdminHeader title={title} />

//         {/* Page Content */}
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// }




"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "@/components/layout/AdminHeader";
import { useState } from "react";

export default function AdminLayout({ children, title = "Dashboard" }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar (Only on large screens) */}
      <aside
        className={`hidden lg:flex fixed top-0 left-0 h-screen z-40 transition-all duration-300 bg-white border-r border-gray-200
          ${collapsed ? "w-[80px]" : "w-[240px]"}`}
      >
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 w-full transition-all duration-300
          ml-0 ${collapsed ? "lg:ml-[80px]" : "lg:ml-[240px]"}`}
      >
        <AdminHeader title={title} setCollapsed={setCollapsed} collapsed={collapsed} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
