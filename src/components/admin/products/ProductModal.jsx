"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Select, SelectItem } from "@/components/ui/Select"; // Assuming you're using your own custom Select
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";

export default function ProductModal({ isOpen, onClose, onSubmit, categories = [], product = null }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setForm({ ...form, image: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? "Edit Product" : "Add New Product"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <Input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <Textarea name="description" value={form.description} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Price (PKR)</label>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min={0}
            step="0.01"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select
            name="category"
            value={form.category}
            onChange={(value) => setForm({ ...form, category: value })}
            required
          >
            <SelectItem value="">Select Category</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Image</label>
          <FileUpload onUploaded={handleImageUpload} defaultImage={form.image} />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
