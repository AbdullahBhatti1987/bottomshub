// "use client";

// import { sidebarLinks } from "@/lib/constants/sidebarLinks";
// import Link from "next/link";
// import { usePathname } from "next/navigation";




// export default function AdminSidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-[240px] h-screen bg-white border-r border-gray-200 fixed top-0 left-0 z-40 flex flex-col">
//       {/* Logo */}
//       <div className="px-6 py-4 border-b border-gray-200">
//         <h1 className="text-xl font-bold text-gray-900 tracking-tight">BTH Admin</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
//         {sidebarLinks.map((item) => {
//           const isActive = pathname === item.href;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
//                 isActive
//                   ? "bg-black text-white"
//                   : "text-gray-700 hover:bg-gray-100 hover:text-black"
//               }`}
//             >
//               <span className="mr-3">{item.icon}</span>
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }


"use client";

import { sidebarLinks } from "@/lib/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300
        ${collapsed ? "w-[0px]" : "w-[240px]"} hidden lg:flex flex-col`}
    >
      {/* Header with Collapse Button */}
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold text-gray-900">BTH Admin</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-black transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
