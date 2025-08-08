"use client";

import { useState } from "react";
import { formatDate } from "@/lib/date";
import { Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function CategoryTable({ categories = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Slug</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="px-4 py-2">
                {cat?.imageUrl && (
                  <Image
                    src={cat.thumbnailUrl}
                    alt={cat.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2 text-gray-500">{cat.slug}</td>
              <td className="px-4 py-2">{formatDate(cat.createdAt)}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <Button onClick={() => onEdit(cat)} className="px-2 py-1">
                  <Pencil size={16} />
                </Button>
                <Button onClick={() => onDelete(cat._id)} className="px-2 py-1 bg-red-500 hover:bg-red-600">
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
