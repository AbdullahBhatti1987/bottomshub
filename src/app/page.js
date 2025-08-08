'use client';

import ChartGrid from '@/components/charts/ChartGrid';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import AdminLayout from './admin/layout';

export default function AdminDashboardPage() {
  const salesData = [
    { month: 'Jan', sales: 1000 },
    { month: 'Feb', sales: 1600 },
    { month: 'Mar', sales: 1200 },
    { month: 'Apr', sales: 1800 },
    { month: 'May', sales: 2200 },
    { month: 'Jun', sales: 2000 },
  ];

  const categoriesData = [
    { name: 'Denim', value: 40 },
    { name: 'Suits', value: 25 },
    { name: 'Accessories', value: 20 },
    { name: 'Soft Denim', value: 15 },
  ];

  const ordersData = [
    { day: 'Mon', orders: 12 },
    { day: 'Tue', orders: 18 },
    { day: 'Wed', orders: 10 },
    { day: 'Thu', orders: 22 },
    { day: 'Fri', orders: 27 },
    { day: 'Sat', orders: 14 },
    { day: 'Sun', orders: 19 },
  ];

  const trafficData = [
    { source: 'Organic', value: 60 },
    { source: 'Social', value: 20 },
    { source: 'Paid Ads', value: 10 },
    { source: 'Referral', value: 10 },
  ];

  return (
    <AdminLayout>
      <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sales Overview (60%) */}
        <div className="col-span-1 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartGrid
                type="area"
                data={salesData}
                dataKey="sales"
                xKey="month"
                color="#3b82f6"
              />
            </CardContent>
          </Card>
        </div>

        {/* Top Categories (40%) */}
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartGrid
                type="pie"
                data={categoriesData}
                dataKey="value"
                nameKey="name"
              />
            </CardContent>
          </Card>
        </div>

        {/* Weekly Orders (60%) */}
        <div className="col-span-1 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartGrid
                type="bar"
                data={ordersData}
                dataKey="orders"
                xKey="day"
                color="#10b981"
              />
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources (40%) */}
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartGrid
                type="pie"
                data={trafficData}
                dataKey="value"
                nameKey="source"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
