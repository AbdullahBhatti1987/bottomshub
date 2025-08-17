// HeaderWrapper.jsx (client component)
"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import colors from "@/theme/colors";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null; 
  return (
    <div className="bottom-0 z-50 w-full flex justify-center bg-white/30 backdrop-blur-md">
      <div className="relative w-full"  style={{backgroundColor : colors.secondary, color: colors.text}}>
        {/* <Footer /> */}
        
      </div>
    </div>
  );
}
