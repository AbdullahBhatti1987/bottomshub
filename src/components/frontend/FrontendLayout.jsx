"use client";
import { usePathname } from "next/navigation";

export default function FrontendLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // note: no slash at end

  return (
    <div className={isAdmin ? "pt-0" : "pt-22"}>
      {children}
    </div>
  );
}
