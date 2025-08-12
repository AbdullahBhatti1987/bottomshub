// "use client";

// export default function Button({ children, onClick, disabled, className = "", type = "button" }) {
//   return (
//     <button
//       type={type}
//       disabled={disabled}
//       onClick={onClick}
//       className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50 ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

"use client";

export default function Button({
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
  variant = "default",
  size = "md",
}) {
  // Variant styles
  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    ghost: "bg-gray-300 text-black hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-gray-400 text-white hover:bg-gray-600",
    // aap yahan aur bhi variants add kar sakte hain
  };

  // Size styles
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded
         whitespace-nowrap
        ${variantClasses[variant] || variantClasses.default}
        ${sizeClasses[size] || sizeClasses.md}
        disabled:opacity-50
        w-fit
        ${className}
      `}
    >
      {children}
    </button>
  );
}
