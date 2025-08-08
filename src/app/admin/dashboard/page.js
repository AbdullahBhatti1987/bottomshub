"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";
import Loader from "@/components/ui/Loader";

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/analytics/overview`);
        setOverview(res.data);
      } catch (error) {
        console.error("Error loading overview:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOverview();
  }, []);

  if (loading) return <Loader center />;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={overview.totalUsers || 0} />
        <StatCard title="Total Orders" value={overview.totalOrders || 0} />
        <StatCard title="Revenue" value={`PKR ${overview.totalRevenue || 0}`} />
        <StatCard title="Total Products" value={overview.totalProducts || 0} />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-xl font-medium mb-2">Latest Orders</h2>
        <div className="border rounded-md p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Order ID</th>
                <th className="py-2">User</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {overview.latestOrders?.map((order) => (
                <tr key={order._id} className="border-t">
                  <td>{order._id.slice(-6)}</td>
                  <td>{order.user?.name || "N/A"}</td>
                  <td>PKR {order.totalAmount}</td>
                  <td>{format(new Date(order.createdAt), "dd MMM yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Users */}
      <div>
        <h2 className="text-xl font-medium mb-2">Latest Users</h2>
        <div className="border rounded-md p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {overview.latestUsers?.map((user) => (
                <tr key={user._id} className="border-t">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{format(new Date(user.createdAt), "dd MMM yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
