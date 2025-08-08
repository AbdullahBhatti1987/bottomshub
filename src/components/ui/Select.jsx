// // "use client";

// // import React, { useState } from "react";

// // export function Select({ name, value, onChange, children, required }) {
// //   const [open, setOpen] = useState(false);

// //   const childArray = React.Children.toArray(children); // ✅ safe mapping
// //   const selectedLabel =
// //     childArray.find((child) => child.props.value === value)?.props.children || "Select";

// //   return (
// //     <div className="relative mb-4 m-1">
// //       <button
// //         type="button"
// //         className="w-full px-4 py-2 text-left border rounded-md bg-white focus:outline-none focus:ring"
// //         onClick={() => setOpen(!open)}
// //       >
// //         {selectedLabel}
// //       </button>

// //       {open && (
// //         <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
// //           {childArray.map((child) =>
// //             React.cloneElement(child, {
// //               onSelect: (val) => {
// //                 onChange(val);
// //                 setOpen(false);
// //               },
// //             })
// //           )}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }

// // export function SelectItem({ value, children, onSelect }) {
// //   return (
// //     <li
// //       onClick={() => onSelect(value)}
// //       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// //     >
// //       {children}
// //     </li>
// //   );
// // }


// "use client";

// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react"; // ✅ Lucide icon

// export function Select({ name, value, onChange, children, required }) {
//   const [open, setOpen] = useState(false);

//   const childArray = React.Children.toArray(children);
//   const selectedLabel =
//     childArray.find((child) => child.props.value === value)?.props.children || "Select";

//   return (
//     <div className="relative mb-4 m-1">
//       <button
//         type="button"
//         className="w-full flex items-center justify-between px-4 py-2 text-left border rounded-md bg-white focus:outline-none focus:ring"
//         onClick={() => setOpen(!open)}
//       >
//         <span>{selectedLabel}</span>
//         <ChevronDown
//           className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
//         />
//       </button>

//       {open && (
//         <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
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

export function Select({ name, value, onChange, children, required }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const childArray = React.Children.toArray(children);
  const selectedLabel =
    childArray.find((child) => child.props.value === value)?.props.children || "Select";

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
    <div className="relative mb-4 m-1" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black border-gray-300 bg-white"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
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
