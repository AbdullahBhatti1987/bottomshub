
// HeaderWrapper.jsx (client component)
"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/frontend/Header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const offers = [
  "🔥 50% Off on Summer Collection",
  "🚚 Free Shipping on Orders Above Rs. 2000",
  "💳 Flat 10% Discount with Code: SAVE10",
];

export default function HeaderWrapper() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change offer after 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed top-0 z-50 w-full">
      {/* 🔔 Notification Bar */}
      <div className="bg-black text-white text-sm h-8 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute w-full text-center"
          >
            {offers[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="bg-white shadow-md flex justify-center">
        <div className="relative max-w-7xl w-full flex items-center h-14">
          <Header />
        </div>
      </div>
    </div>
  );
}
