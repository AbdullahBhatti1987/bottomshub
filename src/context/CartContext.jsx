// "use client";

// import { createContext, useState, useEffect } from "react";
// import { useToastContext } from "@/components/ui/ToastProvider"; // adjust path if needed

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]); // each item: { _id, quantity }
//   const { addToast } = useToastContext();

//   // Load cart from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("bottomshub_cart")) || [];
//     setCart(stored);
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("bottomshub_cart", JSON.stringify(cart));
//   }, [cart]);

//   // Add item to cart
//   // Add item to cart
//   const addToCart = (product) => {
//     const existing = cart.find((item) => item._id === product._id);
// console.log(typeof product._id);
//     if (existing) {
//       setCart(
//         cart.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       // Correct: add object with _id and quantity
//       setCart([...cart, { _id: product._id, quantity: 1 }]);
//     }

//     addToast("Item has been added to your cart.", "success");
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//     addToast("Item has been removed from your cart.", "error");
//   };

//   // Update quantity
//   const updateQuantity = (id, qty) => {
//     setCart(
//       cart.map((item) => (item._id === id ? { ...item, quantity: qty } : item))
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

"use client";

import { createContext, useState, useEffect } from "react";
import { useToastContext } from "@/components/ui/ToastProvider"; // adjust path if needed

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // each item: { _id, quantity, size }
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
  const addToCart = (product, size, quantity = 1) => {
    const existing = cart.find(
      (item) => item._id === product._id && item.size === size
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { _id: product._id, size, quantity }]);
    }

    addToast("Item has been added to your cart.", "success");
  };

  // Remove item from cart
  const removeFromCart = (id, size = null) => {
    setCart(cart.filter((item) => !(item._id === id && item.size === size)));
    addToast("Item has been removed from your cart.", "error");
  };

  // Update quantity
  const updateQuantity = (id, qty, size = null) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
