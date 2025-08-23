"use client";

import { createContext, useState, useEffect } from "react";
import { useToastContext } from "@/components/ui/ToastProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // only store _id
  const { addToast } = useToastContext();

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bottomshub_cart")) || [];
    setCart(stored);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bottomshub_cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (only _id)
  const addToCart = (product) => {
    if (!cart.includes(product._id)) {
      setCart([...cart, product._id]);
      addToast("Item has been added to your cart.", "success");
    } else {
      addToast("Item is already in your cart.", "info");
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item !== id));
    addToast("Item has been removed from your cart.", "error");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
