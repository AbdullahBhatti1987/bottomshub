// "use client";

// import { useState } from "react";
// import { format } from "date-fns";
// import { Calendar } from "lucide-react";

// export default function DatePicker({ label, value, onChange, placeholder }) {
//   const [showPicker, setShowPicker] = useState(false);

//   return (
//     <div className="relative flex flex-col gap-0.5 w-full ">
//       {label && (
//         <label className="block text-sm font-medium mb-1 text-gray-700">
//           {label}
//         </label>
//       )}
//       <div className="relative w-full">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={value ? format(new Date(value), "yyyy-MM-dd") : ""}
//           onFocus={(e) => (e.target.type = "date")}
//           onBlur={(e) => (e.target.type = "text")}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full border bg-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react"; // lucide-react icon import

export default function DatePicker({ label, value, onChange, placeholder }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative flex flex-col gap-0.5 w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={value ? format(new Date(value), "yyyy-MM-dd") : ""}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border bg-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 pr-10" // extra right padding for icon
        />
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
