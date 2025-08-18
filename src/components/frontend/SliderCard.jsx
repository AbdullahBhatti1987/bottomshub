// "use client";
// import Image from "next/image";
// import Link from "next/link";

// export default function SliderCard({ slide, isActive }) {
//   return (
//     <div
//       className={`absolute w-full h-full transition-opacity duration-700 ${
//         isActive ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       {/* Background Image */}
//       {slide.backgroundImage && (
//         <Image
//           src={slide.backgroundImage}
//           alt="Background"
//           fill
//           className="object-cover z-0"
//           priority
//         />
//       )}

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/10 z-10" />

//       {/* Left Side Content Box */}
//       <div className="absolute inset-y-0 left-0 w-1/2 flex items-center px-4 sm:px-6 md:px-12 z-20">
//         {/* <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 max-w-md shadow-2xl"> */}
//           {/* <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-900">
//             {slide.heading}
//           </h2>
//           <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-700">
//             {slide.content}
//           </p> */}
//           {slide.buttonName && (
//             <Link href={slide.buttonRoute || "#"}>
//               <button className="mt-4 uppercase sm:mt-6 inline-block bg-black/20 text-black border shadow-lg  px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition">
//                 {slide.buttonName}
//               </button>
//             </Link>
//           )}
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }




"use client";
import Image from "next/image";
import Link from "next/link";

export default function SliderCard({ slide, isActive }) {
  return (
    <div
      className={`absolute w-full h-full transition-opacity duration-700 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Image (1920x1080 ratio maintain with cover) */}
      {slide.backgroundImage && (
        <Image
          src={slide.backgroundImage}
          alt="Background"
          fill
          className="object-cover object-center z-0"
          priority
        />
      )}

      {/* Overlay (optional for darkening/lightening) */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Button at 70% height, centered horizontally */}
      {slide.buttonName && (
        <div className="absolute left-1/2 top-[70%] transform -translate-x-1/2 z-20">
          <Link href={slide.buttonRoute || "#"}>
            <button className="uppercase bg-black/50 text-white border border-white shadow-md px-6 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition">
              {slide.buttonName}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
