"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Select, SelectItem } from "@/components/ui/Select";

export default function ProductFilter({ categories = [], onFilter }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = { search: "", category: "" };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    // <form onSubmit={handleFilter} className="flex flex-col md:flex-row gap-4 items-end mb-6">
    //   <div className="flex-1">
    //     <label className="text-sm text-gray-600">Search by Name</label>
    //     <Input
    //       name="search"
    //       value={filters.search}
    //       onChange={handleChange}
    //       placeholder="e.g. Soft Denim Jacket"
    //     />
    //   </div>

    //   <div className="flex-1">
    //     <label className="text-sm text-gray-600">Filter by Category</label>
    //     <Select
    //       name="category"
    //       value={filters.category}
    //       onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
    //     >
    //       <SelectItem value="" key="all">All Categories</SelectItem>
    //       {categories.map((cat) => (
    //         <SelectItem key={cat._id} value={cat._id}>
    //           {cat.name}
    //         </SelectItem>
    //       ))}
    //     </Select>
    //   </div>

    //   <div className="flex gap-2 items-end">
    //     <Button type="submit" variant="primary">
    //       Filter
    //     </Button>
    //     <Button type="button" variant="outline" onClick={handleReset}>
    //       Reset
    //     </Button>
    //   </div>
    // </form>

    <form
      onSubmit={handleFilter}
      className="w-full flex flex-col md:flex-row gap-4 items-end mb-6"
    >
      <div className="flex-1">
        {/* <label className="text-sm text-gray-600">Search by Name</label> */}
        <Input
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="e.g. Soft Denim Jacket"
        />
      </div>

      <div className="flex-1">
        {/* <label className="text-sm text-gray-600">Filter by Category</label> */}
        <Select
          name="category"
          value={filters.category}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectItem value="" key="all">
            All Categories
          </SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat._id} value={cat._id}>
              {cat.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex gap-2 items-end mb-4 ">
        <Button type="submit" variant="primary">
          Filter
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
