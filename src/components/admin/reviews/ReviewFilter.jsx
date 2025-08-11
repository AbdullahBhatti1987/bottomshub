// // "use client";

// // import { useState } from "react";
// // import Input from "@/components/ui/Input";
// // import Button from "@/components/ui/Button";
// // import { Select, SelectItem } from "@/components/ui/Select";
// // import DatePicker from "@/components/ui/DatePicker"; // Assuming you have a datepicker component

// // export default function ReviewFilter({
// //   products = [],
// //   users = [],
// //   onFilter,
// // }) {
// //   const [filters, setFilters] = useState({
// //     search: "",
// //     rating: "",
// //     productId: "",
// //     userId: "",
// //     dateFrom: "",
// //     dateTo: "",
// //   });

// //   const handleChange = (e) => {
// //     setFilters({ ...filters, [e.target.name]: e.target.value });
// //   };

// //   const handleSelect = (name, value) => {
// //     setFilters({ ...filters, [name]: value });
// //   };

// //   const handleFilter = (e) => {
// //     e.preventDefault();
// //     onFilter(filters);
// //   };

// //   const handleReset = () => {
// //     const reset = {
// //       search: "",
// //       rating: "",
// //       productId: "",
// //       userId: "",
// //       dateFrom: "",
// //       dateTo: "",
// //     };
// //     setFilters(reset);
// //     onFilter(reset);
// //   };

// //   return (
// //     <form
// //       onSubmit={handleFilter}
// //       className="w-full flex flex-col lg:flex-row lg:flex-wrap gap-4 items-end mb-6"
// //     >
// //       {/* Search by comment */}
// //       <div className="flex-1 min-w-[200px]">
// //         <Input
// //           name="search"
// //           value={filters.search}
// //           onChange={handleChange}
// //           placeholder="Search by comment..."
// //         />
// //       </div>

// //       {/* Filter by rating */}
// //       <div className="flex-1 min-w-[150px]">
// //         <Select
// //           name="rating"
// //           value={filters.rating}
// //           onChange={(val) => handleSelect("rating", val)}
// //         >
// //           <SelectItem value="">All Ratings</SelectItem>
// //           {[5, 4, 3, 2, 1].map((r) => (
// //             <SelectItem key={r} value={String(r)}>
// //               {r} Stars
// //             </SelectItem>
// //           ))}
// //         </Select>
// //       </div>

// //       {/* Filter by product */}
// //       <div className="flex-1 min-w-[200px]">
// //         <Select
// //           name="productId"
// //           value={filters.productId}
// //           onChange={(val) => handleSelect("productId", val)}
// //         >
// //           <SelectItem value="">All Products</SelectItem>
// //           {products.map((p) => (
// //             <SelectItem key={p._id} value={p._id}>
// //               {p.name}
// //             </SelectItem>
// //           ))}
// //         </Select>
// //       </div>

// //       {/* Filter by user */}
// //       <div className="flex-1 min-w-[200px]">
// //         <Select
// //           name="userId"
// //           value={filters.userId}
// //           onChange={(val) => handleSelect("userId", val)}
// //         >
// //           <SelectItem value="">All Users</SelectItem>
// //           {users.map((u) => (
// //             <SelectItem key={u._id} value={u._id}>
// //               {u.name} ({u.email})
// //             </SelectItem>
// //           ))}
// //         </Select>
// //       </div>

// //       {/* Date range */}
// //       <div className="flex-1 min-w-[160px]">
// //         <DatePicker
// //           selected={filters.dateFrom}
// //           onChange={(date) =>
// //             handleSelect("dateFrom", date ? date.toISOString() : "")
// //           }
// //           placeholderText="From Date"
// //         />
// //       </div>
// //       <div className="flex-1 min-w-[160px]">
// //         <DatePicker
// //           selected={filters.dateTo}
// //           onChange={(date) =>
// //             handleSelect("dateTo", date ? date.toISOString() : "")
// //           }
// //           placeholderText="To Date"
// //         />
// //       </div>

// //       {/* Actions */}
// //       <div className="flex gap-2 items-end">
// //         <Button type="submit" variant="primary">
// //           Filter
// //         </Button>
// //         <Button type="button" variant="outline" onClick={handleReset}>
// //           Reset
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import Input from "@/components/ui/Input";
// import Button from "@/components/ui/Button";
// import { Select, SelectItem } from "@/components/ui/Select";

