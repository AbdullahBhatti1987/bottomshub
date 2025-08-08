'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

import ChartBlock from '@/components/admin/dashboard/ChartBlock';
import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get('/api/admin/analytics/overview');
        setData(res.data.data);
      } catch (err) {
        console.error('Dashboard Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) return <Loader center />;

  if (!data) return <EmptyState message="No analytics data available." />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartBlock title="Sales Overview" data={data.salesChart} />
      <ChartBlock title="Orders Overview" data={data.ordersChart} />
      <ChartBlock title="Revenue Trend" data={data.revenueChart} />
      <ChartBlock title="Users Joined" data={data.usersChart} />
      <ChartBlock title="Top Categories" data={data.categoryChart} />
    </div>
  );
}
