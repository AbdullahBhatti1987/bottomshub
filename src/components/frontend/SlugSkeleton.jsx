// "use client";

// export default function SlugSkeleton() {
//   return (
//     <div className="py-12 container max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-h-[420px] animate-pulse px-4 md:px-6 lg:px-0">
//         {/* Left Skeleton */}
//         <div className="grid grid-cols-[50px_1fr] sm:grid-cols-[60px_1fr] gap-3 sm:gap-4">
//           {/* Thumbnails Skeleton */}
//           <div className="flex flex-col gap-2 sm:gap-3">
//             <div className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-lg bg-gray-200" />
//             {[...Array(4)].map((_, idx) => (
//               <div
//                 key={idx}
//                 className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-lg bg-gray-300"
//               />
//             ))}
//           </div>

//           {/* Main Image Skeleton */}
//           <div className="w-full bg-gray-200 rounded-xl aspect-square" />
//         </div>

//         {/* Right Skeleton */}
//         <div className="flex flex-col gap-4">
//           <div className="h-8 bg-gray-200 rounded w-3/4" />
//           <div className="h-4 bg-gray-200 rounded w-full" />
//           <div className="flex gap-4 mt-4">
//             <div className="h-6 bg-gray-200 rounded w-24" />
//             <div className="h-6 bg-gray-200 rounded w-16" />
//           </div>
//           <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
//           <div className="flex gap-2 mt-4">
//             {[...Array(5)].map((_, idx) => (
//               <div key={idx} className="flex-1 h-12  bg-gray-200 rounded-lg" />
//             ))}
//           </div>
//           <div className="flex items-center gap-3 mt-6">
//             <div className="w-12 h-12 bg-gray-200 rounded-lg" />
//             <div className="w-12 h-12 bg-gray-200 rounded-lg" />
//             <div className="w-12 h-12 bg-gray-200 rounded-lg" />
//           </div>
//           <div className="flex gap-3 mt-3">
//             <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
//             <div className="w-12 h-12 bg-gray-200 rounded-lg" />
//             <div className="w-12 h-12 bg-gray-200 rounded-lg" />
//           </div>
//           <div className="flex gap-3 mt-3">
//             <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

export default function SlugSkeleton() {
  return (
    <div className="py-12 container lg:max-w-7xl w-full mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
        {/* Left: Images */}
        <div className="grid grid-cols-[60px_1fr] lg:gap-4 gap-3">
          {/* Thumbnails Skeleton */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[420px]">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="w-[60px] h-[60px] rounded-lg bg-gray-200"
              />
            ))}
          </div>

          {/* Main Image Skeleton */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-square bg-gray-300" />
        </div>

        {/* Right: Product Info Skeleton */}
        <div className="flex flex-col gap-3 lg:gap-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" /> {/* Product name */}
          <div className="h-4 bg-gray-200 rounded w-full" /> {/* Short description */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-6 w-16 bg-gray-200 rounded" /> {/* Price */}
            <div className="h-6 w-16 bg-gray-200 rounded" /> {/* Original price */}
          </div>

          {/* Sizes Skeleton */}
          <div className="flex flex-wrap gap-2 mt-2">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-12 w-1/5 rounded-lg bg-gray-200"
              />
            ))}
          </div>

          {/* Quantity Skeleton */}
          <div className="flex items-center gap-2 mt-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gray-200" /> {/* Minus */}
            <div className="w-12 h-12 rounded-lg bg-gray-200" /> {/* Quantity */}
            <div className="w-12 h-12 rounded-lg bg-gray-200" /> {/* Plus */}
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col gap-6 w-full mt-4">
            <div className="flex gap-2">
              <div className="flex-1 h-12 rounded-lg bg-gray-200" /> {/* Add to Cart */}
              <div className="w-12 h-12 rounded-lg bg-gray-200" /> {/* Wishlist */}
              <div className="w-12 h-12 rounded-lg bg-gray-200" /> {/* Share */}
            </div>
            <div className="flex-1 h-12 rounded-lg bg-gray-200 mt-2" /> {/* Buy Now */}
          </div>
        </div>
      </div>
    </div>
  );
}
