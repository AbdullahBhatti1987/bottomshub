// ProductsPage.jsx
"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductsList from "@/components/products/ProductList";
import { BASE_URL } from "@/lib/axios";
import SearchBar from "@/components/Filters/SearchBar";
import CategoryFilter from "@/components/Filters/CategoryFilter";
import PriceRangeSlider from "@/components/Filters/PriceRangeSlider";
import Pagination from "@/components/Filters/Pagination";
import colors from "@/theme/colors";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const applyFilters = () => {
    console.log("Apply Filters Clicked:");
    console.log("Search:", localSearch);
    console.log("Category:", localCategory);
    console.log("Price Range:", localPriceRange);

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
  }, [search, category, priceRange, page]);

  return (
    <div className="container w-full mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-6 ">
       

        <div
          className="md:w-1/5 w-full  flex flex-col  gap-4 
  md:sticky md:top-26 md:self-start"
        >
          <h1 className="text-3xl font-bold w-full sm:w-auto">Filter</h1>
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
        </div>

        {/* Products list */}
        <div className="md:w-4/5 flex flex-col gap-6">
          <ProductsList products={products} loading={loading} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
