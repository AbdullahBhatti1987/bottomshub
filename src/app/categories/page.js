"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/frontend/Header";
import CategoryCard from "@/components/frontend/CategoryCard";
import colors from "@/theme/colors";
import { BASE_URL } from "@/lib/axios";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full flex justify-center bg-white/30 backdrop-blur-md">
        <div className="relative max-w-[90%] w-full">
          <Header />
        </div>
      </div>

      {/* Categories Grid */}
      <section className="pt-28 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full md:w-[90%] lg:w-[85%] place-items-center">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-40 bg-gray-200 animate-pulse rounded-xl w-full"
              ></div>
            ))
          : categories.map((cat, idx) => (
              <CategoryCard key={idx} {...cat} idx={idx} />
            ))}
      </section>

      {/* Optional button to go somewhere else */}
      <div className="flex justify-center mt-8">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-semibold text-white transition hover:scale-105 inline-block text-center"
          style={{ backgroundColor: colors.primary }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
