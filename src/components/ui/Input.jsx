// "use client";

// export default function Input({
//   label,
//   type = "text",
//   name,
//   value,
//   onChange,
//   placeholder = "",
//   required = false,
//   disabled = false,
//   error = "",
//   className = "",
// }) {
//   return (
//     <div className={`mb-4 m-1 ${className}`}>
//       {label && (
//         <label
//           htmlFor={name}
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           {label}
//         </label>
//       )}
//       <input
//         type={type}
//         name={name}
//         id={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         disabled={disabled}
//         className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
//           error ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );
// }


"use client";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  className = "",
  min,
  step,
  onBlur, // support external onBlur (e.g., for formatting)
}) {
  return (
    <div className={`mb-4 m-1 bg-white rounded-md  ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        step={step}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500" : "border-gray-300"
        } 
        ${type === "number" ? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" : ""}
        `}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
