"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import OrderFilter from "@/components/admin/order/OrderFilter";
import OrdersTable from "@/components/admin/order/OrdersTable";
import OrderDetailsModal from "@/components/admin/order/OrderDetailsModal";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "canceled",
  "returned",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    search: "",
    dateFrom: "",
    dateTo: "",
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.orderStatus = filters.status;
      if (filters.search) params.search = filters.search;
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;

      const { data } = await axios.get(`/api/admin/orders`, { params });
      if (data.success) setOrders(data.orders);
      else setOrders([]);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const { data } = await axios.delete(`/api/admin/orders/${id}`);
      if (data.success) {
        alert("Order deleted");
        fetchOrders();
      } else {
        alert(data.error || "Failed to delete order");
      }
    } catch (err) {
      alert("Error deleting order");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders Management</h1>
      <OrderFilter onFilter={handleFilter} />
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <OrdersTable
          orders={orders}
          onView={(order) => setSelectedOrder(order)}
          onDelete={handleDelete}
        />
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={fetchOrders}
        />
      )}
    </div>
  );
}
