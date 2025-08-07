"use client";

export default function Button({ children, onClick, disabled, className = "", type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
