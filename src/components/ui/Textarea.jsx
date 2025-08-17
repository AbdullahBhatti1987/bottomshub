
// "use client";

// export default function Textarea({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder = "Enter text...",
//   rows = 4,
//   disabled = false,
// }) {
//   return (
//     <div className="mb-4 m-1">
//       {label && (
//         <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700">
//           {label}
//         </label>
//       )}
//       <textarea
//         id={name}
//         name={name} // ✅ Add name
//         value={value}
//         onChange={onChange} // ✅ Pass entire event
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
  required = false,
  error = "",
  className = "",
  onBlur,
}) {
  return (
    <div className={`bg-white rounded-md ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500" : "border-gray-300"
        } ${
          disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"
        } text-sm text-gray-800`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
