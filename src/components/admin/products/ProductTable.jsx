// // ✅ ProductTable.jsx
// // components/admin/products/ProductTable.jsx

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/Table";
// import Button from "@/components/ui/Button";
// import Badge from "@/components/ui/Badge";

// import { Pencil, Trash2 } from "lucide-react";
// import axios from "axios";
// import { BASE_URL } from "@/lib/axios";

// // export default function ProductTable({ products = [], onRefresh }) {
// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this product?")) return;
// //     try {
// //       await axios.delete(`${BASE_URL}/api/admin/products/${id}`);
// //       onRefresh();
// //     } catch (err) {
// //       console.error("Delete error:", err);
// //     }
// //   };

// //   return (
// //     <div className="border rounded-md overflow-x-auto">
// //       <Table>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead>Image</TableHead>
// //             <TableHead>Name</TableHead>
// //             <TableHead>Price</TableHead>
// //             <TableHead>Stock</TableHead>
// //             <TableHead>Status</TableHead>
// //             <TableHead>Actions</TableHead>
// //           </TableRow>
// //         </TableHeader>
// //         <TableBody>
// //           {products.map((product) => (
// //             <TableRow key={product._id}>
// //               <TableCell>
// //                 <img
// //                   src={product.images?.[1] || "/placeholder.png"}
// //                   alt={product.name}
// //                   className="w-12 h-12 rounded object-cover"
// //                 />
// //               </TableCell>

// //               <TableCell>{product.name}</TableCell>
// //               <TableCell>Rs. {product.price}</TableCell>
// //               <TableCell>{product.stock}</TableCell>
// //               <TableCell>
// //                 <Badge variant={product.active ? "success" : "destructive"}>
// //                   {product.active ? "Active" : "Inactive"}
// //                 </Badge>
// //               </TableCell>
// //               <TableCell className="flex gap-2">
// //                 <Button size="sm" variant="outline">
// //                   <Pencil className="w-4 h-4" />
// //                 </Button>
// //                 <Button
// //                   size="sm"
// //                   variant="destructive"
// //                   onClick={() => handleDelete(product._id)}
// //                 >
// //                   <Trash2 className="w-4 h-4" />
// //                 </Button>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   );
// // }


// // export default function ProductTable({ products = [], onRefresh }) {
// //   const handleDelete = async (id) => {
// //     if (!confirm("Are you sure you want to delete this product?")) return;
// //     try {
// //       await axios.delete(`${BASE_URL}/api/admin/products/${id}`);
// //       onRefresh();
// //     } catch (err) {
// //       console.error("Delete error:", err);
// //     }
// //   };


// export default function ProductTable({ products }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse border border-gray-200 text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Image</th>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Slug</th>
//             <th className="border p-2">Description</th>
//             <th className="border p-2">Price</th>
//             <th className="border p-2">Original Price</th>
//             <th className="border p-2">Category</th>
//             <th className="border p-2">Tags</th>
//             <th className="border p-2">Sizes</th>
//             <th className="border p-2">Discount</th>
//             <th className="border p-2">In Stock</th>
//             <th className="border p-2">Featured</th>
//             <th className="border p-2">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p._id}>
//               <td className="border p-2">
//                 <img
//                   src={p.imageUrl?.[0]}
//                   alt={p.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//               </td>
//               <td className="border p-2">{p.name}</td>
//               <td className="border p-2">{p.slug}</td>
//               <td className="border p-2 max-w-xs truncate">{p.description}</td>
//               <td className="border p-2">Rs {p.price}</td>
//               <td className="border p-2">{p.originalPrice || "-"}</td>
//               <td className="border p-2">{p.category?.name || "-"}</td>
//               <td className="border p-2">{p.tags?.join(", ")}</td>
//               <td className="border p-2">{p.sizes?.join(", ")}</td>
//               <td className="border p-2">{p.discount}</td>
//               <td className="border p-2">
//                 {p.inStock ? "✅" : "❌"}
//               </td>
//               <td className="border p-2">
//                 {p.isFeatured ? "⭐" : "-"}
//               </td>
//               <td className="border p-2">
//                 {new Date(p.createdAt).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Pencil, Trash2 } from "lucide-react";


export default function ProductTable({ products = [],  onEdit, onDelete }) {


  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            {/* <TableHead>Original Price</TableHead> */}
            <TableHead>Category</TableHead>
            {/* <TableHead>Tags</TableHead> */}
            {/* <TableHead>Sizes</TableHead> */}
            {/* <TableHead>Discount</TableHead> */}
            {/* <TableHead>In Stock</TableHead> */}
            {/* <TableHead>Featured</TableHead> */}
            {/* <TableHead>Created At</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>
                <img
                  src={p.imageUrl?.[0] || "/avatar.png"}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.slug}</TableCell>
              <TableCell truncate={30}>{p.description}</TableCell>
              <TableCell>Rs {p.price}</TableCell>
              {/* <TableCell>{p.originalPrice || "-"}</TableCell> */}
              <TableCell>{p.category?.name || "-"}</TableCell>
              {/* <TableCell>{p.tags?.join(", ")}</TableCell> */}
              {/* <TableCell>{p.sizes?.join(", ")}</TableCell> */}
              {/* <TableCell>{p.discount}</TableCell> */}
              {/* <TableCell>{p.inStock ? "✅" : "❌"}</TableCell> */}
              {/* <TableCell>{p.isFeatured ? "⭐" : "-"}</TableCell> */}
              {/* <TableCell>
                {new Date(p.createdAt).toLocaleDateString()}
              </TableCell> */}
              
               <TableCell className="text-center space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="inline-flex items-center justify-center  w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  className="inline-flex items-center justify-center  w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                >
                  <Trash2 size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
