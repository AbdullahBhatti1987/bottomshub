"use client";

export default function IconButton({ type }) {
  const icons = {
    wishlist: "❤️",
    cart: "🛒",
    login: "👤",
  };

  return (
    <button className="text-xl hover:text-blue-500 transition">
      {icons[type]}
    </button>
  );
}
