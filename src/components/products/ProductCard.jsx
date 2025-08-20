// // "use client";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Heart } from "lucide-react";

// // const safeValue = (val) => {
// //   if (!val) return "";
// //   if (typeof val === "object")
// //     return val.value || val.name || JSON.stringify(val);
// //   return val;
// // };

// // export default function ProductCard({
// //   name,
// //   price,
// //   originalPrice,
// //   discount,
// //   images,
// //   slug,
// //   brand,
// //   category,
// //   shortDescription,
// // }) {
// //   return (
// //     <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
// //       <Link href={`/products/${slug}`}>
// //         {/* Image Box */}
// //         <div className="relative aspect-square w-full overflow-hidden">
// //           <Image
// //             src={
// //               images && images.length > 0
// //                 ? safeValue(images[0].url)
// //                 : "/images/placeholder.png"
// //             }
// //             alt={safeValue(name)}
// //             fill
// //             className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
// //           />

// //           {/* Discount Badge */}
// //           {discount && (
// //             <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
// //               {safeValue(discount.value)}% off
// //             </span>
// //           )}

// //           {/* Wishlist (Top Right) */}
// //           <button
// //             className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-1.5 rounded-full shadow transition"
// //             aria-label="Add to wishlist"
// //           >
// //             <Heart className="w-4 h-4 group-hover:text-red-500 transition" />
// //           </button>
// //         </div>
// //       </Link>

// //       {/* Info Section */}
// //       <div className="p-3">
// //         {/* Product Name */}
// //         <h3
// //           className="font-semibold text-sm text-gray-800 truncate group-hover:text-primary transition"
// //           title={safeValue(name)}
// //         >
// //           {safeValue(name)}
// //         </h3>

// //         {/* Category */}
// //         <p className="text-[11px] font-semibold uppercase text-gray-500 tracking-wide mb-1">
// //           {safeValue(category) || "New Arrival"}
// //         </p>

// //         {/* Short Description */}
// //         <p
// //           className="text-[11px] text-gray-500 tracking-wide mb-2 truncate"
// //           title={safeValue(shortDescription)}
// //         >
// //           {safeValue(shortDescription)}
// //         </p>

// //         {/* Price + Add to Cart */}
// //         <div className="flex items-center justify-between mt-1">
// //           <div className="flex items-center gap-2">
// //             <p className="font-bold text-primary text-sm">
// //               Rs.{safeValue(price)}
// //             </p>
// //             {originalPrice && (
// //               <p className="line-through text-xs text-gray-400">
// //                 Rs.{safeValue(originalPrice)}
// //               </p>
// //             )}
// //           </div>

// //         </div>

// //         <button className="w-full mt-2 bg-black text-white text-xs py-1.5 rounded-md hover:bg-gray-900 transition">
// //            Add to Cart
// //            </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart } from "lucide-react";
// import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
// import colors from "@/theme/colors";

// const safeValue = (val) => {
//   if (!val) return "";
//   if (typeof val === "object")
//     return val.value || val.name || JSON.stringify(val);
//   return val;
// };

// export default function ProductCard({
//   name,
//   price,
//   originalPrice,
//   discount,
//   images,
//   slug,
//   brand,
//   category,
//   shortDescription,
//   onAddToCart,
//   onWishlist,
// }) {
//   return (
//     <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
//       {/* Image Box with Link */}
//       <Link href={`/products/${slug}`}>
//         <div className="relative aspect-square w-full overflow-hidden">
//           <Image
//             src={
//               images && images.length > 0
//                 ? safeValue(images[0].url)
//                 : "/images/placeholder.png"
//             }
//             alt={safeValue(name)}
//             fill
//             className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//           />

//           {/* Discount Badge */}
//           {discount && (
//             <span
//               className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md shadow"
//               style={{
//                 backgroundColor: colors.primary,
//                 color: colors.white,
//               }}
//             >
//               {safeValue(discount.value)}% off
//             </span>
//           )}
//         </div>
//       </Link>

