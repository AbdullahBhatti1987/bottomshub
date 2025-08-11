"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input"; // Your reusable Input component
import FileUpload from "@/components/ui/FileUpload";

export default function BrandModal({
  isOpen,
  onClose,
  onSubmit,
  brand,
  loading,
}) {
  const [form, setForm] = useState({
    name: "",
    logo: "",
    description: "",
  });

useEffect(() => {
  if (isOpen) {
    if (brand) {
      setForm({
        name: brand.name || "",
        logo: brand.logo || "",
        description: brand.description || "",
      });
    } else {
      setForm({ name: "", logo: "", description: "" });
    }
  }
}, [brand, isOpen]);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Brand name is required");
      return;
    }
    onSubmit(form);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={brand ? "Edit Brand" : "Add Brand"}
      showFooter={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Brand Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter brand name"
          />
        </div>
        <div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            rows={3}
          />
        </div>
        <div>
          <FileUpload
            label="Brand Logo"
            onChange={(img) => setForm({ ...form, logo: img })}
            maxFiles={1}
            disabled={loading}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            disabled={loading}
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button ldisabled={loading} type="submit">
            {brand ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
