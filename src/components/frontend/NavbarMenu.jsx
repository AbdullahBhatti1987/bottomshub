"use client";
import { useState } from "react";

export default function NavbarMenu({ mobile = false }) {
  const [open, setOpen] = useState(false);

  const menuClass = mobile
    ? "flex flex-col space-y-2"
    : "flex space-x-6 items-center";

  return (
    <ul className={menuClass}>
      <li
        className="relative cursor-pointer"
        onMouseEnter={() => !mobile && setOpen(true)}
        onMouseLeave={() => !mobile && setOpen(false)}
      >
        Shop
        {open && !mobile && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg p-4 grid grid-cols-3 gap-4 z-50">
            <ul className="space-y-2 col-span-2">
              <li>Category 1</li>
              <li>Category 2</li>
              <li>Category 3</li>
              <li>Category 4</li>
            </ul>
            <div className="col-span-1">
              <img
                src="/images/dropdown-banner.jpg"
                alt="Banner"
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          </div>
        )}
      </li>
      <li className="cursor-pointer">About</li>
      <li className="cursor-pointer">Contact</li>
      <li className="cursor-pointer">Admin</li>
    </ul>
  );
}
