

"use client"; // <--- Add this to AdminOrdersPage

import { useState, useEffect } from "react";
import OrderFilter from "./OrderFilter";
import axios from "axios";
import OrderDetailsModal from "./OrderDetailsModal";
import { BASE_URL } from "@/lib/axios";
import OrdersTable from "./OrdersTable";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "canceled",
];

export default function AdminOrdersPage() {
  // now you can safely pass onFilter handlers to OrderFilter
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) params.orderStatus = statusFilter;
      if (searchTerm) params.search = searchTerm;
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;

      const { data } = await axios.get(`${BASE_URL}/api/admin/orders`, {
        params,
      });
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, searchTerm, dateFrom, dateTo]);

  const handleFilter = (filters) => {
    setStatusFilter(filters.status);
    setSearchTerm(filters.search);
    setDateFrom(filters.dateFrom);
    setDateTo(filters.dateTo);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders Management</h1>
      <OrderFilter onFilter={handleFilter} />
      {/* rest of your table */}
      <OrdersTable
        orders={orders}
        onView={(order) => setSelectedOrder(order)}
        onEdit={(order) => console.log("Edit", order)}
        onDelete={(id) => console.log("Delete", id)}
      />
    </div>
  );
}
