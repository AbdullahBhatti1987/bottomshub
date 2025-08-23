"use client";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "../ui/Breadcrumb";

export default function FrontendLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // note: no slash at end

  return (
    <div className={isAdmin ? "pt-0" : "pt-22"}>
      {/* <Breadcrumb /> */}
      {children}
    </div>
  );
}
