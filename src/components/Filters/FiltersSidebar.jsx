"use client";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";

export default function FiltersSidebar({ search, setSearch, category, setCategory, priceRange, setPriceRange }) {
  return (
    <div className="md:w-1/4 flex flex-col gap-6 sticky top-24 p-4 bg-white shadow-md rounded-lg">
      <SearchBar search={search} setSearch={setSearch} />
      <CategoryFilter category={category} setCategory={setCategory} />
      <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />
      <button
        onClick={() => {
          setSearch("");
          setCategory("");
          setPriceRange({ min: "", max: "" });
        }}
        className="mt-24 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Reset Filters
      </button>
    </div>
  );
}
