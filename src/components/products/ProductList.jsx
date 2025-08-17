"use client";
import ProductCard from "./ProductCard";

export default function ProductsList({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {products.map((prod, idx) => (
        <ProductCard key={idx} {...prod} />
      ))}
    </div>
  );
}
