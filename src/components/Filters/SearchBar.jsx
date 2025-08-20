// // SearchBar.jsx
// "use client";
// import { useEffect, useState } from "react";
// import colors from "@/theme/colors";

// export default function SearchBar({ search, setSearch, localSearch, setLocalSearch }) {
//   const [localSearch, setLocalSearch] = useState(search);

//   useEffect(() => {
//     const timer = setTimeout(() => setSearch(localSearch), 500);
//     return () => clearTimeout(timer);
//   }, [localSearch, setSearch]);

//   return (
//     <div className="relative w-full">
//       <input
//         type="text"
//         value={localSearch}
//         onChange={(e) => setLocalSearch(e.target.value)}
//         placeholder="Search products..."
//         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
//         style={{ "--tw-ring-color": colors.ringPrimary }}
//       />
//       {localSearch && (
//         <button
//           onClick={() => setLocalSearch("")}
//           className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>
//       )}
//     </div>
//   );
// }


"use client";
import colors from "@/theme/colors";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={search} // parent se bind hoga
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
        style={{ "--tw-ring-color": colors.ringPrimary }}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}
