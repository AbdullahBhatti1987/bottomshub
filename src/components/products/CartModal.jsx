// // "use client";
// // import { useState } from "react";
// // import axios from "axios";
// // import { BASE_URL } from "@/lib/axios";
// // import colors from "@/theme/colors";

// // export default function CartModal({ product, userId, onClose }) {
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedSize, setSelectedSize] = useState(
// //     product.sizes?.[0]?.size || ""
// //   );

// //   const addToCart = async () => {

// //     console.log(" userId", userId);
// //     // console.log(" productId", productId);
// //     console.log(" product._id", product._id);
// //     console.log(" quantity", quantity);
// //     console.log(" selectedSize", selectedSize);

// //     if (!selectedSize) {
// //       alert("Please select a size");
// //       return;
// //     }
// //     try {
// //       await axios.post(`${BASE_URL}/api/cart`, {
// //         userId,
// //         productId: product._id,
// //         quantity,
// //         selectedSize,
// //       });
// //       alert(`Added ${product.name} (${selectedSize}) x${quantity} to cart`);
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to add to cart");
// //     }
// //   };

// //   const decrementQuantity = () => {
// //     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
// //   };

// //   const incrementQuantity = () => {
// //     setQuantity((prev) => prev + 1);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 ">
// //       <div className="bg-white rounded-2xl p-8 w-[32rem] relative shadow-xl mx-6">
// //         {/* Header */}
// //         <h3 className="font-bold text-2xl mb-6 text-center">{product.name}</h3>

// //         {/* Quantity Label */}
// //         <div className="mb-4 text-start">
// //           <span className="font-medium text-gray-700">Quantity</span>
// //         </div>

// //         {/* Quantity Counter */}
// //         <div className="flex items-center justify-start gap-4 mb-6">
// //           <button
// //             onClick={decrementQuantity}
// //             className="w-12 h-12 bg-gray-200 rounded-md text-2xl flex items-center justify-center hover:bg-gray-300 transition"
// //           >
// //             -
// //           </button>
// //           <div className="w-16 h-12 border border-gray-300 rounded-md flex items-center justify-center text-xl font-semibold">
// //             {quantity}
// //           </div>
// //           <button
// //             onClick={incrementQuantity}
// //             className="w-12 h-12 bg-gray-200 rounded-md text-2xl flex items-center justify-center hover:bg-gray-300 transition"
// //           >
// //             +
// //           </button>
// //         </div>

// //         {/* Sizes */}
// //         {product.sizes?.length > 0 && (
// //           <div className="mb-6">
// //             <label className="block text-sm font-medium mb-2">
// //               Select Size
// //             </label>
// //             <div className="grid grid-cols-4 gap-3">
// //               {product.sizes.map((s) => (
// //                 <label
// //                   key={s.size}
// //                   className={`flex items-center justify-center border rounded-md py-2 cursor-pointer transition
// //                     ${selectedSize === s.size ? "border-gray-400 bg-gray-100 font-semibold" : "border-gray-300"}
// //                   `}
// //                 >
// //                   <input
// //                     type="radio"
// //                     name="size"
// //                     value={s.size}
// //                     checked={selectedSize === s.size}
// //                     onChange={() => setSelectedSize(s.size)}
// //                     className="hidden"
// //                   />
// //                   <span className="text-gray-700">{s.size}</span>
// //                 </label>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Add to Cart Button */}
// //         <button
// //           onClick={addToCart}
// //           className="w-full  text-white py-3 rounded-lg hover:bg-gray-900 font-semibold transition text-lg"
// //         style={{ backgroundColor: colors.primary}}
// //         >
// //           Add to Cart
// //         </button>

// //         {/* Close Button */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
// //         >
// //           ✕
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "@/lib/axios";
// import colors from "@/theme/colors";
// import jwtDecode from "jwt-decode";

// import { useToastContext } from "@/components/ui/ToastProvider";
// import companyName from "@/lib/constants/companyName";

// export default function CartModal({ product, onClose }) {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState(
//     product.sizes?.[0]?.size || ""
//   );
//   const { addToast } = useToastContext();

//   // Add to Cart
//   const addToCart = async () => {


//     // 1️⃣ Check token in local storage
//     const token = localStorage.getItem("BottomsHub_userToken");
//     if (!token) {
//       addToast("Kindly login first", "error");
//       return;
//     }

//     // 2️⃣ Decode JWT to get userId
//     let userId;
//     try {
//       const decoded = jwtDecode(token);
//       const userId = decoded.id;
//     } catch (err) {
//       console.error("JWT decode error:", err);
//       addToast("Invalid token, please login again", "error");
//       return;
//     }

//     // 3️⃣ Validate size
//     if (!selectedSize) {
//       addToast("Please select a size", "error");
//       return;
//     }

//     try {
//       await axios.post(`${BASE_URL}/api/cart`, {
//         userId,
//         productId: product._id,
//         quantity,
//         selectedSize,
//       });
//       addToast(
//         `Added ${product.name} (${selectedSize}) x${quantity} to cart`,
//         "success"
//       );
//       onClose();
//     } catch (err) {
//       console.error(err);
//       addToast("Failed to add to cart", "error");
//     }
//   };

//   const decrementQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   const incrementQuantity = () => setQuantity((prev) => prev + 1);

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-2xl p-8 w-[32rem] relative shadow-xl mx-6">
//         <h3 className="font-bold text-2xl mb-6 text-center">{product.name}</h3>

//         {/* Quantity */}
//         <div className="mb-4 flex items-center justify-start gap-4">
//           <span className="font-medium text-gray-700">Quantity:</span>
//           <button
//             onClick={decrementQuantity}
//             className="w-12 h-12 bg-gray-200 rounded-md text-2xl flex items-center justify-center hover:bg-gray-300 transition"
//           >
//             -
//           </button>
//           <div className="w-16 h-12 border border-gray-300 rounded-md flex items-center justify-center text-xl font-semibold">
//             {quantity}
//           </div>
//           <button
//             onClick={incrementQuantity}
//             className="w-12 h-12 bg-gray-200 rounded-md text-2xl flex items-center justify-center hover:bg-gray-300 transition"
//           >
//             +
//           </button>
//         </div>

//         {/* Sizes */}
//         {product.sizes?.length > 0 && (
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2">
//               Select Size
//             </label>
//             <div className="grid grid-cols-4 gap-3">
//               {product.sizes.map((s) => (
//                 <label
//                   key={s.size}
//                   className={`flex items-center justify-center border rounded-md py-2 cursor-pointer transition ${
//                     selectedSize === s.size
//                       ? "border-gray-400 bg-gray-100 font-semibold"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="size"
//                     value={s.size}
//                     checked={selectedSize === s.size}
//                     onChange={() => setSelectedSize(s.size)}
//                     className="hidden"
//                   />
//                   <span className="text-gray-700">{s.size}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Add to Cart */}
//         <button
//           onClick={addToCart}
//           className="w-full text-white py-3 rounded-lg hover:bg-gray-900 font-semibold transition text-lg"
//           style={{ backgroundColor: colors.primary }}
//         >
//           Add to Cart
//         </button>

//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";
import colors from "@/theme/colors";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

import { useToastContext } from "@/components/ui/ToastProvider";

export default function CartModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.size || ""
  );
  const { addToast } = useToastContext();

  const addToCart = async () => {
    // 1️⃣ Check token in local storage
    const token = localStorage.getItem("BottomsHub_userToken");
    if (!token) {
      addToast("Kindly login first", "error");
      return;
    }

    // 2️⃣ Decode JWT to get userId
    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // ✅ fixed scope
    } catch (err) {
      console.error("JWT decode error:", err);
      addToast("Invalid token, please login again", "error");
      return;
    }

    // 3️⃣ Validate size
    if (!selectedSize) {
      addToast("Please select a size", "error");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/cart`, {
        userId,
        productId: product._id,
        quantity,
        selectedSize,
      });
      addToast(
        `Added ${product.name} (${selectedSize}) x${quantity} to cart`,
        "success"
      );
      onClose();
    } catch (err) {
      console.error(err);
      addToast("Failed to add to cart", "error");
    }
  };

  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[32rem] relative shadow-xl mx-6">
        <h3 className="font-bold text-2xl mb-6 text-center">{product.name}</h3>

        {/* Quantity */}
          <label className="block text-sm font-medium mb-2">Select Size</label>
        <div className="mb-4 flex items-center justify-start gap-4">
          <button
            onClick={decrementQuantity}
            className="w-12 h-12 bg-gray-200 rounded-md text-2xl flex items-center justify-center hover:bg-gray-300 transition"
          >
            -
          </button>
          <div className="w-16 h-12 border border-gray-300 rounded-md flex items-center justify-center text-xl font-semibold">
            {quantity}
          </div>
          <button
            onClick={incrementQuantity}
            className="w-12 h-12 bg-gray-200 rounded-md text-2xl flex items-center justify-center hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Size</label>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((s) => (
                <label
                  key={s.size}
                  className={`flex items-center justify-center border rounded-md py-2 cursor-pointer transition ${
                    selectedSize === s.size
                      ? "border-gray-400 bg-gray-100 font-semibold"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={s.size}
                    checked={selectedSize === s.size}
                    onChange={() => setSelectedSize(s.size)}
                    className="hidden"
                  />
                  <span className="text-gray-700">{s.size}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={addToCart}
          className="w-full text-white py-3 rounded-lg hover:bg-gray-900 font-semibold transition text-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Add to Cart
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
