"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useToastContext } from "@/components/ui/ToastProvider"; // adjust path if needed

// Create context
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { addToast } = useToastContext();

  // Load wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bottomshub_wishlist")) || [];
    setWishlist(stored);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bottomshub_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (id) => {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
     
      addToast("Item has been added to your wishlist.", "success");
    }
  };

  const removeFromWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((pid) => pid !== id));
     
      addToast("Item has been removed from your wishlist.", "error");

    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
