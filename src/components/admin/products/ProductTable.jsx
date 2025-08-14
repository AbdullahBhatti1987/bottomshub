// // // ✅ ProductTable.jsx
// // // components/admin/products/ProductTable.jsx

// // import {
// //   Table,
// //   TableHeader,
// //   TableBody,
// //   TableRow,
// //   TableHead,
// //   TableCell,
// // } from "@/components/ui/Table";
// // import Button from "@/components/ui/Button";
// // import Badge from "@/components/ui/Badge";

// // import { Pencil, Trash2 } from "lucide-react";
// // import axios from "axios";
// // import { BASE_URL } from "@/lib/axios";

// // // export default function ProductTable({ products = [], onRefresh }) {
// // //   const handleDelete = async (id) => {
// // //     if (!confirm("Are you sure you want to delete this product?")) return;
// // //     try {
// // //       await axios.delete(`${BASE_URL}/api/admin/products/${id}`);
// // //       onRefresh();
// // //     } catch (err) {
// // //       console.error("Delete error:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="border rounded-md overflow-x-auto">
// // //       <Table>
// // //         <TableHeader>
// // //           <TableRow>
// // //             <TableHead>Image</TableHead>
// // //             <TableHead>Name</TableHead>
// // //             <TableHead>Price</TableHead>
// // //             <TableHead>Stock</TableHead>
// // //             <TableHead>Status</TableHead>
// // //             <TableHead>Actions</TableHead>
// // //           </TableRow>
// // //         </TableHeader>
// // //         <TableBody>
// // //           {products.map((product) => (
// // //             <TableRow key={product._id}>
// // //               <TableCell>
// // //                 <img
// // //                   src={product.images?.[1] || "/placeholder.png"}
// // //                   alt={product.name}
// // //                   className="w-12 h-12 rounded object-cover"
// // //                 />
// // //               </TableCell>

// // //               <TableCell>{product.name}</TableCell>
// // //               <TableCell>Rs. {product.price}</TableCell>
// // //               <TableCell>{product.stock}</TableCell>
// // //               <TableCell>
// // //                 <Badge variant={product.active ? "success" : "destructive"}>
// // //                   {product.active ? "Active" : "Inactive"}
// // //                 </Badge>
// // //               </TableCell>
// // //               <TableCell className="flex gap-2">
// // //                 <Button size="sm" variant="outline">
// // //                   <Pencil className="w-4 h-4" />
// // //                 </Button>
// // //                 <Button
// // //                   size="sm"
// // //                   variant="destructive"
// // //                   onClick={() => handleDelete(product._id)}
// // //                 >
// // //                   <Trash2 className="w-4 h-4" />
// // //                 </Button>
// // //               </TableCell>
// // //             </TableRow>
// // //           ))}
// // //         </TableBody>
// // //       </Table>
// // //     </div>
// // //   );
// // // }

// // // export default function ProductTable({ products = [], onRefresh }) {
// // //   const handleDelete = async (id) => {
// // //     if (!confirm("Are you sure you want to delete this product?")) return;
// // //     try {
// // //       await axios.delete(`${BASE_URL}/api/admin/products/${id}`);
// // //       onRefresh();
// // //     } catch (err) {
// // //       console.error("Delete error:", err);
// // //     }
// // //   };

