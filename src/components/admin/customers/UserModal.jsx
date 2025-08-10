"use client";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function UserModal({ isOpen, onClose, onSubmit, user }) {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", role: "customer" });

  useEffect(() => {
    if (user) {
      setForm(user);
    } else {
      setForm({ name: "", mobile: "", email: "", role: "customer" });
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">{user ? "Edit User" : "Add User"}</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-2 border p-2"
        />
        <input
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          className="w-full mb-2 border p-2"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-2 border p-2"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full mb-4 border p-2"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(form)}>Save</Button>
        </div>
      </div>
    </div>
  );
}
