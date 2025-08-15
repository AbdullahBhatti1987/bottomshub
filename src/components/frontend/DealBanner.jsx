"use client";
import { motion } from "framer-motion";

export default function DealBanner() {
  const slideVariants = {
    hiddenLeft: { x: -100, opacity: 0 },
    hiddenRight: { x: 100, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  return (
    <section className="py-12 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white rounded-xl mx-4 md:mx-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideVariants}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">Summer Sale - Up to 50% Off!</h2>
          <p className="text-lg">On selected products only. Limited time offer.</p>
        </motion.div>
        <motion.button
          className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:scale-105 transition"
          initial="hiddenRight"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideVariants}
          transition={{ duration: 0.6 }}
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}
