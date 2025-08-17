"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import colors from "@/theme/colors";
import { BASE_URL } from "@/lib/axios";
import CategoryCard from "./CategoryCard";

export default function CategoriesSection({ limit = 4 }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`, {
        params: { limit },
      });
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="py-12 max-w-7xl container mx-auto px-4">
      {/* Grid 1 row with 4 cols */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
        {loading
          ? Array.from({ length: limit }).map((_, idx) => (
              <div
                key={idx}
                className="h-40 bg-gray-200 animate-pulse rounded-xl w-full"
              />
            ))
          : categories.map((cat, idx) => (
              <CategoryCard key={idx} {...cat} idx={idx} />
            ))}
      </div>

      {/* More Categories button */}
      <div className="flex justify-center mt-8">
        <Link
          href="/categories"
          className="px-6 py-3 rounded-xl font-semibold text-white transition hover:scale-105 inline-block text-center"
          style={{ backgroundColor: colors.primary }}
        >
          More Categories
        </Link>
      </div>
    </section>
  );
}
