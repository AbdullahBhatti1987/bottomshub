// components/frontend/ProductCard.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import colors from "@/theme/colors";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ProductCard({
  name,
  price,
  category,
  tags,
  images = [],
  idx,
}) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center w-full relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden shadow-lg bg-white group w-full"
        custom={idx}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Image */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden">
          <Image
            src={
              images && images.length > 0
                ? images[0].url
                : "/images/placeholder.png"
            }
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" // responsive sizing
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Tag */}
          {tags && (
            <span
              className="absolute px-2 py-1 text-white text-[10px] font-semibold rounded"
              style={{
                backgroundColor: colors.primary,
                top: "4px",
                left: "4px",
              }}
            >
              {tags}
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 p-3 rounded-full bg-transparent transition hover:scale-110 duration-300"
          >
            <Heart
              size={18}
              fill={liked ? colors.primary : "transparent"}
              color={liked ? colors.primary : colors.primary}
            />
          </button>
        </div>

        {/* Price Box */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{
            backgroundColor: `${colors.white}E6`,
            backdropFilter: "blur(6px)",
          }}
        >
          <h3
            className="font-semibold text-sm sm:text-base truncate"
            style={{ color: colors.grayDark }}
          >
            {name}
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: colors.secondary }}>
            {category?.name || "Uncategorized"}
          </p>

          <p
            className="text-sm sm:text-md font-bold"
            style={{ color: colors.secondary }}
          >
            Rs. {price}
          </p>
        </div>
      </motion.div>

      {/* Add to Cart Button */}
      <motion.button
        className="flex items-center justify-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm mt-[-18px] z-10"
        style={{ backgroundColor: colors.primary, color: colors.white }}
        animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.05, backgroundColor: colors.primaryHover }}
      >
        <ShoppingCart size={16} />
        Add to Cart
      </motion.button>
    </div>
  );
}
