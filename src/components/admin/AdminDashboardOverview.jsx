'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import axiosInstance from '@/lib/axios';

const AdminDashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/analytics/overview');
        setData(res?.data?.data || {}); // fallback to empty object
      } catch (error) {
        console.error('Overview fetch error:', error);
        setData({}); // even on error, stop loading
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  // If data is empty or all values are null/0
  const noData =
    !data ||
    Object.values(data).every(
      (value) => value === 0 || value === null || value === undefined
    );

  if (noData) {
    return (
      <div className="text-center text-gray-500 py-10">
        No data available yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <OverviewCard title="Users" value={data.users} />
      <OverviewCard title="Products" value={data.products} />
      <OverviewCard title="Total Orders" value={data.totalOrders} />
      <OverviewCard title="Pending Orders" value={data.pendingOrders} />
      <OverviewCard title="Total Sales" value={`Rs. ${data.totalSales}`} />
      <OverviewCard title="Today Orders" value={data.todayOrders} />
      <OverviewCard title="Today Sales" value={`Rs. ${data.todaySales}`} />
    </div>
  );
};

const OverviewCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-xl font-semibold mt-2">{value}</h3>
  </div>
);

export default AdminDashboardOverview;
