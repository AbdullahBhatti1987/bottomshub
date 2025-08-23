"use client";

import { RecentViewedContext } from "@/context/RecentViewedContext";
import { useContext } from "react";
import ProductCard from "@/components/products/ProductCard"; // make sure path is correct

export default function RecentViewedProducts({ onAddToCart, onWishlist }) {
  const { recentProducts, loading } = useContext(RecentViewedContext);

  if (!recentProducts.length) return null;

  return (
    <div className="mt-8">
      <h3 className="font-semibold text-lg mb-4">Recently Viewed Products</h3>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-60 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentProducts.map((product, idx) => (
            <ProductCard
              key={product._id || idx}
              {...product}
              onAddToCart={() => onAddToCart && onAddToCart(product)}
              onWishlist={() => onWishlist && onWishlist(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
