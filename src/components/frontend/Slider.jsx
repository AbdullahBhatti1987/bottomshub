"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { BASE_URL } from "@/lib/axios";
import { motion } from "framer-motion";

const font = "font-[noto-sans] font-medium tracking-normal";
const gradient = "from-pink-500 via-red-500 to-red-300";

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

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
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000); // exactly 10s

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  if (!slides.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full flex items-center pt-16 justify-between px-4 md:px-12 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          {slide.backgroundImage && (
            <Image
              src={slide.backgroundImage}
              alt="Background"
              fill
              className="object-cover z-0"
              priority
            />
          )}

          {/* Left Card */}
          <div
            className={`relative z-20 w-[400px] md:w-[480px] p-6 sm:p-4 md:p-8 flex flex-col justify-center items-start text-white rounded-xl bg-gradient-to-br ${gradient} border border-gray-200/30 shadow-[8px_12px_30px_rgba(0,0,0,0.4),-4px_-4px_15px_rgba(255,255,255,0.05)] backdrop-blur-sm ml-6 md:ml-24 transition-all duration-700 ${font}`}
          >
            {/*  tilte div */}
            {/* <div
            className={`relative z-20 w-[400px] md:w-[480px] p-6 sm:p-4 md:p-8 flex flex-col justify-center items-start text-white rounded-xl bg-gradient-to-br ${gradient} border border-gray-200/30 shadow-[8px_12px_30px_rgba(0,0,0,0.4),-4px_-4px_15px_rgba(255,255,255,0.05)] backdrop-blur-sm ml-6 md:ml-24 transition-all duration-700 ${font}`}
            style={{
              transform: "perspective(1000px) rotateY(20deg) rotateX(10deg)",
              transformOrigin: "top left",
            }}
          > */}
            <motion.h2
              key={`heading-${index}`}
              initial={{ x: -100, opacity: 0 }}
              animate={
                index === currentIndex
                  ? { x: 0, opacity: 1 }
                  : { x: -100, opacity: 0 }
              }
              transition={{ delay: 0, duration: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg lg:mr-12 md:mr-8 mr-6"
            >
              {slide.heading}
            </motion.h2>

            <motion.p
              key={`content-${index}`}
              initial={{ x: 100, opacity: 0 }} // Right se aayega
              animate={
                index === currentIndex
                  ? { x: 0, opacity: 1 }
                  : { x: 100, opacity: 0 }
              }
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-sm sm:text-md md:text-lg mb-4 drop-shadow-md"
            >
              {slide.content}
            </motion.p>

            {slide.overlayImage && (
              <motion.div
                initial={{ y: -80, opacity: 0 }} // Top se aayega
                animate={
                  index === currentIndex
                    ? { y: 0, opacity: 1 }
                    : { y: -80, opacity: 0 }
                }
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute top-3 right-3 w-12 h-12 md:w-16 md:h-16"
              >
                <Image
                  src={slide.overlayImage}
                  alt="Overlay"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            )}

            {slide.buttonName && slide.buttonRoute && (
              <motion.div
                initial={{ y: 80, opacity: 0 }} // Bottom se aayega
                animate={
                  index === currentIndex
                    ? { y: 0, opacity: 1 }
                    : { y: 80, opacity: 0 }
                }
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                <Link href={slide.buttonRoute}>
                  <button className="px-5 py-2 uppercase bg-white text-black font-medium rounded shadow-md hover:scale-105 mt-2">
                    {slide.buttonName}
                  </button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right Image */}
          {slide.mainImage && (
            <div
              className={`relative flex-[0_0_45%] max-w-[45%] sm:max-w-[42%] h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center z-10 transition-all duration-700 ${
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="absolute w-full h-full bg-black/20 rounded-xl blur-3xl animate-float-slow -z-10" />
              <Image
                src={slide.mainImage}
                alt={slide.heading}
                width={1200}
                height={800}
                className="object-contain w-full h-full max-w-full max-h-full rounded-xl transition-transform duration-700"
                priority
              />
            </div>
          )}
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-40">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prevSlide}
        className={`absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded z-40 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className={`absolute left-14 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded z-40 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        &#10095;
      </button>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
