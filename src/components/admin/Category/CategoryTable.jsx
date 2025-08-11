// "use client";

// import { formatDate } from "@/lib/date";
// import { Trash2, Pencil } from "lucide-react";
// import Image from "next/image";
// import Button from "@/components/ui/Button";

// export default function CategoryTable({ categories = [], onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
//       <table className="min-w-full text-sm">
//         <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
//           <tr>
//             <th className="px-4 py-3 text-left">Image</th>
//             <th className="px-4 py-3 text-left">Name</th>
//             <th className="px-4 py-3 text-left">Slug</th>
//             <th className="px-4 py-3 text-left">Description</th>
//             <th className="px-4 py-3 text-left">Created</th>
//             <th className="px-4 py-3 text-center ">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {categories.length === 0 && (
//             <tr>
//               <td colSpan="5" className="text-center py-6 text-gray-400">
//                 No categories found.
//               </td>
//             </tr>
//           )}
//           {categories.map((cat) => (
//             <tr key={cat._id} className="hover:bg-gray-50">
//               <td className="px-4 py-3">
//                 {cat?.thumbnailUrl && (
//                   <Image
//                     src={cat.thumbnailUrl}
//                     alt={cat.name}
//                     width={40}
//                     height={40}
//                     className="rounded-md object-cover"
//                   />
//                 )}
//               </td>
//               <td className="px-4 py-3 text-gray-800 capitalize">{cat.name}</td>
//               <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
//               <td className="px-4 py-3 text-gray-500">
//                 {cat.description.length > 50
//                   ? `${cat.description.slice(0, 50)}...`
//                   : cat.description}
//               </td>

//               <td className="px-4 py-3 text-gray-500">
//                 {formatDate(cat.createdAt)}
//               </td>
//               <td className="px-4 py-3 text-right space-x-2">
//                 <button
//                   onClick={() => onEdit(cat)}
//                   className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
//                 >
//                   <Pencil size={16} />
//                 </button>
//                 <button
//                   onClick={() => onDelete(cat._id)}
//                   className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
//                 >
//                   <Trash2 size={16} />
//                 </button>
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
import { formatDate } from "@/lib/date";
import { Trash2, Pencil } from "lucide-react";
import Image from "next/image";

export default function CategoryTable({ categories = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan="6" className="text-center text-gray-400">
                No categories found.
              </TableCell>
            </TableRow>
          )}
          {categories.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>
                {cat?.thumbnailUrl && (
                  <Image
                    src={cat.thumbnailUrl}
                    alt={cat.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                )}
              </TableCell>
              <TableCell className="capitalize">{cat.name}</TableCell>
              <TableCell className="text-gray-500">{cat.slug}</TableCell>
              <TableCell className="text-gray-500" truncate={30}>
                {cat.description}
              </TableCell>
              <TableCell className="text-gray-500">
                {formatDate(cat.createdAt)}
              </TableCell>
              <TableCell className="text-center space-x-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="inline-flex items-center justify-center  w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(cat._id)}
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
