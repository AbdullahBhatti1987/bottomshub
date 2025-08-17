// "use client";

// import colors from "@/theme/colors";

// export default function PriceRangeFilter({ priceRange, setPriceRange }) {
//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <h3 className="font-semibold text-lg">Price Range</h3>
//       <div className="flex gap-2">
//         <input
//           type="number"
//           placeholder="Min"
//           value={priceRange.min}
//           onChange={(e) =>
//             setPriceRange({ ...priceRange, min: e.target.value ? Number(e.target.value) : "" })
//           }
//           className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
//           style={{ "--tw-ring-color": colors.ringPrimary }}
//         />
//         <input
//           type="number"
//           placeholder="Max"
//           value={priceRange.max}
//           onChange={(e) =>
//             setPriceRange({ ...priceRange, max: e.target.value ? Number(e.target.value) : "" })
//           }
//           className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
//           style={{ "--tw-ring-color": colors.ringPrimary }}
//         />
//       </div>
//       <div className="flex justify-between text-sm text-gray-600">
//         <span>Rs.{priceRange.min || 0}</span>
//         <span>Rs.{priceRange.max || 10000}</span>
//       </div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import colors from "@/theme/colors";

export default function PriceRangeFilter({ priceRange, setPriceRange }) {
  const [localRange, setLocalRange] = useState({
    min: priceRange.min || 0,
    max: priceRange.max || 10000,
  });

  useEffect(() => {
    setLocalRange({ min: priceRange.min || 0, max: priceRange.max || 10000 });
  }, [priceRange]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setLocalRange((prev) => ({ ...prev, min: value <= prev.max ? value : prev.min }));
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setLocalRange((prev) => ({ ...prev, max: value >= prev.min ? value : prev.max }));
  };

  // Apply locally when "Apply Filters" is clicked
  useEffect(() => {
    setPriceRange(localRange);
  }, [localRange, setPriceRange]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold text-lg">Price Range</h3>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={localRange.min}
          onChange={handleMinChange}
          className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": colors.ringPrimary }}
        />
        <input
          type="number"
          value={localRange.max}
          onChange={handleMaxChange}
          className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
          style={{ "--tw-ring-color": colors.ringPrimary }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Rs.{localRange.min}</span>
        <span>Rs.{localRange.max}</span>
      </div>
      {/* Optionally you can replace inputs with a real slider library */}
    </div>
  );
}
