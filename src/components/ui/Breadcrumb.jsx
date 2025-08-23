"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Breadcrumb Component
export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // remove empty segments

  const items = segments.map((seg, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    // Convert slug-like segment to readable text (replace hyphens, capitalize)
    const label = seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { label, href };
  });

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:underline text-blue-600">
            Home
          </Link>
          {items.length > 0 && <span className="text-gray-400">/</span>}
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index === items.length - 1 ? (
              <span className="text-gray-500">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:underline text-blue-600">
                {item.label}
              </Link>
            )}
            {index < items.length - 1 && <span className="text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
