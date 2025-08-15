"use client";
import { motion } from "framer-motion";

export default function Newsletter() {
  const slideVariants = {
    hiddenLeft: { x: -100, opacity: 0 },
    hiddenRight: { x: 100, opacity: 0 },
    hiddenBottom: { y: 80, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  return (
    <section className="py-12 bg-gray-100 rounded-xl mx-4 md:mx-0">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideVariants}
          transition={{ duration: 0.6 }}
        >
          Subscribe for Exclusive Offers
        </motion.h2>
        <motion.p
          className="mb-6 text-gray-700"
          initial="hiddenRight"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideVariants}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get updates on new products and discounts.
        </motion.p>
        <motion.div
          className="flex justify-center gap-2 flex-wrap"
          initial="hiddenBottom"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Subscribe
          </button>
        </motion.div>
      </div>
    </section>
  );
}
