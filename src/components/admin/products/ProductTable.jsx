// ✅ ProductTable.jsx
// components/admin/products/ProductTable.jsx

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";

export default function ProductTable({ products = [], onRefresh }) {
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/products/${id}`);
      onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  src={product.thumbnailUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-12 h-12 rounded object-cover"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>Rs. {product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge variant={product.active ? "success" : "destructive"}>
                  {product.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
