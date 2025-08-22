
// // // "use client";
// // // import { useState } from "react";
// // // import ProductCard from "./ProductCard";
// // // import axios from "axios";
// // // import { BASE_URL } from "@/lib/axios";
// // // import CartModal from "./CartModal";


// // // export default function ProductsList({ products, loading, userId }) {
// // //   const [selectedProduct, setSelectedProduct] = useState(null);
// // //   const [modalOpen, setModalOpen] = useState(false);

// // //   // open modal jab user add to cart ya wishlist click kare
// // //   const handleOpenCart = (product) => {
// // //     console.log("Product", product)
// // //     setSelectedProduct(product);
// // //     setModalOpen(true);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
// // //         {Array.from({ length: 8 }).map((_, idx) => (
// // //           <div key={idx} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
// // //         ))}
// // //       </div>
// // //     );
// // //   }

// // //   if (!products || products.length === 0) {
// // //     return <p className="text-center text-gray-500">No products found.</p>;
// // //   }

// // //   return (
// // //     <>
// // //       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
// // //         {products.map((prod, idx) => (
// // //           <ProductCard
// // //             key={prod._id || idx}
// // //             name={prod.name}
// // //             price={prod.price}
// // //             originalPrice={prod.originalPrice}
// // //             discount={prod.discount}
// // //             images={prod.images}
// // //             slug={prod.slug}
// // //             category={prod.category}
// // //             shortDescription={prod.shortDescription}
// // //             onAddToCart={() => handleOpenCart(prod)}
// // //             onWishlist={() => handleOpenCart(prod)} // wishlist bhi modal open kare
// // //           />
// // //         ))}
// // //       </div>

// // //       {modalOpen && selectedProduct && (
// // //         <CartModal
// // //           product={selectedProduct}
// // //           userId={userId}
// // //           onClose={() => {
// // //             setModalOpen(false);
// // //             setSelectedProduct(null);
// // //           }}
// // //         />
// // //       )}
// // //     </>
// // //   );
// // // }


// // "use client";
// // import { useState } from "react";
// // import ProductCard from "./ProductCard";
// // import ProductRow from "./ProductRow"; // 👈 new component
// // import CartModal from "./CartModal";

// // export default function ProductsList({ products, loading, userId }) {
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [view, setView] = useState("grid"); // "grid" | "row"

// //   // ✅ common handler
// //   const handleOpenCart = (product) => {
// //     setSelectedProduct(product);
// //     setModalOpen(true);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
// //         {Array.from({ length: 8 }).map((_, idx) => (
// //           <div
// //             key={idx}
// //             className="h-64 bg-gray-200 animate-pulse rounded-xl"
// //           />
// //         ))}
// //       </div>
// //     );
// //   }

// //   if (!products || products.length === 0) {
// //     return <p className="text-center text-gray-500">No products found.</p>;
// //   }

// //   return (
// //     <>
// //       {/* 🔘 View Toggle */}
// //       <div className="flex justify-end mb-4 gap-2">
// //          <h1 className="text-3xl w-full  font-bold mb-6 text-center">
// //         All Products
// //       </h1>
// //         <button
// //           onClick={() => setView("grid")}
// //           className={`px-3 py-1 rounded ${
// //             view === "grid" ? "bg-black text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           Grid
// //         </button>
// //         <button
// //           onClick={() => setView("row")}
// //           className={`px-3 py-1 rounded ${
// //             view === "row" ? "bg-black text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           Row
// //         </button>
// //       </div>

// //       {/* 📦 Products Render */}
// //       {view === "grid" ? (
// //         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
// //           {products.map((prod, idx) => (
// //             <ProductCard
// //               key={prod._id || idx}
// //               {...prod}
// //               onAddToCart={() => handleOpenCart(prod)}
// //               onWishlist={() => handleOpenCart(prod)}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="space-y-4 w-full">
// //           {products.map((prod, idx) => (
// //             <ProductRow
// //               key={prod._id || idx}
// //               {...prod}
// //               onAddToCart={() => handleOpenCart(prod)}
// //               onWishlist={() => handleOpenCart(prod)}
// //             />
// //           ))}
// //         </div>
// //       )}

