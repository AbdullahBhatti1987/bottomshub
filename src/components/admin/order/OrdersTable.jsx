import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function OrdersTable({ orders = [], onView, onEdit, onDelete }) {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Total (Rs.)</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
              <TableCell>
                {order.user?.name || "N/A"} <br />
                <small className="text-gray-500">{order.user?.email}</small>
              </TableCell>
              <TableCell>{order.totalAmount?.toFixed(2) || "-"}</TableCell>
              <TableCell className="capitalize">{order.orderStatus}</TableCell>
              <TableCell className="capitalize">{order.paymentStatus}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-center space-x-2">
                <button
                  onClick={() => onView(order)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                {onEdit && (
                  <button
                    onClick={() => onEdit(order)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                    title="Edit Order"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(order._id)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
                    title="Delete Order"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
