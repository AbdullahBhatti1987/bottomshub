// "use client";

// import { useState, useEffect } from "react";
// import colors from "@/theme/colors";

// export default function PriceRangeSlider({ priceRange, setPriceRange, min = 0, max = 10000 }) {
//   const [minVal, setMinVal] = useState(priceRange.min || min);
//   const [maxVal, setMaxVal] = useState(priceRange.max || max);

//   // Update parent state on change
//   useEffect(() => {
//     setPriceRange({ min: minVal, max: maxVal });
//   }, [minVal, maxVal]);

//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <h3 className="font-semibold text-lg">Price Range</h3>

//       <div className="flex justify-between text-sm text-gray-600">
//         <span>Rs.{minVal}</span>
//         <span>Rs.{maxVal}</span>
//       </div>

//       <div className="relative w-full h-6">
//         {/* Track */}
//         <div className="absolute top-2.5 w-full h-1 bg-gray-300 rounded" />

//         {/* Highlight */}
//         <div
//           className="absolute top-2.5 h-1 bg-blue-500 rounded"
//           style={{
//             left: `${((minVal - min) / (max - min)) * 100}%`,
//             right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
//           }}
//         />

//         {/* Min handle */}
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={minVal}
//           onChange={(e) => {
//             const val = Math.min(Number(e.target.value), maxVal - 1);
//             setMinVal(val);
//           }}
//           className="absolute w-full h-6 pointer-events-none appearance-none bg-transparent"
//           style={{ "--thumb-color": colors.primary }}
//         />

//         {/* Max handle */}
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={maxVal}
//           onChange={(e) => {
//             const val = Math.max(Number(e.target.value), minVal + 1);
//             setMaxVal(val);
//           }}
//           className="absolute w-full h-6 pointer-events-none appearance-none bg-transparent"
//           style={{ "--thumb-color": colors.primary }}
//         />

//         {/* Custom thumb styles */}
//         <style jsx>{`
//           input[type='range']::-webkit-slider-thumb {
//             pointer-events: all;
//             width: 16px;
//             height: 16px;
//             border-radius: 50%;
//             background: ${colors.primary};
//             border: 2px solid white;
//             cursor: pointer;
//             -webkit-appearance: none;
//           }
//           input[type='range']::-moz-range-thumb {
//             pointer-events: all;
//             width: 16px;
//             height: 16px;
//             border-radius: 50%;
//             background: ${colors.primary};
//             border: 2px solid white;
//             cursor: pointer;
//           }
//           input[type='range']::-ms-thumb {
//             pointer-events: all;
//             width: 16px;
//             height: 16px;
//             border-radius: 50%;
//             background: ${colors.primary};
//             border: 2px solid white;
//             cursor: pointer;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }



// PriceRangeSlider.jsx
"use client";
import { useState, useEffect } from "react";
import colors from "@/theme/colors";

export default function PriceRangeSlider({ priceRange, setPriceRange, min = 0, max = 10000 }) {
  const [minVal, setMinVal] = useState(priceRange.min || min);
  const [maxVal, setMaxVal] = useState(priceRange.max || max);

  // Update parent when local changes
  useEffect(() => {
    setPriceRange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  // 🔥 Sync with parent reset
  useEffect(() => {
    setMinVal(priceRange.min || min);
    setMaxVal(priceRange.max || max);
  }, [priceRange, min, max]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="font-semibold text-lg">Price Range</h3>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Rs.{minVal}</span>
        <span>Rs.{maxVal}</span>
      </div>

      <div className="relative w-full h-6">
        {/* Track */}
        <div className="absolute top-2.5 w-full h-1 bg-gray-300 rounded" />

        {/* Highlight */}
        <div
          className="absolute top-2.5 h-1 bg-blue-500 rounded"
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
          }}
        />

        {/* Min handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(val);
          }}
          className="absolute w-full h-6 pointer-events-none appearance-none bg-transparent"
        />

        {/* Max handle */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(val);
          }}
          className="absolute w-full h-6 pointer-events-none appearance-none bg-transparent"
        />

        {/* Custom thumb styles */}
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            pointer-events: all;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: ${colors.primary};
            border: 2px solid white;
            cursor: pointer;
            -webkit-appearance: none;
          }
          input[type='range']::-moz-range-thumb {
            pointer-events: all;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: ${colors.primary};
            border: 2px solid white;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
}
