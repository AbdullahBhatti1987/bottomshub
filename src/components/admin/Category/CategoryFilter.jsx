"use client";

import Input from "@/components/ui/Input";

export default function CategoryFilter({ search, setSearch }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <Input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md"
      />
    </div>
  );
}
