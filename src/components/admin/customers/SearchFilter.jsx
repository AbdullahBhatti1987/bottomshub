"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SearchFilter({  onFilter }) {
  const [filters, setFilters] = useState({
    search: "",
  
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = { search: "" };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form
      onSubmit={handleFilter}
      className="w-full flex flex-row gap-4 items-end  "
    >
      <div className="flex-1">
        <Input
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by name, email or mobile..."
        />
      </div>

     

      <div className="flex gap-2 items-end ">
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
