"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import colors from "@/theme/colors"; // apka colors.js import

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold"
          >
            About BottomsHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-200"
          >
            Your one-stop destination for premium bottoms. Crafted for comfort,
            styled for confidence.
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            At <span className="font-semibold">BottomsHub</span>, we believe
            style starts from the ground up. Our mission is to bring you
            high-quality jeans, trousers, joggers, and more that blend
            durability with modern design. Every piece we create is built to
            last, designed for movement, and styled to turn heads.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-72 w-full rounded-2xl overflow-hidden"
        >
          <Image
            src="/Images/abdullahbhatti.png"
            alt="About BottomsHub"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                desc: "Premium fabrics and durable stitching, ensuring comfort and long life.",
              },
              {
                title: "Style",
                desc: "Modern cuts and timeless looks for every occasion.",
              },
              {
                title: "Sustainability",
                desc: "Eco-friendly practices to reduce waste and promote responsible fashion.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6 text-center"
              >
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: colors.primary }}
                >
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-white text-center"
        style={{ backgroundColor: colors.primary }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Join the BottomsHub Movement
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          Discover the perfect bottoms that match your lifestyle. Fashion meets
          comfort, only at BottomsHub.
        </p>

        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-full font-semibold transition"
          style={{ backgroundColor: colors.white, color: colors.primary }}
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
