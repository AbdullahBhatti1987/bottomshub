"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function UserModal({ isOpen, onClose, onSubmit, user = null, loading }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "customer",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        mobile: user.mobile || "",
        email: user.email || "",
        role: user.role || "customer",
      });
    } else {
      setForm({ name: "", mobile: "", email: "", role: "customer" });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation example
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }
    if (!form.mobile.trim()) {
      alert("Mobile is required");
      return;
    }

    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? "Edit User" : "Add New User"}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="mobile">
            Mobile
          </label>
          <Input
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded border border-gray-300 p-2"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            {/* Add more roles if needed */}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {user ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
