"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import colors from "@/theme/colors";
import { BASE_URL } from "@/lib/axios";
import ProductCard from "../products/ProductCard";

export default function ProductsSection({ limit = 8 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products`, {
        params: { page: 1, limit },
      });
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };

useEffect(() => {
  fetchProducts();
}, []);


  return (
    <section className="py-12 container w-full md:w-[90%] lg:w-[85%] mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: limit }).map((_, idx) => (
              <div
                key={idx}
                className="h-64 bg-gray-200 animate-pulse rounded-xl"
              />
            ))
          : products.map((prod, idx) => <ProductCard key={idx} {...prod} idx={idx} />)}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl font-semibold text-white transition hover:scale-105 inline-block text-center"
          style={{ backgroundColor: colors.primary }}
        >
          More Products
        </Link>
      </div>
    </section>
  );
}
