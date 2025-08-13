// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/Table";
// import { formatDate } from "@/lib/date";
// import { Trash2, Pencil } from "lucide-react";

// export default function UserTable({currentPage, users,pageSize, onEdit, onDelete }) {
//   return (
//     <div className="border border-gray-300 rounded-md overflow-x-auto bg-white shadow-sm">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>S.No</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Mobile</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Created</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map((u, index) => (
//             <TableRow key={u._id}>
//               <TableCell>
//                 {(currentPage - 1) * pageSize + (index + 1)}
//               </TableCell>
//               <TableCell>{u.name}</TableCell>
//               <TableCell>{u.mobile}</TableCell>
//               <TableCell>{u.email}</TableCell>
//               <TableCell>{u.role}</TableCell>
//               <TableCell className="text-gray-500">
//                 {formatDate(u?.createdAt)}
//               </TableCell>
//               <TableCell className="text-center space-x-2">
//                 <button
//                   onClick={() => onEdit(u)}
//                   className="inline-flex items-center justify-center  w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
//                 >
//                   <Pencil size={16} />
//                 </button>
//                 <button
//                   onClick={() => onDelete(u._id)}
//                   className="inline-flex items-center justify-center  w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

import ButtonsGroup from "@/components/ui/ButtonsGroup";
import Loader from "@/components/ui/Loader";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { formatDate } from "@/lib/date";
import { useState } from "react";

export default function UserTable({
  currentPage,
  users,
  pageSize,
  onEdit,
  onDelete,
  onView,
}) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return (
    <div className="border border-gray-300 rounded-md  bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
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
                sortKey="mobile"
                sortConfig={sortConfig}
                onSort={handleSort}
              >
                Mobile
              </TableHead>
              <TableHead
                sortable
                sortKey="email"
                sortConfig={sortConfig}
                onSort={handleSort}
              >
                Email
              </TableHead>
             <TableHead
                sortable
                sortKey="role"
                sortConfig={sortConfig}
                onSort={handleSort}
              >
                Role
              </TableHead>
              <TableHead
                sortable
                sortKey="createdAt"
                sortConfig={sortConfig}
                onSort={handleSort}
              >
                Created
              </TableHead>
              <TableHead
                sortable
                sortKey="role"
                sortConfig={sortConfig}
                onSort={handleSort}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((u, index) => (
              <TableRow key={u._id}>
                <TableCell>
                  {(currentPage - 1) * pageSize + (index + 1)}
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.mobile}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell className="text-gray-500">
                  {formatDate(u?.createdAt)}
                </TableCell>

                <TableCell className="text-center space-x-2">
                  <ButtonsGroup
                    data={u}
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
    </div>
  );
}
