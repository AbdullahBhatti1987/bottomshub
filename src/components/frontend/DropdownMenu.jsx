"use client";

import Image from "next/image";

export default function DropdownMenu() {
  return (
    <div className="absolute top-full left-0 bg-white shadow-lg w-[600px] p-6 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ul className="space-y-2">
          <li className="hover:text-blue-500 cursor-pointer">Category 1</li>
          <li className="hover:text-blue-500 cursor-pointer">Category 2</li>
          <li className="hover:text-blue-500 cursor-pointer">Category 3</li>
        </ul>
      </div>
      <div className="col-span-1">
        <Image
          src="/images/dropdown-banner.jpg"
          alt="Menu Banner"
          width={200}
            height={200}
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
}
