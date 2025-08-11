"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Trash2, Pencil } from "lucide-react";

export default function BrandTable({ brands = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {brands.length === 0 && (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-400">
                No brands found.
              </TableCell>
            </TableRow>
          )}

          {brands.map((brand) => (
            <TableRow key={brand._id}>
              <TableCell>
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={30}
                    height={30}
                    className="rounded-md object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Logo</span>
                )}
              </TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell className="text-gray-500 truncate max-w-xs">
                {brand.description || "-"}
              </TableCell>
              <TableCell className="text-center space-x-2">
                <button
                  onClick={() => onEdit(brand)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                  aria-label={`Edit ${brand.name}`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(brand)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                  aria-label={`Delete ${brand.name}`}
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
