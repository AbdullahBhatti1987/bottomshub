"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function Select({ label, name, value, onChange, children, required }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const childArray = React.Children.toArray(children);
  const selectedLabel =
    childArray.find((child) => child.props.value === value)?.props.children ||
    "Select";

  // ✅ Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative  w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black border-gray-300 bg-white"
        onClick={() => setOpen(!open)}
      >
       <span className="whitespace-nowrap overflow-hidden text-ellipsis">
  {selectedLabel}
</span>

        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm">
          {childArray.map((child) =>
            React.cloneElement(child, {
              onSelect: (val) => {
                onChange(val);
                setOpen(false);
              },
            })
          )}
        </ul>
      )} */}
      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-80 overflow-y-auto">
          {childArray.map((child) =>
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