// //       {/* 🛒 Modal */}
// //       {modalOpen && selectedProduct && (
// //         <CartModal
// //           product={selectedProduct}
// //           userId={userId}
// //           onClose={() => {
// //             setModalOpen(false);
// //             setSelectedProduct(null);
// //           }}
// //         />
// //       )}
// //     </>
// //   );
// // }



// "use client";
// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import ProductRow from "./ProductRow"; 
// import CartModal from "./CartModal";

// export default function ProductsList({ products, loading, userId }) {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [view, setView] = useState("grid"); // "grid" | "row"

//   // ✅ common handler
//   const handleOpenCart = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
//         {Array.from({ length: 8 }).map((_, idx) => (
//           <div
//             key={idx}
//             className="h-64 bg-gray-200 animate-pulse rounded-xl"
//           />
//         ))}
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return <p className="text-center text-gray-500">No products found.</p>;
//   }

//   return (
//     <>
//       {/* 🔘 View Toggle */}
//       <div className="flex justify-end mb-4 gap-2">
//         <h1 className="text-3xl w-full font-bold mb-6 text-center">
//           All Products
//         </h1>
//         <button
//           onClick={() => setView("grid")}
//           className={`px-3 py-1 rounded ${
//             view === "grid" ? "bg-black text-white" : "bg-gray-200"
//           }`}
//         >
//           Grid
//         </button>
//         <button
//           onClick={() => setView("row")}
//           className={`px-3 py-1 rounded ${
//             view === "row" ? "bg-black text-white" : "bg-gray-200"
//           }`}
//         >
//           Row
//         </button>
//       </div>

//       {/* 📦 Products Render */}
//       {view === "grid" ? (
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
//           {products.map((prod, idx) => (
//             <ProductCard
//               key={prod._id || idx}
//               {...prod}
//               onAddToCart={() => handleOpenCart(prod)}
//               onWishlist={() => handleOpenCart(prod)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-4 w-full">
//           {products.map((prod, idx) => (
//             <ProductRow
//               key={prod._id || idx}
//               {...prod}
//               onAddToCart={() => handleOpenCart(prod)}
//               onWishlist={() => handleOpenCart(prod)}
//             />
//           ))}
//         </div>
//       )}

//       {/* 🛒 Modal */}
//       {modalOpen && selectedProduct && (
//         <CartModal
//           product={selectedProduct}
//           userId={userId}
//           onClose={() => {
//             setModalOpen(false);
//             setSelectedProduct(null);
//           }}
//         />
//       )}
//     </>
//   );
// }



"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import CartModal from "./CartModal";

export default function ProductsList({ products, loading, userId }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState("grid"); // "grid" | "row"
  const [sort, setSort] = useState("az");

  // ✅ common handler
  const handleOpenCart = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // ✅ sorting logic
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sort === "az") return a.name.localeCompare(b.name);
    if (sort === "za") return b.name.localeCompare(a.name);
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    return 0;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="h-64 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <>
      {/* 🔘 View & Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center w-full sm:w-auto">
          All Products
        </h1>

        <div className="flex items-center gap-3">
          {/* Toggle Buttons */}
          <button
            onClick={() => setView("grid")}
            className={`px-5 py-2 sm:py-2 rounded-md text-sm sm:text-base transition ${
              view === "grid"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("row")}
            className={`px-5 py-2 sm:py-2 rounded-md text-sm sm:text-base transition ${
              view === "row"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Row
          </button>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="az">Name: A → Z</option>
            <option value="za">Name: Z → A</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* 📦 Products Render */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {sortedProducts.map((prod, idx) => (
            <ProductCard
              key={prod._id || idx}
              {...prod}
              onAddToCart={() => handleOpenCart(prod)}
              onWishlist={() => handleOpenCart(prod)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {sortedProducts.map((prod, idx) => (
            <ProductRow
              key={prod._id || idx}
              {...prod}
              onAddToCart={() => handleOpenCart(prod)}
              onWishlist={() => handleOpenCart(prod)}
            />
          ))}
        </div>
      )}

      {/* 🛒 Modal */}
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
