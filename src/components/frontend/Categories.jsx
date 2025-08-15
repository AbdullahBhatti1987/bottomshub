"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Men", image: "/images/category-men.jpg" },
  { name: "Women", image: "/images/category-women.avif" },
  { name: "Kids", image: "/images/category-kids.jpg" },
  { name: "Accessories", image: "/images/category-accessories.avif" },
  { name: "Shoes", image: "/images/category-shoes.webp" },
  { name: "Bags", image: "/images/category-bags.jpeg" },
];

const trendingProducts = [
  { name: "Product 1", price: "$49.99", image: "/products/product1.jpeg" },
  { name: "Product 2", price: "$59.99", image: "/products/product1.jpeg" },
  { name: "Product 3", price: "$39.99", image: "/products/product1.jpeg" },
  { name: "Product 4", price: "$29.99", image: "/products/product1.jpeg" },
];

const newArrivals = [
  { name: "New 1", price: "$69.99", image:  "/products/product1.jpeg" },
  { name: "New 2", price: "$79.99", image:  "/products/product1.jpeg" },
  { name: "New 3", price: "$59.99", image:  "/products/product1.jpeg" },
  { name: "New 4", price: "$89.99", image:  "/products/product1.jpeg" },
];

const brands = [
  "/products/product1.jpeg",
  "/products/product1.jpeg",
  "/products/product1.jpeg",
  "/products/product1.jpeg",
  "/products/product1.jpeg",
];

const slideVariants = {
  hiddenLeft: { x: -100, opacity: 0 },
  hiddenRight: { x: 100, opacity: 0 },
  hiddenBottom: { y: 80, opacity: 0 },
  visible: { x: 0, y: 0, opacity: 1 },
};

export default function HomeContent() {
  return (
    <div className="w-full">

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                initial={idx % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideVariants}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-40"
                />
                <div className="absolute bottom-2 left-2 text-white font-bold text-lg drop-shadow-md">
                  {cat.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Trending Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {trendingProducts.map((prod, idx) => (
              <motion.div
                key={idx}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
                initial={idx % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideVariants}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{prod.name}</h3>
                  <p className="text-sm text-gray-500">{prod.price}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <button className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition">
                      Add to Cart
                    </button>
                    <button className="text-red-500 hover:text-red-600">♥</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals / Offers */}
      <section className="py-12 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white">
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
            className="px-6 py-3 bg-white text-black rounded font-bold hover:scale-105 transition"
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

      {/* New Arrivals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {newArrivals.map((prod, idx) => (
              <motion.div
                key={idx}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
                initial={idx % 2 === 0 ? "hiddenBottom" : "hiddenLeft"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideVariants}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{prod.name}</h3>
                  <p className="text-sm text-gray-500">{prod.price}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <button className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition">
                      Add to Cart
                    </button>
                    <button className="text-red-500 hover:text-red-600">♥</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Brands</h2>
          <div className="flex space-x-6 overflow-x-auto">
            {brands.map((brand, idx) => (
              <motion.div
                key={idx}
                className="flex-none"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Image src={brand} alt={`Brand ${idx}`} width={120} height={60} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Subscription */}
      <section className="py-12 bg-gray-100">
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
    </div>
  );
}
