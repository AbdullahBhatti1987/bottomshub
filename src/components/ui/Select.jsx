  // "use client";

  // import React, { useState, useRef, useEffect } from "react";
  // import { ChevronDown } from "lucide-react";

  // export function Select({ label, name, value, onChange, children, required }) {
  //   const [open, setOpen] = useState(false);
  //   const dropdownRef = useRef(null);

  //   const childArray = React.Children.toArray(children);
  //   const selectedLabel =
  //     childArray.find((child) => child.props.value === value)?.props.children ||
  //     "Select";

  //   // ✅ Close on outside click
  //   useEffect(() => {
  //     function handleClickOutside(event) {
  //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //         setOpen(false);
  //       }
  //     }

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }, []);

  //   return (
  //     <div className="relative  w-full" ref={dropdownRef}>
  //       {label && (
  //         <label className="block text-sm font-medium mb-1 text-gray-700">
  //           {label}
  //         </label>
  //       )}
  //       <button
  //         type="button"
  //         className="w-full flex items-center justify-between px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black border-gray-300 bg-white"
  //         onClick={() => setOpen(!open)}
  //       >
  //       <span className="whitespace-nowrap overflow-hidden text-ellipsis">
  //   {selectedLabel}
  // </span>

  //         <ChevronDown
  //           className={`w-4 h-4 ml-2 transition-transform ${
  //             open ? "rotate-180" : ""
  //           }`}
  //         />
  //       </button>

  //       {/* {open && (
  //         <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm">
  //           {childArray.map((child) =>
  //             React.cloneElement(child, {
  //               onSelect: (val) => {
  //                 onChange(val);
  //                 setOpen(false);
  //               },
  //             })
  //           )}
  //         </ul>
  //       )} */}
  //       {open && (
  //         <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-80 overflow-y-auto">
  //           {childArray.map((child) =>
  //             React.cloneElement(child, {
  //               onSelect: (val) => {
  //                 onChange(val);
  //                 setOpen(false);
  //               },
  //             })
  //           )}
  //         </ul>
  //       )}
  //     </div>
  //   );
  // }

  // export function SelectItem({ value, children, onSelect }) {
  //   return (
  //     <li
  //       onClick={() => onSelect(value)}
  //       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
  //     >
  //       {children}
  //     </li>
  //   );
  // }


  "use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function Select({ label, name, value, onChange, children, required, disabled }) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const childArray = React.Children.toArray(children);
  const selectedLabel =
    childArray.find((child) => child.props.value === value)?.props.children || "Select";

  // ✅ Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) =>
          prev < childArray.length - 1 ? prev + 1 : 0
        );
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (open) {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : childArray.length - 1
        );
      }
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(0);
      } else if (highlightedIndex >= 0) {
        const selectedValue = childArray[highlightedIndex].props.value;
        onChange(selectedValue);
        setOpen(false);
      }
    }
    if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <button
        type="button"
        ref={buttonRef}
        disabled={disabled}
        required={required}

        
        className="w-full flex items-center justify-between px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black border-gray-300 bg-white"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
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

      {open && (
        <ul
          className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-sm max-h-80 overflow-y-auto"
          role="listbox"
        >
          {childArray.map((child, index) =>
            React.cloneElement(child, {
              onSelect: (val) => {
                onChange(val);
                setOpen(false);
                setHighlightedIndex(-1);
                buttonRef.current?.focus();
              },
              highlighted: index === highlightedIndex,
            })
          )}
        </ul>
      )}
    </div>
  );
}

export function SelectItem({ value, children, onSelect, highlighted }) {
  return (
    <li
      onClick={() => onSelect(value)}
      className={`px-4 py-2 cursor-pointer ${
        highlighted ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
      role="option"
      aria-selected={highlighted}
    >
      {children}
    </li>
  );
}
