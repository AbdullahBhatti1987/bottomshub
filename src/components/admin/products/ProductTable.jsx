// "use client";
// import { useState } from "react";
// import ButtonsGroup from "@/components/ui/ButtonsGroup";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/Table";

// export default function ProductTable({
//   products = [],
//   onEdit,
//   onDelete,
//   onView,
//   loading,
// }) {
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//   // --- Client-side sorting ---
//   const sortedProducts = [...products].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     let valA = a[sortConfig.key];
//     let valB = b[sortConfig.key];

//     // Handle nested category name
//     if (sortConfig.key === "category") {
//       valA = a.category?.name || "";
//       valB = b.category?.name || "";
//     }

//     if (typeof valA === "string") valA = valA.toLowerCase();
//     if (typeof valB === "string") valB = valB.toLowerCase();

//     if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//     if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (key, direction) => setSortConfig({ key, direction });

//   return (
//     <div className="border border-gray-300 rounded-md overflow-x-auto bg-white shadow-sm">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Image</TableHead>
//             <TableHead
//               sortable
//               sortKey="name"
//               sortConfig={sortConfig}
//               onSort={handleSort}
//             >
//               Name
//             </TableHead>
//             <TableHead
//               sortable
//               sortKey="slug"
//               sortConfig={sortConfig}
//               onSort={handleSort}
//             >
//               Slug
//             </TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead
//               sortable
//               sortKey="price"
//               sortConfig={sortConfig}
//               onSort={handleSort}
//             >
//               Price
//             </TableHead>
//             <TableHead
//               sortable
//               sortKey="category"
//               sortConfig={sortConfig}
//               onSort={handleSort}
//             >
//               Category
//             </TableHead>
//             <TableHead
//               sortable
//               sortKey="tags"
//               sortConfig={sortConfig}
//               onSort={handleSort}
//             >
//               Tags
//             </TableHead>
//             <TableHead className="text-center">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {!loading && sortedProducts.length === 0 && (
//             <TableRow>
//               <TableCell colSpan="7" className="text-center text-gray-400">
//                 No Products found.
//               </TableCell>
//             </TableRow>
//           )}

//           {sortedProducts.map((p) => (
//             <TableRow key={p._id}>
//               <TableCell>
//                 <img
//                   src={p.images[0]?.thumbnailUrl || "/avatar.png"}
//                   alt={p.name}
//                   width={30}
//                   height={30}
//                   className="rounded-md object-contain"
//                 />
//               </TableCell>
//               <TableCell>{p.name}</TableCell>
//               <TableCell>{p.slug}</TableCell>
//               <TableCell truncate={30}>{p.description}</TableCell>
//               <TableCell>{p.price}</TableCell>
//               <TableCell>{p.category?.name}</TableCell>
//               <TableCell>{p.tags}</TableCell>
//               <TableCell className="text-center space-x-2">
//                 <ButtonsGroup
//                   data={p}
//                   onEdit={onEdit}
//                   onDelete={onDelete}
//                   onView={onView}
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import ButtonsGroup from "@/components/ui/ButtonsGroup";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

export default function ProductTable({
  products = [],
  onEdit,
  onDelete,
  pageSize,
  currentPage,
  onView,
  loading,
}) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "category") {
      valA = a.category?.name || "";
      valB = b.category?.name || "";
    }

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key, direction) => setSortConfig({ key, direction });

  return (
    <div className="border border-gray-300 rounded-md overflow-x-auto bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Image</TableHead>
            <TableHead
              sortable
              sortKey="name"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              Name
            </TableHead>
            <TableHead
              sortable
              sortKey="sku"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              SKU
            </TableHead>
            {/* <TableHead>Description</TableHead> */}
            <TableHead>Short Description</TableHead>
            <TableHead
              sortable
              sortKey="price"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              Price
            </TableHead>
            <TableHead
              sortable
              sortKey="sizes"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              Quantity
            </TableHead>
            <TableHead
              sortable
              sortKey="category"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              Category
            </TableHead>
            <TableHead
              sortable
              sortKey="tags"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              Tags
            </TableHead>
            {/* <TableHead>Stock</TableHead> */}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!loading && sortedProducts.length === 0 && (
            <TableRow>
              <TableCell colSpan="14" className="text-center text-gray-400">
                No Products found.
              </TableCell>
            </TableRow>
          )}

          {sortedProducts.map((p, index) => (
            <TableRow key={p._id}>
              <TableCell>
                {(currentPage - 1) * pageSize + (index + 1)}
              </TableCell>
              <TableCell>
                <img
                  src={p.images[0]?.thumbnailUrl || "/avatar.png"}
                  alt={p.name}
                  width={30}
                  height={30}
                  className="rounded-md object-contain"
                />
              </TableCell>
              <TableCell  truncate={20}>{p.name}</TableCell>
              <TableCell>{p.sku}</TableCell>
              {/* <TableCell truncate={30}>{p.description}</TableCell> */}
              <TableCell truncate={20}>{p.shortDescription}</TableCell>
              <TableCell>{p.price}</TableCell>
               <TableCell>
                {p.sizes.reduce((sum, s) => sum + s.quantity, 0)}
              </TableCell>
              {/* <TableCell>{p.discountValue}</TableCell> */}
               <TableCell>{p.category?.name}</TableCell>
              <TableCell>{p.tags}</TableCell>
              {/* <TableCell>{p.inStock ? "Yes" : "No"}</TableCell> */}
              <TableCell className="text-center space-x-2">
                <ButtonsGroup
                  data={p}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
