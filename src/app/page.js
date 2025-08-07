"use client"
import AdminDashboardOverview from '@/components/admin/AdminDashboardOverview';

export default function AdminDashboard() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <AdminDashboardOverview />
    </div>
  );
}