// export default function ReviewFilter({ onFilter, products = [] }) {
//   const [filters, setFilters] = useState({
//     search: "",
//     rating: "",
//     productId: "",
//     userId: "",
//     dateFrom: "",
//     dateTo: "",
//   });

//   const handleChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFilter = (e) => {
//     e.preventDefault();
//     onFilter(filters);
//   };

//   const handleReset = () => {
//     const reset = {
//       search: "",
//       rating: "",
//       productId: "",
//       userId: "",
//       dateFrom: "",
//       dateTo: "",
//     };
//     setFilters(reset);
//     onFilter(reset);
//   };

//   return (
//     <form onSubmit={handleFilter} className="w-full flex flex-col  mb-6">
//       {/* Row 1 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Comment Search */}
//         <div className="flex flex-col">
//           <Input
//             name="search"
//             value={filters.search}
//             onChange={(e) => handleChange("search", e.target.value)}
//             placeholder="Search by comment..."
//           />
//         </div>

//         {/* Rating + Product */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <Select
//               name="rating"
//               value={filters.rating}
//               onChange={(val) => handleChange("rating", val)}
//             >
//               <SelectItem value="">All Ratings</SelectItem>
//               <SelectItem value="5">5</SelectItem>
//               <SelectItem value="4">4</SelectItem>
//               <SelectItem value="3">3</SelectItem>
//               <SelectItem value="2">2</SelectItem>
//               <SelectItem value="1">1</SelectItem>
//             </Select>
//           </div>

//           <div className="flex flex-col ">
//             <Select
//               name="productId"
//               value={filters.productId}
//               onChange={(val) => handleChange("productId", val)}
//             >
//               <SelectItem value="">All Products</SelectItem>
//               {products.map((p) => (
//                 <SelectItem key={p._id} value={p._id}>
//                   {p.name}
//                 </SelectItem>
//               ))}
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Row 2 */}
//       <div className="grid grid-cols-3gap-4 items-end bg-amber-200">
//         {/* Dates */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <Input
//               type="date"
//               name="dateFrom"
//               value={filters.dateFrom}
//               onChange={(e) => handleChange("dateFrom", e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col">
//             <Input
//               type="date"
//               name="dateTo"
//               value={filters.dateTo}
//               onChange={(e) => handleChange("dateTo", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className=" gap-2  grid grid-cols-1 justify-end">
//           <Button type="submit" variant="primary" className="px-6">
//             Filter
//           </Button>
//           <Button type="button" variant="outline" onClick={handleReset} className="px-6">
//             Reset
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Select, SelectItem } from "@/components/ui/Select";

export default function ReviewFilter({ onFilter, products = [] }) {
  const [filters, setFilters] = useState({
    search: "",
    rating: "",
    productId: "",
    userId: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const reset = {
      search: "",
      rating: "",
      productId: "",
      userId: "",
      dateFrom: "",
      dateTo: "",
    };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <form onSubmit={handleFilter} className="w-full flex flex-col  mb-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Comment Search */}
        <Input
          name="search"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Search by comment..."
        />

        {/* Rating + Product */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            name="rating"
            value={filters.rating}
            onChange={(val) => handleChange("rating", val)}
          >
            <SelectItem value="">All Ratings</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="1">1</SelectItem>
          </Select>

          <Select
            name="productId"
            value={filters.productId}
            onChange={(val) => handleChange("productId", val)}
          >
            <SelectItem value="">All Products</SelectItem>
            {products.map((p) => (
              <SelectItem key={p._id} value={p._id}>
                {p.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4 items-end ">
        {/* 2/3 for Dates */}
        <div className="col-span-2 grid grid-cols-2 gap-4 ">
          <Input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
          />
          <Input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={(e) => handleChange("dateTo", e.target.value)}
          />
        </div>

        {/* 1/3 for Buttons */}
        <div className="col-span-1 flex justify-end gap-2 mb-4 m-1">
          <Button type="submit" variant="primary" className="px-6 py-0">
            Filter
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="px-6 py-0"
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
