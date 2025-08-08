// "use client";

// export default function Textarea({
//   label,
//   value,
//   onChange,
//   placeholder = "Enter text...",
//   rows = 4,
//   disabled = false,
// }) {
//   return (
//     <div className=" mb-4 m-1 ">
//       {label && (
//         <label className="block text-sm font-medium mb-1 text-gray-700">
//           {label}
//         </label>
//       )}
//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         rows={rows}
//         disabled={disabled}
//         className="w-full border rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20"
//       />
//     </div>
//   );
// }


"use client";

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder = "Enter text...",
  rows = 4,
  disabled = false,
}) {
  return (
    <div className="mb-4 m-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name} // ✅ Add name
        value={value}
        onChange={onChange} // ✅ Pass entire event
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="w-full border rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20"
      />
    </div>
  );
}
