"use client";

import { useState } from "react";

export function Select({ name, value, onChange, children, required }) {
  const [open, setOpen] = useState(false);

  const selectedLabel = (
    children.find((child) => child.props.value === value)?.props.children || "Select"
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full px-4 py-2 text-left border rounded-md bg-white focus:outline-none focus:ring"
        onClick={() => setOpen(!open)}
      >
        {selectedLabel}
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
          {children.map((child) =>
            React.cloneElement(child, {
              onSelect: (val) => {
                onChange(val);
                setOpen(false);
              },
            })
          )}
        </ul>
      )}
    </div>
  );
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <li
      onClick={() => onSelect(value)}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </li>
  );
}
