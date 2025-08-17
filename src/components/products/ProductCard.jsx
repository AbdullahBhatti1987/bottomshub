// "use client";
// import Image from "next/image";
// import Link from "next/link";

// export default function ProductCard({ name, price, images, slug }) {
//   return (
//     <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
//       <Link href={`/products/${slug}`}>
//         <div className="relative w-full h-64">
//           <Image
//             src={images && images.length > 0 ? images[0].url : "/images/placeholder.png"}
//             alt={name}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//             className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
//           />
//         </div>
//         <div className="p-3">
//           <h3 className="font-semibold text-lg">{name}</h3>
//           <p className="font-bold text-primary">{price}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

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
}) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${slug}`}>
        {/* Square Image Box */}
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={
              images && images.length > 0
                ? safeValue(images[0].url)
                : "/images/placeholder.png"
            }
            alt={safeValue(name)}
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow">
              -{safeValue(discount)}%
            </span>
          )}

          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow transition"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 group-hover:text-red-500 transition" />
          </button>
        </div>

        {/* Info Section */}
        <div className="p-2 md:p-3">
          {/* Brand */}
          <p className="text-[9px] md:text-[10px] uppercase text-gray-500 tracking-wide mb-1">
            {safeValue(brand) || safeValue(category) || "New Arrival"}
          </p>

          {/* Product Name */}
          <h3
            className="font-semibold text-[11px] md:text-sm text-gray-800 truncate group-hover:text-primary transition"
            title={safeValue(name)} // hover par full name dikhaye
          >
            {safeValue(name)}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-1 mt-1">
            <p className="font-bold text-primary text-[11px] md:text-sm">
              Rs.{safeValue(price)}
            </p>
            {originalPrice && (
              <p className="line-through text-[10px] md:text-[12px] text-gray-400">
                Rs.{safeValue(originalPrice)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
