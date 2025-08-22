"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/lib/axios";
import colors from "@/theme/colors";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import { ZoomIn } from "lucide-react";
import {
  IoShareSocialOutline,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLogoTwitter,
  IoHeartOutline,
  IoLogoInstagram,
} from "react-icons/io5";
import {
  FaTiktok,
  FaSnapchatGhost,
  FaLinkedin,
  FaPinterest,
  FaEnvelope,
} from "react-icons/fa";
import { getSocials } from "@/lib/constants/socialMedia";

export default function ProductDetailPage() {
  const params = useParams();
  const { slug } = params;
  const [wishlist, setWishlist] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const socials = [
    {
      name: "WhatsApp",
      icon: <IoLogoWhatsapp size={40} color="#25D366" />,
      link: `https://wa.me/?text=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: <IoLogoFacebook size={40} color="#1877F2" />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Twitter",
      icon: <IoLogoTwitter size={40} color="#1DA1F2" />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Instagram",
      icon: <IoLogoInstagram size={40} color="#E1306C" />,
      link: `https://www.instagram.com/`,
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={40} color="#010101" />,
      link: `https://www.tiktok.com/`,
    },
    {
      name: "Snapchat",
      icon: <FaSnapchatGhost size={40} color="#FFFC00" />,
      link: `https://www.snapchat.com/`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={40} color="#0A66C2" />,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Pinterest",
      icon: <FaPinterest size={40} color="#E60023" />,
      link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope size={40} color="#EA4335" />,
      link: `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`,
    },
  ];

  const fetchProductBySlug = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${slug}`);
      setProduct(res.data.data);
      setSelectedImage(res.data.data.images[0]?.url || null);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (slug) fetchProductBySlug();
  }, [slug]);

  // --- Functions ---
  const handleAddToCart = () => {
    console.log("Add to Cart:", product?._id, quantity, selectedSize);
    // TODO: integrate with cart API
  };

  const handleWishlistToggle = () => {
    setWishlist((prev) => !prev);
    console.log("Wishlist Toggled:", !wishlist, "Product:", product?._id);
    // TODO: integrate with wishlist API
  };

  const handleBuyNow = () => {
    console.log("Buy Now:", product?._id, quantity, selectedSize);
    // TODO: integrate with buy now logic / checkout
  };

  if (loading || !product) {
    return (
      <div className="py-12 container max-w-7xl mx-auto px-4">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-h-[420px] animate-pulse px-4 md:px-6 lg:px-0">
  {/* Left Skeleton */}
  <div className="grid grid-cols-[50px_1fr] sm:grid-cols-[60px_1fr] gap-3 sm:gap-4">
    {/* Thumbnails Skeleton */}
    <div className="flex flex-col gap-2 sm:gap-3">
      <div className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-lg bg-gray-200" />
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] rounded-lg bg-gray-300"
        />
      ))}
    </div>

    {/* Main Image Skeleton */}
    <div className="w-full bg-gray-200 rounded-xl aspect-square" />
  </div>

  {/* Right Skeleton */}
  <div className="flex flex-col gap-4">
    <div className="h-8 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="flex gap-4 mt-4">
      <div className="h-6 bg-gray-200 rounded w-24" />
      <div className="h-6 bg-gray-200 rounded w-16" />
    </div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
    <div className="flex gap-2 mt-4">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="flex-1 h-12 bg-gray-200 rounded-lg" />
      ))}
    </div>
    <div className="flex items-center gap-3 mt-6">
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
      <div className="w-16 h-12 bg-gray-200 rounded-lg" />
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
    </div>
    <div className="flex gap-3 mt-3">
      <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
    </div>
    <div className="flex gap-3 mt-3">
      <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
    </div>
  </div>
</div>

      </div>
    );
  }

  return (
    <div className="py-12 container lg:max-w-7xl w-full mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Images */}
        <div className="grid grid-cols-[60px_1fr] lg:gap-4 gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[420px]">
            {product?.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img.url)}
                className={`w-[60px] h-[60px] cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 flex-shrink-0`}
                style={{
                  borderColor:
                    selectedImage === img.url ? colors.primary : "#D1D5DB",
                  borderWidth: selectedImage === img.url ? "2px" : "1px",
                }}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  width={60}
                  height={60}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}

          <div className="relative shadow-lg rounded-xl overflow-hidden aspect-square select-none hover:cursor-zoom-in">
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={handleMouseMove}
                >
                  {/* Main Image */}
                  <Image
                    src={selectedImage}
                    alt={product?.name || "Product Image"}
                    width={1024}
                    height={1024}
                    className={`w-full h-full object-contain transition-transform duration-300 ${
                      zoom ? "scale-[2.5]" : "scale-100"
                    }`}
                    style={
                      zoom
                        ? {
                            transformOrigin: `${position.x}% ${position.y}%`,
                          }
                        : {}
                    }
                    priority
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-3 lg:gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
            {product.name}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm md:text-md lg:text-xl font-bold text-red-600">
              Rs.{product.price}
            </span>
            {product.originalPrice > 0 && (
              <span className="line-through text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg">
                Rs.{product.originalPrice}
              </span>
            )}
          </div>

          {/* Sizes */}
          {product?.sizes?.some((s) => s.quantity > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes
                .filter((s) => s.quantity > 0)
                .map((s, idx) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <span
                      key={idx}
                      onClick={() => setSelectedSize(s.size)}
                      style={
                        isSelected
                          ? {
                              backgroundColor: colors.primary,
                              color: "white",
                              borderColor: colors.primary,
                            }
                          : {}
                      }
                      className={`uppercase flex items-center justify-center rounded-lg bg-gray-100/50 border border-gray-400/40 shadow-md cursor-pointer px-3 py-2 text-sm sm:text-base`}
                    >
                      {s.size}
                    </span>
                  );
                })}
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-2 mt-3 mb-2">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="w-10 h-10 rounded-lg bg-gray-100/50 border border-gray-400/40 flex items-center justify-center"
            >
              -
            </button>
            <span className="w-12 h-10 flex items-center justify-center border rounded-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-10 h-10 rounded-lg bg-gray-100/50 border border-gray-400/40 flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* Buttons */}
          {/* <div className="flex flex- gap-3 mt-4"> */}
          {/* Wishlist + Cart + Buy Now */}
          <div className="flex flex-col gap-6 w-full">
            {/* Row: Wishlist + Add to Cart + Share */}
            <div className="flex gap-2">
              {/* Heart */}
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="
      flex-1
      px-3 py-1.5 text-sm
      sm:px-4 sm:py-2 sm:text-sm
      md:px-5 md:py-2.5 md:text-base
      lg:px-6 lg:py-3 lg:text-lg
      rounded-lg font-semibold transition hover:opacity-90
    "
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className="  w-10 h-10
        lg:w-12 lg:h-12 rounded-lg bg-gray-100/50 border border-gray-400/40 flex items-center justify-center"
              >
                {wishlist ? (
                  <IoIosHeart
                    className="h-6 w-6"
                    style={{ color: colors.primary }}
                  />
                ) : (
                  <IoHeartOutline className="h-6 w-6  text-gray-500" />
                )}
              </button>

              {/* Share */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen((prev) => !prev)}
                  className="
        w-10 h-10
        lg:w-12 lg:h-12
        flex items-center justify-center rounded-lg
        bg-gray-100/50 border border-gray-400/40
      "
                >
                  <IoShareSocialOutline className="h-6 w-6 text-gray-600" />
                </button>

                {/* Share Popover */}
                {shareOpen && (
                  <div className="fixed inset-0  flex justify-center items-center bg-black/40 z-50">
                    <div className="bg-white w-[300px] h-[300px]  rounded-xl shadow-2xl p-8 relative">
                      {/* Close Button */}
                      <button
                        onClick={() => setShareOpen(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-black"
                      >
                        ✕
                      </button>
                      <div className="grid grid-cols-3 gap-4 place-items-center h-full">
                        {/* {getSocials.map((s, idx) => (
                          <Link
                            key={idx}
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center w-16 h-16 rounded-lg hover:bg-gray-300 shadow transition"
                          >
                            {s.icon}
                            <span className="text-[12px] mt-1 font-medium">
                              {s.name}
                            </span>
                          </Link>
                        ))} */}
                        {getSocials(url).map(
                          (s, idx) => (
                            <Link
                              key={idx}
                              href={s.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center w-16 h-16 rounded-lg hover:bg-gray-300 shadow transition"
                            >
                              {s.icon}
                              <span className="text-[12px] mt-1 font-medium">
                                {s.name}
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="
    flex-1
    px-3 py-3 text-sm
    md:px-5 md:py-2.5 md:text-base
    lg:px-6 lg:py-3 lg:text-lg
    h-10
    rounded-lg font-semibold transition hover:opacity-90
  "
              style={{ backgroundColor: "#111827", color: colors.white }}
            >
              Buy Now
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* Description */}
      {product?.description && (
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Product Details
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
