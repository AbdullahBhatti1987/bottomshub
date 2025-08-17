// // "use client";

// // import { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "@/lib/axios";
// // import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

// // export default function CategoryFilter({ category, setCategory }) {
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [open, setOpen] = useState(false);
// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await axios.get(`${BASE_URL}/api/categories`, { params: { limit: 100 } });
// //         setCategories(res.data.data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //       setLoading(false);
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Close dropdown on outside click
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setOpen(false);
// //       }
// //     }
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [dropdownRef]);

// //   return (
// //     <div ref={dropdownRef} className="relative w-full">
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none"
// //       >
// //         {category
// //           ? categories.find((c) => c.slug === category)?.name
// //           : "All Categories"}
// //         {open ? (
// //           <ChevronUpIcon className="w-5 h-5 text-gray-600" />
// //         ) : (
// //           <ChevronDownIcon className="w-5 h-5 text-gray-600" />
// //         )}
// //       </button>

// //       <div
// //         className={`absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
// //           open ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
// //         }`}
// //       >
// //         {loading ? (
// //           <div className="animate-pulse h-24 bg-gray-100" />
// //         ) : (
// //           <div className="flex flex-col overflow-y-auto">
// //             <button
// //               onClick={() => {
// //                 setCategory("");
// //                 setOpen(false);
// //               }}
// //               className={`text-left px-4 py-2 hover:bg-gray-100 ${
// //                 category === "" ? "bg-indigo-500 text-white" : ""
// //               }`}
// //             >
// //               All
// //             </button>
// //             {categories.map((cat) => (
// //               <button
// //                 key={cat._id}
// //                 onClick={() => {
// //                   setCategory(cat.slug);
// //                   setOpen(false);
// //                 }}
// //                 className={`text-left px-4 py-2 hover:bg-gray-100 ${
// //                   category === cat.slug ? "bg-indigo-500 text-white" : ""
// //                 }`}
// //               >
// //                 {cat.name}
// //               </button>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { BASE_URL } from "@/lib/axios";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
// import colors from "@/theme/colors";

// export default function CategoryFilter({ category, setCategory }) {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${BASE_URL}/api/categories`, { params: { limit: 100 } });
//         setCategories(res.data.data);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     };
//     fetchCategories();
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dropdownRef]);

//   const activeStyle = {
//     backgroundColor: colors.primary,
//     color: colors.white,
//   };

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none"
//       >
//         {category
//           ? categories.find((c) => c.slug === category)?.name
//           : "All Categories"}
//         {open ? (
//           <ChevronUpIcon className="w-5 h-5 text-gray-600" />
//         ) : (
//           <ChevronDownIcon className="w-5 h-5 text-gray-600" />
//         )}
//       </button>

//       <div
//         className={`absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
//           open ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         {loading ? (
//           <div className="animate-pulse h-24 bg-gray-100" />
//         ) : (
//           <div className="flex flex-col overflow-y-auto">
//             <button
//               onClick={() => {
//                 setCategory("");
//                 setOpen(false);
//               }}
//               style={category === "" ? activeStyle : {}}
//               className="text-left px-4 py-2 hover:bg-gray-100"
//             >
//               All
//             </button>
//             {categories.map((cat) => (
//               <button
//                 key={cat._id}
//                 onClick={() => {
//                   setCategory(cat.slug);
//                   setOpen(false);
//                 }}
//                 style={category === cat.slug ? activeStyle : {}}
//                 className="text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// CategoryFilter.jsx
"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import colors from "@/theme/colors";

export default function CategoryFilter({ category, setCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`, { params: { limit: 100 } });
        console.log("Response", res?.data?.data)
        setCategories(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const activeStyle = { backgroundColor: colors.primary, color: colors.white };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2"
        style={{ "--tw-ring-color": colors.ringPrimary }}
      >
        {category ? categories.find((c) => c.slug === category)?.name : "All Categories"}
        {open ? <ChevronUpIcon className="w-5 h-5 text-gray-600" /> : <ChevronDownIcon className="w-5 h-5 text-gray-600" />}
      </button>

      <div
  className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
    open ? "opacity-100" : "max-h-0 opacity-0"
  }`}
>
  {loading ? (
    <div className="animate-pulse h-24 bg-gray-100" />
  ) : (
    <div className="flex flex-col overflow-y-auto max-h-36">
      <button
        onClick={() => {
          setCategory("");
          setOpen(false);
        }}
        style={category === "" ? activeStyle : {}}
        className="text-left px-4 py-2 hover:bg-gray-50"
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => {
            setCategory(cat.slug);
            setOpen(false);
          }}
          style={category === cat.slug ? activeStyle : {}}
          className="text-left px-4 py-2 hover:bg-gray-50"
        >
          {cat.name}
        </button>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
