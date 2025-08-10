"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Select, SelectItem } from "@/components/ui/Select";

const ORDER_STATUSES = [
  "",
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "canceled",
];

export default function OrderFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = { search: "", status: "", dateFrom: "", dateTo: "" };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form
      onSubmit={handleFilter}
      className="w-full flex flex-col md:flex-row gap-4 items-end mb-6"
    >
      <div className="flex-1">
        <Input
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by Order ID or User"
        />
      </div>

      <div>
        <Select
          name="status"
          value={filters.status}
          onChange={(value) => {
            const newFilters = { ...filters, status: value };
            setFilters(newFilters);
            onFilter(newFilters); // immediate filter on status change
          }}
        >
          {ORDER_STATUSES.map((status) => (
            <SelectItem key={status || "all"} value={status}>
              {status ? status.charAt(0).toUpperCase() + status.slice(1) : "All Statuses"}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <label className="sr-only">Date From</label>
        <Input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleChange}
          placeholder="From"
        />
      </div>

      <div>
        <label className="sr-only">Date To</label>
        <Input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleChange}
          placeholder="To"
        />
      </div>

      <div className="flex gap-2 mb-4">
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
