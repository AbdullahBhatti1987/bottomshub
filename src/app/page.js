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
  { name: "Accessories", image: "/images/category-accessories.avif" },
  { name: "Shoes", image: "/images/category-shoes.webp" },
  { name: "Bags", image: "/images/category-bags.jpeg" },
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

      <BottomsSlider />

      {/* <Slider /> */}
      <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} {...cat} idx={idx} />
        ))}
      </section>

      <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {newArrivals.map((prod, idx) => (
          <ProductCard key={idx} {...prod} idx={idx} />
        ))}
      </section>
      <section className="py-12 container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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

      <Newsletter />
      <NewArrivals />
      <Reviews />
      <Testimonials />
      <SubscriptionBox />
      <Footer />
    </div>
  );
}
