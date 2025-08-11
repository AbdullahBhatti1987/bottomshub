// import { useState, useRef, useEffect } from "react";
// import Button from "./Button";

// export default function Pagination({ page, pages, total, limit, onLimitChange, onPageChange }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const options = [5, 10, 15, 20, 50, 100];

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
//       {/* Rows per page */}
//       <div className="flex items-center gap-2 relative" ref={dropdownRef}>
//         <span className="text-sm text-gray-600">Rows per page:</span>
//         <button
//           className="border border-gray-300 rounded-md px-3 py-1 bg-white shadow-sm text-sm flex items-center justify-between w-20"
//           onClick={() => setOpen((prev) => !prev)}
//         >
//           {limit}
//           <span className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
//         </button>

//         {open && (
//           <ul className="absolute bottom-full mb-1 left-0 w-20 bg-white border border-gray-300 rounded-md shadow-lg z-50">
//             {options.map((opt) => (
//               <li
//                 key={opt}
//                 className={`px-3 py-1 cursor-pointer hover:bg-gray-100 text-sm ${
//                   opt === limit ? "bg-gray-200 font-medium" : ""
//                 }`}
//                 onClick={() => {
//                   onLimitChange(opt);
//                   setOpen(false);
//                 }}
//               >
//                 {opt}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Prev / Next buttons */}
//       <div className="flex gap-2">
//         <Button
//           variant="success"
//           disabled={page <= 1}
//           onClick={() => onPageChange(page - 1)}
//         >
//           Prev
//         </Button>
//         <Button
//           variant="success"
//           disabled={page >= pages}
//           onClick={() => onPageChange(page + 1)}
//         >
//           Next
//         </Button>
//       </div>

//       {/* Total info */}
//       <div className="text-sm text-gray-600">
//         Total: {total} — Page {page} / {pages}
//       </div>
//     </div>
//   );
// }



import { useState, useRef, useEffect } from "react";
import Button from "./Button";

export default function Pagination({ page, pages, total, limit, onLimitChange, onPageChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = [10, 15, 20, 50, 100];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
      {/* Rows per page */}
      <div className="flex items-center gap-2 relative" ref={dropdownRef}>
        <span className="text-sm text-gray-600">Rows per page:</span>
        <button
          className="border border-gray-300 rounded-md px-3 py-1 bg-white shadow-sm text-sm flex items-center justify-between w-20"
          onClick={() => setOpen((prev) => !prev)}
        >
          {limit}
          <span className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
        </button>

        {open && (
          <ul className="absolute bottom-full mb-1 left-27 w-20 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {options.map((opt) => (
              <li
                key={opt}
                className={`px-3 py-1 cursor-pointer hover:bg-gray-100 text-sm ${
                  opt === limit ? "bg-gray-200 font-medium" : ""
                }`}
                onClick={() => {
                  onLimitChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex gap-2">
        <Button
          variant="success"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>
        <Button
          variant="success"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>

      {/* Total Info */}
      <div className="text-sm text-gray-600">
        Total: {total} — Page {page} / {pages}
      </div>
    </div>
  );
}
