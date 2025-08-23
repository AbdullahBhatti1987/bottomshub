"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/lib/axios";
import colors from "@/theme/colors";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
// import { ZoomIn } from "lucide-react";
import { useToastContext } from "@/components/ui/ToastProvider";
import {
  ZoomIn,
  Star,
  Shield,
  Truck,
  RotateCcw,
  Check,
  AlertCircle,
} from "lucide-react";

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
import SlugSkeleton from "@/components/frontend/SlugSkeleton";
import { WishlistContext } from "@/context/WishlistContext";
import { CartContext } from "@/context/CartContext";
import { RecentViewedContext } from "@/context/RecentViewedContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { slug } = params;
  const [shareOpen, setShareOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
   const [activeTab, setActiveTab] = useState("description");
     const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const router = useRouter();
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const { addToast } = useToastContext();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const { cart, addToCart} =
    useContext(CartContext);

      const { addToRecent } = useContext(RecentViewedContext);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  const fetchProductBySlug = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${slug}`);
      setProduct(res.data.data);
      setSelectedImage(res.data.data.images[0]?.url || null);
      addToRecent(res.data.data._id)
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
    addToCart({ _id: product._id });
  };

const handleBuyNow = () => {
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    addToast("Please select a size", "error");
    return;
  }

  
  router.push("/checkout");
};


 

  const btnBase = `
  flex items-center justify-center rounded-lg font-semibold transition
  text-sm sm:text-base lg:text-lg
  h-10 sm:h-11 lg:h-12
`;

  if (loading || !product) {
    return <SlugSkeleton />;
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

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 py-3 border-y border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={18} />
              <span>Free delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw size={18} />
              <span>Estimated Delivery: 3 to 7 days</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield size={18} />
              <span>299 people are viewing this right now</span>
            </div>
          </div>

          {/* Sizes */}
          {product?.sizes?.some((s) => s.quantity > 0) && (
            <div className="flex flex-wrap gap-2 mt-2 ">
              {product.sizes
                .filter((s) => s.quantity > 0)
                .map((s, idx) => {
                  const isSelected = selectedSize === s.size;

                  // ✅ Size ranges mapping
                  const sizeRanges = {
                    small: "24–28",
                    medium: "26–30",
                    large: "28–30",
                    xl: "30–34",
                    xxl: "32–36",
                  };

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSize(s.size)}
                      style={
                        isSelected
                          ? {
                              backgroundColor: colors.primary,
                              color: "white",
                              fontWeight: "semebold",
                              borderColor: colors.primary,
                            }
                          : {}
                      }
                      className="flex flex-col  items-center justify-center h-12 w-1/5 uppercase rounded-lg bg-gray-100/50 border border-gray-400/40 shadow-md cursor-pointer px-3 py-2 text-xs sm:text-sm"
                    >
                      <span>{s.size}</span>
                      <span
                        className="text-[12px] font-semibold text-gray-400"
                        style={
                          isSelected
                            ? {
                                backgroundColor: colors.primary,
                                color: "white",
                                fontWeight: "semebold",
                                borderColor: colors.primary,
                              }
                            : {}
                        }
                      >
                        {sizeRanges[s.size?.toLowerCase()] || ""}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-2 mt-3 mb-2 w-2/5">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="w-12 h-12 rounded-lg bg-gray-100/50 border border-gray-400/40 flex items-center justify-center"
            >
              -
            </button>
            <span className="flex-1 h-12 flex items-center justify-center border rounded-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-12 h-12 rounded-lg bg-gray-100/50 border border-gray-400/40 flex items-center justify-center"
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
                disabled={cart.includes(product._id)}
                className={`
        flex-1
        px-3 py-3 text-sm
        sm:px-4 sm:py-3 sm:text-sm
        md:px-5 md:py-3 md:text-base
        lg:px-6 lg:py-3 lg:text-lg
        rounded-lg font-semibold transition hover:opacity-90 hover:cursor-pointer
        ${cart.includes(product._id) ? "opacity-50 cursor-not-allowed" : ""}
      `}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                }}
              >
                {cart.includes(product._id) ? "Already Cart" : "Add to Cart"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => addToWishlist(product._id)}
                disabled={wishlist.includes(product._id)}
                className={`
        w-12 h-12 lg:w-12 lg:h-12 rounded-lg bg-gray-100/50 border border-gray-400/40 flex items-center justify-center
        hover:cursor-pointer
        ${wishlist.includes(product._id) ? "opacity-50 cursor-not-allowed" : ""}
      `}
              >
                {wishlist.includes(product._id) ? (
                  <IoIosHeart
                    className="h-6 w-6"
                    style={{ color: colors.primary }}
                  />
                ) : (
                  <IoHeartOutline className="h-6 w-6 text-gray-500" />
                )}
              </button>

              {/* Share */}
              <div className="relative">
                <button
                  onClick={() => setShareOpen((prev) => !prev)}
                  className="
        w-12 h-12
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
                        {getSocials(url).map((s, idx) => (
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
                        ))}
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

      {/* Product Tabs Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-3 px-6 font-medium border-b-2 ${
                activeTab === "description"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`py-3 px-6 font-medium border-b-2 ${
                activeTab === "details"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 px-6 font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews ({reviewCount})
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Product Description
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">General Information</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">
                        {product.category?.name || "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">SKU</span>
                      <span className="font-medium">
                        {product.sku || "N/A"}
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium">Cotton Blend</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dimensions & Care</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium">0.5 kg</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Care Instructions</span>
                      <span className="font-medium">Machine Wash</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div id="reviews-section">
              <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>

              {reviewCount > 0 ? (
                <div className="space-y-6">
                  {/* Average Rating Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center mt-1">
                          {renderStars(Math.round(averageRating))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {reviewCount} reviews
                        </div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = reviews.filter(
                            (r) => Math.round(r.rating) === star
                          ).length;
                          const percentage = (count / reviewCount) * 100;

                          return (
                            <div
                              key={star}
                              className="flex items-center gap-2 mb-1"
                            >
                              <div className="text-sm w-6">{star}</div>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-400"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-sm text-gray-600 w-10 text-right">
                                {count}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.slice(0, 5).map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                            {review.user?.name?.charAt(0) || "U"}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">
                                {review.user?.name || "Anonymous"}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 my-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {reviews.length > 5 && (
                    <button className="mt-4 text-primary hover:underline font-medium">
                      View all reviews
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h4 className="mt-4 font-medium text-gray-900">
                    No reviews yet
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Be the first to review this product!
                  </p>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square relative">
                    <Image
                      src={product.images[0]?.url || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-primary">
                        Rs.{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs.{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}










