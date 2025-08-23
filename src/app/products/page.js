// // ProductsPage.jsx
// "use client";
// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import ProductsList from "@/components/products/ProductList";
// import { BASE_URL } from "@/lib/axios";
// import SearchBar from "@/components/Filters/SearchBar";
// import CategoryFilter from "@/components/Filters/CategoryFilter";
// import PriceRangeSlider from "@/components/Filters/PriceRangeSlider";
// import Pagination from "@/components/Filters/Pagination";
// import colors from "@/theme/colors";

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" });

//   const [localSearch, setLocalSearch] = useState(search);
//   const [localCategory, setLocalCategory] = useState(category);
//   const [localPriceRange, setLocalPriceRange] = useState(priceRange);

//   const limit = 12;

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit };
//       if (search) params.search = search;
//       if (category) params.category = category;
//       if (priceRange.min) params.minPrice = priceRange.min;
//       if (priceRange.max) params.maxPrice = priceRange.max;
//       // console.log("Response Params", params);
//       const res = await axios.get(`${BASE_URL}/api/products`, { params });
//       // console.log("Response return", res?.data);
//       // console.log("Response return", res?.data?.data);
//       setProducts(res.data.data);
//       setTotalPages(res.data.totalPages || Math.ceil(res.data.total / limit));
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     }
//     setLoading(false);
//   }, [page, search, category, priceRange]);

//   const applyFilters = () => {
//     console.log("Apply Filters Clicked:");
//     console.log("Search:", localSearch);
//     console.log("Category:", localCategory);
//     console.log("Price Range:", localPriceRange);

//     setSearch(localSearch);
//     setCategory(localCategory);
//     setPriceRange(localPriceRange);
//     setPage(1);
//   };

//   const resetFilters = () => {
//     setLocalSearch("");
//     setLocalCategory("");
//     setLocalPriceRange({ min: "", max: "" });

//     setSearch("");
//     setCategory("");
//     setPriceRange({ min: "", max: "" });
//     setPage(1);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [search, category, priceRange, page]);

//   return (
//     <div className="container w-full mx-auto px-4 py-4">
//       <div className="flex flex-col md:flex-row gap-6 ">

//         <div
//           className="md:w-1/5 w-full  flex flex-col  gap-4
//   md:sticky md:top-26 md:self-start"
//         >
//           <h1 className="text-3xl font-bold w-full sm:w-auto">Filter</h1>
//           <SearchBar search={localSearch} setSearch={setLocalSearch} />
//           <CategoryFilter
//             category={localCategory}
//             setCategory={setLocalCategory}
//           />
//           <PriceRangeSlider
//             priceRange={localPriceRange}
//             setPriceRange={setLocalPriceRange}
//           />
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={applyFilters}
//               style={{ backgroundColor: colors.primary, color: colors.white }}
//               className="flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition"
//             >
//               Apply Filters
//             </button>
//             <button
//               onClick={resetFilters}
//               className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Products list */}
//         <div className="md:w-4/5 flex flex-col gap-6">
//           <ProductsList products={products} loading={loading} />
//           <Pagination
//             page={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// ProductsPage.jsx
"use client";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import ProductsList from "@/components/products/ProductList";
import { BASE_URL } from "@/lib/axios";
import SearchBar from "@/components/Filters/SearchBar";
import CategoryFilter from "@/components/Filters/CategoryFilter";
import PriceRangeSlider from "@/components/Filters/PriceRangeSlider";
import Pagination from "@/components/Filters/Pagination";
import colors from "@/theme/colors";
import Image from "next/image";
import Link from "next/link";
import { ListFilter, Star, TrendingUp } from "lucide-react";
import RecentViewedProducts from "@/components/products/RecentViewedProducts";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [topSellingProduct, setTopSellingProduct] = useState(null);
  const [loadingTopProduct, setLoadingTopProduct] = useState(false);
  const [product, setProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [localSearch, setLocalSearch] = useState(search);
  const [localCategory, setLocalCategory] = useState(category);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const limit = 12;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (category) params.category = category;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;
      // console.log("Response Params", params);
      const res = await axios.get(`${BASE_URL}/api/products`, { params });
      // console.log("Response return", res?.data);
      // console.log("Response return", res?.data?.data);
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages || Math.ceil(res.data.total / limit));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  }, [page, search, category, priceRange]);

  // // Fetch top selling product
  // const fetchTopSellingProduct = useCallback(async () => {
  //   setLoadingTopProduct(true);
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/products/top-selling`);
  //     setTopSellingProduct(res.data.data);
  //   } catch (err) {
  //     console.error("Failed to fetch top selling product:", err);
  //   }
  //   setLoadingTopProduct(false);
  // }, []);



  const applyFilters = () => {
    // console.log("Apply Filters Clicked:");
    // console.log("Search:", localSearch);
    // console.log("Category:", localCategory);
    // console.log("Price Range:", localPriceRange);

    setSearch(localSearch);
    setCategory(localCategory);
    setPriceRange(localPriceRange);
    setPage(1);
  };

  const resetFilters = () => {
    setLocalSearch("");
    setLocalCategory("");
    setLocalPriceRange({ min: "", max: "" });

    setSearch("");
    setCategory("");
    setPriceRange({ min: "", max: "" });
    setPage(1);
  };

  useEffect(() => {
    fetchProducts();
    // fetchTopSellingProduct();
  }, [search, category, priceRange, page]);

  return (
    <div className="container w-full mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-6 ">
        <div
          className="md:w-1/5 w-full  flex flex-col  gap-4 
  md:sticky md:top-26 md:self-start"
        >
          <div className="flex items-center gap-2">
            <ListFilter size={20} className="text-primary" />
            <h3 className="font-semibold text-lg">Filter</h3>
          </div>
          <SearchBar search={localSearch} setSearch={setLocalSearch} />
          <CategoryFilter
            category={localCategory}
            setCategory={setLocalCategory}
          />

          <PriceRangeSlider
            priceRange={localPriceRange}
            setPriceRange={setLocalPriceRange}
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={applyFilters}
              style={{ backgroundColor: colors.primary, color: colors.white }}
              className="flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>

          {/* Top Selling Product Section */}
          {/* <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-primary" />
              <h3 className="font-semibold text-lg">Top Selling Product</h3>
            </div>

            {loadingTopProduct ? (
              <div className="animate-pulse">
                <div className="bg-gray-200 h-40 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : topSellingProduct ? (
              <Link href={`/products/${topSellingProduct.slug}`}>
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="relative h-40 bg-gray-100">
                    <Image
                      src={
                        topSellingProduct.images?.[0]?.url || "/placeholder.jpg"
                      }
                      alt={topSellingProduct.name}
                      fill
                      className="object-cover"
                    />
                    {topSellingProduct.originalPrice >
                      topSellingProduct.price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {Math.round(
                          (1 -
                            topSellingProduct.price /
                              topSellingProduct.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {topSellingProduct.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={
                              star <= (topSellingProduct.averageRating || 4)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({topSellingProduct.reviewCount || 24})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-primary text-sm">
                        Rs.{topSellingProduct.price}
                      </span>
                      {topSellingProduct.originalPrice >
                        topSellingProduct.price && (
                        <span className="text-xs text-gray-500 line-through">
                          Rs.{topSellingProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No top selling products available</p>
              </div>
            )}
          </div> */}
        </div>

        {/* Products list */}
        <div className="md:w-4/5 flex flex-col gap-6">
          <ProductsList products={products} loading={loading} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        <RecentViewedProducts />

        </div>
      </div>
    </div>
  );
}
