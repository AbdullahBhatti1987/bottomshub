"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryCard({ name, image, idx }) {
  const slideVariants = {
    hiddenLeft: { x: -100, opacity: 0 },
    hiddenRight: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      initial={idx % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={slideVariants}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="object-cover w-full h-48 md:h-56 lg:h-60"
      />

      {/* Hover Overlay */}
      {/* Hover Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300"></div> */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 group-hover:backdrop-blur-sm transition duration-300"></div>

      {/* Text Blur Box */}
      <div className="absolute bottom-2 left-2 right-2">
        <div className="backdrop-blur-md bg-black/40 rounded-lg px-3 py-1 flex items-center justify-center">
          <span className="text-white font-bold text-lg drop-shadow-md">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
