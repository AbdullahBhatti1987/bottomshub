// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { BASE_URL } from "@/lib/axios";


// export default function BottomsSlider() {
//   const [slides, setSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     async function fetchSlides() {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/admin/slider`);
//         setSlides(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchSlides();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides]);

//   const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

//   if (!slides.length) return null;

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden mt-4">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute w-full h-full transition-opacity duration-700 ${
//             index === currentIndex ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {slide.backgroundImage && (
//             <img
//               src={slide.backgroundImage}
//               alt="Background"
//               className="absolute w-full h-full object-cover"
//             />
//           )}
//           <img
//             src={slide.mainImage}
//             alt={slide.heading}
//             className="w-full h-full object-cover relative z-10"
//           />
//           {slide.overlayImage && (
//             <img
//               src={slide.overlayImage}
//               alt="Overlay"
//               className="absolute top-0 left-0 w-full h-full z-20"
//             />
//           )}
//           <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-lg z-30">
//             <h2 className="text-3xl font-bold mb-2">{slide.heading}</h2>
//             {slide.content && <p className="mb-4">{slide.content}</p>}
//             {slide.buttonName && slide.buttonRoute && (
//               <Link href={slide.buttonRoute}>
//                 <button className="px-4 py-2 bg-black/70 hover:bg-black text-white rounded">
//                   {slide.buttonName}
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* Navigation Dots */}
//       <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-40">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
//               index === currentIndex ? "bg-white" : "bg-white/50"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>

//       {/* Prev / Next Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white px-3 py-2 rounded z-40"
//       >
//         &#10094;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white px-3 py-2 rounded z-40"
//       >
//         &#10095;
//       </button>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { BASE_URL } from "@/lib/axios";

export default function BottomsSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/slider`);
        setSlides(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  if (!slides.length) return null;

  return (
   <div className="relative w-full h-[500px] overflow-hidden mt-4">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute w-full h-full transition-opacity duration-700 ${
        index === currentIndex ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background */}
      {slide.backgroundImage && (
        <Image
          src={slide.backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Main Image */}
      {slide.mainImage && (
        <div className="relative z-10 flex items-center justify-center h-full">
          <Image
            src={slide.mainImage}
            alt={slide.heading}
            width={500} // main image width
            height={400} // main image height
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Overlay Image */}
      {slide.overlayImage && (
        <Image
          src={slide.overlayImage}
          alt="Overlay"
          width={120}
          height={120}
          className="absolute top-10 left-10 object-contain z-20"
        />
      )}

      {/* Text & Button */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white max-w-lg z-30">
        <h2 className="text-3xl font-bold mb-2">{slide.heading}</h2>
        {slide.content && <p className="mb-4">{slide.content}</p>}
        {slide.buttonName && slide.buttonRoute && (
          <Link href={slide.buttonRoute}>
            <button className="px-4 py-2 bg-black/70 hover:bg-black text-white rounded">
              {slide.buttonName}
            </button>
          </Link>
        )}
      </div>
    </div>
  ))}
</div>

  );
}
