"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function DatePicker({ label, value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative flex flex-col gap-0.5 w-full ">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border bg-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
      />
    </div>
  );
}