// // export default function ProductTable({ products }) {
// //   return (
// //     <div className="overflow-x-auto">
// //       <table className="w-full border-collapse border border-gray-200 text-sm">
// //         <thead className="bg-gray-100">
// //           <tr>
// //             <th className="border p-2">Image</th>
// //             <th className="border p-2">Name</th>
// //             <th className="border p-2">Slug</th>
// //             <th className="border p-2">Description</th>
// //             <th className="border p-2">Price</th>
// //             <th className="border p-2">Original Price</th>
// //             <th className="border p-2">Category</th>
// //             <th className="border p-2">Tags</th>
// //             <th className="border p-2">Sizes</th>
// //             <th className="border p-2">Discount</th>
// //             <th className="border p-2">In Stock</th>
// //             <th className="border p-2">Featured</th>
// //             <th className="border p-2">Created At</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {products.map((p) => (
// //             <tr key={p._id}>
// //               <td className="border p-2">
// //                 <img
// //                   src={p.imageUrl?.[0]}
// //                   alt={p.name}
// //                   className="w-12 h-12 object-cover rounded"
// //                 />
// //               </td>
// //               <td className="border p-2">{p.name}</td>
// //               <td className="border p-2">{p.slug}</td>
// //               <td className="border p-2 max-w-xs truncate">{p.description}</td>
// //               <td className="border p-2">Rs {p.price}</td>
// //               <td className="border p-2">{p.originalPrice || "-"}</td>
// //               <td className="border p-2">{p.category?.name || "-"}</td>
// //               <td className="border p-2">{p.tags?.join(", ")}</td>
// //               <td className="border p-2">{p.sizes?.join(", ")}</td>
// //               <td className="border p-2">{p.discount}</td>
// //               <td className="border p-2">
// //                 {p.inStock ? "✅" : "❌"}
// //               </td>
// //               <td className="border p-2">
// //                 {p.isFeatured ? "⭐" : "-"}
// //               </td>
// //               <td className="border p-2">
// //                 {new Date(p.createdAt).toLocaleDateString()}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// import ButtonsGroup from "@/components/ui/ButtonsGroup";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
  
// } from "@/components/ui/Table";

// export default function ProductTable({ products = [], onEdit, onDelete,loading, onView })  {
//   return (
//     <div className="border border-gray-300 rounded-md overflow-x-auto bg-white shadow-sm">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Image</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Slug</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Price</TableHead>
//             {/* <TableHead>Original Price</TableHead> */}
//             <TableHead>Category</TableHead>
//             {/* <TableHead>Tags</TableHead> */}
//             {/* <TableHead>Sizes</TableHead> */}
//             {/* <TableHead>Discount</TableHead> */}
//             {/* <TableHead>In Stock</TableHead> */}
//             {/* <TableHead>Featured</TableHead> */}
//             {/* <TableHead>Created At</TableHead> */}
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//            {!loading && products.length === 0 && (
//             <TableRow>
//               <TableCell colSpan="7" className="text-center text-gray-400">
//                 No Products found.
//               </TableCell>
//             </TableRow>
//           )}
//           {products.map((p) => (
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
//               {/* <TableCell>{p.originalPrice || "-"}</TableCell> */}
//               <TableCell>{p.category?.name || "-"}</TableCell>
//               {/* <TableCell>{p.tags?.join(", ")}</TableCell> */}
//               {/* <TableCell>{p.sizes?.join(", ")}</TableCell> */}
//               {/* <TableCell>{p.discount}</TableCell> */}
//               {/* <TableCell>{p.inStock ? "✅" : "❌"}</TableCell> */}
//               {/* <TableCell>{p.isFeatured ? "⭐" : "-"}</TableCell> */}
//               {/* <TableCell>
//                 {new Date(p.createdAt).toLocaleDateString()}
//               </TableCell> */}
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
  onView,
  loading,
}) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // --- Client-side sorting ---
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    // Handle nested category name
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
              sortKey="slug"
              sortConfig={sortConfig}
              onSort={handleSort}
            >
              Slug
            </TableHead>
            <TableHead>Description</TableHead>
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
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!loading && sortedProducts.length === 0 && (
            <TableRow>
              <TableCell colSpan="7" className="text-center text-gray-400">
                No Products found.
              </TableCell>
            </TableRow>
          )}

          {sortedProducts.map((p) => (
            <TableRow key={p._id}>
              <TableCell>
                <img
                  src={p.images[0]?.thumbnailUrl || "/avatar.png"}
                  alt={p.name}
                  width={30}
                  height={30}
                  className="rounded-md object-contain"
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.slug}</TableCell>
              <TableCell truncate={30}>{p.description}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.category?.name}</TableCell>
              <TableCell>{p.tags}</TableCell>
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
