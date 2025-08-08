"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Select, SelectItem } from "@/components/ui/Select"; // Assuming you're using your own custom Select
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";
import Image from "next/image";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  categories = [],
  product = null,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        images: product?.images || [],
      });
    } else {
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
  };

  const handleRemoveImage = (index) => {
    const updated = [...form.images];
    updated.splice(index, 1);
    setForm({ ...form, images: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add New Product"}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[75vh] overflow-y-auto pr-2"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Price (PKR)
          </label>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            onBlur={(e) => {
              const value = parseFloat(e.target.value);
              const formatted = isNaN(value) ? "" : value.toFixed(2);
              handleChange({ target: { name: "price", value: formatted } });
            }}
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
            <SelectItem value="" disabled>
              Select Category
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Image</label>
          <FileUpload multiple onUploaded={handleImageUpload} />

          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 overflow-y-auto max-h-[150px]">
              {form.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-square border rounded overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Image ${idx}`}
                    className="w-full h-full object-cover"
                    width={100} // required for Next.js <Image>
                    height={100}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-bl px-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{product ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
}
