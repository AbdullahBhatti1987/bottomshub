"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandSlider() {
  const brands = [
    { name: "Nike", logo: "/images/gulahmad.png" },
    { name: "Adidas", logo: "/images/gulahmad.png" },
    { name: "Puma", logo: "/images/gulahmad.png" },
    { name: "Reebok", logo: "/images/gulahmad.png" },
    { name: "Levis", logo: "/images/gulahmad.png" },
    { name: "Gucci", logo: "/images/gulahmad.png" },
  ];

  // Duplicate the array for seamless scroll
  const scrollingBrands = [...brands, ...brands];

  return (
    <div className="overflow-hidden py-8 bg-gray-100">
      <div className="flex gap-8 min-w-max animate-scroll">
        {scrollingBrands.map((brand, idx) => (
          <motion.div
            key={idx}
            className="flex-shrink-0 w-32 h-16 flex items-center justify-center p-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={128}
              height={64}
              priority
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          gap: clamp(
            2rem,
            5vw,
            10rem
          ); /* responsive gap: min 2rem, max 10rem */
          min-width: max-content;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
