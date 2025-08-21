"use client";

import colors from "@/theme/colors";
import Image from "next/image";

export default function ProductHighlight({
  title = "Premium Summer Collection",
  subtitle = "Finest Cotton Fabric for Style & Comfort",
  description = "tay cool and stylish with our finest cotton fabric. Perfect stitching, soft texture, and long-lasting colors—made for your comfort and elegance.",
  imageUrl = "/images/hanger.jpg",
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[20rem] max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg my-12">
      {/* Left Content */}
      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-12 bg-gradient-to-r from-white via-gray-50 to-pink-50">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
          {title}
        </h2>
        <h3
          className="text-lg md:text-2xl font-semibold  mb-4"
          style={{ color: colors.primary }}
        >
          {subtitle}
        </h3>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
          {description}
        </p>
        <button
          className="px-6 py-3  text-white rounded-xl shadow-md hover:bg-pink-700 transition"
          style={{ backgroundColor: colors.primary, color: colors.button }}
        >
          Explore
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 relative min-h-[25rem]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
          className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </div>
  );
}
