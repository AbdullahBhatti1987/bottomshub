// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "@/lib/axios";

// export default function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     async function fetchReviews() {
//       const res = await axios.get(`${BASE_URL}/api/reviews`);
//       console.log("Response", res?.data?.data)
//       setReviews(res?.data?.data || []);
//     }
//     fetchReviews();
//   }, []);

//   // Auto-slide every 4s
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % reviews.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [reviews.length]);

//   if (!reviews.length) {
//     return (
//       <section className="py-16 text-center">
//         <h2 className="text-2xl font-bold">No Reviews Yet</h2>
//       </section>
//     );
//   }

//   const review = reviews[current];

//   return (
//     <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
//       <div className="max-w-3xl mx-auto text-center px-6">
//         <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

//         <div className="relative bg-white shadow-lg rounded-2xl p-8 transition-all duration-500">
//           <p className="text-lg italic text-gray-700">
//             "{review.review}"
//           </p>
//           <div className="mt-4 font-bold text-gray-900">
//             - {review.user?.name || "Anonymous"}
//           </div>
//           <div className="mt-2 flex justify-center gap-1">
//             {[...Array(5)].map((_, i) => (
//               <span
//                 key={i}
//                 className={`text-yellow-400 ${i < review.rating ? "opacity-100" : "opacity-30"}`}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Slider dots */}
//         <div className="flex justify-center mt-6 gap-2">
//           {reviews.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrent(idx)}
//               className={`w-3 h-3 rounded-full transition ${
//                 idx === current ? "bg-gray-800" : "bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/lib/axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      const res = await axios.get(`${BASE_URL}/api/reviews`);
      setReviews(res?.data?.data || []);
    }
    fetchReviews();
  }, []);

  // Auto-slide every 4s
  useEffect(() => {
    if (reviews.length <= 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 2) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (!reviews.length) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold">No Reviews Yet</h2>
      </section>
    );
  }

  // Slice two reviews per "slide"
  const currentReviews = reviews.slice(current, current + 2);

  const slideVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>

        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            {currentReviews.map((review) => (
              <motion.div
                key={review._id}
                className="bg-white shadow-lg rounded-2xl p-8 w-80 m-3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <p className="text-lg italic text-gray-700">"{review.review}"</p>
                <div className="mt-4 font-bold text-gray-900">
                  - {review.user?.name || "Anonymous"}
                </div>
                <div className="mt-2 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 ${
                        i < review.rating ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Slider dots */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(reviews.length / 2) }).map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx * 2)}
                className={`w-3 h-3 rounded-full transition ${
                  idx * 2 === current ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
