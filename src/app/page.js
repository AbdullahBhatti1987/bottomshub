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


export default function HomePage() {
  return (
    <div className="space-y-16">
        <Header />
      <BottomsSlider />
      <Slider />
      <Categories />
      <NewArrivals />
      <Reviews />
      <Testimonials />
      <SubscriptionBox />
        <Footer />

    </div>
  );
}
