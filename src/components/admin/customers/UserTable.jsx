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

export default function UserTable({currentPage, users,pageSize, onEdit, onDelete }) {
  return (
    <div className="border border-gray-300 rounded-md overflow-x-auto bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u, index) => (
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
                <button
                  onClick={() => onEdit(u)}
                  className="inline-flex items-center justify-center  w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(u._id)}
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
