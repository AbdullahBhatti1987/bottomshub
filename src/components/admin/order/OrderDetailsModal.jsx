"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import axios from "axios";

const ORDER_STATUS_FLOW = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "canceled",
  "returned",
];

export default function OrderDetailsModal({ order, onClose, onUpdated }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [updating, setUpdating] = useState(false);

  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);
  const allowedStatuses = ORDER_STATUS_FLOW.slice(currentIndex + 1);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (!ORDER_STATUS_FLOW.includes(newStatus)) return;
    setStatus(newStatus);
  };

  const updateStatus = async () => {
    setUpdating(true);
    try {
      const { data } = await axios.put(`/api/admin/orders/${order._id}`, {
        orderStatus: status,
      });

      if (data.success) {
        alert("Order status updated!");
        onUpdated();
        onClose();
      } else {
        alert(data.error || "Failed to update order status");
      }
    } catch (err) {
      alert("Error updating status");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const downloadInvoice = () => {
    window.open(`/api/admin/orders/${order._id}/invoice`, "_blank");
  };

  const cancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      const { data } = await axios.put(`/api/admin/orders/${order._id}/cancel`, {
        cancelReason: "Canceled by admin",
      });

      if (data.success) {
        alert("Order canceled");
        onUpdated();
        onClose();
      } else {
        alert(data.error || "Failed to cancel order");
      }
    } catch (err) {
      alert("Error canceling order");
      console.error(err);
    }
  };

  const requestReturn = async () => {
    if (!confirm("Confirm return request for this order?")) return;
    try {
      const { data } = await axios.put(`/api/admin/orders/${order._id}/return`, {
        returnReason: "Return requested by admin",
      });

      if (data.success) {
        alert("Return requested");
        onUpdated();
        onClose();
      } else {
        alert(data.error || "Failed to request return");
      }
    } catch (err) {
      alert("Error requesting return");
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>

      <section>
        <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
        <p>
          <strong>Name:</strong> {order.user?.name} <br />
          <strong>Email:</strong> {order.user?.email} <br />
          <strong>Phone:</strong> {order.shippingAddress.phone}
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        <p>
          {order.shippingAddress.fullName} <br />
          {order.shippingAddress.addressLine1} <br />
          {order.shippingAddress.addressLine2 && (
            <>
              {order.shippingAddress.addressLine2} <br />
            </>
          )}
          {order.shippingAddress.city}, {order.shippingAddress.postalCode} <br />
          {order.shippingAddress.country}
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Items Ordered</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto border p-2 rounded">
          {order.items.map((item) => (
            <div key={item.product} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p>{item.name}</p>
                <small>
                  Qty: {item.quantity} | Price: Rs.{item.priceAtPurchase.toFixed(2)}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Payment & Status</h3>
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod} <br />
          <strong>Payment Status:</strong> {order.paymentStatus}
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
          <option value={order.orderStatus}>
            {order.orderStatus} (current)
          </option>
          {allowedStatuses.map((stat) => (
            <option key={stat} value={stat}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </option>
          ))}
        </select>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={updateStatus} disabled={updating}>
            {updating ? "Updating..." : "Update Status"}
          </Button>
          <Button variant="secondary" onClick={downloadInvoice}>
            Download Invoice
          </Button>
          {/* Show cancel only if order not canceled/delivered/returned */}
          {["pending", "confirmed", "processing", "shipped"].includes(order.orderStatus) && (
            <Button variant="destructive" onClick={cancelOrder} disabled={updating}>
              Cancel Order
            </Button>
          )}
          {/* Show return only if delivered */}
          {order.orderStatus === "delivered" && (
            <Button variant="warning" onClick={requestReturn} disabled={updating}>
              Request Return
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </section>
    </div>
  );
}
