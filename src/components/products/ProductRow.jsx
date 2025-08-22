// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
// import colors from "@/theme/colors";

// const safeValue = (val) => {
//   if (!val) return "";
//   if (typeof val === "object")
//     return val.value || val.name || JSON.stringify(val);
//   return val;
// };

// export default function ProductRow({
//   name,
//   price,
//   originalPrice,
//   discount,
//   images,
//   slug,
//   category,
//   shortDescription,
//   onAddToCart,
//   onWishlist,
// }) {
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   return (
//     <div className="relative flex items-center gap-4 bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition">
//       {/* ❤️ Wishlist Icon - Mobile Only */}
//       <button
//         className="absolute top-2 right-2 block md:hidden"
//         onClick={() => {
//           setIsWishlisted(!isWishlisted);
//           if (onWishlist) onWishlist();
//         }}
//       >
//         {isWishlisted ? (
//           <IoHeartSharp className="w-5 h-5 text-red-500" />
//         ) : (
//           <IoHeartOutline className="w-5 h-5 text-gray-600" />
//         )}
//       </button>

//       {/* 📷 Image */}
//       <Link
//         href={`/products/${slug}`}
//         className="relative w-28 h-28 flex-shrink-0"
//       >
//         <Image
//           src={
//             images && images.length > 0
//               ? safeValue(images[0].url)
//               : "/images/placeholder.png"
//           }
//           alt={safeValue(name)}
//           fill
//           className="object-cover rounded-md"
//         />
//         {discount && (
//           <span
//             className="absolute top-1 left-1 text-[10px] font-bold px-2 py-0.5 rounded-md shadow"
//             style={{
//               backgroundColor: colors.primary,
//               color: colors.white,
//             }}
//           >
//             {discount.type === "percentage"
//               ? `${discount.value}% OFF`
//               : discount.type === "flat"
//               ? `Rs ${discount.value} OFF`
//               : discount.type === "buy1get1"
//               ? "Buy 1 Get 1"
//               : ""}
//           </span>
//         )}
//       </Link>

//       {/* 📄 Info */}
//       <div className="flex-1">
//         <Link href={`/products/${slug}`}>
//           <h3 className="font-semibold text-sm text-gray-800 hover:text-primary transition">
//             {safeValue(name)}
//           </h3>
//         </Link>
//         <p className="text-[11px] font-semibold uppercase text-gray-500 tracking-wide">
//           {safeValue(category) || "New Arrival"}
//         </p>
//         <p className="text-[11px] text-gray-500 tracking-wide line-clamp-2 mb-1">
//           {safeValue(shortDescription)}
//         </p>

//         {/* 💰 Price */}
//         <div className="flex items-center gap-2">
//           <p className="font-bold text-primary text-sm">
//             Rs.{safeValue(price)}
//           </p>
//           {originalPrice && (
//             <p className="line-through text-xs text-gray-400">
//               Rs.{safeValue(originalPrice)}
//             </p>
//           )}
//         </div>

//         {/* 🛒 Actions (Desktop Only) */}
//         <div className="hidden md:flex gap-2 mt-2">
//           <button
//             className="bg-black text-white text-xs px-3 py-1.5 rounded hover:bg-gray-900 transition"
//             onClick={onAddToCart}
//           >
//             Add to Cart
//           </button>
//           <button
//             className="flex items-center gap-1 text-xs px-3 py-1.5 border rounded hover:bg-gray-100 transition"
//             onClick={() => {
//               setIsWishlisted(!isWishlisted);
//               if (onWishlist) onWishlist();
//             }}
//           >
//             {isWishlisted ? (
//               <IoHeartSharp className="w-4 h-4 " 
//               style={{color : colors.primary}}
//               />
//             ) : (
//               <IoHeartOutline className="w-4 h-4 text-gray-600" />
//             )}
//             Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import colors from "@/theme/colors";

const safeValue = (val) => {
  if (!val) return "";
  if (typeof val === "object")
    return val.value || val.name || JSON.stringify(val);
  return val;
};

export default function ProductRow({
  name,
  price,
  originalPrice,
  discount,
  images,
  slug,
  category,
  shortDescription,
  onAddToCart,
  onWishlist,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/products/${slug}`);
  };

  return (
    <div
      className="relative flex items-center gap-4 bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition cursor-pointer"
      onClick={handleNavigate}
    >
      {/* ❤️ Wishlist Icon - Mobile Only */}
      <button
        className="absolute top-2 right-2 block md:hidden z-10"
        onClick={(e) => {
          e.stopPropagation(); // stop parent click
          setIsWishlisted(!isWishlisted);
          if (onWishlist) onWishlist();
        }}
      >
        {isWishlisted ? (
          <IoHeartSharp className="w-5 h-5 text-red-500" />
        ) : (
          <IoHeartOutline className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* 📷 Image */}
      <div className="relative w-28 h-28 flex-shrink-0">
        <Image
          src={
            images && images.length > 0
              ? safeValue(images[0].url)
              : "/images/placeholder.png"
          }
          alt={safeValue(name)}
          fill
          className="object-cover rounded-md"
        />
        {discount && (
          <span
            className="absolute top-1 left-1 text-[10px] font-bold px-2 py-0.5 rounded-md shadow"
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
            }}
          >
            {discount.type === "percentage"
              ? `${discount.value}% OFF`
              : discount.type === "flat"
              ? `Rs ${discount.value} OFF`
              : discount.type === "buy1get1"
              ? "Buy 1 Get 1"
              : ""}
          </span>
        )}
      </div>

      {/* 📄 Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm text-gray-800 hover:text-primary transition">
          {safeValue(name)}
        </h3>
        <p className="text-[11px] font-semibold uppercase text-gray-500 tracking-wide">
          {safeValue(category) || "New Arrival"}
        </p>
        <p className="text-[11px] text-gray-500 tracking-wide line-clamp-2 mb-1">
          {safeValue(shortDescription)}
        </p>

        {/* 💰 Price */}
        <div className="flex items-center gap-2">
          <p className="font-bold text-primary text-sm">
            Rs.{safeValue(price)}
          </p>
          {originalPrice && (
            <p className="line-through text-xs text-gray-400">
              Rs.{safeValue(originalPrice)}
            </p>
          )}
        </div>

        {/* 🛒 Actions (Desktop Only) */}
        <div className="hidden md:flex gap-2 mt-2">
          <button
            className="bg-black text-white text-xs px-3 py-1.5 rounded hover:bg-gray-900 transition"
            onClick={(e) => {
              e.stopPropagation(); // stop parent click
              onAddToCart();
            }}
          >
            Add to Cart
          </button>
          <button
            className="flex items-center gap-1 text-xs px-3 py-1.5 border rounded hover:bg-gray-100 transition"
            onClick={(e) => {
              e.stopPropagation(); // stop parent click
              setIsWishlisted(!isWishlisted);
              if (onWishlist) onWishlist();
            }}
          >
            {isWishlisted ? (
              <IoHeartSharp
                className="w-4 h-4"
                style={{ color: colors.primary }}
              />
            ) : (
              <IoHeartOutline className="w-4 h-4 text-gray-600" />
            )}
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
