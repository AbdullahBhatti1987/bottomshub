// components/ui/AddToCartButton.jsx
"use client";
import { useState } from "react";

export default function AddToCartButton({ onClick }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    if (onClick) onClick();
    setTimeout(() => {
      setLoading(false);
    }, 800); // simulate cart adding animation
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`relative w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300
        ${loading ? "bg-green-700" : "bg-green-500 hover:bg-green-600 active:scale-95"}
        flex items-center justify-center gap-2`}
    >
      {loading ? (
        <span className="animate-bounce">🛒 Already Added</span>
      ) : (
        <>
          🛒 Add to Cart
        </>
      )}
    </button>
  );
}
