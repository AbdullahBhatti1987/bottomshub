"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CategoryCard({ name, slug, imageUrl, idx }) {
  const router = useRouter();

  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleClick = () => {
    router.push(`/categories/${slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full h-48"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover w-full h-full"
        priority={false}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-60 transition duration-300"></div>

      {/* Title Glassmorphism */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="backdrop-blur-md bg-black/50 rounded-lg px-3 py-1 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{name}</span>
        </div>
      </div>
    </motion.div>
  );
}
