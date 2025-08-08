// "use client";

// import { useState } from "react";
// import { formatDate } from "@/lib/date";
// import { Trash2, Pencil } from "lucide-react";
// import Image from "next/image";
// import Button from "@/components/ui/Button";

// export default function CategoryTable({ categories = [], onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border rounded">
//         <thead>
//           <tr className="text-left bg-gray-100">
//             <th className="px-4 py-2">Image</th>
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Slug</th>
//             <th className="px-4 py-2">Created</th>
//             <th className="px-4 py-2 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.length === 0 && (
//             <tr>
//               <td colSpan="5" className="text-center py-6 text-gray-500">
//                 No categories found.
//               </td>
//             </tr>
//           )}
//           {categories.map((cat) => (
//             <tr key={cat._id} className="border-t">
//               <td className="px-4 py-2">
//                 {cat?.imageUrl && (
//                   <Image
//                     src={cat.thumbnailUrl}
//                     alt={cat.name}
//                     width={40}
//                     height={40}
//                     className="rounded object-cover"
//                   />
//                 )}
//               </td>
//               <td className="px-4 py-2">{cat.name}</td>
//               <td className="px-4 py-2 text-gray-500">{cat.slug}</td>
//               <td className="px-4 py-2">{formatDate(cat.createdAt)}</td>
//               <td className="px-4 py-2 text-right space-x-2">
//                 <Button onClick={() => onEdit(cat)} className="px-2 py-1">
//                   <Pencil size={16} />
//                 </Button>
//                 <Button onClick={() => onDelete(cat._id)} className="px-2 py-1 bg-red-500 hover:bg-red-600">
//                   <Trash2 size={16} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";

import { formatDate } from "@/lib/date";
import { Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function CategoryTable({ categories = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Slug</th>
            <th className="px-4 py-3 text-left">Created</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {categories.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-400">
                No categories found.
              </td>
            </tr>
          )}
          {categories.map((cat) => (
            <tr key={cat._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                {cat?.thumbnailUrl && (
                  <Image
                    src={cat.thumbnailUrl}
                    alt={cat.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-3 text-gray-800 capitalize">{cat.name}</td>
              <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
              <td className="px-4 py-3 text-gray-500">{formatDate(cat.createdAt)}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(cat._id)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
