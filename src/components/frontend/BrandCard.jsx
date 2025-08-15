"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandCard({ src, idx }) {
  return (
    <motion.div
      className="flex-none"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      <Image src={src} alt={`Brand ${idx}`} width={120} height={60} className="object-contain"/>
    </motion.div>
  );
}
