'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import axios from 'axios';

const ORDER_STATUS_FLOW = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'canceled'];

export default function OrderDetailsModal({ order, onClose }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [updating, setUpdating] = useState(false);

  // Get allowed next statuses to prevent skipping steps
  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);
  const allowedStatuses = ORDER_STATUS_FLOW.slice(currentIndex + 1);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (!ORDER_STATUS_FLOW.includes(newStatus)) return;
    setStatus(newStatus);
  };

  const updateStatus = async () => {
    setUpdating(true);
    try {
      await axios.put(`/api/admin/order/${order._id}/status`, { status });
      alert('Order status updated successfully!');
      onClose(); // or refresh list if needed
    } catch (error) {
      alert('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const downloadInvoice = () => {
    window.open(`/api/admin/order/${order._id}/invoice`, '_blank');
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <section>
        <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
        <p>
          <strong>Name:</strong> {order.user?.name} <br />
          <strong>Email:</strong> {order.user?.email} <br />
          <strong>Phone:</strong> {order.shippingAddress.phone}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
        <p>
          {order.shippingAddress.fullName} <br />
          {order.shippingAddress.addressLine1} <br />
          {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2} <br /></>}
          {order.shippingAddress.city}, {order.shippingAddress.postalCode} <br />
          {order.shippingAddress.country}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Items Ordered</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto border p-2 rounded">
          {order.items.map((item) => (
            <div key={item.product} className="flex items-center space-x-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p>{item.name}</p>
                <small>Qty: {item.quantity} | Price: Rs.{item.priceAtPurchase.toFixed(2)}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Payment & Status</h2>
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod} <br />
          <strong>Payment Status:</strong> {order.paymentStatus} <br />
        </p>

        <label htmlFor="status" className="block font-semibold mt-4 mb-1">
          Update Order Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="border rounded px-3 py-2 w-full"
          disabled={updating}
        >
          <option value={order.orderStatus}>{order.orderStatus} (current)</option>
          {allowedStatuses.map((stat) => (
            <option key={stat} value={stat}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </option>
          ))}
        </select>

        <div className="mt-4 flex space-x-3">
          <Button onClick={updateStatus} disabled={updating}>
            {updating ? 'Updating...' : 'Update Status'}
          </Button>
          <Button variant="secondary" onClick={downloadInvoice}>
            Download Invoice
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </section>
    </div>
  );
}
