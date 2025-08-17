// "use client";
// // /src/app/page.js
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Slider from "@/components/frontend/Slider";
// import Categories from "@/components/frontend/Categories";
// import NewArrivals from "@/components/frontend/NewArrivals";
// import Reviews from "@/components/frontend/Reviews";
// import Testimonials from "@/components/frontend/Testimonials";
// import SubscriptionBox from "@/components/frontend/SubscriptionBox";
// import Header from "@/components/frontend/Header";
// import Footer from "@/components/frontend/Footer";
// import BottomsSlider from "@/components/frontend/BottomsSlider";
// import Image from "next/image";
// import Newsletter from "@/components/frontend/Newsletter";
// import DealBanner from "@/components/frontend/DealBanner";
// import BrandCard from "@/components/frontend/BrandCard";
// import ProductCard from "@/components/frontend/ProductCard";
// import CategoryCard from "@/components/frontend/CategoryCard";
// import { useRouter } from "next/navigation";
// import colors from "@/theme/colors";
// import { BASE_URL } from "@/lib/axios";

// const categories = [
//   { name: "Men", image: "/images/category-men.jpg" },
//   { name: "Women", image: "/images/category-women.avif" },
//   { name: "Kids", image: "/images/category-kids.jpg" },
//   // { name: "Accessories", image: "/images/category-accessories.avif" },
//   { name: "Shoes", image: "/images/category-shoes.webp" },
//   // { name: "Bags", image: "/images/category-bags.jpeg" },
// ];

// // dummyProducts.js
// export const products = [
//   {
//     name: "Cool Sneakers",
//     price: "$120",
//     category: "Shoes",
//     tags: "New Arrival",
//     images: ["/images/product1.jpg"],
//   },
//   {
//     name: "Leather Jacket",
//     price: "$250",
//     category: "Clothing",
//     tags: "Sale",
//     images: ["/images/product2.jpg"],
//   },
//   {
//     name: "Classic Leather Jacket",
//     category: "Men's Wear",
//     price: "$120",
//     images: ["/images/jacket1.jpg"],
//     primaryColor: "#ff4d4f",
//     tag: "New Arrival",
//   },
//   {
//     name: "Elegant Handbag",
//     category: "Accessories",
//     price: "$89",
//     images: ["/images/handbag.jpg"],
//     primaryColor: "#4caf50",
//     tag: "New Arrival",
//   },
//   {
//     name: "Sports Sneakers",
//     category: "Footwear",
//     price: "$70",
//     images: ["/images/sneakers.jpg"],
//     primaryColor: "#1890ff",
//     tag: "Sale",
//   },
//   {
//     name: "Denim Jeans",
//     category: "Men's Wear",
//     price: "$50",
//     images: ["/images/jeans.jpg"],
//     primaryColor: "#f39c12",
//     tag: "Best",
//   },
//   {
//     name: "Silk Scarf",
//     category: "Accessories",
//     price: "$25",
//     images: ["/images/scarf.jpg"],
//     primaryColor: "#9c27b0",
//     tag: "New",
//   },
// ];

// const trendingProducts = [
//   { name: "Product 1", price: "$49.99", image: "/products/product1.jpeg" },
//   { name: "Product 2", price: "$59.99", image: "/products/product1.jpeg" },
//   { name: "Product 3", price: "$39.99", image: "/products/product1.jpeg" },
//   { name: "Product 4", price: "$29.99", image: "/products/product1.jpeg" },
// ];

// const newArrivals = [
//   { name: "New 1", price: "$69.99", image: "/products/product1.jpeg" },
//   { name: "New 2", price: "$79.99", image: "/products/product1.jpeg" },
//   { name: "New 3", price: "$59.99", image: "/products/product1.jpeg" },
//   { name: "New 4", price: "$89.99", image: "/products/product1.jpeg" },
// ];

// const brands = [
//   "/products/product1.jpeg",
//   "/products/product1.jpeg",
//   "/products/product1.jpeg",
//   "/products/product1.jpeg",
//   "/products/product1.jpeg",
// ];

// const slideVariants = {
//   hiddenLeft: { x: -100, opacity: 0 },
//   hiddenRight: { x: 100, opacity: 0 },
//   hiddenBottom: { y: 80, opacity: 0 },
//   visible: { x: 0, y: 0, opacity: 1 },
// };

// export default function HomePage() {
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/products`, {
//         params: { page, limit },
//       });
//       setProducts(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page, limit]);

//   const handleMoreProducts = () => {
//     router.push("/products"); // products page route
//   };

//   return (
//     <div className="">
//       <div className="fixed top-0 z-50 w-full flex justify-center bg-white/30 backdrop-blur-md">
//         <div className="relative max-w-[90%] w-full shadow-md rounded-2xl">
//           <Header /> {/* Header me shadow/rounded remove karein */}
//         </div>
//       </div>

//       <Slider />

//       <section
//         className="
//     py-12 container mx-auto px-4
//     grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
//     gap-6
//     w-full md:w-[90%] lg:w-[85%]
//     place-items-center
//   "
//       >
//         {categories.map((cat, idx) => (
//           <CategoryCard key={idx} {...cat} idx={idx} />
//         ))}
//       </section>

//       {/* Products */}
//       <section className="py-12 container w-full md:w-[90%] lg:w-[85%] mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading
//           ? Array.from({ length: 8 }).map((_, idx) => (
//               <div
//                 key={idx}
//                 className="h-64 bg-gray-200 animate-pulse rounded-xl"
//               ></div>
//             ))
//           : products.map((prod, idx) => (
//               <ProductCard key={idx} {...prod} idx={idx} />
//             ))}
//       </section>

//       {/* More Products Button */}
//       <div className="flex justify-center mt-8">
//         <button
//           className="px-6 py-3 rounded-xl font-semibold text-white transition hover:scale-105"
//           style={{ backgroundColor: colors.primary }}
//           onClick={handleMoreProducts}
//         >
//           More Products
//         </button>
//       </div>

//       {/*  <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {trendingProducts.map((prod, idx) => (
//           <ProductCard key={idx} {...prod} idx={idx} />
//         ))}
//       </section>

//       <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//         {brands.map((src, idx) => (
//           <BrandCard key={idx} src={src} idx={idx} />
//         ))}
//       </section>
//       <DealBanner />
//  */}
//       {/* <Newsletter /> */}
//       {/* <NewArrivals /> */}
//       {/* <Reviews /> */}
//       {/* <Testimonials /> */}
//       {/* <SubscriptionBox /> */}
//       {/* <Footer /> */}
//     </div>
//   );
// }





import Slider from "@/components/frontend/Slider";
import CategoriesSection from "@/components/frontend/CategoriesSection";
import ProductsSection from "@/components/frontend/ProductsSection";

export default function HomePage() {
  return (
    <div>
      <Slider />

      {/* Categories Section */}
      <CategoriesSection limit={4} />

      {/* Products Section */}
      
      <ProductsSection limit={8} />
    </div>
  );
}