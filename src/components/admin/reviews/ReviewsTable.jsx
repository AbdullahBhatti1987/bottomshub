"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { formatDate } from "@/lib/date";
import { Eye, Trash2 } from "lucide-react";

export default function ReviewsTable({ reviews = [], onView, onDelete }) {
  return (
        <div className="border border-gray-300 rounded-md overflow-x-auto bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reviews.length === 0 && (
            <TableRow>
              <TableCell colSpan="6" className="text-center text-gray-400">
                No reviews found.
              </TableCell>
            </TableRow>
          )}

          {reviews.map((r) => (
            <TableRow key={r._id}>
              <TableCell>{r.product?.name || "—"}</TableCell>
              <TableCell>
                {r.user?.name || "—"} <br />
                <small className="text-gray-500">{r.user?.email}</small>
              </TableCell>
              <TableCell>{r.rating} / 5</TableCell>
              <TableCell className="text-gray-500 truncate max-w-lg">{r.comment || "-"}</TableCell>
              <TableCell className="text-gray-500">{formatDate(r.createdAt)}</TableCell>
              <TableCell className="text-center space-x-2">
                <button
                  onClick={() => onView(r)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                  title="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onDelete(r)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-red-600 hover:bg-red-100 transition"
                  title="Delete"
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
