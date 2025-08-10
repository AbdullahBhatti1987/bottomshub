// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Button from '@/components/ui/Button';
// import Modal from '@/components/ui/Modal';
// import OrderDetailsModal from './OrderDetailsModal';
// import { BASE_URL } from '@/lib/axios';

// const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'canceled'];

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Filters
//   const [statusFilter, setStatusFilter] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       // Build query params for filters
//       const params = {};
//       if (statusFilter) params.orderStatus = statusFilter;
//       if (searchTerm) params.search = searchTerm;
//       if (dateFrom) params.dateFrom = dateFrom;
//       if (dateTo) params.dateTo = dateTo;

//       // Replace with your real admin API endpoint
//       const { data } = await axios.get(`${BASE_URL}/api/admin/orders`, { params });
//       setOrders(data.orders);
//     } catch (error) {
//       console.error('Failed to fetch orders', error);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [statusFilter, searchTerm, dateFrom, dateTo]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Orders Management</h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by Order ID or User"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border rounded px-3 py-2 flex-grow max-w-sm"
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border rounded px-3 py-2"
//         >
//           <option value="">All Statuses</option>
//           {ORDER_STATUSES.map((status) => (
//             <option key={status} value={status}>
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </option>
//           ))}
//         </select>
//         <input
//           type="date"
//           value={dateFrom}
//           onChange={(e) => setDateFrom(e.target.value)}
//           className="border rounded px-3 py-2"
//           placeholder="From"
//         />
//         <input
//           type="date"
//           value={dateTo}
//           onChange={(e) => setDateTo(e.target.value)}
//           className="border rounded px-3 py-2"
//           placeholder="To"
//         />
//         <Button onClick={fetchOrders} disabled={loading}>
//           Refresh
//         </Button>
//       </div>

//       {/* Orders Table */}
//       <div className="overflow-x-auto border rounded">
//         <table className="w-full table-auto text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Order ID</th>
//               <th className="px-4 py-2">User</th>
//               <th className="px-4 py-2">Total (Rs.)</th>
//               <th className="px-4 py-2">Order Status</th>
//               <th className="px-4 py-2">Payment Status</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && orders.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//             {loading && (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500">
//                   Loading...
//                 </td>
//               </tr>
//             )}
//             {orders.map((order) => (
//               <tr key={order._id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{order._id.slice(-6)}</td>
//                 <td className="px-4 py-2">
//                   {order.user?.name || 'N/A'} <br />
//                   <small className="text-gray-500">{order.user?.email}</small>
//                 </td>
//                 <td className="px-4 py-2">{order.totalAmount.toFixed(2)}</td>
//                 <td className="px-4 py-2 capitalize">{order.orderStatus}</td>
//                 <td className="px-4 py-2 capitalize">{order.paymentStatus}</td>
//                 <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td className="px-4 py-2">
//                   <Button size="sm" onClick={() => setSelectedOrder(order)}>
//                     Details
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <Modal
//           title={`Order Details - ${selectedOrder._id.slice(-6)}`}
//           onClose={() => setSelectedOrder(null)}
//         >
//           <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

"use client"; // <--- Add this to AdminOrdersPage

import { useState, useEffect } from "react";
import OrderFilter from "./OrderFilter";
import axios from "axios";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
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
