"use client";

import { createContext, useState, useEffect } from "react";
import { useToastContext } from "@/components/ui/ToastProvider"; // adjust path if needed

// Create context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
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

  // Add item to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      // If product exists, increase quantity
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    addToast("Item has been added to your cart.", "success");
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    addToast("Item has been removed from your cart.", "error");
  };

  // Update quantity
  const updateQuantity = (id, qty) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: qty } : item
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

