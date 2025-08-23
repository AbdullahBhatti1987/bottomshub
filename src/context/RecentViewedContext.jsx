// "use client";

// import { createContext, useState, useEffect } from "react";

// export const RecentlyViewedContext = createContext();

// export function RecentlyViewedProvider({ children }) {
//   const [recentlyViewed, setRecentlyViewed] = useState([]);

//   // Load from localStorage on init
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("bottomsHub_recentlyViewed") || "[]");
//     setRecentlyViewed(stored);
//   }, []);

//   // Add product ID to recently viewed
//   const addProduct = (productId) => {
//     if (!productId) return;
//     setRecentlyViewed((prev) => {
//       const updated = prev.includes(productId) ? prev : [...prev, productId];
//       localStorage.setItem("bottomsHub_recentlyViewed", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const clearAll = () => {
//     localStorage.removeItem("bottomsHub_recentlyViewed");
//     setRecentlyViewed([]);
//   };

//   return (
//     <RecentlyViewedContext.Provider value={{ recentlyViewed, addProduct, clearAll }}>
//       {children}
//     </RecentlyViewedContext.Provider>
//   );
// }


"use client";

import { createContext,  useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";

export const RecentViewedContext = createContext();

export const RecentViewedProvider = ({ children }) => {
  const [recentIds, setRecentIds] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load IDs from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("bottomsHub_recentlyViewed") || "[]"
    );
    setRecentIds(stored.slice(-6).reverse()); // latest 6
  }, []);

  // Fetch product details when recentIds change
  useEffect(() => {
    if (!recentIds.length) {
      setRecentProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/products`, {
          params: { ids: recentIds.join(",") },
        });

        // Sort products according to recentIds order
        const sortedProducts = recentIds
          .map((id) => res.data.data.find((p) => p._id === id))
          .filter(Boolean);

        setRecentProducts(sortedProducts);
      } catch (err) {
        console.error("Failed to fetch recent products:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [recentIds]);

  // Function to add a product ID to recent view
  const addToRecent = (productId) => {
    setRecentIds((prev) => {
      const updated = prev.includes(productId)
        ? prev
        : [...prev, productId].slice(-6); // keep latest 6
      localStorage.setItem(
        "bottomsHub_recentlyViewed",
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  return (
    <RecentViewedContext.Provider
      value={{ recentIds, recentProducts, loading, addToRecent }}
    >
      {children}
    </RecentViewedContext.Provider>
  );
};
