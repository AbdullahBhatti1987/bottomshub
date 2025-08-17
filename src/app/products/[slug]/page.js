"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/lib/axios";
import colors from "@/theme/colors";
import { IoHeartOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";

export default function ProductDetailPage() {
  const params = useParams();
  const { slug } = params;
  const [wishlist, setWishlist] = useState(false);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); // ✅ selected size

  const sizeMap = ["sm", "md", "lg", "xl", "xxl"];

  const fetchProductBySlug = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${slug}`);
      setProduct(res.data.data);
      setSelectedImage(res.data.data.images[0]?.url || null);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (slug) fetchProductBySlug();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-12 container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-h-[420px] animate-pulse">
          {/* Left Skeleton */}
          <div className="grid grid-cols-[60px_1fr] gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-[60px] h-[60px] bg-gray-200 rounded-lg"
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="w-full h-full bg-gray-200 rounded-xl aspect-square" />
          </div>

          {/* Right Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="flex gap-4 mt-4">
              <div className="h-6 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded w-16" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
            {/* Sizes */}
            <div className="flex gap-2 mt-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="w-12 h-12 bg-gray-200 rounded-lg" />
              ))}
            </div>
            {/* Quantity */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="w-16 h-12 bg-gray-200 rounded-lg" />
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
            </div>
            {/* Wishlist + Add to Cart */}
            <div className="flex gap-3 mt-6">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Full Description Skeleton */}
        <div className="mt-12 space-y-3 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="h-[500px] flex items-center justify-center">
        <p>Product not found!</p>
      </div>
    );

  return (
    <div className="py-12 container lg:max-w-7xl w-full mx-auto px-4">
      <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-8 md:gap-12 ">
        {/* Left: Images */}
        <div className="grid grid-cols-[60px_1fr] gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[420px]">
            {product?.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img.url)}
                className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 flex-shrink-0`}
                style={{
                  width: "60px",
                  height: "60px",
                  borderColor:
                    selectedImage === img.url ? colors.primary : "#D1D5DB",
                  borderWidth: selectedImage === img.url ? "2px" : "1px",
                }}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  width={60}
                  height={60}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="shadow-lg rounded-xl overflow-hidden aspect-square ">
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={selectedImage}
                    alt={product?.name || "Product Image"}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Product Info */}
        {/* Right: Product Info */}
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl  lg:text-3xl font-bold leading-snug">
            {product.name}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm  md:text-base lg:text-lg leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 sm:gap-4  ">
            <span className="text-xs sm:text-sm md:text-md lg:text-xl font-bold text-red-600">
              Rs.{product.price}
            </span>
            {product.originalPrice > 0 && (
              <span className="line-through text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg">
                Rs.{product.originalPrice}
              </span>
            )}
          </div>

          {/* Category & SKU */}
          <div className="flex gap-2 sm:gap-4 flex-wrap text-gray-500   text-[10px] sm:text-xs md:text-sm lg:text-base">
            <span>Category: {product.category?.name || "Uncategorized"}</span>
            {product?.sku && <span>SKU: {product.sku}</span>}
          </div>

          {/* Sizes */}
          {product?.sizes?.some((s) => s.quantity > 0) && (
            <div>
              <h3 className="font-semibold mb-1 sm:mb-2 text-gray-700 text-xs sm:text-sm md:text-base">
                Available Sizes:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes
                  .filter((s) => s.quantity > 0)
                  .map((s, idx) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <span
                        key={idx}
                        onClick={() => setSelectedSize(s.size)}
                        style={
                          isSelected
                            ? {
                                backgroundColor: colors.primary,
                                color: "white",
                                borderColor: colors.primary,
                              }
                            : {}
                        }
                        className={`uppercase flex items-center justify-center 
                  rounded-lg bg-gray-100/50 border border-gray-400/40 shadow-md 
                  cursor-pointer transition font-medium

                  text-[10px] px-2 py-1          /* xs */
                  sm:text-xs sm:px-2.5 sm:py-1.5 /* sm */
                  md:text-sm md:px-3 md:py-2     /* md */
                  lg:text-base lg:px-4 lg:py-2.5 /* lg */

                  ${!isSelected ? "hover:bg-blue-50 hover:border-blue-400" : ""}
                `}
                      >
                        {s.size}
                      </span>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="
        w-8 h-8 text-sm
        sm:w-10 sm:h-10 sm:text-base
        md:w-11 md:h-11 md:text-base
        lg:w-12 lg:h-12 lg:text-lg
        flex items-center justify-center 
        rounded-lg bg-gray-100/50 border border-gray-400/40
      "
            >
              -
            </button>

            <span
              className="
        w-10 h-8 text-sm
        sm:w-12 sm:h-10 sm:text-base
        md:w-14 md:h-11 md:text-base
        lg:w-16 lg:h-12 lg:text-lg
        flex items-center justify-center border rounded-lg font-medium
      "
            >
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="
        w-8 h-8 text-sm
        sm:w-10 sm:h-10 sm:text-base
        md:w-11 md:h-11 md:text-base
        lg:w-12 lg:h-12 lg:text-lg
        flex items-center justify-center 
        rounded-lg bg-gray-100/50 border border-gray-400/40
      "
            >
              +
            </button>
          </div>

          {/* Wishlist + Cart */}
          <div className="flex gap-3 sm:gap-4 md:gap-5">
            {/* Heart */}
            <button
              onClick={() => setWishlist((prev) => !prev)}
              className="
        w-8 h-8
        sm:w-10 sm:h-10
        md:w-11 md:h-11
        lg:w-12 lg:h-12
        flex items-center justify-center rounded-lg 
        bg-gray-100/50 border border-gray-400/40
      "
            >
              {wishlist ? (
                <IoIosHeart
                  className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6"
                  style={{ color: colors.primary }}
                />
              ) : (
                <IoHeartOutline className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-500" />
              )}
            </button>

            {/* Cart */}
            <button
              className="
        flex-1 
        px-3 py-1.5 text-xs
        sm:px-4 sm:py-2 sm:text-sm
        md:px-5 md:py-2.5 md:text-base
        lg:px-6 lg:py-3 lg:text-lg
        rounded-lg font-semibold transition hover:opacity-90
      "
              style={{ backgroundColor: colors.primary, color: colors.white }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {product?.description && (
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Product Details
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
