"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductCard({ name, price, image, idx }) {
  const [liked, setLiked] = useState(false);

  const slideVariants = {
    hiddenLeft: { x: -100, opacity: 0 },
    hiddenRight: { x: 100, opacity: 0 },
    hiddenBottom: { y: 80, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col"
      initial={idx % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={slideVariants}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-t-3xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating heart button */}
        <motion.button
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 1.2 }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md text-xl transition-colors duration-300 ${
            liked ? "text-red-500 bg-white" : "text-gray-300 hover:text-red-500 bg-white/80"
          }`}
        >
          ♥
        </motion.button>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-gray-900 font-semibold text-lg md:text-xl truncate">{name}</h3>
          <p className="text-gray-500 mt-1 text-md">{price}</p>
        </div>

        <button className="mt-4 w-full py-3 bg-black text-white rounded-xl font-medium text-sm md:text-base hover:bg-gray-800 hover:scale-105 transition-all">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
