"use client";

import Image from "next/image";

export default function ProductHighlight({
  title = "Amazing Product",
  subtitle = "This is the best product you'll ever find!",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel urna quis libero tincidunt commodo.",
  imageUrl = "/images/hanger.jpg",
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-[16rem] max-w-7xl mx-auto rounded-2xl overflow-hidden p-2">
      {/* Left Content */}
      <div className="md:w-1/2 flex flex-col justify-center p-6 md:p-12 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
          {subtitle}
        </h3>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 relative min-h-[25rem] rounded-tr-2xl rounded-br-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full rounded-tr-2xl rounded-br-2xl"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </div>
    </div>
  );
}
