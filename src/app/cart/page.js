"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { IoTrash } from "react-icons/io5";
import { BASE_URL } from "@/lib/axios";
import colors from "@/theme/colors";
import { CartContext } from "@/context/CartContext";

const safeValue = (val) => {
  if (!val) return "";
  if (typeof val === "object")
    return val.value || val.name || JSON.stringify(val);
  return val;
};

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-md p-3 flex flex-col gap-2">
    <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    <div className="h-6 bg-gray-200 rounded w-full mt-auto"></div>
    <div className="h-6 bg-gray-200 rounded w-full"></div>
  </div>
);

export default function WishlistPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length > 0) fetchProducts();
    else setProducts([]);
  }, [cart]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/products?ids=${cart.join(",")}`);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch cart products:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleBuyNow = (product) => {
    console.log("Buy Now:", product._id);
  };

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : cart.length === 0 ? (
        <p className="text-gray-500 text-lg">No items in your cart.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={safeValue(product.name)}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.discount && (
                    <span
                      className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md shadow"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.white,
                      }}
                    >
                      {product.discount.type === "percentage"
                        ? `${product.discount.value}% OFF`
                        : product.discount.type === "flat"
                        ? `Rs ${product.discount.value} OFF`
                        : product.discount.type === "buy1get1"
                        ? "Buy 1 Get 1"
                        : ""}
                    </span>
                  )}
                </div>
              </Link>

              <button
                className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-1.5 rounded-full shadow-md transition transform hover:scale-110 cursor-pointer"
                aria-label="Remove from cart"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeFromCart(product._id);
                }}
              >
                <IoTrash className="w-4 h-4 text-red-500 transition-transform duration-300" />
              </button>

              <div className="p-3 flex flex-col">
                <Link href={`/products/${product.slug}`}>
                  <h3
                    className="font-semibold text-sm text-gray-800 truncate group-hover:text-primary transition"
                    title={safeValue(product.name)}
                  >
                    {safeValue(product.name)}
                  </h3>
                </Link>

                <p className="text-[11px] font-semibold uppercase text-gray-500 tracking-wide mb-1">
                  {safeValue(product.brand)} {safeValue(product.category)}
                </p>

                <p
                  className="text-[11px] text-gray-500 tracking-wide mb-2 line-clamp-2"
                  title={safeValue(product.shortDescription)}
                >
                  {safeValue(product.shortDescription)}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <p className="font-bold text-primary text-sm">
                    Rs.{safeValue(product.price)}
                  </p>
                  {product.originalPrice && (
                    <p className="line-through text-xs text-gray-400">
                      Rs.{safeValue(product.originalPrice)}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-2">
                 
                  <button
                    className="w-full mt-1 border border-gray-800 text-gray-800 text-sm md:text-base py-1.5 rounded-md hover:bg-gray-800 hover:text-white transition"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
