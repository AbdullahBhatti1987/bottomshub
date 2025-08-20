"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import colors from "@/theme/colors";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";

export default function BestSellers() {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/top`);
        setProducts(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!products.length) return null; // ya loading spinner show kar sakte ho

  return (
    <section className="py-12 container w-full md:w-[90%] lg:w-[85%] mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Best Sellers
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isWishlisted = wishlist.includes(product._id);

          return (
            <div
              key={product._id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={product.images[0]?.url || "/images/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex flex-col justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 p-2">
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                  >
                    {isWishlisted ? (
                      <IoHeartSharp className="text-red-500 w-5 h-5" />
                    ) : (
                      <IoHeartOutline className="w-5 h-5 text-gray-800" />
                    )}
                  </button>
                  <button className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
                    <FaEye className="w-5 h-5 text-gray-800" />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <span
                    className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-md shadow"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                    }}
                  >
                    {product.discount.type === "percentage"
                      ? `${product.discount.value}% OFF`
                      : product.discount.type === "flat"
                      ? `Rs ${product.discount.value} OFF`
                      : ""}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-primary text-sm">
                    Rs.{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="line-through text-xs text-gray-400">
                      Rs.{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 bg-black text-white text-xs py-1.5 rounded-lg font-semibold hover:opacity-90 transition opacity-0 group-hover:opacity-100">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
