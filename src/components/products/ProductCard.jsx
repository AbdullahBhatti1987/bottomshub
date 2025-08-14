// components/ProductCard.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function ProductCard({ product }) {
  const { name, slug, price, originalPrice, tags, images, inStock } = product;

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={images?.[0]?.thumbnailUrl || "/placeholder.png"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Tag badge */}
        {tags && (
          <span
            className={clsx(
              "absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md bg-white/30 shadow-sm text-white",
              tags === "sale" ? "bg-red-500/80" : "bg-green-500/80"
            )}
          >
            {tags}
          </span>
        )}

        {/* Discount badge */}
        {discountPercent && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm text-black backdrop-blur-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-indigo-600">Rs. {price}</span>
          {originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {originalPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/products/${slug}`}
            className="flex-1 border border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 text-sm font-medium py-1.5 rounded-lg text-center transition-colors"
          >
            View
          </Link>

          <button
            disabled={!inStock}
            className={clsx(
              "flex-1 text-sm font-medium py-1.5 rounded-lg shadow-sm transition-all duration-200 transform",
              inStock
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white hover:scale-105 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            {inStock ? (
              <span className="flex items-center justify-center gap-1">
                🛒 Add to Cart
              </span>
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
