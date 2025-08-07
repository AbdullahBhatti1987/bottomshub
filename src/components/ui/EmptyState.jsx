"use client";

import { Info } from "lucide-react";

export default function EmptyState({ message = "No data found.", icon: Icon = Info }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500">
      <Icon className="w-10 h-10 mb-3" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
