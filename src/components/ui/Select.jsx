// "use client";

// import React, { useState } from "react";

// export function Select({ name, value, onChange, children, required }) {
//   const [open, setOpen] = useState(false);

//   const childArray = React.Children.toArray(children); // ✅ safe mapping
//   const selectedLabel =
//     childArray.find((child) => child.props.value === value)?.props.children || "Select";

//   return (
//     <div className="relative mb-4 m-1">
//       <button
//         type="button"
//         className="w-full px-4 py-2 text-left border rounded-md bg-white focus:outline-none focus:ring"
//         onClick={() => setOpen(!open)}
//       >
//         {selectedLabel}
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

import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // ✅ Lucide icon

export function Select({ name, value, onChange, children, required }) {
  const [open, setOpen] = useState(false);

  const childArray = React.Children.toArray(children);
  const selectedLabel =
    childArray.find((child) => child.props.value === value)?.props.children || "Select";

  return (
    <div className="relative mb-4 m-1">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2 text-left border rounded-md bg-white focus:outline-none focus:ring"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
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