//       {/* Wishlist Button (Independent - No Route Change) */}
//       <button
//         className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-1.5 rounded-full shadow transition"
//         aria-label="Add to wishlist"
//         onClick={(e) => {
//           e.stopPropagation(); // route change prevent
//           e.preventDefault();
//           if (onWishlist) onWishlist();
//         }}
//       >
//         <IoHeartOutline className="w-4 h-4 group-hover:text-red-500 transition" />
//       </button>

//       {/* Info Section */}
//       <div className="p-3">
//         {/* Product Name (Link) */}
//         <Link href={`/products/${slug}`}>
//           <h3
//             className="font-semibold text-sm text-gray-800 truncate group-hover:text-primary transition"
//             title={safeValue(name)}
//           >
//             {safeValue(name)}
//           </h3>
//         </Link>

//         {/* Category */}
//         <p className="text-[11px] font-semibold uppercase text-gray-500 tracking-wide mb-1">
//           {safeValue(category) || "New Arrival"}
//         </p>

//         {/* Short Description */}
//         <p
//           className="text-[11px] text-gray-500 tracking-wide mb-2 truncate"
//           title={safeValue(shortDescription)}
//         >
//           {safeValue(shortDescription)}
//         </p>

//         {/* Price */}
//         <div className="flex items-center gap-2 mt-1">
//           <p className="font-bold text-primary text-sm">
//             Rs.{safeValue(price)}
//           </p>
//           {originalPrice && (
//             <p className="line-through text-xs text-gray-400">
//               Rs.{safeValue(originalPrice)}
//             </p>
//           )}
//         </div>

//         {/* Add to Cart (Independent Button) */}
//         <button
//           className="w-full mt-2 bg-black text-white text-xs py-1.5 rounded-md hover:bg-gray-900 transition"
//           onClick={(e) => {
//             e.stopPropagation(); // route prevent
//             e.preventDefault();
//             if (onAddToCart) onAddToCart();
//           }}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import colors from "@/theme/colors";

const safeValue = (val) => {
  if (!val) return "";
  if (typeof val === "object")
    return val.value || val.name || JSON.stringify(val);
  return val;
};

export default function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  images,
  slug,
  brand,
  category,
  shortDescription,
  onAddToCart,
  onWishlist,
}) {
  // local state for like/unlike
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Box with Link */}
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={
              images && images.length > 0
                ? safeValue(images[0].url)
                : "/images/placeholder.png"
            }
            alt={safeValue(name)}
            fill // or keep width/height if not using fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" // <-- add this
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {discount && (
            <span
              className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md shadow"
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
      </Link>

      {/* Wishlist Button (Independent - No Route Change) */}
      <button
        className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-1.5 rounded-full inset-shadow-md transition"
        aria-label="Add to wishlist"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
          if (onWishlist) onWishlist();
        }}
      >
        {isWishlisted ? (
          <IoHeartSharp className="w-4 h-4 text-black transition" />
        ) : (
          <IoHeartOutline className="w-4 h-4 text-black transition" />
        )}
      </button>

      {/* Info Section */}
      <div className="p-3">
        {/* Product Name (Link) */}
        <Link href={`/products/${slug}`}>
          <h3
            className="font-semibold text-sm text-gray-800 truncate group-hover:text-primary transition"
            title={safeValue(name)}
          >
            {safeValue(name)}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-[11px] font-semibold uppercase text-gray-500 tracking-wide mb-1">
          {safeValue(category) || "New Arrival"}
        </p>

        {/* Short Description */}
        <p
          className="text-[11px] text-gray-500 tracking-wide mb-2 truncate"
          title={safeValue(shortDescription)}
        >
          {safeValue(shortDescription)}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <p className="font-bold text-primary text-sm">
            Rs.{safeValue(price)}
          </p>
          {originalPrice && (
            <p className="line-through text-xs text-gray-400">
              Rs.{safeValue(originalPrice)}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className="w-full mt-2 bg-black text-white text-xs py-1.5 rounded-md hover:bg-gray-900 transition"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (onAddToCart) onAddToCart();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
