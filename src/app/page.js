// /src/app/page.js
import Slider from "@/components/frontend/Slider";
import Categories from "@/components/frontend/Categories";
import NewArrivals from "@/components/frontend/NewArrivals";
import Reviews from "@/components/frontend/Reviews";
import Testimonials from "@/components/frontend/Testimonials";
import SubscriptionBox from "@/components/frontend/SubscriptionBox";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import BottomsSlider from "@/components/frontend/BottomsSlider";
import Image from "next/image";
import Newsletter from "@/components/frontend/Newsletter";
import DealBanner from "@/components/frontend/DealBanner";
import BrandCard from "@/components/frontend/BrandCard";
import ProductCard from "@/components/frontend/ProductCard";
import CategoryCard from "@/components/frontend/CategoryCard";

const categories = [
  { name: "Men", image: "/images/category-men.jpg" },
  { name: "Women", image: "/images/category-women.avif" },
  { name: "Kids", image: "/images/category-kids.jpg" },
  // { name: "Accessories", image: "/images/category-accessories.avif" },
  { name: "Shoes", image: "/images/category-shoes.webp" },
  // { name: "Bags", image: "/images/category-bags.jpeg" },
];

// dummyProducts.js
export const products = [
  {
    name: "Cool Sneakers",
    price: "$120",
    category: "Shoes",
    tags: "New",
    images: ["/images/product1.jpg"],
  },
  {
    name: "Leather Jacket",
    price: "$250",
    category: "Clothing",
    tags: "Hot",
    images: ["/images/product2.jpg"],
  },
  {
    name: "Classic Leather Jacket",
    category: "Men's Wear",
    price: "$120",
    images: ["/images/jacket1.jpg"],
    primaryColor: "#ff4d4f",
    tag: "New",
  },
  {
    name: "Elegant Handbag",
    category: "Accessories",
    price: "$89",
    images: ["/images/handbag.jpg"],
    primaryColor: "#4caf50",
    tag: "Hot",
  },
  {
    name: "Sports Sneakers",
    category: "Footwear",
    price: "$70",
    images: ["/images/sneakers.jpg"],
    primaryColor: "#1890ff",
    tag: "Sale",
  },
  {
    name: "Denim Jeans",
    category: "Men's Wear",
    price: "$50",
    images: ["/images/jeans.jpg"],
    primaryColor: "#f39c12",
    tag: "Best",
  },
  {
    name: "Silk Scarf",
    category: "Accessories",
    price: "$25",
    images: ["/images/scarf.jpg"],
    primaryColor: "#9c27b0",
    tag: "New",
  },
];

const trendingProducts = [
  { name: "Product 1", price: "$49.99", image: "/products/product1.jpeg" },
  { name: "Product 2", price: "$59.99", image: "/products/product1.jpeg" },
  { name: "Product 3", price: "$39.99", image: "/products/product1.jpeg" },
  { name: "Product 4", price: "$29.99", image: "/products/product1.jpeg" },
];

const newArrivals = [
  { name: "New 1", price: "$69.99", image: "/products/product1.jpeg" },
  { name: "New 2", price: "$79.99", image: "/products/product1.jpeg" },
  { name: "New 3", price: "$59.99", image: "/products/product1.jpeg" },
  { name: "New 4", price: "$89.99", image: "/products/product1.jpeg" },
];

const brands = [
  "/products/product1.jpeg",
  "/products/product1.jpeg",
  "/products/product1.jpeg",
  "/products/product1.jpeg",
  "/products/product1.jpeg",
];

const slideVariants = {
  hiddenLeft: { x: -100, opacity: 0 },
  hiddenRight: { x: 100, opacity: 0 },
  hiddenBottom: { y: 80, opacity: 0 },
  visible: { x: 0, y: 0, opacity: 1 },
};

export default function HomePage() {
  return (
    <div className="">
      <div className="fixed top-0 z-50 w-full flex justify-center bg-white/30 backdrop-blur-md">
        <div className="relative max-w-[90%] w-full shadow-md rounded-2xl">
          <Header /> {/* Header me shadow/rounded remove karein */}
        </div>
      </div>

      <Slider />

      <section
        className="
    py-12 container mx-auto px-4 
    grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
    gap-6 
    w-full md:w-[90%] lg:w-[85%] 
    place-items-center
  "
      >
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} {...cat} idx={idx} />
        ))}
      </section>

      <section className="py-12 container w-full md:w-[90%] lg:w-[85%]  mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod, idx) => (
          <ProductCard key={idx} {...prod} idx={idx} />
        ))}
      </section>

      {/*  <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {trendingProducts.map((prod, idx) => (
          <ProductCard key={idx} {...prod} idx={idx} />
        ))}
      </section>
      
      <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {brands.map((src, idx) => (
          <BrandCard key={idx} src={src} idx={idx} />
        ))}
      </section>
      <DealBanner />
 */}
      {/* <Newsletter /> */}
      {/* <NewArrivals /> */}
      {/* <Reviews /> */}
      {/* <Testimonials /> */}
      {/* <SubscriptionBox /> */}
      {/* <Footer /> */}
    </div>
  );
}
