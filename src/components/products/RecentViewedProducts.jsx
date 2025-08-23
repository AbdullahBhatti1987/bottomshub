"use client";

import { RecentViewedContext } from "@/context/RecentViewedContext";
import { useContext, useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

export default function RecentViewedProducts() {

  const { recentProducts, loading } = useContext(RecentViewedContext);
  const scrollRef = useRef(null);
  const {  addToWishlist } =
    useContext(WishlistContext);
  const { addToCart} =
    useContext(CartContext);
 

//  onAddToCart={handleAddToCart} onWishlist={addToWishlist(product._id)}
  if (!recentProducts.length) return null;

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.25; // scroll 80% width

    if (direction === "next") {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        // reached end -> go to start
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 0) {
        // reached start -> go to end
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="mt-8 relative">
      <h3 className="font-semibold text-lg mb-4">Recently Viewed Products</h3>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto animate-pulse scrollbar-hide">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-[24%] h-60 bg-gray-200 rounded-lg flex-shrink-0"
            ></div>
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <IoChevronBack size={20} />
          </button>
          <button
            onClick={() => scroll("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <IoChevronForward size={20} />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {recentProducts.map((product, idx) => (
              <div key={product._id || idx} className="flex-shrink-0 w-[24%]">
                <ProductCard
                  {...product}
                  onAddToCart={() => addToCart(product._id)}
                  onWishlist={() => addToWishlist(product._id)}
                  disableAddToCart={product._id}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
