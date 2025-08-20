// // "use client";
// // import ProductCard from "./ProductCard";

// // export default function ProductsList({ products, loading }) {
// //   if (loading) {
// //     return (
// //       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
// //         {Array.from({ length: 8 }).map((_, idx) => (
// //           <div key={idx} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
// //         ))}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
// //       {products.map((prod, idx) => (
// //         <ProductCard key={idx} {...prod} />
// //       ))}
// //     </div>
// //   );
// // }



// "use client";
// import ProductCard from "./ProductCard";
// import axios from "axios";
// import { BASE_URL } from "@/lib/axios";

// export default function ProductsList({ products, loading }) {



// const addToCart = async (productId, quantity = 1) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/api/cart`, {
//       productId,
//       quantity,
//       selectedSize,
//       coupan,
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Add to cart error:", err);
//     throw err;
//   }
// };





//   if (loading) {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
//         {Array.from({ length: 8 }).map((_, idx) => (
//           <div key={idx} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
//         ))}
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return <p className="text-center text-gray-500">No products found.</p>;
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
//       {products.map((prod, idx) => (
//         <ProductCard
//           key={prod._id || idx}
//           name={prod.name}
//           price={prod.price}
//           originalPrice={prod.originalPrice}
//           discount={prod.discount}
//           images={prod.images}
//           slug={prod.slug}
//           category={prod.category}
//           shortDescription={prod.shortDescription}
//         />
//       ))}
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";
import CartModal from "./CartModal";


export default function ProductsList({ products, loading, userId }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // open modal jab user add to cart ya wishlist click kare
  const handleOpenCart = (product) => {
    console.log("Product", product)
    setSelectedProduct(product);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {products.map((prod, idx) => (
          <ProductCard
            key={prod._id || idx}
            name={prod.name}
            price={prod.price}
            originalPrice={prod.originalPrice}
            discount={prod.discount}
            images={prod.images}
            slug={prod.slug}
            category={prod.category}
            shortDescription={prod.shortDescription}
            onAddToCart={() => handleOpenCart(prod)}
            onWishlist={() => handleOpenCart(prod)} // wishlist bhi modal open kare
          />
        ))}
      </div>

      {modalOpen && selectedProduct && (
        <CartModal
          product={selectedProduct}
          userId={userId}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}
