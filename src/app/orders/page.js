"use client";

import { useState } from "react";

export default function OrderPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Blue Denim Jeans", price: 2500, qty: 1 },
    { id: 2, name: "Black Hoodie", price: 3000, qty: 2 },
  ]);

  const handleQtyChange = (id, qty) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty } : item));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>

      {/* Cart Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.name}</td>
                <td className="p-3">Rs {item.price}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={e => handleQtyChange(item.id, parseInt(e.target.value))}
                    className="border rounded px-2 py-1 w-16 text-center"
                  />
                </td>
                <td className="p-3">Rs {item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="mt-4 text-right text-lg font-semibold">
        Total: Rs {total}
      </div>

      {/* Order Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="border rounded px-3 py-2" />
          <input type="email" placeholder="Email" className="border rounded px-3 py-2" />
          <input type="text" placeholder="Mobile Number" className="border rounded px-3 py-2" />
          <input type="text" placeholder="City" className="border rounded px-3 py-2" />
          <textarea placeholder="Full Address" rows="3" className="md:col-span-2 border rounded px-3 py-2"></textarea>
        </form>

        <button
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          onClick={() => alert("Order Placed!")}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
