"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function DatePicker({ label, value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="w-full max-w-xs">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
      />
    </div>
  );
}
