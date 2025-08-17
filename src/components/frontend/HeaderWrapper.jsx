// HeaderWrapper.jsx (client component)
"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/frontend/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null; 
  return (
    <div className="fixed top-0 z-50 w-full flex justify-center bg-white/30 backdrop-blur-md">
      <div className="relative max-w-7xl w-full">
        <Header />
        
      </div>
    </div>
  );
}
